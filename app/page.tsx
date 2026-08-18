'use client';

import React, { useEffect, useRef, useState } from 'react';

interface ServiceRow {
  title: string;
  columnA: string[];
  columnB: string[];
}

const services: ServiceRow[] = [
  {
    title: 'Creative Direction',
    columnA: ['Visual Strategy & Concept Dev.', 'Brand Identity & Campaign Design', 'Campaign Conceptualization'],
    columnB: ['Social Media Direction', 'Storytelling & Narrative Design'],
  },
  {
    title: 'Experience Design',
    columnA: ['Interactive Installations & A/V', 'Gamification & ARG Development', 'Audience Engagement Systems'],
    columnB: ['Phygital Activations (NFC, QR)', 'Custom Web Applications'],
  },
  {
    title: 'Visual Production',
    columnA: ['Brand Films & Commercials', 'Event & Performance Capture', 'Cinematic Productions'],
    columnB: ['Social Media Content Production', 'Commercial & Portrait Photography', 'Time-Lapse & Slow Motion'],
  },
  {
    title: 'Digital Growth',
    columnA: ['Brand Films', 'CRM Implementation & Strategy', 'Aerial Videography'],
    columnB: ['Marketing Automation Architecture', 'Email & SMS Campaign Systems'],
  },
  {
    title: 'Post Production',
    columnA: ['Video Editing', 'Photo Editing & Retouching'],
    columnB: ['Color Correction & Grading', 'Sound Design & Mixing'],
  },
];

const MARQUEE_TILES = Array.from({ length: 6 }, (_, i) => i);

