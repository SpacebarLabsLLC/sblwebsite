// Matrix rain effect
function createMatrix() {
    const matrix = document.getElementById('matrix');
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*()_+-=[]{}|;:,.<>?';
    
    for (let i = 0; i < 20; i++) {
        const drop = document.createElement('div');
        drop.style.position = 'absolute';
        drop.style.top = Math.random() * window.innerHeight + 'px';
        drop.style.left = Math.random() * window.innerWidth + 'px';
        drop.style.color = '#003300';
        drop.style.fontSize = '10px';
        drop.style.fontFamily = 'monospace';
        drop.textContent = chars[Math.floor(Math.random() * chars.length)];
        matrix.appendChild(drop);
        
        animateDrop(drop);
    }
}

function animateDrop(drop) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*()_+-=[]{}|;:,.<>?';
    
    setInterval(() => {
        drop.textContent = chars[Math.floor(Math.random() * chars.length)];
        drop.style.top = (parseInt(drop.style.top) + 20) + 'px';
        
        if (parseInt(drop.style.top) > window.innerHeight) {
            drop.style.top = '-20px';
            drop.style.left = Math.random() * window.innerWidth + 'px';
        }
    }, 200);
}

// Konami code easter egg
function initKonamiCode() {
    let konamiCode = [];
    const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];
    
    document.addEventListener('keydown', (e) => {
        konamiCode.push(e.code);
        if (konamiCode.length > konamiSequence.length) {
            konamiCode.shift();
        }
        
        if (JSON.stringify(konamiCode) === JSON.stringify(konamiSequence)) {
            document.body.style.filter = 'hue-rotate(180deg)';
            setTimeout(() => {
                document.body.style.filter = 'none';
            }, 3000);
        }
    });
}

// Glitch effect on logo click
function initLogoGlitch() {
    document.querySelector('.logo').addEventListener('click', () => {
        document.body.classList.add('glitch');
        setTimeout(() => {
            document.body.classList.remove('glitch');
        }, 1000);
    });
}

// Initialize all effects
function initEffects() {
    createMatrix();
    initKonamiCode();
    initLogoGlitch();
}

// Export for module use or call directly
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { initEffects, createMatrix, initKonamiCode, initLogoGlitch };
}