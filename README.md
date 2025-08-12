# 🎨 Color Palette Generator

A stunning, modern web application for generating beautiful color palettes with advanced harmony algorithms and professional design tools.

![Color Palette Generator](https://github.com/user-attachments/assets/0c56e5ca-9600-4bfb-af53-13f3a4a27ab1)

## ✨ Features

### 🎯 Core Functionality
- **5 Harmony Types**: Analogous, Complementary, Triadic, Monochromatic, and Random color schemes
- **Color Lock System**: Pin favorite colors while regenerating others
- **Multiple Color Formats**: Display colors in HEX, RGB, and HSL formats
- **One-Click Copy**: Copy any color value to clipboard instantly
- **Palette Management**: Save, load, and delete color palettes locally

### 🔧 Professional Tools
- **Export Options**: CSS Variables, SCSS Variables, JSON, and Adobe ASE formats
- **Accessibility Checker**: WCAG compliance testing with detailed contrast ratios
- **Visual Feedback**: Real-time notifications and smooth animations
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices

### 🎨 Modern UI/UX
- **Animated Gradient Background**: Dynamic, eye-catching color-shifting background
- **Glass Morphism Design**: Modern frosted glass effect with backdrop blur
- **Smooth Animations**: Fluid transitions and hover effects throughout
- **Professional Typography**: Clean, readable fonts with proper hierarchy
- **Interactive Elements**: Lock buttons, hover effects, and visual feedback

## 🚀 Quick Start

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- No installation required - runs directly in the browser!

### Usage
1. **Open the Application**
   ```bash
   # Clone the repository
   git clone https://github.com/abhinavramanan/Palette.git
   cd Palette
   
   # Open in browser (double-click index.html or use a local server)
   python -m http.server 8000  # Python 3
   # OR
   python -m SimpleHTTPServer 8000  # Python 2
   # OR
   npx serve .  # Node.js
   ```

2. **Generate Your First Palette**
   - Choose a harmony type from the dropdown
   - Click "✨ Generate New Palette"
   - Your beautiful color palette will appear instantly!

3. **Lock Colors You Love**
   - Click the 🔓 button on any color to lock it
   - Locked colors (🔒) will stay the same when generating new palettes
   - Perfect for finding the perfect complement to a favorite color

4. **Copy Colors**
   - Click on any color card to copy the HEX value
   - Click on RGB or HSL values to copy those formats
   - Get instant feedback with our notification system

5. **Save & Export**
   - Save palettes to local storage for later use
   - Export in multiple formats for your design workflow
   - Check accessibility compliance with our WCAG checker

## 📱 Screenshots

### Before & After UI Improvements

**Before:**
![Before UI Improvements](https://github.com/user-attachments/assets/40f360db-f9b1-4bb3-8b7d-3b4d40781739)

**After:**
![After UI Improvements](https://github.com/user-attachments/assets/0c56e5ca-9600-4bfb-af53-13f3a4a27ab1)

## 🛠 Technology Stack

### Frontend
- **HTML5**: Semantic markup and accessibility
- **CSS3**: Advanced animations, gradients, and modern layout
- **Vanilla JavaScript**: No frameworks - pure, fast performance
- **Local Storage**: Client-side data persistence

### Design Features
- **Glass Morphism**: Modern frosted glass effect
- **CSS Grid & Flexbox**: Responsive, flexible layouts
- **CSS Animations**: Smooth transitions and micro-interactions
- **Custom Properties**: CSS variables for maintainable styling

### Color Science
- **HSL Color Space**: Mathematically accurate color harmony
- **WCAG Guidelines**: Professional accessibility compliance
- **Color Theory**: Analogous, complementary, triadic algorithms

## 🎨 Color Harmony Types

### 🌅 Analogous
Colors that are adjacent on the color wheel, creating harmonious and pleasing combinations perfect for natural, calming designs.

### ⚡ Complementary
Colors opposite each other on the color wheel, providing high contrast and vibrant, energetic palettes ideal for bold designs.

### 🔺 Triadic
Three colors evenly spaced around the color wheel, offering vibrant combinations while maintaining harmony and balance.

### 🌙 Monochromatic
Various shades, tints, and tones of a single color, creating sophisticated and cohesive palettes perfect for minimalist designs.

### 🎲 Random
Completely random color generation for unexpected and creative combinations that can spark new design ideas.

## 📋 Export Formats

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
  "timestamp": "2024-01-15T10:30:45.123Z"
}
```

## ♿ Accessibility Features

- **WCAG Compliance**: Full accessibility checker with detailed contrast ratios
- **Keyboard Navigation**: Complete keyboard support for all interactions
- **Screen Reader Friendly**: Semantic HTML and proper ARIA labels
- **High Contrast Support**: All UI elements meet WCAG AA standards
- **Focus Management**: Clear focus indicators and logical tab order

### Contrast Ratio Standards
- **AAA (7:1)**: Excellent contrast for all text sizes
- **AA (4.5:1)**: Good contrast for normal text
- **AA Large (3:1)**: Acceptable for large text only
- **Fail (<3:1)**: Insufficient contrast

## 🌐 Browser Compatibility

| Browser | Version | Status |
|---------|---------|--------|
| Chrome  | 60+     | ✅ Full Support |
| Firefox | 55+     | ✅ Full Support |
| Safari  | 11+     | ✅ Full Support |
| Edge    | 79+     | ✅ Full Support |
| IE      | 11      | ⚠️ Limited Support |

## 🔧 Development

### Local Development
```bash
# Clone repository
git clone https://github.com/abhinavramanan/Palette.git
cd Palette

# Start local server
python -m http.server 8000

# Open in browser
open http://localhost:8000
```

### File Structure
```
Palette/
├── index.html          # Main HTML file
├── styles.css          # All styling and animations
├── script.js           # JavaScript functionality
└── README.md          # This file
```

### Key Components
- **ColorPaletteGenerator**: Main class handling all functionality
- **Color Harmony Algorithms**: Mathematical color generation
- **Local Storage Manager**: Palette persistence
- **Export System**: Multi-format color export
- **Accessibility Checker**: WCAG compliance testing

## 🤝 Contributing

We welcome contributions! Here's how you can help:

### Ways to Contribute
1. **Bug Reports**: Found a bug? Open an issue with details
2. **Feature Requests**: Have an idea? We'd love to hear it
3. **Code Contributions**: Submit a pull request
4. **Documentation**: Help improve our docs
5. **Design**: Suggest UI/UX improvements

### Development Guidelines
1. **Code Style**: Follow existing patterns and conventions
2. **Testing**: Test your changes across different browsers
3. **Documentation**: Update README for new features
4. **Accessibility**: Ensure all changes meet WCAG standards

### Pull Request Process
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request with detailed description

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

### MIT License Summary
- ✅ Commercial use
- ✅ Modification
- ✅ Distribution
- ✅ Private use
- ❌ Liability
- ❌ Warranty

## 🙏 Acknowledgments

- **Color Theory**: Based on traditional art and design principles
- **Accessibility**: WCAG 2.1 guidelines and best practices
- **Design Inspiration**: Modern glass morphism and minimalist design trends
- **Mathematical Algorithms**: Standard color harmony calculations

## 📞 Support

Need help? Have questions? Reach out!

- **Issues**: [GitHub Issues](https://github.com/abhinavramanan/Palette/issues)
- **Discussions**: [GitHub Discussions](https://github.com/abhinavramanan/Palette/discussions)
- **Email**: [Create an issue for support](https://github.com/abhinavramanan/Palette/issues/new)

---

**Made with ❤️ for designers and developers everywhere**

> "Color is a power which directly influences the soul." - Wassily Kandinsky