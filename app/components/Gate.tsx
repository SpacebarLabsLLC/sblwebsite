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

/** Let the key visibly depress before the horizon starts travelling. */
const PRESS_MS = 110;
/** Ring expands (620ms), then the gate lifts (340ms after a 420ms hold). */
const CROSS_MS = 820;

export default function Gate() {
  const [open, setOpen] = useState(true);
  const [pressed, setPressed] = useState(false);
  const [crossing, setCrossing] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);
  const timers = useRef<number[]>([]);

  // Cross once per session. Re-gating every navigation would make a threshold
  // into a toll booth.
  useEffect(() => {
    // Captured now so the cleanup clears the same array the effect saw.
    const pending = timers.current;
    try {
      if (sessionStorage.getItem(CROSSED)) setOpen(false);
    } catch {
      /* private mode — just show the gate */
    }
    return () => pending.forEach(clearTimeout);
  }, []);

  const enter = useCallback(() => {
    if (crossing) return;
    try {
      sessionStorage.setItem(CROSSED, '1');
    } catch {
      /* ignore */
    }

    setPressed(true);

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setOpen(false);
      return;
    }

    timers.current.push(window.setTimeout(() => setCrossing(true), PRESS_MS));
    timers.current.push(window.setTimeout(() => setOpen(false), PRESS_MS + CROSS_MS));
  }, [crossing]);

  useEffect(() => {
    if (!open || crossing) return;

    // Nothing behind the gate should scroll while it is up.
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    btnRef.current?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.repeat) return;
      if (e.code === 'Space' || e.key === ' ' || e.key === 'Enter') {
        // Safe to preventDefault: this listener only exists while the gate is
        // open, and there is nothing to scroll or activate underneath it.
        e.preventDefault();
        enter();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [open, crossing, enter]);

  if (!open) return null;

  return (
    <>
      <noscript>
        <style>{`.sbl-gate{display:none!important}`}</style>
      </noscript>

      <div
        className={`sbl-gate fixed inset-0 z-[200] flex flex-col items-center justify-center gap-10 overflow-hidden bg-background px-6 ${
          crossing ? 'gate-crossing' : ''
        }`}
      >
        {/* The horizon itself — a ring that expands past the viewer on entry. */}
        <span aria-hidden="true" className="gate-horizon" />

        <p className="gate-chrome relative font-mono text-xs uppercase tracking-[0.3em] text-dim">
          spacebar//LABS
        </p>

        <button
          ref={btnRef}
          type="button"
          onClick={enter}
          data-pressed={pressed ? 'true' : 'false'}
          aria-label="Press space to enter"
          className="gate-key relative h-16 w-[min(80vw,440px)] rounded-md"
        >
          <span className="gate-key__label font-mono text-[11px] lowercase tracking-[0.35em]">
            spacebar
          </span>
          {/* The lip along the bottom is what makes the shape read as a keycap. */}
          <span
            aria-hidden="true"
            className="gate-key__lip pointer-events-none absolute inset-x-8 bottom-3 h-px"
          />
        </button>

        <p className="gate-chrome gate-hint relative font-mono text-[10px] uppercase tracking-[0.3em] text-dim-safe">
          <span className="on-fine">Press space — or click</span>
          <span className="on-coarse">Tap to enter</span>
        </p>
      </div>
    </>
  );
}
