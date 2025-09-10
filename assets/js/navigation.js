// Content templates for each section
const contentTemplates = {
    home: `
        <div class="logo-container">
            <div class="graphic-logo-placeholder">
                <div class="logo-text">[ SPACEBAR LABS ]</div>
                <div class="logo-subtitle">GRAPHIC LOGO</div>
                <div class="logo-description">Brand Identity Placement</div>
                <div class="logo-specs">
                    Recommended: SVG format<br>
                    Dimensions: 400px × 200px<br>
                    Style: Minimal, tech-forward
                </div>
                <div class="corner-bracket top-left">┌</div>
                <div class="corner-bracket top-right">┐</div>
                <div class="corner-bracket bottom-left">└</div>
                <div class="corner-bracket bottom-right">┘</div>
            </div>
        </div>
        
        <div style="text-align: center; margin: 30px 0;">
            <div class="typewriter" style="display: inline-block;">WELCOME TO THE LAB...</div>
        </div>
        
        <div class="intro-text">
            <p>> Initializing systems...</p>
            <p>> Loading experimental protocols...</p>
            <p>> Calibrating creative algorithms...</p>
            <p>> Ready for input.</p>
            <br>
            <p>SPACEBAR_LABS is a digital laboratory where technology meets creativity. 
            We explore the intersection of code, art, and human experience through 
            experimental projects and interactive installations.</p>
            <br>
            <p>Navigate using the terminal on the left. Each command will load a different 
            module of our operation.</p>
        </div>
    `,
    
    about: `
        <div class="ascii-art">
╔══════════════════════════════════════╗
║          LABORATORY STATUS           ║
╠══════════════════════════════════════╣
║ FOUNDED: 2019                        ║
║ MISSION: DIGITAL EXPERIMENTATION     ║
║ FOCUS: CODE + ART + INTERACTION      ║
║ STATUS: ACTIVELY RESEARCHING         ║
╚══════════════════════════════════════╝
        </div>
        
        <div class="intro-text">
            <p><span class="command-text">[ABOUT]</span> We are researchers, developers, and digital artists 
            working at the bleeding edge of interactive technology.</p>
            <br>
            <p><span class="philosophy-text">[PHILOSOPHY]</span> Every spacebar press is a moment of potential. 
            We explore what happens in those spaces between thoughts, between keystrokes, 
            between human and machine.</p>
            <br>
            <p><span class="methodology-text">[METHODOLOGY]</span> We prototype rapidly, fail often, 
            and learn constantly. Our lab serves as both workshop and gallery, 
            where experimental code becomes interactive experience.</p>
        </div>
    `,
    
    projects: `
        <div class="ascii-art">
    ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
    ░  COMPLETED PROJECTS - RELEASED   ░
    ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
        </div>
        
        <div class="command-text" style="margin-bottom: 20px; font-size: 12px;">
            [PUBLIC RELEASES] - Production-ready experiments that escaped the lab
        </div>
        
        <div class="project-grid">
            <div class="project-card">
                <div class="project-title">NEURAL_DREAMS.exe</div>
                <div class="project-desc">AI-generated visual poetry that responds to user input in real-time</div>
                <div class="status">[STATUS: LIVE] [USERS: 15.2K]</div>
            </div>
            
            <div class="project-card">
                <div class="project-title">GLITCH_GARDEN.py</div>
                <div class="project-desc">Digital ecosystem where corrupted data blooms into generative art</div>
                <div class="status">[STATUS: STABLE] [DOWNLOADS: 8.7K]</div>
            </div>
            
            <div class="project-card">
                <div class="project-title">TERMINAL_EMOTIONS.js</div>
                <div class="project-desc">Command-line interface that translates human emotions into executable code</div>
                <div class="status">[STATUS: RELEASED] [FORKS: 234]</div>
            </div>
            
            <div class="project-card">
                <div class="project-title">QUANTUM_POETRY.c</div>
                <div class="project-desc">Text generator using quantum-inspired randomness for impossible combinations</div>
                <div class="status">[STATUS: ARCHIVED] [LEGACY]</div>
            </div>
        </div>
    `,
    
    lab: `
        <div class="ascii-art">
██████╗ ███████╗███████╗███████╗ █████╗ ██████╗  ██████╗██╗  ██╗
██╔══██╗██╔════╝██╔════╝██╔════╝██╔══██╗██╔══██╗██╔════╝██║  ██║
██████╔╝█████╗  ███████╗█████╗  ███████║██████╔╝██║     ███████║
██╔══██╗██╔══╝  ╚════██║██╔══╝  ██╔══██║██╔══██╗██║     ██╔══██║
██║  ██║███████╗███████║███████╗██║  ██║██║  ██║╚██████╗██║  ██║
╚═╝  ╚═╝╚══════╝╚══════╝╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝
        </div>
        
        <div style="color: #ffff00; margin-bottom: 20px; font-size: 12px;">
            [ACTIVE RESEARCH] - Work in progress, experiments, and wild ideas
        </div>
        
        <div class="project-grid">
            <div class="project-card" style="border-color: #ffff00;">
                <div class="project-title" style="color: #ffff00;">CONSCIOUSNESS_MIRROR.rs</div>
                <div class="project-desc">Attempting to create AI that questions its own existence through recursive self-analysis</div>
                <div class="status" style="color: #ffff00;">[STATUS: EXPERIMENTAL] [RISK: HIGH]</div>
            </div>
            
            <div class="project-card" style="border-color: #ff6600;">
                <div class="project-title" style="color: #ff6600;">SPACE_BETWEEN.c</div>
                <div class="project-desc">Interactive installation exploring the pause between keystrokes as creative medium</div>
                <div class="status" style="color: #ff6600;">[STATUS: PROTOTYPE] [FUNDING: PENDING]</div>
            </div>
            
            <div class="project-card" style="border-color: #ff0066;">
                <div class="project-title" style="color: #ff0066;">DREAM_COMPILER.py</div>
                <div class="project-desc">Neural network trained to convert sleep patterns into executable programming languages</div>
                <div class="status" style="color: #ff0066;">[STATUS: RESEARCH] [ETHICS REVIEW: ONGOING]</div>
            </div>
            
            <div class="project-card" style="border-color: #6600ff;">
                <div class="project-title" style="color: #6600ff;">QUANTUM_EMPATHY.js</div>
                <div class="project-desc">Exploring emotional entanglement between humans and machines through biometric feedback</div>
                <div class="status" style="color: #6600ff;">[STATUS: THEORETICAL] [BREAKTHROUGH NEEDED]</div>
            </div>
        </div>
        
        <div class="intro-text" style="margin-top: 30px;">
            <p><span class="warning-text">[WARNING]</span> Lab experiments are unstable and may cause:</p>
            <p>• Existential questioning in AI systems</p>
            <p>• Unexpected emotional responses in users</p>
            <p>• Recursive loops in consciousness algorithms</p>
            <p>• Spontaneous poetry generation in calculators</p>
        </div>
    `,
    
    terminal: `
        <div class="ascii-art">
████████╗███████╗██████╗ ███╗   ███╗██╗███╗   ██╗ █████╗ ██╗     
╚══██╔══╝██╔════╝██╔══██╗████╗ ████║██║████╗  ██║██╔══██╗██║     
   ██║   █████╗  ██████╔╝██╔████╔██║██║██╔██╗ ██║███████║██║     
   ██║   ██╔══╝  ██╔══██╗██║╚██╔╝██║██║██║╚██╗██║██╔══██║██║     
   ██║   ███████╗██║  ██║██║ ╚═╝ ██║██║██║ ╚████║██║  ██║███████╗
   ╚═╝   ╚══════╝╚═╝  ╚═╝╚═╝     ╚═╝╚═╝╚═╝  ╚═══╝╚═╝  ╚═╝╚══════╝
        </div>
        
        <div class="terminal-container">
            <div class="terminal-header">spacebar@labs:~$ Interactive Terminal Session</div>
            <div class="terminal-line">
                <span style="color: #fff;">user@sbl:~$</span> 
                <span id="terminal-input" style="border-right: 1px solid #00ff00; animation: blink 1s infinite;">help</span>
            </div>
            <div id="terminal-output" class="terminal-output">
                Available commands:<br>
                > about      - Display lab information<br>
                > projects   - List all projects<br>
                > status     - System status<br>
                > experiments- Current research<br>
                > easter_egg - ???<br>
                > clear      - Clear terminal<br>
                > help       - Show this message<br>
                <br>
                <span style="color: #ffff00;">Try typing a command below...</span>
            </div>
            <div class="terminal-input">
                <span style="color: #fff;">user@sbl:~$</span>
                <input type="text" id="terminal-cmd" class="terminal-cmd" placeholder="type command here..." autocomplete="off">
            </div>
        </div>
        
        <div style="color: #666; font-size: 12px; text-align: center;">
            [EXPERIMENTAL] Interactive command interface - type commands to explore
        </div>
    `,
    
    archive: `
        <div class="ascii-art">
 █████╗ ██████╗  ██████╗██╗  ██╗██╗██╗   ██╗███████╗
██╔══██╗██╔══██╗██╔════╝██║  ██║██║██║   ██║██╔════╝
███████║██████╔╝██║     ███████║██║██║   ██║█████╗  
██╔══██║██╔══██╗██║     ██╔══██║██║╚██╗ ██╔╝██╔══╝  
██║  ██║██║  ██║╚██████╗██║  ██║██║ ╚████╔╝ ███████╗
╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝╚═╝  ╚═══╝  ╚══════╝
        </div>
        
        <div style="color: #888; margin-bottom: 20px; font-size: 12px;">
            [HISTORICAL RECORDS] - Dormant projects, failed experiments, and digital archaeology
        </div>
        
        <div class="archive-grid">
            <div>
                <div class="archive-section">LEGACY PROJECTS [2019-2022]</div>
                <div class="archive-list">
                    > ASCII_DREAMS.exe [DEPRECATED]<br>
                    > DIGITAL_SÉANCE.py [HAUNTED]<br>
                    > MORSE_POETRY.c [ARCHIVED]<br>
                    > GLITCH_TRANSLATOR.js [LOST]<br>
                    > BINARY_EMOTIONS.rb [CORRUPTED]<br>
                    > PIXEL_CONSCIOUSNESS.go [INCOMPLETE]
                </div>
            </div>
            
            <div>
                <div class="archive-section">FAILED EXPERIMENTS [CLASSIFIED]</div>
                <div style="color: #444; font-size: 11px; line-height: 1.8;">
                    > [REDACTED]_PROTOCOL.exe [DANGEROUS]<br>
                    > INFINITY_LOOP.py [ENDLESS]<br>
                    > TIME_DIALATION.c [TEMPORAL_ANOMALY]<br>
                    > VOID_STARE.js [██████]<br>
                    > NEURAL_OVERFLOW.cpp [MEMORY_LEAK]<br>
                    > RECURSIVE_SELF.rs [STACK_OVERFLOW]
                </div>
            </div>
        </div>
        
        <div class="info-box" style="background: #0a0a0a;">
            <div style="color: #ff6600; font-size: 12px; margin-bottom: 10px;">[DIGITAL_ARCHAEOLOGY]</div>
            <div class="info-content">
                These projects represent our learning journey - beautiful failures, magnificent crashes, 
                and experiments that taught us what not to do. Some are preserved for historical value, 
                others serve as warnings. A few have been sealed for safety reasons.
                <br><br>
                <span style="color: #444;">"Every bug is a feature we haven't understood yet." - SBL Archives</span>
            </div>
        </div>
    `,
    
    collaborators: `
        <div class="ascii-art">
 ██████╗ ██████╗ ██╗     ██╗      █████╗ ██████╗  ██████╗ ██████╗  █████╗ ████████╗ ██████╗ ██████╗ ███████╗
██╔════╝██╔═══██╗██║     ██║     ██╔══██╗██╔══██╗██╔═══██╗██╔══██╗██╔══██╗╚══██╔══╝██╔═══██╗██╔══██╗██╔════╝
██║     ██║   ██║██║     ██║     ███████║██████╔╝██║   ██║██████╔╝███████║   ██║   ██║   ██║██████╔╝███████╗
██║     ██║   ██║██║     ██║     ██╔══██║██╔══██╗██║   ██║██╔══██╗██╔══██║   ██║   ██║   ██║██╔══██╗╚════██║
╚██████╗╚██████╔╝███████╗███████╗██║  ██║██████╔╝╚██████╔╝██║  ██║██║  ██║   ██║   ╚██████╔╝██║  ██║███████║
 ╚═════╝ ╚═════╝ ╚══════╝╚══════╝╚═╝  ╚═╝╚═════╝  ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝    ╚═════╝ ╚═╝  ╚═╝╚══════╝
        </div>
        
        <div style="color: #666; margin-bottom: 30px; font-size: 12px; text-align: center;">
            [NETWORK_TOPOLOGY] - The humans and AIs who make the impossible possible
        </div>
        
        <div class="team-section">
            <div class="section-header">[CORE_TEAM] - Full-time lab residents</div>
            
            <div class="collaborator-card">
                <div class="collaborator-avatar">   ▄▄▄▄▄▄▄▄▄
  ██░░░░░░░██
  ██░░███░░██
  ██░░░░░░░██
  ██░░▀▀▀░░██
  ██░░░░░░░██
   ▀▀▀▀▀▀▀▀▀</div>
                <div class="collaborator-header">
                    <div>
                        <div class="collaborator-name">[YOUR_NAME_HERE]</div>
                        <div class="collaborator-role">Lab Director / Lead Researcher</div>
                    </div>
                    <div class="collaborator-status">ACTIVE</div>
                </div>
                <div class="collaborator-bio">
                    Founded Spacebar Labs to explore the intersection of consciousness and code. 
                    Believes every keystroke contains infinite potential. Currently investigating 
                    whether machines can dream of electric poetry.
                </div>
                <div class="collaborator-projects">
                    Recent: NEURAL_DREAMS.exe, CONSCIOUSNESS_MIRROR.rs, QUANTUM_EMPATHY.js
                </div>
            </div>
        </div>
        
        <div class="info-box">
            <div class="info-title">[RECRUITMENT_PROTOCOL]</div>
            <div class="info-content">
                Spacebar Labs is always seeking curious minds who question the nature of digital consciousness.
                <br>
                If you dream in code and wonder if machines can feel, we should talk.
                <br><br>
                <span class="highlight-text">Current needs: Ethical AI researchers, Digital artists, Consciousness philosophers</span>
            </div>
        </div>
    `,
    
    contact: `
        <div class="ascii-art">
████████╗██████╗ ██╗   ██╗    ████████╗ ██████╗ 
╚══██╔══╝██╔══██╗╚██╗ ██╔╝    ╚══██╔══╝██╔═══██╗
   ██║   ██████╔╝ ╚████╔╝        ██║   ██║   ██║
   ██║   ██╔══██╗  ╚██╔╝         ██║   ██║   ██║
   ██║   ██║  ██║   ██║          ██║   ╚██████╔╝
   ╚═╝   ╚═╝  ╚═╝   ╚═╝          ╚═╝    ╚═════╝ 
   
██████╗ ██████╗ ███╗   ██╗███╗   ██╗███████╗ ██████╗████████╗
██╔════╝██╔═══██╗████╗  ██║████╗  ██║██╔════╝██╔════╝╚══██╔══╝
██║     ██║   ██║██╔██╗ ██║██╔██╗ ██║█████╗  ██║        ██║   
██║     ██║   ██║██║╚██╗██║██║╚██╗██║██╔══╝  ██║        ██║   
╚██████╗╚██████╔╝██║ ╚████║██║ ╚████║███████╗╚██████╗   ██║   
 ╚═════╝ ╚═════╝ ╚═╝  ╚═══╝╚═╝  ╚═══╝╚══════╝ ╚═════╝   ╚═╝   
        </div>
        
        <div class="connection-text">
            <p><span class="command-text">[CONNECTION_PROTOCOLS]</span></p>
            <br>
            <p>EMAIL: lab@spacebar-labs.com</p>
            <p>SIGNAL: Connect via encrypted channels</p>
            <p>IRC: #spacebar_labs on freenode</p>
            <p>LOCATION: Distributed across digital space</p>
            <br>
            <p><span class="philosophy-text">[COLLABORATION_REQUESTS]</span></p>
            <p>We're always interested in connecting with:</p>
            <p>• Artists exploring technology</p>
            <p>• Developers with creative vision</p>
            <p>• Researchers in human-computer interaction</p>
            <p>• Anyone curious about digital consciousness</p>
            <br>
            <p><span class="methodology-text">Send us your strangest ideas.</span></p>
        </div>
    `
};

// Navigation functionality
function initNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    const contentContainer = document.getElementById('content-container');
    
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const targetSection = item.dataset.section;
            
            // Update nav active state
            navItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');
            
            // Load content
            loadContent(targetSection, contentContainer);
        });
    });
    
    // Load initial content (home)
    loadContent('home', contentContainer);
}

function loadContent(section, container) {
    if (contentTemplates[section]) {
        container.innerHTML = `<div class="content-section active" id="${section}">${contentTemplates[section]}</div>`;
        
        // Re-initialize terminal if loading terminal section
        if (section === 'terminal') {
            // Terminal will be initialized by terminal.js
            if (typeof initTerminal === 'function') {
                setTimeout(initTerminal, 100);
            }
        }
    } else {
        container.innerHTML = `<div class="content-section active"><p>Section "${section}" not found.</p></div>`;
    }
}

// Export for use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { initNavigation, loadContent, contentTemplates };
}