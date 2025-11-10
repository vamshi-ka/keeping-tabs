# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Tab Numbers** is a Firefox/browser extension that automatically numbers unpinned tabs for easy keyboard navigation. The extension displays tab numbers in square brackets (e.g., `[1]`, `[2]`) prepended to page titles.

## Architecture

This is a simple browser extension with a background script architecture:

- **manifest.json**: Extension manifest (manifest_version 2) defining permissions, background scripts, and metadata
- **background.js**: Core extension logic running as a background script

### Key Components

**Tab Numbering System (background.js)**
- Uses a `Map` to store original page titles (`originalTitles`) to preserve them across renumbering
- `stripNumberPrefix()`: Removes existing `[N]` prefixes from titles
- `renumberTabs()`: Main function that queries all tabs, filters unpinned ones, and injects script to update titles dynamically
- Event listeners handle tab lifecycle: `onCreated`, `onRemoved`, `onMoved`, `onAttached`, `onDetached`, `onUpdated`

**Script Injection Pattern**
The extension uses `browser.tabs.executeScript()` to inject JavaScript that modifies `document.title` directly on each page. This approach gracefully handles injection failures for protected pages (about:, chrome: URLs).

## Development Commands

### Testing the Extension

**Firefox:**
```bash
# Open Firefox and load the extension temporarily
# 1. Navigate to about:debugging#/runtime/this-firefox
# 2. Click "Load Temporary Add-on"
# 3. Select manifest.json from this directory
```

**Chrome/Chromium (requires manifest v2 support):**
```bash
# 1. Navigate to chrome://extensions/
# 2. Enable "Developer mode"
# 3. Click "Load unpacked"
# 4. Select the project directory
```

### Debugging

View console logs for the background script:
- Firefox: about:debugging → This Firefox → Inspect (under the extension)
- Chrome: chrome://extensions → Details → "Inspect views: background page"

## Technical Notes

- Uses Firefox WebExtensions API (`browser.*` namespace)
- Pinned tabs are explicitly excluded from numbering
- Tab numbers update in real-time when tabs are created, closed, moved, or pinned/unpinned
- Script injection errors are caught and logged but don't break functionality
- Original titles are preserved in memory and restored when renumbering
