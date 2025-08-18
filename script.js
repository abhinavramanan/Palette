class ColorPaletteGenerator {
    constructor() {
        this.currentPalette = [];
        this.lockedColors = []; // Array to track locked colors
        this.savedPalettes = JSON.parse(localStorage.getItem('savedPalettes')) || [];
        this.generationCount = parseInt(localStorage.getItem('generationCount')) || 0;
        this.init();
    }

    init() {
        this.bindEvents();
        this.generatePalette();
        this.renderSavedPalettes();
        this.updateGenerationCounter();
        this.initFAB();
    }

    bindEvents() {
        document.getElementById('generateBtn').addEventListener('click', () => this.generatePalette());
        document.getElementById('savePaletteBtn').addEventListener('click', () => this.savePalette());
        document.getElementById('exportBtn').addEventListener('click', () => this.showExportModal());
        document.getElementById('accessibilityBtn').addEventListener('click', () => this.checkAccessibility());

        // Clear all button
        const clearAllBtn = document.getElementById('clearAllBtn');
        if (clearAllBtn) {
            clearAllBtn.addEventListener('click', () => this.clearAllPalettes());
        }

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

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.key === ' ' && !e.target.matches('input, textarea, select')) {
                e.preventDefault();
                this.generatePalette();
            }
            if (e.ctrlKey || e.metaKey) {
                if (e.key === 's') {
                    e.preventDefault();
                    this.savePalette();
                }
                if (e.key === 'e') {
                    e.preventDefault();
                    this.showExportModal();
                }
            }
        });
    }

    generatePalette() {
        this.showLoading();

        // Simulate generation delay for better UX
        setTimeout(() => {
            const harmonyType = document.getElementById('harmonyType').value;
            const baseHue = Math.floor(Math.random() * 360);

            let newPalette;
            switch (harmonyType) {
                case 'analogous':
                    newPalette = this.generateAnalogous(baseHue);
                    break;
                case 'complementary':
                    newPalette = this.generateComplementary(baseHue);
                    break;
                case 'triadic':
                    newPalette = this.generateTriadic(baseHue);
                    break;
                case 'monochromatic':
                    newPalette = this.generateMonochromatic(baseHue);
                    break;
                default:
                    newPalette = this.generateRandom();
            }

            // Preserve locked colors
            for (let i = 0; i < newPalette.length; i++) {
                if (this.lockedColors[i]) {
                    newPalette[i] = this.currentPalette[i];
                }
            }

            this.currentPalette = newPalette;
            this.generationCount++;
            this.updateGenerationCounter();
            localStorage.setItem('generationCount', this.generationCount.toString());

            this.hideLoading();
            this.renderPalette();
            this.showToast('✨ New palette generated!', 'success');
        }, 300);
    }

    showLoading() {
        const loadingIndicator = document.getElementById('loadingIndicator');
        const paletteContainer = document.getElementById('paletteContainer');
        loadingIndicator.style.display = 'flex';
        paletteContainer.style.opacity = '0.3';
    }

    hideLoading() {
        const loadingIndicator = document.getElementById('loadingIndicator');
        const paletteContainer = document.getElementById('paletteContainer');
        loadingIndicator.style.display = 'none';
        paletteContainer.style.opacity = '1';
    }

    updateGenerationCounter() {
        const counter = document.getElementById('generationCount');
        if (counter) {
            counter.textContent = this.generationCount;
        }
    }

    initFAB() {
        const fabItems = document.querySelectorAll('.fab-item');
        fabItems.forEach(item => {
            item.addEventListener('click', () => {
                const action = item.dataset.action;
                switch (action) {
                    case 'random-color':
                        this.replaceRandomColor();
                        break;
                    case 'copy-all':
                        this.copyAllColors();
                        break;
                    case 'reset-locks':
                        this.resetAllLocks();
                        break;
                }
            });
        });
    }

    replaceRandomColor() {
        if (this.currentPalette.length === 0) return;

        const unlockedIndices = this.currentPalette
            .map((_, index) => this.lockedColors[index] ? null : index)
            .filter(index => index !== null);

        if (unlockedIndices.length === 0) {
            this.showToast('🔒 All colors are locked!', 'warning');
            return;
        }

        const randomIndex = unlockedIndices[Math.floor(Math.random() * unlockedIndices.length)];
        const hue = Math.floor(Math.random() * 360);
        const saturation = 50 + Math.random() * 50;
        const lightness = 30 + Math.random() * 50;

        this.currentPalette[randomIndex] = this.hslToHex(hue, saturation, lightness);
        this.renderPalette();
        this.showToast('🎲 Random color added!', 'success');
    }

    copyAllColors() {
        if (this.currentPalette.length === 0) {
            this.showToast('❌ No palette to copy!', 'error');
            return;
        }

        const colorString = this.currentPalette.join(', ');
        navigator.clipboard.writeText(colorString).then(() => {
            this.showToast('📋 All colors copied!', 'success');
        });
    }

    resetAllLocks() {
        this.lockedColors = new Array(this.currentPalette.length).fill(false);
        this.renderPalette();
        this.showToast('🔓 All colors unlocked!', 'success');
    }

    clearAllPalettes() {
        if (this.savedPalettes.length === 0) {
            this.showToast('❌ No palettes to clear!', 'warning');
            return;
        }

        if (confirm('Are you sure you want to delete all saved palettes? This action cannot be undone.')) {
            this.savedPalettes = [];
            localStorage.setItem('savedPalettes', JSON.stringify(this.savedPalettes));
            this.renderSavedPalettes();
            this.showToast('🗑️ All palettes cleared!', 'success');
        }
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

            // Stagger the animation
            setTimeout(() => {
                colorCard.style.opacity = '1';
                colorCard.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }

    createColorCard(color, index) {
        const card = document.createElement('div');
        card.className = 'color-card';
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';

        const rgb = this.hexToRgb(color);
        const hsl = this.hexToHsl(color);
        const isLocked = this.lockedColors[index];

        card.innerHTML = `
            <div class="color-display" style="background-color: ${color}" onclick="copyToClipboard('${color}')">
                <button class="lock-btn ${isLocked ? 'locked' : ''}" onclick="paletteGenerator.toggleLock(${index})" title="${isLocked ? 'Unlock color' : 'Lock color'}">
                    ${isLocked ? '🔒' : '🔓'}
                </button>
            </div>
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
        if (this.currentPalette.length === 0) {
            this.showToast('❌ No palette to save!', 'error');
            return;
        }

        const palette = {
            id: Date.now(),
            colors: [...this.currentPalette],
            timestamp: new Date().toISOString(),
            harmonyType: document.getElementById('harmonyType').value
        };

        this.savedPalettes.unshift(palette);
        localStorage.setItem('savedPalettes', JSON.stringify(this.savedPalettes));
        this.renderSavedPalettes();
        this.showToast('💾 Palette saved successfully!', 'success');
    }

    renderSavedPalettes() {
        const container = document.getElementById('savedPalettesContainer');

        if (this.savedPalettes.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <div class="empty-icon">🎨</div>
                    <h3>No saved palettes yet</h3>
                    <p>Generate and save some beautiful palettes to see them here!</p>
                </div>
            `;
            return;
        }

        container.innerHTML = '';
        this.savedPalettes.forEach((palette, index) => {
            const paletteElement = document.createElement('div');
            paletteElement.className = 'saved-palette';
            paletteElement.style.opacity = '0';
            paletteElement.style.transform = 'translateY(20px)';
            paletteElement.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';

            const colorsHtml = palette.colors.map(color =>
                `<div class="saved-color" style="background-color: ${color}" onclick="copyToClipboard('${color}')" title="${color}"></div>`
            ).join('');

            const date = new Date(palette.timestamp).toLocaleDateString();

            paletteElement.innerHTML = `
                <div class="saved-info">
                    <div class="saved-colors">${colorsHtml}</div>
                    <div class="saved-meta">
                        <small class="saved-date">${date}</small>
                        <small class="saved-type">${palette.harmonyType || 'Custom'}</small>
                    </div>
                </div>
                <div class="saved-actions">
                    <button class="btn secondary" onclick="paletteGenerator.loadPalette(${palette.id})">
                        <span class="btn-icon">📥</span>
                        <span class="btn-text">Load</span>
                    </button>
                    <button class="btn secondary" onclick="paletteGenerator.deletePalette(${palette.id})">
                        <span class="btn-icon">🗑️</span>
                        <span class="btn-text">Delete</span>
                    </button>
                </div>
            `;

            container.appendChild(paletteElement);

            // Stagger animation
            setTimeout(() => {
                paletteElement.style.opacity = '1';
                paletteElement.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }

    loadPalette(id) {
        const palette = this.savedPalettes.find(p => p.id === id);
        if (palette) {
            this.currentPalette = [...palette.colors];
            this.lockedColors = new Array(this.currentPalette.length).fill(false);

            // Update harmony type if available
            if (palette.harmonyType) {
                document.getElementById('harmonyType').value = palette.harmonyType;
            }

            this.renderPalette();
            this.showToast('📥 Palette loaded successfully!', 'success');
        }
    }

    toggleLock(index) {
        this.lockedColors[index] = !this.lockedColors[index];
        this.renderPalette();
        this.showToast(this.lockedColors[index] ?
            `🔒 Color ${index + 1} locked!` :
            `🔓 Color ${index + 1} unlocked!`, 'success');
    }

    deletePalette(id) {
        if (confirm('Are you sure you want to delete this palette?')) {
            this.savedPalettes = this.savedPalettes.filter(p => p.id !== id);
            localStorage.setItem('savedPalettes', JSON.stringify(this.savedPalettes));
            this.renderSavedPalettes();
            this.showToast('🗑️ Palette deleted successfully!', 'success');
        }
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

    showExportModal() {
        if (this.currentPalette.length === 0) {
            this.showToast('❌ Generate a palette first!', 'error');
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
            harmonyType: document.getElementById('harmonyType').value,
            timestamp: new Date().toISOString(),
            generationCount: this.generationCount
        }, null, 2);
    }

    exportAdobe() {
        let ase = 'Adobe Swatch Exchange Format\n';
        ase += `Generated: ${new Date().toLocaleString()}\n`;
        ase += `Harmony Type: ${document.getElementById('harmonyType').value}\n\n`;
        ase += 'Colors:\n';
        this.currentPalette.forEach((color, index) => {
            const rgb = this.hexToRgb(color);
            ase += `Color ${index + 1}: RGB(${rgb.r}, ${rgb.g}, ${rgb.b}) - ${color}\n`;
        });
        return ase;
    }

    copyToClipboard() {
        const output = document.getElementById('exportOutput');
        if (!output.value) {
            this.showToast('❌ Nothing to copy! Select an export format first.', 'error');
            return;
        }

        output.select();
        navigator.clipboard.writeText(output.value).then(() => {
            this.showToast('📋 Export data copied to clipboard!', 'success');
        }).catch(() => {
            // Fallback
            document.execCommand('copy');
            this.showToast('📋 Export data copied to clipboard!', 'success');
        });
    }

    checkAccessibility() {
        if (this.currentPalette.length === 0) {
            this.showToast('❌ Generate a palette first!', 'error');
            return;
        }

        const results = document.getElementById('accessibilityResults');
        results.innerHTML = '';

        let passCount = 0, warningCount = 0, failCount = 0;

        for (let i = 0; i < this.currentPalette.length; i++) {
            for (let j = i + 1; j < this.currentPalette.length; j++) {
                const contrast = this.calculateContrast(this.currentPalette[i], this.currentPalette[j]);
                const result = this.getContrastResult(this.currentPalette[i], this.currentPalette[j], contrast);
                results.appendChild(result);

                if (contrast >= 4.5) passCount++;
                else if (contrast >= 3) warningCount++;
                else failCount++;
            }
        }

        // Update summary
        document.getElementById('passCount').textContent = passCount;
        document.getElementById('warningCount').textContent = warningCount;
        document.getElementById('failCount').textContent = failCount;

        document.getElementById('accessibilityModal').style.display = 'block';
        this.showToast('♿ Accessibility check completed!', 'info');
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

    showToast(message, type = 'info') {
        const container = document.getElementById('toastContainer');
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;

        const icons = {
            success: '✅',
            error: '❌',
            warning: '⚠️',
            info: 'ℹ️'
        };

        toast.innerHTML = `
            <span class="toast-icon">${icons[type] || icons.info}</span>
            <span class="toast-message">${message}</span>
            <button class="toast-close" onclick="this.parentElement.remove()">×</button>
        `;

        container.appendChild(toast);

        // Auto remove after 4 seconds
        setTimeout(() => {
            if (toast.parentElement) {
                toast.style.animation = 'toastSlideOut 0.3s ease forwards';
                setTimeout(() => toast.remove(), 300);
            }
        }, 4000);
    }
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        paletteGenerator.showToast(`📋 Copied ${text}!`, 'success');
    }).catch(() => {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        paletteGenerator.showToast(`📋 Copied ${text}!`, 'success');
    });
}

const paletteGenerator = new ColorPaletteGenerator();
