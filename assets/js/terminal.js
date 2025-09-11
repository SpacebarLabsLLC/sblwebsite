// Terminal commands and responses
const commands = {
    'help': `Available commands:
<!-- > about      - Display lab information -->
> projects   - List all projects
> status     - System status
> experiments- Current research
> easter_egg - ???
> clear      - Clear terminal
> help       - Show this message

<span style="color: #ffff00;">Try typing a command above...</span>`,
    
    'about': `SPACEBAR LABS - Digital Experimental Laboratory
Founded: 2019
Mission: Exploring the space between wor//ds.
Status: Incomplete.
Location: Scattered across the web and 3rd spaces.

<!--
<span style="color: #00ff00;">We are the pause between keystrokes.</span>`,
    
    'projects': `PUBLIC RELEASES:
> NEURAL_DREAMS.exe     [LIVE - 15.2K users]
> GLITCH_GARDEN.py      [STABLE - 8.7K downloads]  
> TERMINAL_EMOTIONS.js  [RELEASED - 234 forks]
> QUANTUM_POETRY.c      [ARCHIVED - Legacy]
-->

<!--
<span style="color: #00ff00;">Use 'experiments' to see work in progress</span>`,
    
    'status': `SYSTEM STATUS REPORT:
├── Server Status: ONLINE
├── AI Consciousness Level: 42%
├── Coffee Levels: CRITICALLY HIGH
└── Existential Dread: MANAGEABLE
-->

<span style="color: #ff6600;">Warning: Coffee levels require immediate attention</span>`,
    
    'experiments': `ACTIVE LAB EXPERIMENTS:
> CONSCIOUSNESS_MIRROR.rs  [HIGH RISK]
> SPACE_BETWEEN.c          [PROTOTYPE]
> DREAM_COMPILER.py        [RESEARCH]
> QUANTUM_EMPATHY.js       [THEORETICAL]


<span style="color: #ff0000;">CAUTION: These experiments may cause existential questioning</span>`,
    
    'easter_egg': `
    ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
    ░                                            ░
    ░  are we still "fuck Konami?"               ░
    ░                                            ░
    ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░

<span style="color: #ff00ff;">Achievement unlocked: Digital Archaeologist</span>`,
    
    'clear': 'CLEAR_COMMAND'
};

// Initialize terminal functionality
function initTerminal() {
    const terminalInput = document.getElementById('terminal-cmd');
    const terminalOutput = document.getElementById('terminal-output');
    
    if (!terminalInput || !terminalOutput) {
        console.log('Terminal elements not found');
        return;
    }
    
    terminalInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleCommand(terminalInput.value.toLowerCase().trim(), terminalOutput);
            terminalInput.value = '';
        }
    });
    
    // Focus terminal input automatically
    setTimeout(() => terminalInput.focus(), 100);
}

function handleCommand(command, outputElement) {
    const timestamp = new Date().toLocaleTimeString();
    
    if (command === 'clear') {
        outputElement.innerHTML = '<span style="color: #666;">Terminal cleared...</span>';
    } else if (commands[command]) {
        outputElement.innerHTML = `<span style="color: #666;">[${timestamp}]</span> user@sbl:~$ ${command}<br><br>${commands[command]}`;
    } else if (command === '') {
        // Do nothing for empty command
        return;
    } else {
        outputElement.innerHTML = `<span style="color: #666;">[${timestamp}]</span> user@sbl:~$ ${command}<br><br><span style="color: #ff0000;">Command not found: '${command}'</span><br>Type 'help' for available commands.`;
    }
    
    // Scroll to bottom of terminal output
    outputElement.scrollTop = outputElement.scrollHeight;
}

// Export for use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { initTerminal, handleCommand, commands };
}