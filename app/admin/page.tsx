'use client';

import React, { useCallback, useEffect, useState } from 'react';

import capabilitiesData from '@/data/capabilities.json';
import engagementsData from '@/data/engagements.json';
import socialsData from '@/data/socials.json';

// ---------------------------------------------------------------------------
// Editor for data/*.json.
//
// The imported JSON is baked in at build time, so what loads here is exactly
// what is currently published. Saving POSTs to /api/publish, which commits the
// file to GitHub; the push triggers a rebuild and the change goes live.
//
// Cloudflare Access gates this route — the Worker independently rejects any
// unauthenticated publish, so a bypass still cannot write to the repo.
// ---------------------------------------------------------------------------

interface Engagement {
  entity: string;
  engagement: string;
  systems: string[];
  year: string;
  code: string;
  href?: string;
}

interface Capability {
  division: string;
  items: string[];
}

interface Social {
  label: string;
  href?: string;
}

type Status =
  | { state: 'idle' }
  | { state: 'saving' }
  | { state: 'ok'; message: string }
  | { state: 'error'; message: string };

const emptyEngagement: Engagement = {
  entity: '',
  engagement: '',
  systems: [],
  year: '',
  code: '',
  href: '',
};

// --- primitives ------------------------------------------------------------

const inputClass =
  'w-full bg-white border border-ledger-rule px-3 py-2 font-mono text-[12px] ' +
  'text-ledger-fg placeholder:text-ledger-dim focus:outline-none focus:border-brand';

const labelClass = 'block font-mono text-[10px] uppercase tracking-[0.2em] text-ledger-dim mb-1.5';

const btnClass =
  'font-mono text-[10px] uppercase tracking-[0.2em] px-3 py-2 border border-ledger-rule ' +
  'hover:border-brand hover:text-brand transition-colors disabled:opacity-40 ' +
  'disabled:cursor-not-allowed disabled:hover:border-ledger-rule disabled:hover:text-ledger-fg';

function Field({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className={labelClass}>{label}</span>
      <input
        className={inputClass}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  );
}

/** String arrays are edited one item per line — simplest thing that works. */
function ListField({
  label,
  value,
  onChange,
  rows = 3,
}: {
  label: string;
  value: string[];
  onChange: (v: string[]) => void;
  rows?: number;
}) {
  return (
    <label className="block">
      <span className={labelClass}>{label} — one per line</span>
      <textarea
        className={`${inputClass} resize-y leading-relaxed`}
        rows={rows}
        value={value.join('\n')}
        onChange={(e) =>
          onChange(
            e.target.value
              .split('\n')
              .map((s) => s.trim())
              .filter(Boolean)
          )
        }
      />
    </label>
  );
}

function Panel({
  title,
  file,
  status,
  onPublish,
  onAdd,
  children,
}: {
  title: string;
  file: string;
  status: Status;
  onPublish: () => void;
  onAdd?: () => void;
  children: React.ReactNode;
}) {
  return (
    <section className="border border-ledger-rule bg-ledger">
      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-ledger-rule px-5 py-4">
        <div>
          <h2 className="font-display font-extrabold uppercase text-lg leading-none">{title}</h2>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ledger-dim mt-1.5">
            {file}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {onAdd && (
            <button type="button" className={btnClass} onClick={onAdd}>
              + Add
            </button>
          )}
          <button
            type="button"
            className={`${btnClass} border-brand text-brand`}
            onClick={onPublish}
            disabled={status.state === 'saving'}
          >
            {status.state === 'saving' ? 'Publishing…' : 'Publish'}
          </button>
        </div>
      </header>

      <div className="p-5 space-y-5">{children}</div>

      {status.state !== 'idle' && status.state !== 'saving' && (
        <p
          className={`border-t border-ledger-rule px-5 py-3 font-mono text-[11px] ${
            status.state === 'ok' ? 'text-ledger-fg' : 'text-red-600'
          }`}
        >
          {status.message}
        </p>
      )}
    </section>
  );
}

