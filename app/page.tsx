'use client';

import React, { useEffect, useRef, useState } from 'react';

import capabilitiesData from '@/data/capabilities.json';
import engagementsData from '@/data/engagements.json';
import socialsData from '@/data/socials.json';

import Gate from './components/Gate';

// ---------------------------------------------------------------------------
// CONTENT
//
// Everything rendered below comes from data/*.json, which /admin edits and
// commits straight to GitHub. The push rebuilds the site, so those files are
// the source of truth — never edit copy in this component.
//
// And everything in them has to be verifiable. The institutional register only
// works because it is straight: no invented metrics, clients, or dates.
// ---------------------------------------------------------------------------

interface Engagement {
  /** The host. Always the headline — SBL is the index, not the subject. */
  entity: string;
  /** What the host is, in their terms, not ours. */
  engagement: string;
  /** What SBL actually built. Specs, not adjectives. */
  systems: string[];
  year: string;
  /** Type code + sequence, on the wor//ds axis: WLD is space, narrative and
   *  sensory work; WRD is code, language and infrastructure. Lineage is carried
   *  by `parent` and shown as an indent, so the code never repeats it. */
  code: string;
  href?: string;
  /** Entity this sits under. A child is a place inside the parent's world. */
  parent?: string;
}

interface Capability {
  division: string;
  items: string[];
}

interface Social {
  label: string;
  href?: string;
}

const engagements = engagementsData as Engagement[];
// Presented as a spec table, not a services wall — the difference between
// stating capability and pitching it. Keep this shorter than the index is
// long; the evidence should always outweigh the claim.
const capabilities = capabilitiesData as Capability[];
// A social with no href renders unlinked rather than as a dead anchor.
const socials = socialsData as Social[];

const MARQUEE_TILES = Array.from({ length: 6 }, (_, i) => i);

// ---------------------------------------------------------------------------
// PRIMITIVES
// ---------------------------------------------------------------------------

/** Small mono kicker over a monolithic noun. The section-header pattern. */
function SectionHead({
  kicker,
  title,
  tone = 'dark',
}: {
  kicker: string;
  title: string;
  tone?: 'dark' | 'ledger';
}) {
  return (
    <header className="reveal">
      <p
        className={`font-mono text-[10px] uppercase tracking-[0.3em] ${
          tone === 'ledger' ? 'text-ledger-dim' : 'text-dim'
        }`}
      >
        {kicker}
      </p>
      <h2 className="font-display font-extrabold uppercase text-[clamp(2rem,6vw,3.25rem)] leading-[0.95] mt-3">
        {title}
      </h2>
    </header>
  );
}

