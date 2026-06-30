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

// Browsers block AudioContext until a user gesture (click/touch).
// Prime it on the earliest possible interaction so scroll-triggered
// sounds work without requiring a click on the specific section.
const primeOnGesture = () => {
  try {
    const ctx = getCtx();
    if (ctx.state === 'suspended') ctx.resume();
  } catch (_) {}
};
if (typeof window !== 'undefined') {
  ['pointerdown', 'touchstart', 'keydown'].forEach((evt) =>
    window.addEventListener(evt, primeOnGesture, { once: false, passive: true })
  );
}

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

// Spoke-card ratchet — the classic "card clothespinned to bike spokes" sound.
// Fires one click for every fixed slice of scroll distance travelled, so slow
// scrolling gives individual "tk... tk... tk" clicks and fast scrolling
// blurs them into a continuous "zzzzzzzz" buzz — exactly like the real thing.
export type SpokeVariant = 'classic' | 'soft' | 'mechanical' | 'retro';

let noiseBufferCache: AudioBuffer | null = null;
const getNoiseBuffer = (ctx: AudioContext) => {
  if (!noiseBufferCache || noiseBufferCache.sampleRate !== ctx.sampleRate) {
    const length = Math.floor(ctx.sampleRate * 0.06);
    const buffer = ctx.createBuffer(1, length, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < length; i++) {
      data[i] = (Math.random() * 2 - 1) * (1 - i / length);
    }
    noiseBufferCache = buffer;
  }
  return noiseBufferCache;
};

// A: Classic — crisp bandpassed noise click, the plain plastic-card-on-spokes sound.
const clickClassic = (intensity: number) => {
  const ctx = getCtx();
  const now = ctx.currentTime;
  const src = ctx.createBufferSource();
  src.buffer = getNoiseBuffer(ctx);
  const bandpass = ctx.createBiquadFilter();
  bandpass.type = 'bandpass';
  bandpass.frequency.setValueAtTime(1600 + Math.random() * 1800, now);
  bandpass.Q.value = 4;
  const gain = ctx.createGain();
  const vol = 0.05 + Math.min(intensity, 1) * 0.12;
  gain.gain.setValueAtTime(vol, now);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.045);
  src.connect(bandpass);
  bandpass.connect(gain);
  gain.connect(ctx.destination);
  src.start(now);
  src.stop(now + 0.05);
};

// B: Soft — lower, rounder, felt-brush texture. Gentle background detail.
const clickSoft = (intensity: number) => {
  const ctx = getCtx();
  const now = ctx.currentTime;
  const src = ctx.createBufferSource();
  src.buffer = getNoiseBuffer(ctx);
  const lowpass = ctx.createBiquadFilter();
  lowpass.type = 'bandpass';
  lowpass.frequency.setValueAtTime(700 + Math.random() * 500, now);
  lowpass.Q.value = 1.2;
  const gain = ctx.createGain();
  const vol = 0.035 + Math.min(intensity, 1) * 0.07;
  gain.gain.setValueAtTime(vol, now);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.09);
  src.connect(lowpass);
  lowpass.connect(gain);
  gain.connect(ctx.destination);
  src.start(now);
  src.stop(now + 0.1);
};

// C: Mechanical — a tiny pitched tick, like a clock escapement or geiger counter.
const clickMechanical = (intensity: number) => {
  const ctx = getCtx();
  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = 'square';
  osc.frequency.setValueAtTime(1400, now);
  osc.frequency.exponentialRampToValueAtTime(500, now + 0.018);
  const vol = 0.03 + Math.min(intensity, 1) * 0.06;
  gain.gain.setValueAtTime(vol, now);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.02);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(now);
  osc.stop(now + 0.025);
};

// D: Retro — 8-bit blip, pitch rises with scroll speed. Playful, game-like.
const clickRetro = (intensity: number) => {
  const ctx = getCtx();
  // Schedule slightly ahead so resume() has time to activate before note fires.
  const now = ctx.currentTime + 0.01;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = 'square';
  const freq = 380 + Math.min(intensity, 1) * 520;
  osc.frequency.setValueAtTime(freq, now);
  const vol = 0.06 + Math.min(intensity, 1) * 0.08;
  gain.gain.setValueAtTime(vol, now);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.04);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(now);
  osc.stop(now + 0.05);
};

const fireSpokeClick = (variant: SpokeVariant, intensity: number) => {
  try {
    switch (variant) {
      case 'soft':
        clickSoft(intensity);
        break;
      case 'mechanical':
        clickMechanical(intensity);
        break;
      case 'retro':
        clickRetro(intensity);
        break;
      default:
        clickClassic(intensity);
    }
  } catch (_) {
    // ignore
  }
};

// Demo a variant: ticks slow-to-fast over ~850ms, just like accelerating
// through a real scroll, so you can judge how it sounds at every speed.
export const previewSpokeVariant = (variant: SpokeVariant) => {
  const delays = [0, 170, 320, 450, 555, 640, 705, 750, 782, 805, 822, 834, 843, 850, 856, 861, 865, 869, 872, 875];
  delays.forEach((delay, i) => {
    setTimeout(() => fireSpokeClick(variant, Math.min(1, i / 12)), delay);
  });
};

class SpokeCardSound {
  variant: SpokeVariant = 'classic';
  private lastValue = 0;
  private hasLast = false;
  private accumulator = 0;
  private readonly stepSize = 0.012; // progress distance per click

  setVariant(variant: SpokeVariant) {
    this.variant = variant;
  }

  // value: 0..1 scroll progress (e.g. scrollYProgress.get())
  update(value: number) {
    if (!this.hasLast) {
      this.lastValue = value;
      this.hasLast = true;
      return;
    }
    const delta = Math.abs(value - this.lastValue);
    const speed = delta;
    this.lastValue = value;
    this.accumulator += delta;

    let fired = 0;
    while (this.accumulator >= this.stepSize && fired < 6) {
      this.accumulator -= this.stepSize;
      fireSpokeClick(this.variant, speed / 0.03);
      fired++;
    }
    if (fired > 0) haptic(3);
  }

  reset() {
    this.hasLast = false;
    this.accumulator = 0;
  }
}

export const spokeCardSound = new SpokeCardSound();

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
