# Mozilla Add-ons (AMO) Submission Guide

## Package Ready for Upload
**File:** `web-ext-artifacts/keeping_tabs-1.2.zip`

---

## Step-by-Step Submission Process

### 1. Go to Mozilla Add-ons Developer Hub
Open: https://addons.mozilla.org/developers/

### 2. Sign In / Create Account
- Use your Firefox Account
- Accept developer agreement if prompted

### 3. Click "Submit a New Add-on"

### 4. Distribution Method
- Select: **"On this site"** (listed on AMO)

### 5. Upload Your Add-on
- Click "Select a file"
- Navigate to: `/Users/vamshikodipaka/Documents/01 Projects/keeping-tabs/web-ext-artifacts/keeping_tabs-1.2.zip`
- Upload the file
- Wait for validation (should pass automatically)

---

## Form Fields - Copy & Paste These

### Basic Information

**Name:**
```
Keeping Tabs
```

**Add-on URL (slug):**
```
keeping-tabs
```

**Summary** (250 characters max):
```
Automatic tab numbering (1-9) and keyboard navigation for unpinned tabs. Jump to any tab instantly with Cmd+1-9. Built specifically for Zen Browser users who want lightning-fast tab switching.
```

**Description:**
```
**Keeping Tabs** is a lightweight Firefox extension that automatically numbers your unpinned tabs and enables lightning-fast keyboard navigation.

## Why Keeping Tabs?

Built specifically for Zen Browser users frustrated with pinned tabs taking up the first keyboard shortcuts (Cmd+1-8). This extension solves that by:

- **Smart Numbering**: Only numbers unpinned tabs (1-9), ignoring pinned tabs
- **Separate Navigation**: Use Cmd+Option+1-9 for pinned tabs
- **Visual Clarity**: See tab numbers directly in page titles
- **Clean Design**: Max 9 numbered tabs to keep you organized

## Features

✨ **Automatic Tab Numbering** - Numbers unpinned tabs 1-9 in square brackets [1], [2], etc.

⌨️ **Keyboard Navigation** - Jump instantly:
- Cmd+1 through Cmd+9 (Mac) or Ctrl+1-9 (Windows/Linux) for unpinned tabs
- Cmd+Option+1-9 (Mac) or Ctrl+Alt+1-9 (Windows/Linux) for pinned tabs

🔄 **Smart Updates** - Tab numbers update automatically when you:
- Create new tabs
- Close tabs
- Move tabs
- Pin/unpin tabs
- Navigate within tabs

🎯 **Non-Intrusive** - Only numbers first 9 unpinned tabs to encourage clean tab hygiene

## How It Works

Once installed, the extension runs in the background and:
1. Monitors all tab events
2. Filters out pinned tabs
3. Numbers the first 9 unpinned tabs
4. Updates titles in real-time

Example:
```
[1] GitHub - Your Repos
[2] Stack Overflow - Questions
[3] MDN Web Docs
```

## Perfect For

- **Touch typists** who never want to touch the mouse
- **Zen Browser users** with many pinned tabs
- **Productivity enthusiasts** who juggle multiple projects
- **Keyboard warriors** who love shortcuts
- **Tab hoarders** who need better organization (or a wake-up call!)

## Technical Details

- Built with WebExtensions API
- Event-driven architecture with smart debouncing
- Race condition protection
- Minimal performance impact
- Works on Firefox 48+
- Open source (MIT License)

## Privacy

This extension:
- ✅ Only modifies tab titles locally
- ✅ Does NOT collect any data
- ✅ Does NOT track your browsing
- ✅ Does NOT make network requests
- ✅ Works completely offline

## Support & Contributing

- **GitHub**: https://github.com/vamshi-ka/keeping-tabs
- **Issues**: Report bugs or request features on GitHub
- **Contributions**: Pull requests welcome!

Built with ☕ by Vamshi Kodipaka using Claude Code.

---

**Prerequisite**: Touch typing skills recommended for maximum productivity!
```

### Categories

Select these categories:
- ✅ **Tabs**
- ✅ **Productivity**

### Tags

Add these tags (comma-separated):
```
tabs, keyboard, navigation, shortcuts, productivity, zen-browser, tab-management, firefox
```

### Support Information

**Support Email:**
```
[YOUR EMAIL HERE - use your personal or create a project email]
```

**Support Website:**
```
https://github.com/vamshi-ka/keeping-tabs/issues
```

**Homepage:**
```
https://github.com/vamshi-ka/keeping-tabs
```

### License

**License:**
```
MIT License
```

**License File:**
Already included in your package (LICENSE file)

### Privacy Policy

**Do you have a privacy policy?**
```
No (extension doesn't collect data)
```

Or if they require one:
```
This extension does not collect, store, or transmit any user data. It operates entirely locally within your browser to number tabs. No analytics, tracking, or network requests are made.
```

### Screenshots/Media

You'll need to upload screenshots or your demo GIF:

**Option 1: Upload demo.gif**
- Navigate to: `/Users/vamshikodipaka/Documents/01 Projects/keeping-tabs/media/demo.gif`
- Caption: "Keeping Tabs in action - automatic numbering and keyboard navigation"

**Option 2: Take screenshots**
If GIF doesn't work, take a few screenshots showing:
1. Numbered tabs in the browser
2. Keyboard shortcuts in action

### Version Notes (for reviewers)

**Release Notes for v1.2:**
```
Initial public release with core features:
- Automatic tab numbering (1-9)
- Keyboard shortcuts for navigation
- Separate pinned tab navigation
- Smart debouncing and race condition protection
- Clean, production-ready code

Built for personal use, specifically for Zen Browser with many pinned tabs. Open source and available on GitHub.
```

**Notes to Reviewer:**
```
This extension modifies tab titles locally to add numbers. It requires "tabs" and "<all_urls>" permissions to:
- Monitor tab events (create, close, move)
- Update document.title via script injection

No data collection or external network requests. Code is fully auditable on GitHub: https://github.com/vamshi-ka/keeping-tabs
```

---

## After Submission

1. **Wait for Review** (typically 3-7 days)
2. **Check Email** for any reviewer questions
3. **Address Feedback** if requested
4. **Go Live!** Once approved

---

## Need Help?

If you get stuck:
1. Check the AMO Developer Guide: https://extensionworkshop.com/documentation/publish/
2. Review their policies: https://extensionworkshop.com/documentation/publish/add-on-policies/
3. Ask me for help!

Good luck! 🚀
