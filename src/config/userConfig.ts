// src/config/userconfig.ts

import ctrlpour from './projects/ctrlpour.json';
import swarminglocusts from './projects/swarminglocusts.json';

// --- Main Configuration for Spacebar Labs LLC ---
export const userConfig = {
    // Core Company Identity
    name: 'Spacebar Labs',
    role: 'Narrative R&D // Immersive Media Studio',
    location: 'Chicago, IL',
    email: 'hello@spacebarlabs.io',
    website: 'spacebarlabs.io',
    roleFocus: 'Engineering the Space Between Wor//ds.',

    // Company Social & Contact Links
    social: {
        github: 'https://github.com/SpacebarLabsLLC',
        linkedin: 'https://www.linkedin.com/company/spacebar-labs-llc',
    },
    contact: {
        email: 'hello@spacebarlabs.io',
        phone: '[REDACTED]',
    },

    // A playlist reflecting the lab's vibe
    spotify: {
        playlistId: '37i9dQZF1DX1s9knjP51Oa',
        playlistName: 'FM CTRL // Signal Feed',
    },

    // Link to your Company Manifesto/Overview PDF
    resume: {
        url: '/spacebar-labs-llc-white-paper.pdf',
        localPath: '/spacebar-labs-llc-white-paper.pdf',
    },
    
    // -- REQUIRED SECTION 1: Repurposed as "Core Principles" --
    // The template needs this array to exist to avoid crashing.
    education: [
        {
            degree: "Core Principle: Radical Self-Ownership",
            major: "Anti-Walled-Garden Approach",
            institution: "Spacebar Labs R&D",
            location: "Self-Hosted",
            year: "Est. 2024",
            description: "All prototypes and platforms are built to be self-owned and operated, using open-source tools to experiment without gatekeepers.",
            images: []
        }
    ],

    // To be safe, we'll add the other sections back as empty arrays.
    // This will prevent crashes if other components expect them.
    courses: [],
    
    // The company's core technology stack and creative skills
    skills: [
        "Astro", "React", "Tailwind CSS", "Twilio API", "Icecast", "TrueNAS",
        "Narrative Design", "ARG Construction", "Interactive Fiction", "World-Building", "Photography", "Music Production & Audio Engineering",
        "Open-Source Development", "Self-Hosting", "Production", "LLC Operations"
    ],
    
    // To be safe, add these back as empty arrays.
    extraCurricularRoles: [],
    extraCurricularActivities: [],

    // -- REQUIRED SECTION 2: Repurposed as "Awards & Recognition" --
    // This is another section the template needs to function.
    competitions: [
        {
            title: "Prototype Showcase: CTRL+POUR",
            description: "A case study in diegetic marketing and community engagement.",
            achievement: "Featured in [Name of a real or fictional publication/event]",
            year: "2025",
            images: []
        }
    ],

    // This 'experience' section is for Company Prototypes & Case Studies.
    experience: [
        {
            title: "Case Study: ctrl+pour",
            company: "Digital Media & Culture Blog",
            location: "Remote",
            period: "2021 - Present",
            description: "A blog exploring the intersectionality of digital media and 'third spaces.' Using food & beverage as a lens, CTRL+POUR analyzes how physical spaces are shaped by our increasingly digital lives.",
            technologies: ["Content Strategy", "Writing", "Cultural Analysis", "Substack", "SEO"],
            images: [
                {
                    url: "/images/projects/ctrlpour/ctrlpour_default.png", // Ensure this image is in your public/images/projects folder
                    alt: "ctrl+pour Blog"
                }
            ]
        },
        {
            title: "Prototype: tel-poetica",
            company: "Internal R&D",
            location: "Remote",
            period: "WIP",
            description: "An experimental narrative delivered via the Twilio API, using automated voice calls and SMS messages to create an asynchronous, intimate poetry experience.",
            technologies: ["Twilio (Voice & SMS)", "Node.js", "Serverless Functions", "Narrative Design"],
            images: []
        }
    ],

    // SEO for your real-world business
    seo: {
        title: 'Spacebar Labs | Narrative R&D and Immersive Media',
        description: 'A one-person R&D shop prototyping narrative-driven experiences. An open-source lab and diegetic portal for stories.',
        keywords: ['narrative design', 'ARG development', 'immersive media', 'interactive fiction', 'open source tools', 'creative technology studio', 'Twilio developer'],
    },

    // Theme Configuration
    theme: {
        primaryColor: '#F8F8F8',
        secondaryColor: '#3A3D40',
        accentColor: '#4ADE80',
    },

    // Your actual company projects
    projects: [
       ctrlpour,
       swarminglocusts
    ]
} as const;