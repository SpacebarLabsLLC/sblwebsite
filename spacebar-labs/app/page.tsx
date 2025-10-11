'use client';

import React, { useState, useEffect } from 'react';
import { ArrowRight, Plus, Minus } from 'lucide-react';

export default function SpacebarLabs() {
  const [activeSection, setActiveSection] = useState(0);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [expandedWork, setExpandedWork] = useState<number | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const works = [
    {
      id: 1,
      title: "Artist Operations Ecosystem",
      category: "Creative Engineering",
      description: "Full digital infrastructure integration for artists: HubSpot, Shopify, Discord, Twitch, and more. We organize and unify your systems so you can focus on creating.",
      tags: ["Platform Integration", "Automation", "Community"]
    },
    {
      id: 2,
      title: "Immersive Brand Launch",
      category: "Transmedia Storytelling",
      description: "Short film, interactive website, and NFC-enabled product packaging that turned a product launch into a narrative experience.",
      tags: ["Film", "Web", "Physical Product"]
    },
    {
      id: 3,
      title: "Event World-Building",
      category: "Brand Activation",
      description: "From Curated beverage lines to environmental design, elevate from a brand into a lived experience through our unique approach to activations.",
      tags: ["Events", "Physical Design", "Mobile"]
    }
  ];

  const capabilities = [
    { name: "Digital Infrastructure & Automation", icon: "⚙️" },
    { name: "Transmedia Storytelling", icon: "🎬" },
    { name: "Brand Identity & EPK Development", icon: "✨" },
    { name: "Platform Integrations", icon: "🔗" },
    { name: "Product Design & Photography", icon: "📸" },
    { name: "Community Systems", icon: "💬" }
  ];

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Custom Cursor Effect */}
      <div 
        className="fixed w-8 h-8 border border-white rounded-full pointer-events-none z-50 mix-blend-difference transition-transform duration-200"
        style={{ 
          left: `${cursorPos.x}px`, 
          top: `${cursorPos.y}px`,
          transform: 'translate(-50%, -50%)'
        }}
      />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6">
        {/* Video Background Container - Replace bg-gradient with video element */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/10 to-black">
          {/* Future video element goes here with overlay */}
        </div>
        
        <div className="relative z-10 max-w-6xl mx-auto text-center">
          {/* Logo Space - Replace with actual logo */}
          <div className="mb-4 h-16 flex items-center justify-center">
            <div className="w-16 h-16 border border-gray-600 rounded flex items-center justify-center text-xs text-gray-600">
              LOGO
            </div>
          </div>
          
          <div className="mb-6 text-sm tracking-widest text-gray-400">
            SPACEBAR LABS
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-light mb-8 leading-tight">
            We turn brands into<br />
            <span className="italic font-serif">worlds you can step into</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto">
            Creative Storytelling Meets Creative Engineering<br />
            Narrative Development χ Platform Integration
          </p>
          
          <button className="group inline-flex items-center gap-3 px-8 py-4 border border-white hover:bg-white hover:text-black transition-all duration-300">
            <span>Explore Our Work</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
        
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-2 bg-white rounded-full" />
          </div>
        </div>
      </section>

{/* Engineering New Wor//ds - Focal Statement */}
<section className="relative py-40 px-6 overflow-hidden">
  <div className="max-w-7xl mx-auto">
    <div 
      className="relative cursor-pointer py-12"
      onMouseEnter={() => setActiveSection(1)}
      onMouseLeave={() => setActiveSection(0)}
    >
      <h2 className="text-6xl md:text-8xl lg:text-9xl font-light text-center leading-tight mb-8">
        Engineering New
      </h2>
      
      {/* Wor//ds with side-by-side reveal */}
      <div className="flex items-center justify-center gap-2 md:gap-4 min-h-[140px] md:min-h-[180px]">
        
        {/* Left: "Words" fades in */}
        <div 
          className="text-3xl md:text-5xl lg:text-6xl text-purple-300 font-light transition-all duration-700 ease-out"
          style={{
            opacity: activeSection === 1 ? 1 : 0,
            transform: activeSection === 1 ? 'translateX(0)' : 'translateX(30px)'
          }}
        >
          Words
        </div>
        
        {/* Center: "Wor // ds" */}
        <div className="text-6xl md:text-8xl lg:text-9xl font-light flex items-center gap-1 md:gap-2">
          <span 
            className="transition-opacity duration-500"
            style={{
              opacity: activeSection === 1 ? 0 : 1
            }}
          >
            Wor
          </span>
          
          <span 
            className="font-extralight mx-1 md:mx-2 transition-all duration-500"
            style={{
              color: activeSection === 1 ? 'rgb(216, 180, 254)' : 'rgba(192, 132, 252, 0.6)',
              filter: activeSection === 1 ? 'drop-shadow(0 0 20px rgba(168, 85, 247, 0.6))' : 'none'
            }}
          >
            //
          </span>
          
          <span 
            className="transition-opacity duration-500"
            style={{
              opacity: activeSection === 1 ? 0 : 1
            }}
          >
            ds
          </span>
        </div>
        
        {/* Right: "Worlds" fades in */}
        <div 
          className="text-3xl md:text-5xl lg:text-6xl text-purple-300 font-light transition-all duration-700 ease-out"
          style={{
            opacity: activeSection === 1 ? 1 : 0,
            transform: activeSection === 1 ? 'translateX(0)' : 'translateX(-30px)'
          }}
        >
          Worlds
        </div>
        
      </div>
      
      <p 
        className="text-center text-gray-400 text-lg mt-12 max-w-2xl mx-auto transition-opacity duration-300"
        style={{
          opacity: activeSection === 1 ? 1 : 0.6
        }}
      >
        Where narrative meets infrastructure. Where story becomes system.
      </p>
    </div>
  </div>
  
  {/* Subtle grid background */}
  <div className="absolute inset-0 opacity-10 pointer-events-none" style={{
    backgroundImage: 'linear-gradient(rgba(147, 51, 234, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(147, 51, 234, 0.1) 1px, transparent 1px)',
    backgroundSize: '50px 50px'
  }} />
</section>
      {/* Philosophy Section */}
      <section className="py-32 px-6 border-t border-gray-800">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-5xl font-light mb-6">
                Complete<br />Ecosystems
              </h2>
              <div className="w-20 h-1 bg-purple-500 mb-8" />
              <p className="text-xl text-gray-400 leading-relaxed">
                Whether it's a short film tied to an interactive website, an NFC-enabled product, 
                or a line of curated beverages for your event—we build complete holistic ecosystems where 
                audiences don't just see your brand, they enter it. Every moment becomes an eχperience through
                our sensory-forward design process that challenges us to think about things differently.
              </p>
            </div>
            
            <div className="space-y-6">
              {[
                "Transmedia experiences that span physical and digital dimensions",
                "The technical backend of every creative vision.",
                "Build portals, not billboards."
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4 p-6 border border-gray-800 hover:border-purple-500 transition-colors">
                  <div className="text-purple-500 text-2xl font-light">{String(i + 1).padStart(2, '0')}</div>
                  <p className="text-gray-300">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Selected Work */}
      <section className="py-32 px-6 bg-gradient-to-b from-black to-purple-950/20">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-baseline justify-between mb-16">
            <h2 className="text-5xl font-light">Selected Work</h2>
            <button className="text-gray-400 hover:text-white transition-colors flex items-center gap-2">
              View All Projects <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          
          <div className="space-y-2">
            {works.map((work) => (
              <div 
                key={work.id}
                className="border border-gray-800 hover:border-purple-500 transition-all duration-300 overflow-hidden"
              >
                <button
                  onClick={() => setExpandedWork(expandedWork === work.id ? null : work.id)}
                  className="w-full p-8 flex items-center justify-between text-left hover:bg-purple-950/10 transition-colors"
                >
                  <div className="flex-1">
                    <div className="text-sm text-purple-400 mb-2">{work.category}</div>
                    <h3 className="text-3xl font-light mb-2">{work.title}</h3>
                  </div>
                  
                  <div className="ml-8">
                    {expandedWork === work.id ? 
                      <Minus className="w-6 h-6" /> : 
                      <Plus className="w-6 h-6" />
                    }
                  </div>
                </button>
                
                {expandedWork === work.id && (
                  <div className="px-8 pb-8 border-t border-gray-800 pt-6 bg-black/40">
                    <p className="text-gray-400 text-lg mb-6 max-w-3xl">
                      {work.description}
                    </p>
                    <div className="flex flex-wrap gap-3">
                      {work.tags.map((tag, i) => (
                        <span key={i} className="px-4 py-2 border border-gray-700 text-sm text-gray-300">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities Grid */}
      <section className="py-32 px-6 border-t border-gray-800">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl font-light mb-16">What We Build</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {capabilities.map((cap, i) => (
              <div 
                key={i}
                className="p-8 border border-gray-800 hover:border-purple-500 hover:bg-purple-950/10 transition-all duration-300 group"
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">
                  {cap.icon}
                </div>
                <h3 className="text-xl font-light text-gray-300">{cap.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6 bg-gradient-to-t from-purple-950/20 to-transparent">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl md:text-6xl font-light mb-8">
            Ready to build<br />your world?
          </h2>
          <p className="text-xl text-gray-400 mb-12">
            Let's turn your brand into an experience people can step into.
          </p>
          <button className="px-10 py-5 bg-white text-black hover:bg-purple-500 hover:text-white transition-all duration-300 text-lg">
            Start a Project
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-2xl font-light">SPACEBAR LABS</div>
          
          <div className="flex gap-8 text-gray-400">
            <a href="#" className="hover:text-white transition-colors">Work</a>
            <a href="#" className="hover:text-white transition-colors">About</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
          </div>
          
          <div className="text-gray-600 text-sm">
            Chicago, Illinois
          </div>
        </div>
      </footer>
    </div>
  );
}