export default function SpacebarLabs() {
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [cursorActive, setCursorActive] = useState(false);
  const [finePointer, setFinePointer] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  // Custom cursor — gated behind a real fine pointer, listened live (not sniffed once)
  // so a hybrid device (e.g. a touchscreen laptop with a mouse plugged in) still works.
  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)');
    const update = () => setFinePointer(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    if (!finePointer) return;
    document.body.classList.add('cursor-ready');
    const handleMove = (e: MouseEvent) => setCursorPos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handleMove);
    return () => {
      document.body.classList.remove('cursor-ready');
      window.removeEventListener('mousemove', handleMove);
    };
  }, [finePointer]);

  // Scroll reveals — same IntersectionObserver convention as the aireus-portfolio sibling site
  useEffect(() => {
    const els = rootRef.current?.querySelectorAll('.reveal') ?? [];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0, rootMargin: '0px 0px -40px 0px' }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const cursorProps = finePointer
    ? {
        onMouseEnter: () => setCursorActive(true),
        onMouseLeave: () => setCursorActive(false),
      }
    : {};

  return (
    <div ref={rootRef} className="min-h-screen bg-background text-foreground font-sans">
      {/* Custom cursor: white dot + centered VIEW / Project label */}
      {finePointer && (
        <div
          className="fixed z-[100] pointer-events-none -translate-x-1/2 -translate-y-1/2 transition-[width,height] duration-200 ease-out flex items-center justify-center rounded-full bg-white"
          style={{
            left: cursorPos.x,
            top: cursorPos.y,
            width: cursorActive ? 72 : 10,
            height: cursorActive ? 72 : 10,
          }}
        >
          {cursorActive && (
            <span className="font-mono text-[9px] font-medium uppercase leading-tight tracking-wide text-black text-center">
              VIEW<br />Project
            </span>
          )}
        </div>
      )}

      {/* Nav */}
      <nav className="anim-nav-in fixed top-0 inset-x-0 z-40 flex items-center justify-between px-6 md:px-10 py-5 backdrop-blur-sm bg-background/60">
        <a href="#top" {...cursorProps} className="font-mono text-xs uppercase tracking-widest hover:text-brand transition-colors">
          Lab Work
        </a>
        <div className="flex items-center gap-6 font-mono text-xs uppercase tracking-widest">
          <a href="#services" {...cursorProps} className="hover:text-brand transition-colors">Services</a>
          <a href="#about" {...cursorProps} className="hover:text-brand transition-colors">About</a>
          <span className="flex items-center gap-4 text-dim">
            <a aria-label="Instagram" {...cursorProps} className="hover:text-brand transition-colors">IG</a>
            <a aria-label="Bluesky" {...cursorProps} className="hover:text-brand transition-colors">BSKY</a>
          </span>
        </div>
      </nav>

      {/* Hero */}
      <section id="top" className="relative min-h-screen flex items-center justify-end px-6 md:px-10 overflow-hidden">
        {/* CSS eclipse backdrop — no photo asset, pure gradient */}
        <div
          aria-hidden="true"
          className="absolute inset-0 m-auto w-[60vmin] h-[60vmin] rounded-full"
          style={{
            background: 'radial-gradient(circle, #000 0%, #000 55%, transparent 56%)',
            boxShadow: '0 0 120px 40px rgba(0,153,255,0.15), 0 0 240px 80px rgba(255,255,255,0.04)',
          }}
        />

        <div className="relative z-10 text-right max-w-xl">
          <h1 className="anim-hero-headline font-display font-extrabold text-[clamp(2.5rem,6vw,3.5rem)] leading-[1.05]">
            Spacebar//<br />LABS
          </h1>
          <p className="anim-hero-msg mt-4 font-display font-extrabold text-lg md:text-xl">
            engineering <span className="uppercase">NEW</span> <span className="italic">Wor//ds</span>
          </p>
        </div>

        <div className="anim-hero-arrow absolute bottom-10 left-1/2 -translate-x-1/2">
          <div className="w-6 h-10 border-2 border-white rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-2 bg-white rounded-full" />
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="reveal py-32 px-6 md:px-10 border-t border-divider">
        <div className="max-w-4xl mx-auto">
          <p className="font-display text-2xl md:text-4xl leading-snug">
            <strong>Spacebar//LABS</strong> is a creative operations studio that engineers systems to scale
            with you and the stories you tell. Where most pick a side, we engineered <strong>Spacebar//LABS</strong> to
            operate in the space between <em className="italic font-extrabold">WOR//DS</em>:
          </p>
          <p className="font-display text-xl md:text-2xl leading-snug mt-8 text-dim-safe">
            <strong className="text-foreground">WORLDS//</strong> Creative Direction &bull; Visual Storytelling &bull; Cinematography
            <br />
            <strong className="text-foreground">WORDS//</strong> Experience Design &bull; Digital Growth &bull; Fan Ownership
          </p>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-32 px-6 md:px-10">
        <div className="max-w-5xl mx-auto">
          <h2 className="reveal font-display font-extrabold text-4xl md:text-5xl mb-4">Our Services</h2>
          {services.map((row) => (
            <div key={row.title} className="reveal border-t border-divider py-8 grid md:grid-cols-[1fr_2fr] gap-4 md:gap-12">
              <h3 className="font-display font-extrabold text-2xl">{row.title}</h3>
              <div className="grid sm:grid-cols-2 gap-x-8 gap-y-2 font-mono text-xs uppercase tracking-wide text-dim-safe">
                {[...row.columnA, ...row.columnB].map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact + marquee */}
      <section className="py-32 px-6 md:px-10 border-t border-divider">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="reveal font-mono font-bold uppercase text-[clamp(2.5rem,8vw,4.5rem)] leading-tight">
            Build Your World.
          </h2>
          <a
            href="mailto:hello@spacebarlabs.io"
            {...cursorProps}
            className="reveal inline-block mt-8 px-8 py-4 border border-brand text-brand font-mono text-sm uppercase tracking-widest hover:bg-brand hover:text-background transition-colors"
          >
            Let&apos;s Talk
          </a>
        </div>

        <div className="reveal mt-24 marquee-mask">
          <div className="marquee-rotate">
            <div className="marquee-track" aria-hidden="true">
              {Array.from({ length: 4 }).flatMap((_, rep) =>
                MARQUEE_TILES.map((i) => (
                  <div
                    key={`${rep}-${i}`}
                    className="w-[300px] h-[300px] shrink-0 rounded flex items-center justify-center text-dim font-mono text-xs uppercase tracking-widest"
                    style={{ background: 'linear-gradient(135deg, #1a1a1a, #262626)' }}
                  >
                    Photo
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-divider py-12 px-6 md:px-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div>
            <h4 className="font-mono text-xs uppercase tracking-widest text-dim mb-3">About</h4>
            <div className="flex flex-col gap-1 text-sm">
              <a href="#services" {...cursorProps} className="hover:text-brand transition-colors">Services</a>
              <a href="#about" {...cursorProps} className="hover:text-brand transition-colors">About</a>
              <a href="mailto:hello@spacebarlabs.io" {...cursorProps} className="hover:text-brand transition-colors">Contact</a>
            </div>
          </div>
          <div>
            <h4 className="font-mono text-xs uppercase tracking-widest text-dim mb-3">Socials</h4>
            <div className="flex flex-col gap-1 text-sm">
              <a aria-label="Instagram" {...cursorProps} className="hover:text-brand transition-colors">Instagram</a>
              <a aria-label="Twitter" {...cursorProps} className="hover:text-brand transition-colors">Twitter</a>
              <a aria-label="Behance" {...cursorProps} className="hover:text-brand transition-colors">Behance</a>
              <a aria-label="Bluesky" {...cursorProps} className="hover:text-brand transition-colors">Bluesky</a>
            </div>
          </div>
          <div className="font-mono text-xs text-dim">&copy; 2026 spacebar//LABS</div>
        </div>
      </footer>
    </div>
  );
}
