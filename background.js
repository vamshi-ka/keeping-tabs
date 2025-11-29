// Debug mode - set to false for production
const DEBUG = false;

// Store original titles
const originalTitles = new Map();

// Track titles we're currently updating to prevent race conditions
const updatingTitles = new Set();

// Debounce timer for renumbering
let renumberDebounceTimer = null;

// Function to strip existing number prefix from title
function stripNumberPrefix(title) {
  // Remove both [N] and (N) prefixes
  return title.replace(/^[\[\(]\d+[\]\)]\s*/, '');
}

// Function to navigate to a specific unpinned tab by number (1-9)
async function navigateToUnpinnedTab(number) {
  if (DEBUG) console.log(`[DEBUG] navigateToUnpinnedTab(${number}) called`);
  try {
    const tabs = await browser.tabs.query({ currentWindow: true });
    const unpinnedTabs = tabs.filter(tab => !tab.pinned);

    // Convert to 0-indexed
    const targetIndex = number - 1;

    // Navigate to the target tab
    if (targetIndex >= 0 && targetIndex < unpinnedTabs.length) {
      if (DEBUG) console.log(`[DEBUG] Activating tab ${number}`);
      await browser.tabs.update(unpinnedTabs[targetIndex].id, { active: true });
    } else {
      if (DEBUG) console.log(`[DEBUG] Tab ${number} does not exist`);
    }
  } catch (error) {
    console.error('Error navigating to tab:', error);
  }
}

// Function to navigate to a specific pinned tab by number (1-9)
async function navigateToPinnedTab(number) {
  if (DEBUG) console.log(`[DEBUG] navigateToPinnedTab(${number}) called`);
  try {
    const tabs = await browser.tabs.query({ currentWindow: true });
    const pinnedTabs = tabs.filter(tab => tab.pinned);

    // Convert to 0-indexed
    const targetIndex = number - 1;

    // Navigate to the target pinned tab
    if (targetIndex >= 0 && targetIndex < pinnedTabs.length) {
      if (DEBUG) console.log(`[DEBUG] Activating pinned tab ${number}`);
      await browser.tabs.update(pinnedTabs[targetIndex].id, { active: true });
    } else {
      if (DEBUG) console.log(`[DEBUG] Pinned tab ${number} does not exist`);
    }
  } catch (error) {
    console.error('Error navigating to pinned tab:', error);
  }
}

// Function to renumber all tabs (with debouncing)
function scheduleRenumber() {
  // Clear any pending renumber
  if (renumberDebounceTimer) {
    clearTimeout(renumberDebounceTimer);
  }

  // Schedule a new renumber after a short delay
  renumberDebounceTimer = setTimeout(() => {
    renumberTabs();
  }, 200); // 200ms debounce - increased to reduce race conditions
}

// Function to renumber all tabs immediately
async function renumberTabs() {
  if (DEBUG) console.log(`[DEBUG] renumberTabs() called`);
  try {
    const tabs = await browser.tabs.query({ currentWindow: true });
    const pinnedTabs = tabs.filter(tab => tab.pinned);
    const unpinnedTabs = tabs.filter(tab => !tab.pinned);

    if (DEBUG) console.log(`[DEBUG] Renumbering ${pinnedTabs.length} pinned tabs and ${unpinnedTabs.length} unpinned tabs`);

    // Helper function to number a tab with given style
    const numberTab = (tab, index, maxCount, bracketStyle) => {
      if (index < maxCount) {
        const number = index + 1;

        // Store original title if we haven't seen this tab before
        if (!originalTitles.has(tab.id)) {
          originalTitles.set(tab.id, stripNumberPrefix(tab.title));
        }

        // Get the original title (without any number prefix)
        const originalTitle = originalTitles.get(tab.id);
        const numberedTitle = bracketStyle === 'round'
          ? `(${number}) ${originalTitle}`
          : `[${number}] ${originalTitle}`;

        // Mark this tab as being updated
        updatingTitles.add(tab.id);

        // Inject script to update the page title
        browser.tabs.executeScript(tab.id, {
          code: `document.title = ${JSON.stringify(numberedTitle)};`
        }).then(() => {
          // Remove from updating set after a delay
          setTimeout(() => updatingTitles.delete(tab.id), 300);
        }).catch(err => {
          // Ignore errors for tabs that don't allow script injection
          if (DEBUG) console.log(`Cannot inject into tab ${tab.id}:`, err.message);
          updatingTitles.delete(tab.id);
        });
      } else {
        // Remove number from tabs beyond the limit
        if (originalTitles.has(tab.id)) {
          const originalTitle = originalTitles.get(tab.id);

          // Mark this tab as being updated
          updatingTitles.add(tab.id);

          browser.tabs.executeScript(tab.id, {
            code: `document.title = ${JSON.stringify(originalTitle)};`
          }).then(() => {
            // Remove from updating set after a delay
            setTimeout(() => updatingTitles.delete(tab.id), 300);
          }).catch(err => {
            if (DEBUG) console.log(`Cannot inject into tab ${tab.id}:`, err.message);
            updatingTitles.delete(tab.id);
          });
        }
      }
    };

    // Number pinned tabs with (N)
    pinnedTabs.forEach((tab, index) => {
      numberTab(tab, index, 9, 'round');
    });

    // Number unpinned tabs with [N]
    unpinnedTabs.forEach((tab, index) => {
      numberTab(tab, index, 9, 'square');
    });
  } catch (error) {
    console.error('Error renumbering tabs:', error);
  }
}

