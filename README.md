# 📓 Seet Up Diary - Personal Offline Diary PWA

A beautiful, minimal, and fully offline-capable Progressive Web App (PWA) for writing and saving personal diary entries.

## ✨ Features

- ✍️ **Write & Save Entries** - Write your thoughts and save them instantly
- 📅 **Auto-Generated Dates** - Each entry automatically gets a timestamp
- 💾 **Persistent Storage** - Entries saved to localStorage, never lost
- 📱 **Installable PWA** - Install on your phone like a native app
- 🌐 **Works Offline** - Full functionality without internet after first load
- 🎨 **Beautiful Design** - Clean, minimal, mobile-first interface
- 🌙 **Dark Mode Support** - Automatically adapts to system preferences
- 🗑️ **Delete Entries** - Remove entries you no longer need
- ⌨️ **Keyboard Shortcuts** - Save with Ctrl+Enter or Cmd+Enter

## 📁 Project Structure

```
seet app/
├── index.html          # Main HTML file
├── style.css           # Styles (mobile-first, responsive)
├── app.js              # Application logic
├── manifest.json       # PWA manifest
├── service-worker.js   # Offline support
├── icons/              # App icons
│   ├── icon-192x192.png
│   ├── icon-512x512.png
│   └── generate-icons.html  # Icon generator tool
└── README.md           # This file
```

## 🚀 Quick Start

### Local Development

1. **Clone or download** this project to your computer
2. **Generate proper icons** (optional but recommended):
   - Open `icons/generate-icons.html` in your browser
   - Click the download buttons to get proper icon files
   - Replace the placeholder files in the `icons/` folder
3. **Start a local server** (required for PWA features):
   ```bash
   # Using Python 3
   python -m http.server 8000
   
   # Using Python 2
   python -m SimpleHTTPServer 8000
   
   # Using Node.js (if you have http-server installed)
   npx http-server
   
   # Using PHP
   php -S localhost:8000
   ```
4. **Open in browser** - Navigate to `http://localhost:8000`
5. **Test PWA features** - Check the console for Service Worker registration

### 📱 Installing on Mobile

#### Android (Chrome)
1. Open the app URL in Chrome
2. Tap the menu (⋮) in the top-right corner
3. Select "Add to Home screen" or "Install App"
4. Confirm the installation
5. The app icon will appear on your home screen

#### iOS (Safari)
1. Open the app URL in Safari
2. Tap the share button (□↑)
3. Scroll down and tap "Add to Home Screen"
4. Tap "Add" in the top-right corner
5. The app icon will appear on your home screen

#### Desktop (Chrome/Edge)
1. Open the app URL in Chrome or Edge
2. Look for the install icon (⊕) in the address bar
3. Click it and confirm installation
4. The app will open in its own window

## 🌐 Deployment

### GitHub Pages (Free)

1. **Create a GitHub repository**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/seet-up-diary.git
   git push -u origin main
   ```

2. **Enable GitHub Pages**
   - Go to your repository on GitHub
   - Click "Settings" → "Pages"
   - Under "Source", select "main" branch
   - Click "Save"
   - Your app will be live at `https://YOUR_USERNAME.github.io/seet-up-diary/`

3. **Update manifest.json** (if needed)
   - If deploying to a subdirectory, update the `start_url` in `manifest.json`
   - Example: `"start_url": "/seet-up-diary/"`

### Netlify (Free)

