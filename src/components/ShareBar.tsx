import { useState } from 'react';
import { toPng } from 'html-to-image';
import type { Persona } from '../types';

interface Props {
  cardRef: React.RefObject<HTMLDivElement>;
  persona: Persona;
  onAgain: () => void;
}

export default function ShareBar({ cardRef, persona, onAgain }: Props) {
  const [copied, setCopied] = useState(false);
  const [busy, setBusy] = useState(false);

  const downloadImage = async () => {
    if (!cardRef.current) return;
    setBusy(true);
    try {
      const dataUrl = await toPng(cardRef.current, {
        cacheBust: true,
        pixelRatio: 2,
        backgroundColor: '#0a0814',
      });
      const link = document.createElement('a');
      link.download = `${persona.animeName}-anime-persona.png`;
      link.href = dataUrl;
      link.click();
    } finally {
      setBusy(false);
    }
  };

  const copyLink = async () => {
    const url = new URL(window.location.href);
    url.searchParams.set('name', persona.indianName.toLowerCase());
    url.searchParams.set('vibe', persona.vibe);
    try {
      await navigator.clipboard.writeText(url.toString());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="mx-auto mt-6 flex w-full max-w-sm flex-wrap items-center justify-center gap-3">
      <button
        onClick={downloadImage}
        disabled={busy}
        className="flex-1 rounded-2xl bg-gradient-to-r from-neon-pink to-neon-purple px-4 py-3 text-sm font-semibold text-white shadow-glow-pink transition hover:opacity-90 disabled:opacity-60"
      >
        {busy ? 'Rendering...' : 'Download Card'}
      </button>
      <button
        onClick={copyLink}
        className="flex-1 rounded-2xl border border-fg/15 bg-fg/5 px-4 py-3 text-sm font-semibold text-fg transition hover:border-fg/30"
      >
        {copied ? 'Link Copied!' : 'Copy Share Link'}
      </button>
      <button
        onClick={onAgain}
        className="w-full rounded-2xl border border-fg/10 px-4 py-3 text-sm font-medium text-fg/70 transition hover:text-fg"
      >
        Try Another Name
      </button>
    </div>
  );
}
