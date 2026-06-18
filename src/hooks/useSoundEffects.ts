let audioCtx: AudioContext | null = null;

const getCtx = (): AudioContext => {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
};

const haptic = (pattern: number | number[]) => {
  if ('vibrate' in navigator) {
    try { navigator.vibrate(pattern); } catch (_) {}
  }
};

// Soft UI click — 900 → 500 Hz sine, 60 ms
export const playClick = () => {
  try {
    const ctx = getCtx();
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = 'sine';
    osc.frequency.setValueAtTime(900, now);
    osc.frequency.exponentialRampToValueAtTime(500, now + 0.06);
    gain.gain.setValueAtTime(0.1, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
    osc.start(now);
    osc.stop(now + 0.07);
    haptic(8);
  } catch (_) {}
};

// Cinematic entry — bass thump + rising sweep, 450 ms
export const playEnterCaseStudy = () => {
  try {
    const ctx = getCtx();
    const now = ctx.currentTime;

    // Bass thump
    const bass = ctx.createOscillator();
    const bassGain = ctx.createGain();
    bass.connect(bassGain);
    bassGain.connect(ctx.destination);
    bass.type = 'sine';
    bass.frequency.setValueAtTime(110, now);
    bass.frequency.exponentialRampToValueAtTime(55, now + 0.22);
    bassGain.gain.setValueAtTime(0.28, now);
    bassGain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);
    bass.start(now);
    bass.stop(now + 0.3);

    // Rising sweep
    const sweep = ctx.createOscillator();
    const sweepGain = ctx.createGain();
    sweep.connect(sweepGain);
    sweepGain.connect(ctx.destination);
    sweep.type = 'sine';
    sweep.frequency.setValueAtTime(280, now + 0.03);
    sweep.frequency.exponentialRampToValueAtTime(2200, now + 0.45);
    sweepGain.gain.setValueAtTime(0.0, now);
    sweepGain.gain.linearRampToValueAtTime(0.11, now + 0.12);
    sweepGain.gain.exponentialRampToValueAtTime(0.001, now + 0.48);
    sweep.start(now);
    sweep.stop(now + 0.5);

    haptic([12, 40, 60]);
  } catch (_) {}
};

// Triumphant unlock — C5 E5 G5 arpeggiated
export const playUnlock = () => {
  try {
    const ctx = getCtx();
    const now = ctx.currentTime;
    [523.25, 659.25, 783.99].forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = 'sine';
      const t = now + i * 0.09;
      osc.frequency.setValueAtTime(freq, t);
      gain.gain.setValueAtTime(0.001, t);
      gain.gain.linearRampToValueAtTime(0.13, t + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.65);
      osc.start(t);
      osc.stop(t + 0.7);
    });
    haptic([10, 80, 30]);
  } catch (_) {}
};

// Error buzz — sawtooth thud, 180 ms
export const playError = () => {
  try {
    const ctx = getCtx();
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(210, now);
    osc.frequency.exponentialRampToValueAtTime(90, now + 0.18);
    gain.gain.setValueAtTime(0.07, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
    osc.start(now);
    osc.stop(now + 0.21);
    haptic(120);
  } catch (_) {}
};