1. **Sign up** at [netlify.com](https://netlify.com)
2. **Drag and drop** your project folder to Netlify
3. **Get your URL** - Netlify provides a random URL
4. **Custom domain** (optional) - Add your own domain in settings

### Vercel (Free)

1. **Sign up** at [vercel.com](https://vercel.com)
2. **Install Vercel CLI**:
   ```bash
   npm i -g vercel
   ```
3. **Deploy**:
   ```bash
   vercel
   ```
4. Follow the prompts to deploy

### Firebase Hosting (Free)

1. **Install Firebase CLI**:
   ```bash
   npm install -g firebase-tools
   ```
2. **Login**:
   ```bash
   firebase login
   ```
3. **Initialize**:
   ```bash
   firebase init hosting
   ```
4. **Deploy**:
   ```bash
   firebase deploy
   ```

## 🔧 Customization

### Change App Colors

Edit `style.css` and modify the CSS variables:

```css
:root {
    --primary-color: #4CAF50;      /* Main green color */
    --primary-hover: #45a049;      /* Darker green for hover */
    --background-color: #f5f5f5;   /* Light gray background */
    /* ... other colors */
}
```

### Change App Name

1. Update `index.html` title and header
2. Update `manifest.json` name and short_name
3. Update `README.md` title

### Add Features

The app is designed to be easily extensible:

- **Categories/Tags**: Add a category field to entries
- **Search**: Add search functionality to filter entries
- **Export**: Add ability to export entries as text/JSON
- **Images**: Add image attachment support
- **Cloud Sync**: Add optional cloud backup

## 🛠️ Technical Details

### Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with CSS variables, flexbox, animations
- **JavaScript (ES6+)** - Modern JavaScript with localStorage API
- **Service Worker** - Offline caching and PWA functionality
- **Web App Manifest** - PWA installation metadata

### Browser Support

- ✅ Chrome 90+ (Desktop & Mobile)
- ✅ Firefox 88+ (Desktop & Mobile)
- ✅ Safari 14+ (Desktop & Mobile)
- ✅ Edge 90+ (Desktop & Mobile)
- ✅ Samsung Internet 14+

### Data Storage

All diary entries are stored locally in the browser's localStorage:

```javascript
// Entry structure
{
    id: 1234567890,           // Unique timestamp ID
    text: "Your diary entry", // Entry content
    date: "2024-01-15T10:30:00.000Z"  // ISO date string
}
```

**Note**: Data is stored locally on each device. Clearing browser data will delete entries.

## 📝 Usage Guide

### Writing an Entry

1. Tap/click on the text area
2. Write your thoughts
3. Tap "Save Entry" or press Ctrl+Enter (Cmd+Enter on Mac)
4. Your entry is saved with the current date/time

### Viewing Entries

- All saved entries appear below the input area
- Newest entries appear first
- Each entry shows the date and time it was saved

### Deleting an Entry

1. Find the entry you want to delete
2. Tap the 🗑️ (trash) icon on the entry
3. Confirm the deletion

### Keyboard Shortcuts

- **Ctrl+Enter** or **Cmd+Enter**: Save entry
- **Tab**: Navigate between elements

## 🔒 Privacy & Security

- ✅ **No data sent to servers** - Everything stays on your device
- ✅ **No tracking** - No analytics or tracking scripts
- ✅ **No ads** - Clean, ad-free experience
- ✅ **Offline-first** - Works without internet connection

## 🐛 Troubleshooting

### App not installing

- Ensure you're using HTTPS (required for PWA)
- Check that all icon files exist in the `icons/` folder
- Verify `manifest.json` is valid (no syntax errors)
- Check browser console for errors

### Entries not saving

- Check if localStorage is enabled in your browser
- Ensure you're not in private/incognito mode
- Check browser console for errors

### Service Worker not registering

- Ensure you're serving over HTTPS or localhost
- Check that `service-worker.js` exists in the root directory
- Clear browser cache and reload

### Icons not showing

- Generate proper icons using `icons/generate-icons.html`
- Ensure icon files are in the `icons/` directory
- Check that icon paths in `manifest.json` are correct

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Feel free to:

- Report bugs
- Suggest new features
- Submit pull requests
- Improve documentation

## 📞 Support

If you have questions or need help:

1. Check the troubleshooting section above
2. Search existing issues on GitHub
3. Create a new issue with details about your problem

## 🎯 Roadmap

Future features planned:

- [ ] Entry categories/tags
- [ ] Search functionality
- [ ] Export entries to file
- [ ] Entry editing
- [ ] Mood tracking
- [ ] Photo attachments
- [ ] Cloud sync (optional)
- [ ] Multiple diaries
- [ ] Password protection

---

**Made with ❤️ for personal journaling**

**Seet Up Diary** - Write your thoughts anytime, anywhere 📓✨