/** Row shell with reorder + delete controls. */
function Row({
  index,
  total,
  onMove,
  onRemove,
  children,
}: {
  index: number;
  total: number;
  onMove: (from: number, to: number) => void;
  onRemove: (i: number) => void;
  children: React.ReactNode;
}) {
  return (
    <div className="border border-ledger-rule bg-white p-4">
      <div className="flex items-center justify-between mb-3">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ledger-dim tabular-nums">
          {String(index + 1).padStart(2, '0')}
        </span>
        <div className="flex gap-1.5">
          <button
            type="button"
            className={btnClass}
            disabled={index === 0}
            onClick={() => onMove(index, index - 1)}
            aria-label="Move up"
          >
            ↑
          </button>
          <button
            type="button"
            className={btnClass}
            disabled={index === total - 1}
            onClick={() => onMove(index, index + 1)}
            aria-label="Move down"
          >
            ↓
          </button>
          <button
            type="button"
            className={`${btnClass} hover:border-red-600 hover:text-red-600`}
            onClick={() => onRemove(index)}
            aria-label="Remove"
          >
            Remove
          </button>
        </div>
      </div>
      <div className="grid gap-3">{children}</div>
    </div>
  );
}

// --- page ------------------------------------------------------------------

export default function Admin() {
  const [engagements, setEngagements] = useState<Engagement[]>(engagementsData as Engagement[]);
  const [capabilities, setCapabilities] = useState<Capability[]>(capabilitiesData as Capability[]);
  const [socials, setSocials] = useState<Social[]>(socialsData as Social[]);

  const [engStatus, setEngStatus] = useState<Status>({ state: 'idle' });
  const [capStatus, setCapStatus] = useState<Status>({ state: 'idle' });
  const [socStatus, setSocStatus] = useState<Status>({ state: 'idle' });

  const [identity, setIdentity] = useState<string>('checking…');

  // Confirms Access is actually in front of this route. If it isn't, the
  // publish endpoint will reject anyway — this just surfaces it early.
  useEffect(() => {
    fetch('/api/whoami')
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((d: { email?: string }) => setIdentity(d.email || 'authenticated'))
      .catch(() => setIdentity('not authenticated — publishing will be rejected'));
  }, []);

  const publish = useCallback(
    async (
      path: string,
      data: unknown,
      message: string,
      setStatus: (s: Status) => void
    ) => {
      setStatus({ state: 'saving' });
      try {
        const res = await fetch('/api/publish', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            path,
            content: `${JSON.stringify(data, null, 2)}\n`,
            message,
          }),
        });
        const body = (await res.json()) as { error?: string; commit?: { sha?: string } };
        if (!res.ok) {
          setStatus({ state: 'error', message: `${res.status} — ${body.error ?? 'failed'}` });
          return;
        }
        const sha = body.commit?.sha?.slice(0, 7) ?? '';
        setStatus({
          state: 'ok',
          message: `Committed ${sha}. The rebuild takes a minute or two, then it's live.`,
        });
      } catch (err) {
        setStatus({ state: 'error', message: err instanceof Error ? err.message : 'network error' });
      }
    },
    []
  );

  function move<T>(arr: T[], set: (v: T[]) => void) {
    return (from: number, to: number) => {
      const next = [...arr];
      const [item] = next.splice(from, 1);
      next.splice(to, 0, item);
      set(next);
    };
  }

  function remove<T>(arr: T[], set: (v: T[]) => void) {
    return (i: number) => set(arr.filter((_, n) => n !== i));
  }

  return (
    <main className="min-h-screen bg-ledger text-ledger-fg font-sans">
      <div className="max-w-4xl mx-auto px-6 py-14 space-y-8">
        <header className="border-b border-ledger-rule pb-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-ledger-dim">
            spacebar//LABS
          </p>
          <h1 className="font-display font-extrabold uppercase text-[clamp(2rem,6vw,3rem)] leading-[0.95] mt-2">
            Admin
          </h1>
          <p className="font-mono text-[11px] text-ledger-dim mt-4">
            Signed in as {identity}
          </p>
          <p className="font-mono text-[11px] text-ledger-dim mt-1.5 leading-relaxed">
            Each panel publishes one file. Only what is verifiable belongs here — no invented
            metrics, clients, or dates. An entry with no link renders as plain text rather than a
            dead link.
          </p>
        </header>

        {/* Engagements */}
        <Panel
          title="Index"
          file="data/engagements.json"
          status={engStatus}
          onAdd={() => setEngagements([...engagements, { ...emptyEngagement }])}
          onPublish={() =>
            publish('data/engagements.json', engagements, 'Update index via admin', setEngStatus)
          }
        >
          {engagements.map((e, i) => (
            <Row
              key={i}
              index={i}
              total={engagements.length}
              onMove={move(engagements, setEngagements)}
              onRemove={remove(engagements, setEngagements)}
            >
              <div className="grid sm:grid-cols-2 gap-3">
                <Field
                  label="Entity"
                  value={e.entity}
                  placeholder="Party Crashers"
                  onChange={(v) =>
                    setEngagements(engagements.map((x, n) => (n === i ? { ...x, entity: v } : x)))
                  }
                />
                <Field
                  label="Engagement"
                  value={e.engagement}
                  placeholder="Streaming collective"
                  onChange={(v) =>
                    setEngagements(
                      engagements.map((x, n) => (n === i ? { ...x, engagement: v } : x))
                    )
                  }
                />
              </div>
              <ListField
                label="Systems deployed"
                value={e.systems}
                onChange={(v) =>
                  setEngagements(engagements.map((x, n) => (n === i ? { ...x, systems: v } : x)))
                }
              />
              <div className="grid sm:grid-cols-3 gap-3">
                <Field
                  label="Year"
                  value={e.year}
                  placeholder="2026"
                  onChange={(v) =>
                    setEngagements(engagements.map((x, n) => (n === i ? { ...x, year: v } : x)))
                  }
                />
                <Field
                  label="Code"
                  value={e.code}
                  placeholder="PC//01"
                  onChange={(v) =>
                    setEngagements(engagements.map((x, n) => (n === i ? { ...x, code: v } : x)))
                  }
                />
                <Field
                  label="Link (optional)"
                  value={e.href ?? ''}
                  placeholder="https://…"
                  onChange={(v) =>
                    setEngagements(engagements.map((x, n) => (n === i ? { ...x, href: v } : x)))
                  }
                />
              </div>
            </Row>
          ))}
        </Panel>

        {/* Capabilities */}
        <Panel
          title="Capabilities"
          file="data/capabilities.json"
          status={capStatus}
          onAdd={() => setCapabilities([...capabilities, { division: '', items: [] }])}
          onPublish={() =>
            publish(
              'data/capabilities.json',
              capabilities,
              'Update capabilities via admin',
              setCapStatus
            )
          }
        >
          <p className="font-mono text-[11px] text-ledger-dim leading-relaxed">
            Keep this shorter than the index is long — the evidence should outweigh the claim.
          </p>
          {capabilities.map((c, i) => (
            <Row
              key={i}
              index={i}
              total={capabilities.length}
              onMove={move(capabilities, setCapabilities)}
              onRemove={remove(capabilities, setCapabilities)}
            >
              <Field
                label="Division"
                value={c.division}
                placeholder="Creative Direction"
                onChange={(v) =>
                  setCapabilities(capabilities.map((x, n) => (n === i ? { ...x, division: v } : x)))
                }
              />
              <ListField
                label="Items"
                value={c.items}
                rows={4}
                onChange={(v) =>
                  setCapabilities(capabilities.map((x, n) => (n === i ? { ...x, items: v } : x)))
                }
              />
            </Row>
          ))}
        </Panel>

        {/* Socials */}
        <Panel
          title="Elsewhere"
          file="data/socials.json"
          status={socStatus}
          onAdd={() => setSocials([...socials, { label: '', href: '' }])}
          onPublish={() =>
            publish('data/socials.json', socials, 'Update socials via admin', setSocStatus)
          }
        >
          {socials.map((s, i) => (
            <Row
              key={i}
              index={i}
              total={socials.length}
              onMove={move(socials, setSocials)}
              onRemove={remove(socials, setSocials)}
            >
              <div className="grid sm:grid-cols-2 gap-3">
                <Field
                  label="Label"
                  value={s.label}
                  placeholder="Instagram"
                  onChange={(v) =>
                    setSocials(socials.map((x, n) => (n === i ? { ...x, label: v } : x)))
                  }
                />
                <Field
                  label="Link (blank = unlinked)"
                  value={s.href ?? ''}
                  placeholder="https://…"
                  onChange={(v) =>
                    setSocials(socials.map((x, n) => (n === i ? { ...x, href: v } : x)))
                  }
                />
              </div>
            </Row>
          ))}
        </Panel>

        <footer className="font-mono text-[10px] uppercase tracking-[0.2em] text-ledger-dim pt-2">
          Publishing commits to GitHub and triggers a rebuild.
        </footer>
      </div>
    </main>
  );
}