// When a page finishes loading, update its title
browser.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (DEBUG) console.log(`[DEBUG] Tab ${tabId} updated. changeInfo keys: ${Object.keys(changeInfo).join(', ')}`);

  // Only update when title explicitly changes
  if (changeInfo.title) {
    // Skip if we're currently updating this tab (prevents race condition)
    if (updatingTitles.has(tabId)) {
      if (DEBUG) console.log(`[DEBUG] Skipping title update for tab ${tabId} - currently being updated by us`);
      return;
    }

    const previousTitle = originalTitles.get(tabId);
    const cleanTitle = stripNumberPrefix(changeInfo.title);

    // Only update if the clean title is actually different from what we have stored
    if (cleanTitle !== previousTitle) {
      if (DEBUG) console.log(`[DEBUG] Title changed for tab ${tabId}: ${cleanTitle}`);
      originalTitles.set(tabId, cleanTitle);
      scheduleRenumber();
    }
  }

  // Handle status complete for initial loads (when we don't have a title yet)
  if (changeInfo.status === 'complete') {
    if (tab.title && !originalTitles.has(tabId)) {
      const cleanTitle = stripNumberPrefix(tab.title);
      if (DEBUG) console.log(`[DEBUG] First load - storing title for tab ${tabId}: ${cleanTitle}`);
      originalTitles.set(tabId, cleanTitle);
      scheduleRenumber();
    }
  }
});

// When tabs are created, removed, or moved
browser.tabs.onCreated.addListener(() => {
  if (DEBUG) console.log(`[DEBUG] Tab created`);
  scheduleRenumber();
});

browser.tabs.onRemoved.addListener((tabId) => {
  if (DEBUG) console.log(`[DEBUG] Tab ${tabId} removed`);
  originalTitles.delete(tabId);
  scheduleRenumber();
});

browser.tabs.onMoved.addListener(() => {
  if (DEBUG) console.log(`[DEBUG] Tab moved`);
  scheduleRenumber();
});

browser.tabs.onAttached.addListener(() => {
  if (DEBUG) console.log(`[DEBUG] Tab attached`);
  scheduleRenumber();
});

browser.tabs.onDetached.addListener(() => {
  if (DEBUG) console.log(`[DEBUG] Tab detached`);
  scheduleRenumber();
});

// When a tab is pinned or unpinned
browser.tabs.onUpdated.addListener((tabId, changeInfo) => {
  if (changeInfo.hasOwnProperty('pinned')) {
    if (DEBUG) console.log(`[DEBUG] Tab ${tabId} pin status changed`);
    scheduleRenumber();
  }
});

// Listen for keyboard commands to navigate to tabs
browser.commands.onCommand.addListener((command) => {
  if (DEBUG) console.log(`[DEBUG] Command received: ${command}`);

  if (command.startsWith('go-to-pinned-tab-')) {
    const tabNumber = parseInt(command.split('-')[4]);
    navigateToPinnedTab(tabNumber);
  } else if (command.startsWith('go-to-tab-')) {
    const tabNumber = parseInt(command.split('-')[3]);
    navigateToUnpinnedTab(tabNumber);
  }
});

// Initial numbering when extension loads
renumberTabs();
