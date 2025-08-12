class ColorPaletteGenerator {
    constructor() {
        this.currentPalette = [];
        this.savedPalettes = JSON.parse(localStorage.getItem('savedPalettes')) || [];
        this.init();
    }

    init() {
        this.bindEvents();
        this.generatePalette();
        this.renderSavedPalettes();
    }

    bindEvents() {
        document.getElementById('generateBtn').addEventListener('click', () => this.generatePalette());
        document.getElementById('savePaletteBtn').addEventListener('click', () => this.savePalette());
        document.getElementById('exportBtn').addEventListener('click', () => this.showExportModal());
        document.getElementById('accessibilityBtn').addEventListener('click', () => this.checkAccessibility());

        document.querySelectorAll('.close').forEach(close => {
            close.addEventListener('click', (e) => this.closeModal(e.target.closest('.modal')));
        });

        document.querySelectorAll('.export-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.exportPalette(e.target.dataset.format));
        });

        document.getElementById('copyExportBtn').addEventListener('click', () => this.copyToClipboard());

        window.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                this.closeModal(e.target);
            }
        });
    }

    generatePalette() {
        const harmonyType = document.getElementById('harmonyType').value;
        const baseHue = Math.floor(Math.random() * 360);

        switch (harmonyType) {
            case 'analogous':
                this.currentPalette = this.generateAnalogous(baseHue);
                break;
            case 'complementary':
                this.currentPalette = this.generateComplementary(baseHue);
                break;
            case 'triadic':
                this.currentPalette = this.generateTriadic(baseHue);
                break;
            case 'monochromatic':
                this.currentPalette = this.generateMonochromatic(baseHue);
                break;
            default:
                this.currentPalette = this.generateRandom();
        }

        this.renderPalette();
    }

    generateAnalogous(baseHue) {
        const colors = [];
        for (let i = 0; i < 5; i++) {
            const hue = (baseHue + (i * 30)) % 360;
            const saturation = 60 + Math.random() * 40;
            const lightness = 40 + Math.random() * 40;
            colors.push(this.hslToHex(hue, saturation, lightness));
        }
        return colors;
    }

    generateComplementary(baseHue) {
        const colors = [];
        const complementHue = (baseHue + 180) % 360;

        for (let i = 0; i < 3; i++) {
            const saturation = 50 + Math.random() * 50;
            const lightness = 30 + Math.random() * 50;
            colors.push(this.hslToHex(baseHue, saturation, lightness));
        }

        for (let i = 0; i < 2; i++) {
            const saturation = 50 + Math.random() * 50;
            const lightness = 30 + Math.random() * 50;
            colors.push(this.hslToHex(complementHue, saturation, lightness));
        }

        return colors;
    }

    generateTriadic(baseHue) {
        const colors = [];
        const hues = [baseHue, (baseHue + 120) % 360, (baseHue + 240) % 360];

        hues.forEach(hue => {
            const saturation = 60 + Math.random() * 40;
            const lightness = 40 + Math.random() * 40;
            colors.push(this.hslToHex(hue, saturation, lightness));
        });

        for (let i = 0; i < 2; i++) {
            const hue = hues[Math.floor(Math.random() * hues.length)];
            const saturation = 30 + Math.random() * 70;
            const lightness = 20 + Math.random() * 60;
            colors.push(this.hslToHex(hue, saturation, lightness));
        }

        return colors;
    }

    generateMonochromatic(baseHue) {
        const colors = [];
        for (let i = 0; i < 5; i++) {
            const saturation = 40 + Math.random() * 60;
            const lightness = 20 + (i * 15) + Math.random() * 10;
            colors.push(this.hslToHex(baseHue, saturation, lightness));
        }
        return colors;
    }

    generateRandom() {
        const colors = [];
        for (let i = 0; i < 5; i++) {
            const hue = Math.floor(Math.random() * 360);
            const saturation = 40 + Math.random() * 60;
            const lightness = 30 + Math.random() * 50;
            colors.push(this.hslToHex(hue, saturation, lightness));
        }
        return colors;
    }

    hslToHex(h, s, l) {
        l /= 100;
        const a = s * Math.min(l, 1 - l) / 100;
        const f = n => {
            const k = (n + h / 30) % 12;
            const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
            return Math.round(255 * color).toString(16).padStart(2, '0');
        };
        return `#${f(0)}${f(8)}${f(4)}`;
    }

    hexToRgb(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }

    hexToHsl(hex) {
        const rgb = this.hexToRgb(hex);
        if (!rgb) return null;

        const r = rgb.r / 255;
        const g = rgb.g / 255;
        const b = rgb.b / 255;

        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        let h, s, l = (max + min) / 2;

        if (max === min) {
            h = s = 0;
        } else {
            const d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max) {
                case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                case g: h = (b - r) / d + 2; break;
                case b: h = (r - g) / d + 4; break;
            }
            h /= 6;
        }

        return {
            h: Math.round(h * 360),
            s: Math.round(s * 100),
            l: Math.round(l * 100)
        };
    }

    renderPalette() {
        const container = document.getElementById('paletteContainer');
        container.innerHTML = '';

        this.currentPalette.forEach((color, index) => {
            const colorCard = this.createColorCard(color, index);
            container.appendChild(colorCard);
        });
    }

    createColorCard(color, index) {
        const card = document.createElement('div');
        card.className = 'color-card';

        const rgb = this.hexToRgb(color);
        const hsl = this.hexToHsl(color);

        card.innerHTML = `
            <div class="color-display" style="background-color: ${color}" onclick="copyToClipboard('${color}')"></div>
            <div class="color-info">
                <div class="color-value">${color.toUpperCase()}</div>
                <div class="color-formats">
                    <div class="format-row">
                        <span class="format-label">RGB:</span>
                        <span class="format-value" onclick="copyToClipboard('rgb(${rgb.r}, ${rgb.g}, ${rgb.b})')">rgb(${rgb.r}, ${rgb.g}, ${rgb.b})</span>
                    </div>
                    <div class="format-row">
                        <span class="format-label">HSL:</span>
                        <span class="format-value" onclick="copyToClipboard('hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)')">hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)</span>
                    </div>
                </div>
            </div>
        `;

        return card;
    }

    savePalette() {
        if (this.currentPalette.length === 0) return;

        const palette = {
            id: Date.now(),
            colors: [...this.currentPalette],
            timestamp: new Date().toISOString()
        };

        this.savedPalettes.unshift(palette);
        localStorage.setItem('savedPalettes', JSON.stringify(this.savedPalettes));
        this.renderSavedPalettes();
        this.showNotification('Palette saved successfully!');
    }

    renderSavedPalettes() {
        const container = document.getElementById('savedPalettesContainer');
        container.innerHTML = '';

        if (this.savedPalettes.length === 0) {
            container.innerHTML = '<p>No saved palettes yet. Generate and save some palettes!</p>';
            return;
        }

        this.savedPalettes.forEach(palette => {
            const paletteElement = document.createElement('div');
            paletteElement.className = 'saved-palette';

            const colorsHtml = palette.colors.map(color =>
                `<div class="saved-color" style="background-color: ${color}" onclick="copyToClipboard('${color}')" title="${color}"></div>`
            ).join('');

            paletteElement.innerHTML = `
                <div class="saved-colors">${colorsHtml}</div>
                <div class="saved-actions">
                    <button class="btn secondary" onclick="paletteGenerator.loadPalette(${palette.id})">Load</button>
                    <button class="btn secondary" onclick="paletteGenerator.deletePalette(${palette.id})">Delete</button>
                </div>
            `;

            container.appendChild(paletteElement);
        });
    }

    loadPalette(id) {
        const palette = this.savedPalettes.find(p => p.id === id);
        if (palette) {
            this.currentPalette = [...palette.colors];
            this.renderPalette();
            this.showNotification('Palette loaded successfully!');
        }
    }

    deletePalette(id) {
        this.savedPalettes = this.savedPalettes.filter(p => p.id !== id);
        localStorage.setItem('savedPalettes', JSON.stringify(this.savedPalettes));
        this.renderSavedPalettes();
        this.showNotification('Palette deleted successfully!');
    }

    showExportModal() {
        if (this.currentPalette.length === 0) {
            this.showNotification('Generate a palette first!');
            return;
        }
        document.getElementById('exportModal').style.display = 'block';
    }

    exportPalette(format) {
        const output = document.getElementById('exportOutput');

        switch (format) {
            case 'css':
                output.value = this.exportCSS();
                break;
            case 'scss':
                output.value = this.exportSCSS();
                break;
            case 'json':
                output.value = this.exportJSON();
                break;
            case 'adobe':
                output.value = this.exportAdobe();
                break;
        }
    }

    exportCSS() {
        let css = ':root {\n';
        this.currentPalette.forEach((color, index) => {
            css += `  --color-${index + 1}: ${color};\n`;
        });
        css += '}';
        return css;
    }

    exportSCSS() {
        let scss = '';
        this.currentPalette.forEach((color, index) => {
            scss += `$color-${index + 1}: ${color};\n`;
        });
        return scss;
    }

    exportJSON() {
        return JSON.stringify({
            palette: this.currentPalette,
            timestamp: new Date().toISOString()
        }, null, 2);
    }

    exportAdobe() {
        let ase = 'Adobe Swatch Exchange Format\n';
        ase += 'Colors:\n';
        this.currentPalette.forEach((color, index) => {
            const rgb = this.hexToRgb(color);
            ase += `Color ${index + 1}: RGB(${rgb.r}, ${rgb.g}, ${rgb.b}) - ${color}\n`;
        });
        return ase;
    }

    copyToClipboard() {
        const output = document.getElementById('exportOutput');
        output.select();
        document.execCommand('copy');
        this.showNotification('Copied to clipboard!');
    }

    checkAccessibility() {
        if (this.currentPalette.length === 0) {
            this.showNotification('Generate a palette first!');
            return;
        }

        const results = document.getElementById('accessibilityResults');
        results.innerHTML = '';

        for (let i = 0; i < this.currentPalette.length; i++) {
            for (let j = i + 1; j < this.currentPalette.length; j++) {
                const contrast = this.calculateContrast(this.currentPalette[i], this.currentPalette[j]);
                const result = this.getContrastResult(this.currentPalette[i], this.currentPalette[j], contrast);
                results.appendChild(result);
            }
        }

        document.getElementById('accessibilityModal').style.display = 'block';
    }

    calculateContrast(color1, color2) {
        const rgb1 = this.hexToRgb(color1);
        const rgb2 = this.hexToRgb(color2);

        const l1 = this.getLuminance(rgb1);
        const l2 = this.getLuminance(rgb2);

        const lighter = Math.max(l1, l2);
        const darker = Math.min(l1, l2);

        return (lighter + 0.05) / (darker + 0.05);
    }

    getLuminance(rgb) {
        const rsRGB = rgb.r / 255;
        const gsRGB = rgb.g / 255;
        const bsRGB = rgb.b / 255;

        const r = rsRGB <= 0.03928 ? rsRGB / 12.92 : Math.pow((rsRGB + 0.055) / 1.055, 2.4);
        const g = gsRGB <= 0.03928 ? gsRGB / 12.92 : Math.pow((gsRGB + 0.055) / 1.055, 2.4);
        const b = bsRGB <= 0.03928 ? bsRGB / 12.92 : Math.pow((bsRGB + 0.055) / 1.055, 2.4);

        return 0.2126 * r + 0.7152 * g + 0.0722 * b;
    }

    getContrastResult(color1, color2, contrast) {
        const result = document.createElement('div');
        const ratio = contrast.toFixed(2);

        let className = 'accessibility-result ';
        let status = '';
        let description = '';

        if (contrast >= 7) {
            className += 'pass';
            status = 'AAA ✓';
            description = 'Excellent contrast for all text sizes';
        } else if (contrast >= 4.5) {
            className += 'pass';
            status = 'AA ✓';
            description = 'Good contrast for normal text';
        } else if (contrast >= 3) {
            className += 'warning';
            status = 'AA Large ⚠';
            description = 'Acceptable for large text only';
        } else {
            className += 'fail';
            status = 'Fail ✗';
            description = 'Insufficient contrast';
        }

        result.className = className;
        result.innerHTML = `
            <div style="display: flex; align-items: center; gap: 10px;">
                <div style="width: 20px; height: 20px; background-color: ${color1}; border: 1px solid #ccc;"></div>
                <div style="width: 20px; height: 20px; background-color: ${color2}; border: 1px solid #ccc;"></div>
                <span><strong>${ratio}:1</strong> - ${status}</span>
            </div>
            <div style="margin-top: 5px; font-size: 0.9rem; color: #666;">${description}</div>
        `;

        return result;
    }

    closeModal(modal) {
        modal.style.display = 'none';
    }

    showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'copied-notification';
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            document.body.removeChild(notification);
        }, 3000);
    }
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        paletteGenerator.showNotification(`Copied ${text} to clipboard!`);
    });
}

const paletteGenerator = new ColorPaletteGenerator();