"use client";
import { useRef, useState } from 'react';
import { motion } from 'motion/react';

const playTapePeel = () => {
  try {
    const audio = new Audio('/tear.wav');
    audio.volume = 0.8;
    audio.play();
  } catch (_) {}
};

type PolaroidData = {
  src: string;
  caption: string;
  rotate: number;
  x: string;
  y: string;
  imgPosition?: string;
};

const polaroids: PolaroidData[] = [
  {
    src: '/beyond-design/bungee.jpg',
    caption: 'leap of faith',
    rotate: -8,
    x: '0%',
    y: '5%',
  },
  {
    src: '/beyond-design/pool.jpg',
    caption: 'rack \'em up',
    rotate: 5,
    x: '13%',
    y: '45%',
  },
  {
    src: '/beyond-design/team.jpg',
    caption: 'work fam',
    rotate: -3,
    x: '26.5%',
    y: '7%',
    imgPosition: '20% center',
  },
  {
    src: '/beyond-design/tiger.jpg',
    caption: 'spotted one',
    rotate: 6,
    x: '40%',
    y: '47%',
  },
  {
    src: '/beyond-design/rafting.jpg',
    caption: 'white water',
    rotate: -5,
    x: '53.5%',
    y: '5%',
    imgPosition: '75% center',
  },
  {
    src: '/beyond-design/bowling.jpg',
    caption: 'strike mode',
    rotate: 4,
    x: '67%',
    y: '45%',
  },
  {
    src: '/beyond-design/cat.jpg',
    caption: 'home base',
    rotate: -6,
    x: '80%',
    y: '9%',
  },
];

const Polaroid = ({
  p,
  containerRef,
  zIndex,
  onFocus,
}: {
  p: typeof polaroids[0];
  containerRef: React.RefObject<HTMLDivElement>;
  zIndex: number;
  onFocus: () => void;
}) => {
  const [dragging, setDragging] = useState(false);

  return (
    <motion.div
      drag
      dragConstraints={containerRef}
      dragElastic={0.12}
      dragMomentum={false}
      onDragStart={() => { setDragging(true); onFocus(); playTapePeel(); }}
      onDragEnd={() => setDragging(false)}
      onMouseDown={onFocus}
      initial={{ opacity: 0, y: 40, rotate: p.rotate }}
      whileInView={{ opacity: 1, y: 0, rotate: p.rotate }}
      viewport={{ once: true, amount: 0.2 }}
      whileHover={{ scale: 1.04, rotate: 0 }}
      whileDrag={{ scale: 1.08, rotate: 0 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      className="absolute cursor-grab active:cursor-grabbing select-none touch-none"
      style={{
        left: p.x,
        top: p.y,
        zIndex,
        width: 'clamp(150px, 16vw, 205px)',
      }}
    >
      {/* Polaroid frame */}
      <div
        className={`bg-white p-2.5 pb-3 rounded-[4px] transition-shadow duration-300 ${
          dragging
            ? 'shadow-[0_24px_60px_rgba(0,0,0,0.3)]'
            : 'shadow-[0_8px_28px_rgba(0,0,0,0.16)]'
        }`}
      >
        {/* Tape strip */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 bg-white/50 backdrop-blur-[1px] border border-black/[0.04] rotate-[-2deg] rounded-[1px] pointer-events-none" />

        <div className="aspect-square overflow-hidden bg-black/5 pointer-events-none">
          <img
            src={p.src}
            alt={p.caption}
            draggable={false}
            className="w-full h-full object-cover"
            style={{ objectPosition: p.imgPosition ?? 'center' }}
          />
        </div>
        <p
          className="text-center text-black/70 mt-2.5 text-[14px] leading-none pointer-events-none"
          style={{ fontFamily: "'Caveat', 'Comic Sans MS', cursive" }}
        >
          {p.caption}
        </p>
      </div>
    </motion.div>
  );
};

export const BeyondDesignSection = () => {
  const boardRef = useRef<HTMLDivElement>(null!);
  const [stack, setStack] = useState<number[]>(polaroids.map((_, i) => i));

  const bringToFront = (i: number) => {
    setStack(prev => [...prev.filter(n => n !== i), i]);
  };

  return (
    <section id="beyond-design" className="relative z-1 py-20 sm:py-28 px-5 sm:px-8 md:px-10">
      <div className="max-w-[1200px] mx-auto w-full">

        {/* Header */}
        <div className="mb-10 space-y-5">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center text-[13px] text-black/50 font-mono">
              05
            </div>
            <div className="tracking-wide font-mono text-[13px] text-black/60 uppercase">
              Beyond <span className="text-blue-600 font-bold ml-1">///</span>
            </div>
          </div>

          <h2
            className="tracking-tight font-semibold text-black max-w-4xl"
            style={{
              fontFamily: 'var(--font-heading)',
              lineHeight: '1.05',
              fontSize: 'clamp(42px, 6vw, 76px)',
            }}
          >
            Beyond Design
          </h2>

          <p className="text-[18px] sm:text-[20px] text-black/50 max-w-xl leading-relaxed">
            Life off-screen - grab a photo and move it around.
          </p>
        </div>

        {/* Pinboard */}
        <div
          ref={boardRef}
          className="relative h-[480px] sm:h-[560px] rounded-3xl border border-black/[0.07] bg-black/[0.015] overflow-hidden"
        >
          {/* Dotted board texture */}
          <div
            className="absolute inset-0 opacity-[0.35] pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.14) 1px, transparent 1px)',
              backgroundSize: '22px 22px',
            }}
          />

          {/* Corner label */}
          <span className="absolute bottom-4 right-5 font-mono text-[10px] uppercase tracking-widest text-black/25 pointer-events-none">
            drag me ↯
          </span>

          {polaroids.map((p, i) => (
            <Polaroid
              key={p.caption}
              p={p}
              containerRef={boardRef}
              zIndex={stack.indexOf(i) + 1}
              onFocus={() => bringToFront(i)}
            />
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-black/10">
          <p className="text-[16px] sm:text-[18px] leading-relaxed text-black/50 max-w-3xl">
            Life outside design keeps me grounded and curious. The best ideas rarely come
            from staring at a screen - they emerge during a game, on a trail, or in a
            conversation with someone from a completely different world.
          </p>
        </div>

      </div>
    </section>
  );
};
