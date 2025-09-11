// Content templates for each section
const contentTemplates = {
    home: `
        <div class="logo-container">
            <div class="graphic-logo-placeholder">
                <div class="logo-text">[ SPACEBAR LABS ]</div>
                <img src="/assets/images/sbl.png">
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
║ FOUNDED: 2021                        ║
║ MISSION: DIGITAL EXPERIMENTATION     ║
║ FOCUS: CODE + ART + INTERACTION      ║
║ STATUS: RESEARCHING.                 ║
╚══════════════════════════════════════╝
        </div>
        
        <div class="intro-text">
            <p><span class="command-text">[ABOUT]</span>Spacebar Labs is a multimedia production commpany working at the bleeding edge of interactive technology.</p>
            <br>
            <p><span class="philosophy-text">[PHILOSOPHY]</span> Using different forms of art as an expression of storytelling, we seek to explore the space between wor//ds.</p>
            <br>
            <p><span class="methodology-text">[METHODOLOGY]</span> We like to fail often and learn constantly.</p>
        </div>
    `,
    
    projects: `
        <div class="ascii-art">
    ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
    ░  COMPLETED PROJECTS - RELEASED   ░
    ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
        </div>
        
        <div class="command-text" style="margin-bottom: 20px; font-size: 12px;">
            [PUBLIC RELEASES] - Production-ready experiments that have left the lab.
        </div>
        
        <div class="project-grid">
            <div class="project-card">
                <div class="project-title">Leeked.net</div>
                <div class="project-desc">An immersive, interactive platform that blends physical merchandise with digital experiences. Think Linktree + Instagram + </div>
                <div class="status">[STATUS: LIVE]  [ONBOARDED ARTISTS: 1]</div>
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
                <div class="project-title" style="color: #ffff00;">NOTHING YET</div>
                <div class="project-desc">COMEBACK SOON?</div>
                <div class="status" style="color: #ffff00;">[STATUS: EXPERIMENTAL] [RISK: HIGH]</div>
            </div>
        
        <div class="intro-text" style="margin-top: 30px;">
            <p><span class="warning-text">[WARNING]</span> Lab experiments are unstable and may cause:</p>
            <p>• Existential questioning in AI systems</p>
            <p>• Unexpected emotional responses in users</p>
            <p>• Recursive loops in consciousness.</p>
            <p>• Hunger.</p>
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
                    > EVENT_HORIZON.experience [COLLAPSED]<br>
                    > TELPOETICA.py [OUT_OF_BUDGET]<br>
                    > VERDANTIS.arg [ARCHIVED]<br>
                </div>
            </div>
            
            <div>
                <div class="archive-section">FAILED EXPERIMENTS [CLASSIFIED]</div>
                <div style="color: #444; font-size: 11px; line-height: 1.8;">
                </div>
            </div>
        </div>
        
        <div class="info-box" style="background: #0a0a0a;">
            <div style="color: #ff6600; font-size: 12px; margin-bottom: 10px;">[DIGITAL_ARCHAEOLOGY]</div>
            <div class="info-content">
                These projects represent our our philsophy of failing hard — and failing fast.
                They've taught us how to do things—and how not to do things.
                <br><br>
                <span style="color: #444;">"It's a featuer, not a Except the bug is a brown recluse." - SBL Archives</span>
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
            [NETWORK_TOPOLOGY] - The humans that make this all possible.
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
                        <div class="collaborator-name">[Aireus Robinson]</div>
                        <div class="collaborator-role">Lab Director / Lead Researcher</div>
                    </div>
                    <div class="collaborator-status">ACTIVE</div>
                </div>
                <div class="collaborator-bio">
                    Founded Spacebar Labs to explore the intersection of narrative-driven storytelling through technology.
                    Currently investigating building local community through the music scene in Chicago.
                </div>
                <div class="collaborator-projects">
                    Recent: Leeked.net
                </div>
            </div>
        </div>
        
        <div class="info-box">
            <div class="info-title">[RECRUITMENT_PROTOCOL]</div>
            <div class="info-content">
                Spacebar Labs is always seeking curious minds.
                <br>
                If you're a researcher, journalist, or artist interested in collaborating, reach out via hello@spacebarlabs.io
                <br><br>
                <span class="highlight-text">Current needs: Everything.</span>
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
            <p>EMAIL: hello@spacebarlabs.io</p>
            <p>SIGNAL: Connect via encrypted channels</p>
            <p>IRC: #spacebar_labs on freenode</p>
            <p>LOCATION: Distributed across digital spaces and 3rd spaces across the planet.</p>
            <br>
            <p><span class="philosophy-text">[COLLABORATION_REQUESTS]</span></p>
            <p>We're always interested in connecting with:</p>
            <p>• Artists exploring technology</p>
            <p>• Developers with creative vision</p>
            <p>• Researchers in human-computer interaction</p>
            <p>• Anyone curious about consciousness</p>
            <br>
            <p><span class="methodology-text">Send us your strangest, most estoeric ideas.</span></p>
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