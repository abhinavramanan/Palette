# 🎨 Color Palette Generator

> A stunning, modern web application for generating beautiful color palettes with advanced harmony algorithms and professional design tools.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

## 📋 Table of Contents

- [✨ Features](#-features)
- [🚀 Demo](#-demo)
- [🛠️ Installation](#️-installation)
- [📱 Usage](#-usage)
- [🎨 Color Harmony Types](#-color-harmony-types)
- [📤 Export Formats](#-export-formats)
- [♿ Accessibility](#-accessibility)
- [🧠 Technical Details](#-technical-details)
- [🌐 Browser Support](#-browser-support)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

## ✨ Features

### 🎯 Core Functionality
- **🌈 5 Harmony Types**: Analogous, Complementary, Triadic, Monochromatic, and Random color schemes
- **🔒 Color Lock System**: Pin favorite colors while regenerating others
- **📋 Multiple Color Formats**: Display colors in HEX, RGB, and HSL formats with one-click copy
- **💾 Palette Management**: Save, load, and delete color palettes with local storage
- **⚡ Quick Actions**: Floating action button with shortcuts for power users

### 🔧 Professional Tools
- **📤 Export Options**: CSS Variables, SCSS Variables, JSON, and Adobe ASE formats
- **♿ Accessibility Checker**: WCAG compliance testing with detailed contrast ratios
- **🔄 Real-time Feedback**: Instant notifications and smooth animations
- **📱 Responsive Design**: Works flawlessly on desktop, tablet, and mobile devices

### 🎨 Modern UI/UX
- **🌊 Animated Gradient Background**: Dynamic, color-shifting background with floating particles
- **🪟 Glass Morphism Design**: Modern frosted glass effect with backdrop blur
- **✨ Smooth Animations**: Fluid transitions and micro-interactions throughout
- **🎯 Professional Typography**: Clean, readable fonts with proper visual hierarchy
- **🖱️ Interactive Elements**: Hover effects, lock animations, and visual feedback

## 🚀 Demo

### Live Preview
Open `index.html` in your browser to see the application in action!

### Quick Start
```bash
# Clone the repository
git clone https://github.com/your-username/color-palette-generator.git
cd color-palette-generator

# Open with a local server (recommended)
python -m http.server 8000
# OR
npx serve .
# OR
php -S localhost:8000

# Then open http://localhost:8000 in your browser
```

## 🛠️ Installation

### Prerequisites
- **Modern web browser** (Chrome 60+, Firefox 55+, Safari 11+, Edge 79+)
- **No dependencies** - runs directly in the browser!

### Setup Options

#### Option 1: Direct Download
1. Download the project files
2. Extract to your desired location
3. Open `index.html` in your browser

#### Option 2: Git Clone
```bash
git clone https://github.com/your-username/color-palette-generator.git
cd color-palette-generator
```

#### Option 3: Local Server (Recommended)
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000

# Node.js
npx serve .

# PHP
php -S localhost:8000
```

## 📱 Usage

### Basic Operations

#### 1. Generate Your First Palette
- Choose a harmony type from the dropdown menu
- Click **"✨ Generate New Palette"**
- Your beautiful color palette appears instantly!

#### 2. Lock Colors You Love
- Click the 🔓 button on any color to lock it
- Locked colors (🔒) stay the same when generating new palettes
- Perfect for finding complements to a favorite color

#### 3. Copy Colors
- **Click color card**: Copy HEX value
- **Click RGB/HSL values**: Copy specific format
- Get instant feedback with toast notifications

#### 4. Save & Export
- **Save palettes**: Store locally for later use
- **Export formats**: CSS, SCSS, JSON, Adobe ASE
- **Accessibility check**: WCAG compliance testing

### Advanced Features

#### Quick Actions (FAB Menu)
Hover over the floating action button (⚡) to access:
- **🎲 Random Color**: Replace one unlocked color
- **📋 Copy All**: Copy entire palette to clipboard
- **🔓 Unlock All**: Remove all color locks

#### Keyboard Shortcuts
- **Spacebar**: Generate new palette
- **Ctrl/Cmd + S**: Save current palette
- **Ctrl/Cmd + E**: Open export modal

## 🎨 Color Harmony Types

### 🌅 Analogous
Colors adjacent on the color wheel, creating harmonious and pleasing combinations perfect for natural, calming designs.

**Best for**: Nature themes, gradients, subtle branding

### ⚡ Complementary
Colors opposite each other on the color wheel, providing high contrast and vibrant, energetic palettes.

**Best for**: Bold designs, call-to-action buttons, high impact visuals

### 🔺 Triadic
Three colors evenly spaced around the color wheel, offering vibrant combinations while maintaining harmony.

**Best for**: Playful designs, illustrations, creative projects

### 🌙 Monochromatic
Various shades, tints, and tones of a single color, creating sophisticated and cohesive palettes.

**Best for**: Minimalist designs, professional branding, elegant layouts

### 🎲 Random
Completely random color generation for unexpected and creative combinations.

**Best for**: Inspiration, experimental designs, breaking creative blocks

## 📤 Export Formats

### CSS Variables
```css
:root {
  --color-1: #8adee9;
  --color-2: #2ee5a2;
  --color-3: #1edaf7;
  --color-4: #77a6f6;
  --color-5: #8677e3;
}
```

### SCSS Variables
```scss
$color-1: #8adee9;
$color-2: #2ee5a2;
$color-3: #1edaf7;
$color-4: #77a6f6;
$color-5: #8677e3;
```

### JSON Format
```json
{
  "palette": ["#8adee9", "#2ee5a2", "#1edaf7", "#77a6f6", "#8677e3"],
  "harmonyType": "analogous",
  "timestamp": "2025-08-18T10:30:45.123Z",
  "generationCount": 42
}
```

### Adobe ASE (Swatch Exchange)
```
Adobe Swatch Exchange Format
Generated: 8/18/2025, 10:30:45 AM
Harmony Type: analogous

Colors:
Color 1: RGB(138, 222, 233) - #8adee9
Color 2: RGB(46, 229, 162) - #2ee5a2
...
```

## ♿ Accessibility

### WCAG Compliance Features
- **Full accessibility checker** with detailed contrast ratios
- **Keyboard navigation** support for all interactions
- **Screen reader friendly** with semantic HTML and ARIA labels
- **High contrast support** for all UI elements
- **Focus management** with clear indicators

### Contrast Ratio Standards
| Ratio | Level | Description |
|-------|-------|-------------|
| **7:1+** | AAA ✅ | Excellent contrast for all text sizes |
| **4.5:1+** | AA ✅ | Good contrast for normal text |
| **3:1+** | AA Large ⚠️ | Acceptable for large text only |
| **<3:1** | Fail ❌ | Insufficient contrast |

### Accessibility Testing
The built-in accessibility checker tests all color combinations in your palette and provides:
- **Pass/Warning/Fail counts**
- **Detailed contrast ratios**
- **WCAG level compliance**
- **Recommendations for improvement**

## 🧠 Technical Details

### Architecture
- **Frontend**: Vanilla JavaScript (ES6+), HTML5, CSS3
- **Storage**: Browser LocalStorage for persistence
- **No dependencies**: Pure client-side application
- **Performance**: Optimized animations and lazy loading

### Key Technologies
- **CSS Grid & Flexbox**: Responsive, flexible layouts
- **CSS Custom Properties**: Maintainable theming system
- **Canvas API**: Future-ready for advanced color manipulation
- **Web APIs**: Clipboard, LocalStorage, Intersection Observer

### File Structure
```
color-palette-generator/
├── index.html          # Main application file
├── styles.css          # Complete styling and animations
├── script.js           # All JavaScript functionality
└── README.md          # This documentation
```

### Core Classes
- **`ColorPaletteGenerator`**: Main application class
- **Color harmony algorithms**: Mathematical color generation
- **Local storage manager**: Palette persistence
- **Export system**: Multi-format color export
- **Accessibility checker**: WCAG compliance testing

## 🌐 Browser Support

| Browser | Version | Status | Notes |
|---------|---------|--------|-------|
| **Chrome** | 60+ | ✅ Full Support | Recommended |
| **Firefox** | 55+ | ✅ Full Support | All features work |
| **Safari** | 11+ | ✅ Full Support | macOS/iOS compatible |
| **Edge** | 79+ | ✅ Full Support | Chromium-based |
| **IE** | 11 | ⚠️ Limited | Basic functionality only |

### Required Features
- ES6+ JavaScript support
- CSS Grid and Flexbox
- CSS Custom Properties
- Clipboard API (for copy functionality)
- LocalStorage (for saving palettes)

## 🤝 Contributing

We welcome contributions! Here's how you can help:

### 🐛 Bug Reports
Found a bug? Please open an issue with:
- **Clear description** of the problem
- **Steps to reproduce** the issue
- **Expected vs actual behavior**
- **Browser and version** information

### 💡 Feature Requests
Have an idea? We'd love to hear it! Include:
- **Detailed description** of the feature
- **Use cases** and benefits
- **Mockups or examples** if applicable

### 🔧 Code Contributions
1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### 📝 Development Guidelines
- **Code Style**: Follow existing patterns and conventions
- **Testing**: Test across different browsers and devices
- **Documentation**: Update README for new features
- **Accessibility**: Ensure all changes meet WCAG standards

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

### MIT License Summary
- ✅ **Commercial use** allowed
- ✅ **Modification** allowed
- ✅ **Distribution** allowed
- ✅ **Private use** allowed
- ❌ **No liability** from authors
- ❌ **No warranty** provided

## 🙏 Acknowledgments

- **Color Theory**: Based on traditional art and design principles
- **Accessibility Guidelines**: WCAG 2.1 AA standards
- **Design Inspiration**: Modern glass morphism and minimalist trends
- **Mathematical Algorithms**: Standard color harmony calculations
- **Typography**: Inter and JetBrains Mono fonts

## 📞 Support & Contact

Need help? Have questions?

- **🐛 Bug Reports**: [GitHub Issues](https://github.com/your-username/color-palette-generator/issues)
- **💬 Discussions**: [GitHub Discussions](https://github.com/your-username/color-palette-generator/discussions)
- **📧 Email**: [Create an issue](https://github.com/your-username/color-palette-generator/issues/new) for support

---

<div align="center">

**Made with ❤️ for designers and developers everywhere**

*"Color is a power which directly influences the soul."* - Wassily Kandinsky

⭐ **Star this repo if you found it helpful!** ⭐

</div>
