'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';

/**
 * The threshold.
 *
 * You cross it by pressing the spacebar — the key the company is named after —
 * or by tapping the one drawn on screen. Both affordances are always present;
 * only the hint text changes with the pointer type.
 *
 * It is a real <button>, autofocused, so keyboard activation is native rather
 * than hijacked. The window-level listener only exists while the gate is up, so
 * space never stops being page-down anywhere else on the site.
 *
 * The gate renders into the static HTML (no flash on first paint), and the
 * <noscript> block removes it when JS is unavailable — otherwise a reader
 * without JS would be sealed out of a site that is otherwise entirely static.
 */

const CROSSED = 'sbl:crossed';
const FADE_MS = 420;

export default function Gate() {
  const [open, setOpen] = useState(true);
  const [leaving, setLeaving] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);

  // Cross once per session. Re-gating every navigation would make a threshold
  // into a toll booth.
  useEffect(() => {
    try {
      if (sessionStorage.getItem(CROSSED)) setOpen(false);
    } catch {
      /* private mode — just show the gate */
    }
  }, []);

  const enter = useCallback(() => {
    try {
      sessionStorage.setItem(CROSSED, '1');
    } catch {
      /* ignore */
    }
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      setOpen(false);
      return;
    }
    setLeaving(true);
    window.setTimeout(() => setOpen(false), FADE_MS);
  }, []);

  useEffect(() => {
    if (!open || leaving) return;

    // Nothing behind the gate should scroll while it is up.
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    btnRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.key === ' ' || e.key === 'Enter') {
        // Safe to preventDefault: this listener only exists while the gate is
        // open, and there is nothing to scroll or activate underneath it.
        e.preventDefault();
        enter();
      }
    };

    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [open, leaving, enter]);

  if (!open) return null;

  return (
    <>
      <noscript>
        <style>{`.sbl-gate{display:none!important}`}</style>
      </noscript>

      <div
        className={`sbl-gate fixed inset-0 z-[200] flex flex-col items-center justify-center gap-10 bg-background px-6 transition-opacity duration-[420ms] ease-out ${
          leaving ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-dim">spacebar//LABS</p>

        <button
          ref={btnRef}
          type="button"
          onClick={enter}
          aria-label="Enter"
          className="group relative h-16 w-[min(80vw,440px)] rounded-md border border-white/25 bg-white/[0.03] transition-colors hover:border-brand hover:bg-brand/10 focus-visible:border-brand"
        >
          {/* The lip along the bottom is what makes the shape read as a keycap. */}
          <span className="pointer-events-none absolute inset-x-8 bottom-3 h-px bg-white/25 transition-colors group-hover:bg-brand" />
        </button>

        <p className="gate-hint font-mono text-[10px] uppercase tracking-[0.3em] text-dim-safe">
          <span className="on-fine">Press space — or click</span>
          <span className="on-coarse">Tap to enter</span>
        </p>
      </div>
    </>
  );
}
