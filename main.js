// Main initialization script
document.addEventListener('DOMContentLoaded', function() {
    console.log('Spacebar Labs - Initializing systems...');
    
    // Initialize all components
    try {
        // Initialize visual effects
        if (typeof initEffects === 'function') {
            initEffects();
            console.log('✓ Effects initialized');
        }
        
        // Initialize navigation
        if (typeof initNavigation === 'function') {
            initNavigation();
            console.log('✓ Navigation initialized');
        }
        
        // Initialize terminal (will be called when terminal section loads)
        console.log('✓ Terminal ready for initialization');
        
    } catch (error) {
        console.error('Error during initialization:', error);
    }
    
    console.log('✓ Spacebar Labs systems online');
});

// Utility functions
function debugInfo() {
    console.log('=== SPACEBAR LABS DEBUG INFO ===');
    console.log('Current section:', document.querySelector('.nav-item.active')?.dataset.section || 'unknown');
    console.log('Terminal available:', !!document.getElementById('terminal-cmd'));
    console.log('Matrix elements:', document.querySelectorAll('#matrix div').length);
    console.log('================================');
}

// Make debugInfo available globally for development
window.debugInfo = debugInfo;

// Handle terminal section navigation
document.addEventListener('click', function(e) {
    if (e.target.matches('[data-section="terminal"]')) {
        // Terminal section clicked, initialize terminal after content loads
        setTimeout(() => {
            if (typeof initTerminal === 'function') {
                initTerminal();
            }
        }, 150);
    }
});

// Global error handler
window.addEventListener('error', function(e) {
    console.error('Spacebar Labs Error:', e.error);
});

// Console welcome message
console.log(`
    ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
    ░                                            ░
    ░  SPACEBAR LABS - DEVELOPMENT CONSOLE      ░
    ░                                            ░
    ░  Type debugInfo() for system status       ░
    ░                                            ░
    ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
`);