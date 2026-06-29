import { useEffect, useMemo, useState } from 'react';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import { loadImageShape } from '@tsparticles/shape-image';
import type { ISourceOptions } from '@tsparticles/engine';
import type { Theme } from '../hooks/useTheme';

const PARTICLE_COLORS: Record<Theme, string[]> = {
  neon: ['#ff2e88', '#a855f7', '#22d3ee', '#fcd34d'],
  sakura: ['#ff8fab', '#d67ab8', '#ffc8dd', '#ffd18a'],
  cyberpunk: ['#fcee21', '#00e5ff', '#ff006e', '#fcee21'],
  matrix: ['#00ff66', '#00c853', '#66ff99', '#00ff66'],
  sunset: ['#ff8a4c', '#f4599b', '#8a63f0', '#ffc46e'],
  light: ['#ec407a', '#7c3aed', '#0284c7', '#d97706'],
};

interface Props {
  theme: Theme;
}

export default function ParticlesBackground({ theme }: Props) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
      await loadImageShape(engine);
    }).then(() => setReady(true));
  }, []);

  const options: ISourceOptions = useMemo(
    () => ({
      fullScreen: { enable: true, zIndex: 0 },
      background: { color: { value: 'transparent' } },
      fpsLimit: 60,
      particles: {
        number: { value: 28, density: { enable: true } },
        color: { value: PARTICLE_COLORS[theme] },
        links: { enable: false },
        move: {
          enable: true,
          speed: 0.8,
          direction: 'none',
          outModes: { default: 'out' },
        },
        rotate: {
          value: { min: 0, max: 360 },
          direction: 'random',
          animation: { enable: true, speed: 4 },
        },
        opacity: {
          value: { min: 0.35, max: 0.85 },
          animation: { enable: true, speed: 0.6 },
        },
        shape: {
          type: 'image',
          options: {
            image: {
              src: '/brain.svg',
              width: 100,
              height: 100,
              replaceColor: true,
            },
          },
        },
        size: { value: { min: 10, max: 22 } },
      },
      interactivity: {
        events: {
          onHover: { enable: true, mode: 'bubble' },
          onClick: { enable: true, mode: 'push' },
        },
        modes: {
          bubble: { distance: 120, size: 26, duration: 2, opacity: 1 },
          push: { quantity: 2 },
        },
      },
      detectRetina: true,
    }),
    [theme],
  );

  if (!ready) return null;

  return <Particles key={theme} id="tsparticles" options={options} />;
}
