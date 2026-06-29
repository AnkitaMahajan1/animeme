import { useCallback, useState } from 'react';
import { resolveName } from '../services/resolveName';
import type { GenerateStatus, Persona, Vibe } from '../types';

const NAME_PATTERN = /^[a-zA-Z][a-zA-Z .'-]{0,29}$/;

export function useGenerate() {
  const [status, setStatus] = useState<GenerateStatus>('idle');
  const [persona, setPersona] = useState<Persona | null>(null);
  const [error, setError] = useState<string | null>(null);

  const generate = useCallback(async (rawName: string, vibe: Vibe) => {
    const name = rawName.trim();
    if (!name) {
      setError('Please enter a name first.');
      setStatus('error');
      return;
    }
    if (!NAME_PATTERN.test(name)) {
      setError('Use letters only (2-30 characters), no numbers or symbols.');
      setStatus('error');
      return;
    }

    setError(null);
    setStatus('loading');
    try {
      const result = await resolveName(name, vibe);
      // brief minimum suspense so the reveal animation feels intentional
      await new Promise((r) => setTimeout(r, 1400));
      setPersona(result);
      setStatus('revealed');
    } catch {
      setError('Something went wrong summoning your persona. Try again.');
      setStatus('error');
    }
  }, []);

  const reset = useCallback(() => {
    setStatus('idle');
    setPersona(null);
    setError(null);
  }, []);

  return { status, persona, error, generate, reset };
}
