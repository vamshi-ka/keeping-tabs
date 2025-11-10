# Keeping Tabs

A lightweight Firefox extension that automatically numbers your unpinned tabs and enables lightning-fast keyboard navigation.

## Personal Note

```
- Specifically built for zen browser.
- Why I built this? I was frustrated that pinned tabs just took up the first numbers 1 through 8 for tab navigation.
- And I wanted something to switch tabs easily without taking my fingers off the keyboard.
- Hence, this was built for my personal use. I thought maybe if someone else is also facing this frustration, they can use this. 
- Makes my life so so easy, I can easily navigate by looking at the tab and just hitting the number.
- I am not an expert at JS or understanding firefox extensions, I used the general logic of event listeners to get what I want through Claude code
- Only this Personal Note section is not Claude code generated. So feel free to take this and do whatever you want with it and help me add features.
- Another important Prerequisite - Touch Typing
```

## Features

- **Automatic Tab Numbering**: Numbers unpinned tabs 1-9 for easy identification
- **Keyboard Navigation**: Jump to any tab instantly with `Cmd+1` through `Cmd+9` (Mac) or `Ctrl+1` through `Ctrl+9` (Windows/Linux)
- **Pinned Tab Support**: Navigate pinned tabs separately with `Cmd+Option+1-9`
- **Smart Updates**: Tab numbers update automatically when you create, close, or move tabs
- **Non-Intrusive**: Only numbers the first 9 unpinned tabs to keep things clean

## Installation

### From Mozilla Add-ons (Recommended)

Coming soon!

### Manual Installation

1. Download the latest `.xpi` file from [Releases](../../releases)
2. Open Firefox and go to `about:addons`
3. Click the gear icon (⚙️) in the top right
4. Select "Install Add-on From File..."
5. Select the downloaded `.xpi` file

### From Source

1. Clone this repository
2. Open Firefox and go to `about:debugging#/runtime/this-firefox`
3. Click "Load Temporary Add-on"
4. Navigate to the repository folder and select `manifest.json`

## Usage

### Tab Numbering

Once installed, the extension automatically prepends `[N]` to the titles of your first 9 unpinned tabs:

```
[1] GitHub - Your Repos
[2] Stack Overflow - Questions
[3] MDN Web Docs
```

### Keyboard Shortcuts

**Unpinned Tabs:**

- `Cmd+1` (Mac) or `Ctrl+1` (Windows/Linux) - Go to tab 1
- `Cmd+2` through `Cmd+9` - Go to tabs 2-9

**Pinned Tabs:**

- `Cmd+Option+1` (Mac) or `Ctrl+Alt+1` (Windows/Linux) - Go to pinned tab 1
- `Cmd+Option+2` through `Cmd+Option+9` - Go to pinned tabs 2-9

## Demo

*Demo video coming soon! Check the `media/` folder for screenshots and recordings.*

## Why Keeping Tabs?

Modern browsing often involves juggling multiple tabs. Built-in browser shortcuts (`Cmd+1`, `Cmd+2`, etc.) navigate to tabs by absolute position, including pinned tabs, which can be confusing when you have many pinned tabs.

**Keeping Tabs** solves this by:

- Clearly numbering only your active working tabs (unpinned)
- Providing separate navigation for pinned tabs
- Updating numbers dynamically as you work
- Enforcing a "keep it clean" approach (max 9 numbered tabs)

## Technical Details

- **Manifest Version**: 2
- **Permissions**: `tabs`, `<all_urls>` (required for title modification)
- **Browser Support**: Firefox 48+
- **Architecture**: Background script with event-driven tab management

### How It Works

1. Monitors tab events (create, remove, move, pin/unpin, title changes)
2. Filters unpinned tabs and numbers the first 9
3. Injects JavaScript to modify `document.title` on each page
4. Uses debouncing to prevent race conditions during rapid changes

## Development

### Prerequisites

- Node.js and npm
- `web-ext` CLI tool: `npm install -g web-ext`

### Building

```bash
# Set up API credentials in .env file
echo "WEB_EXT_API_KEY=your-key" > .env
echo "WEB_EXT_API_SECRET=your-secret" >> .env

# Sign the extension
./sign.sh
```

### Testing

```bash
# Load as temporary extension
web-ext run

# Or manually:
# 1. Go to about:debugging#/runtime/this-firefox
# 2. Click "Load Temporary Add-on"
# 3. Select manifest.json
```

### Debug Mode

To enable debug logging, edit `background.js`:

```javascript
const DEBUG = true;  // Set to false for production
```

## Roadmap / Future Features

- [ ] **Customizable Key Bindings**: Allow users to configure their own keyboard shortcuts
- [ ] **Theme Support**: Customize number display format (e.g., `(1)`, `#1`, `1.`)
- [ ] **Tab Limit Configuration**: Allow users to number more or fewer than 9 tabs
- [ ] **Chrome/Edge Support**: Port to Manifest V3 for Chromium-based browsers
- [ ] **Tab Groups Integration**: Support for Firefox tab groups
- [ ] **Settings Page**: GUI for configuration instead of editing code

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT License - see [LICENSE](LICENSE) file for details

## Author

Built with ☕ by [Vamshi Kodipaka](https://github.com/vamshikodipaka)

## Acknowledgments

- Inspired by the need for better tab management in modern browsers
- Built using the Firefox WebExtensions API

---

**Star this repo if you find it useful!** ⭐