/** Renders as a link only when a destination actually exists. */
function MaybeLink({
  href,
  className,
  children,
  ...rest
}: {
  href?: string;
  className?: string;
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLElement>) {
  if (!href) return <span className={className} {...rest}>{children}</span>;
  const external = href.startsWith('http');
  return (
    <a
      href={href}
      className={className}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      {...rest}
    >
      {children}
    </a>
  );
}

// ---------------------------------------------------------------------------
// PAGE
// ---------------------------------------------------------------------------

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
      {/* The threshold. Crossed with the spacebar, or by tapping the one drawn. */}
      <Gate />
      {/* Custom cursor: white dot + centered VIEW / Project label */}
      {finePointer && (
        <div
          className="fixed z-[300] pointer-events-none -translate-x-1/2 -translate-y-1/2 transition-[width,height] duration-200 ease-out flex items-center justify-center rounded-full bg-white mix-blend-difference"
          style={{
            left: cursorPos.x,
            top: cursorPos.y,
            width: cursorActive ? 72 : 10,
            height: cursorActive ? 72 : 10,
          }}
        >
          {cursorActive && (
            <span className="font-mono text-[9px] font-medium uppercase leading-tight tracking-wide text-black text-center">
              Open<br />Record
            </span>
          )}
        </div>
      )}

      {/* Nav */}
      <nav className="anim-nav-in fixed top-0 inset-x-0 z-40 flex items-center justify-between px-6 md:px-10 py-5 backdrop-blur-sm bg-background/60">
        <a
          href="#top"
          {...cursorProps}
          className="font-mono text-xs uppercase tracking-widest hover:text-brand transition-colors"
        >
          spacebar//LABS
        </a>
        <div className="flex items-center gap-6 font-mono text-xs uppercase tracking-widest">
          <a href="#index" {...cursorProps} className="hover:text-brand transition-colors">
            Index
          </a>
          <a href="#capabilities" {...cursorProps} className="hover:text-brand transition-colors">
            Capabilities
          </a>
          <a href="#contact" {...cursorProps} className="hover:text-brand transition-colors">
            Contact
          </a>
        </div>
      </nav>

      {/* ------------------------------------------------------------------ */}
      {/* THE PORTAL. The only cinematic moment on the site — everything      */}
      {/* after it is deadpan record. If every section is a portal, none is.  */}
      {/* ------------------------------------------------------------------ */}
      <section
        id="top"
        className="relative min-h-screen flex items-center justify-center px-6 md:px-10 overflow-hidden"
      >
        {/* CSS eclipse backdrop — no photo asset, pure gradient */}
        <div
          aria-hidden="true"
          // Larger on narrow screens so the wordmark still sits inside the
          // sphere — at 375px, 60vmin is narrower than the type itself.
          className="absolute inset-0 m-auto w-[76vmin] h-[76vmin] md:w-[60vmin] md:h-[60vmin] rounded-full"
          style={{
            background: 'radial-gradient(circle, #000 0%, #000 55%, transparent 56%)',
            boxShadow:
              '0 0 120px 40px rgba(0,153,255,0.15), 0 0 240px 80px rgba(255,255,255,0.04)',
          }}
        />

        {/* The block is centred on the eclipse, but its lines are left-aligned to
            each other, so the mark reads "spacebar//" over "LABS" on a shared
            left edge rather than as two centred lines. */}
        <div className="relative z-10 text-left max-w-xl">
          <h1 className="anim-hero-headline font-display font-extrabold text-[clamp(2.5rem,6vw,3.5rem)] leading-[1.05]">
            spacebar//<br />LABS
          </h1>
          <p className="anim-hero-msg mt-4 font-display font-extrabold text-lg md:text-xl">
            engineering new <span className="italic">Wor//ds</span>
          </p>
        </div>

        <div className="anim-hero-arrow absolute bottom-10 left-1/2 -translate-x-1/2">
          <div className="w-6 h-10 border-2 border-white rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-2 bg-white rounded-full" />
          </div>
        </div>
      </section>

      {/* Positioning — the last piece of prose before the record begins */}
      <section className="reveal py-28 md:py-36 px-6 md:px-10 border-t border-divider">
        <div className="max-w-4xl mx-auto">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-dim">
            Statement of operations
          </p>
          <p className="font-display text-2xl md:text-4xl leading-snug mt-6">
            <strong>spacebar//LABS</strong> is a creative operations studio that engineers
            systems to scale with you and the stories you tell. Where most pick a side, we
            engineered <strong>spacebar//LABS</strong> to operate in the space between{' '}
            <em className="italic font-extrabold">WOR//DS</em>:
          </p>
          <div className="mt-10 grid sm:grid-cols-2 gap-6 font-mono text-xs uppercase tracking-widest text-dim-safe">
            <p>
              <span className="text-foreground">WORLDS//</span>
              <br />
              Creative direction · Visual storytelling · Cinematography
            </p>
            <p>
              <span className="text-foreground">WORDS//</span>
              <br />
              Experience design · Digital growth · Fan ownership
            </p>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* THE LEDGER. Light ground: you step out of the world and into the    */}
      {/* record of it. Index first, capability second — evidence before      */}
      {/* claim, hosts before services.                                       */}
      {/* ------------------------------------------------------------------ */}
      <div className="bg-ledger text-ledger-fg">
        {/* Index of engagements */}
        <section id="index" className="py-28 md:py-36 px-6 md:px-10">
          <div className="max-w-5xl mx-auto">
            <SectionHead kicker="Worlds reached" title="Index" tone="ledger" />

            {/* Column headers — mono microtype carries the structure */}
            <div className="mt-14 hidden md:grid grid-cols-[1.4fr_1fr_2fr_auto] gap-8 pb-3 border-b border-ledger-rule font-mono text-[10px] uppercase tracking-[0.2em] text-ledger-dim">
              <span>Entity</span>
              <span>Engagement</span>
              <span>Systems deployed</span>
              <span className="text-right">Record</span>
            </div>

            <ol className="border-b border-ledger-rule">
              {engagements.map((e, i) => (
                <li
                  key={e.code}
                  className="reveal stagger border-t border-ledger-rule first:border-t-0 md:first:border-t-0"
                  style={{ '--i': i } as React.CSSProperties}
                >
                  <MaybeLink
                    href={e.href}
                    {...(e.href ? cursorProps : {})}
                    className={`group grid md:grid-cols-[1.4fr_1fr_2fr_auto] gap-2 md:gap-8 py-7 items-baseline ${
                      e.parent ? 'pl-5 md:pl-8' : ''
                    } ${e.href ? 'transition-colors hover:text-brand' : ''}`}
                  >
                    <span
                      className={`font-display font-extrabold uppercase leading-none ${
                        e.parent ? 'text-base md:text-lg' : 'text-xl md:text-2xl'
                      }`}
                    >
                      {e.parent && (
                        <span aria-hidden="true" className="mr-2 font-mono text-ledger-dim">
                          &#8627;
                        </span>
                      )}
                      {e.entity}
                    </span>
                    <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ledger-dim group-hover:text-brand transition-colors">
                      {e.engagement}
                    </span>
                    <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ledger-dim group-hover:text-brand transition-colors">
                      {e.systems.join(' · ')}
                    </span>
                    <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ledger-dim md:text-right whitespace-nowrap group-hover:text-brand transition-colors">
                      {e.year} &nbsp;{e.code}
                    </span>
                  </MaybeLink>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Capability spec table */}
        <section id="capabilities" className="pb-28 md:pb-36 px-6 md:px-10">
          <div className="max-w-5xl mx-auto">
            <SectionHead kicker="What we bring" title="Capabilities" tone="ledger" />

            <dl className="mt-14 border-t border-ledger-rule">
              {capabilities.map((c, i) => (
                <div
                  key={c.division}
                  className="reveal stagger grid md:grid-cols-[1fr_2.4fr] gap-2 md:gap-12 border-b border-ledger-rule py-7"
                  style={{ '--i': i } as React.CSSProperties}
                >
                  <dt className="font-mono text-[11px] uppercase tracking-[0.2em]">
                    <span className="text-ledger-dim mr-3 tabular-nums">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    {c.division}
                  </dt>
                  <dd className="grid sm:grid-cols-2 gap-x-8 gap-y-1.5 font-mono text-[11px] uppercase tracking-[0.16em] text-ledger-dim">
                    {c.items.map((item) => (
                      <span key={item}>{item}</span>
                    ))}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      </div>

      {/* Contact + marquee — back into the world */}
      <section id="contact" className="py-28 md:py-36 px-6 md:px-10">
        <div className="max-w-5xl mx-auto text-center">
          <p className="reveal font-mono text-[10px] uppercase tracking-[0.3em] text-dim">
            Open a record
          </p>
          <h2 className="reveal font-display font-extrabold uppercase text-[clamp(2.5rem,8vw,4.5rem)] leading-[0.95] mt-4">
            Build Your World
          </h2>
          <a
            href="mailto:hello@spacebarlabs.io"
            {...cursorProps}
            className="reveal inline-block mt-10 px-8 py-4 border border-brand text-brand font-mono text-xs uppercase tracking-[0.3em] hover:bg-brand hover:text-background transition-colors"
          >
            hello@spacebarlabs.io
          </a>
        </div>

        <div className="reveal mt-24 marquee-mask">
          <div className="marquee-rotate">
            <div className="marquee-track" aria-hidden="true">
              {Array.from({ length: 4 }).flatMap((_, rep) =>
                MARQUEE_TILES.map((i) => (
                  <div
                    key={`${rep}-${i}`}
                    className="w-[300px] h-[300px] shrink-0 rounded flex items-center justify-center text-dim font-mono text-[10px] uppercase tracking-[0.3em]"
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
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div>
            <h4 className="font-mono text-[10px] uppercase tracking-[0.3em] text-dim mb-3">Site</h4>
            <div className="flex flex-col gap-1 font-mono text-xs uppercase tracking-widest">
              <a href="#index" {...cursorProps} className="hover:text-brand transition-colors">
                Index
              </a>
              <a href="#capabilities" {...cursorProps} className="hover:text-brand transition-colors">
                Capabilities
              </a>
              <a
                href="mailto:hello@spacebarlabs.io"
                {...cursorProps}
                className="hover:text-brand transition-colors"
              >
                Contact
              </a>
            </div>
          </div>
          <div>
            <h4 className="font-mono text-[10px] uppercase tracking-[0.3em] text-dim mb-3">
              Elsewhere
            </h4>
            <div className="flex flex-col gap-1 font-mono text-xs uppercase tracking-widest">
              {socials.map((s) => (
                <MaybeLink
                  key={s.label}
                  href={s.href}
                  {...(s.href ? cursorProps : {})}
                  className={s.href ? 'hover:text-brand transition-colors' : 'text-dim'}
                >
                  {s.label}
                </MaybeLink>
              ))}
            </div>
          </div>
          <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-dim md:text-right">
            spacebar//LABS LLC
            <br />
            &copy; 2026
          </div>
        </div>
      </footer>
    </div>
  );
}
