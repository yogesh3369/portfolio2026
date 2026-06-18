import { useEffect, useRef, useState } from 'react';

export const CustomCursor = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: -200, y: -200 });
  const ringPos = useRef({ x: -200, y: -200 });
  const rafId = useRef<number>(0);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.left = `${e.clientX}px`;
        dotRef.current.style.top = `${e.clientY}px`;
      }
      const el = document.elementFromPoint(e.clientX, e.clientY);
      setIsHovering(!!el?.closest('a, button, [role="button"], input, textarea, select, label'));
    };

    const onDown = () => setIsClicking(true);
    const onUp = (e: MouseEvent) => {
      const el = document.elementFromPoint(e.clientX, e.clientY);
      setIsClicking(false);
      setIsHovering(!!el?.closest('a, button, [role="button"], input, textarea, select, label'));
    };

    document.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mousedown', onDown);
    document.addEventListener('mouseup', onUp);

    const animate = () => {
      const ease = 0.1;
      ringPos.current.x += (mouse.current.x - ringPos.current.x) * ease;
      ringPos.current.y += (mouse.current.y - ringPos.current.y) * ease;
      if (ringRef.current) {
        ringRef.current.style.left = `${ringPos.current.x}px`;
        ringRef.current.style.top = `${ringPos.current.y}px`;
      }
      rafId.current = requestAnimationFrame(animate);
    };
    rafId.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('mouseup', onUp);
      cancelAnimationFrame(rafId.current);
    };
  }, []);

  const dotSize = isClicking ? 3 : isHovering ? 10 : 6;
  const ringSize = isClicking ? 14 : isHovering ? 50 : 28;

  return (
    <>
      {/* Inner dot — snaps immediately */}
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          width: `${dotSize}px`,
          height: `${dotSize}px`,
          backgroundColor: 'white',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 99999,
          left: '-200px',
          top: '-200px',
          transform: 'translate(-50%, -50%)',
          transition: 'width 0.15s ease, height 0.15s ease',
          mixBlendMode: 'difference',
          willChange: 'left, top',
        }}
      />
      {/* Outer ring — lerps behind the dot */}
      <div
        ref={ringRef}
        style={{
          position: 'fixed',
          width: `${ringSize}px`,
          height: `${ringSize}px`,
          border: '1.5px solid white',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 99998,
          left: '-200px',
          top: '-200px',
          transform: 'translate(-50%, -50%)',
          transition: `width 0.35s cubic-bezier(0.34,1.56,0.64,1), height 0.35s cubic-bezier(0.34,1.56,0.64,1), opacity 0.2s ease`,
          opacity: isClicking ? 0.35 : 1,
          mixBlendMode: 'difference',
          willChange: 'left, top',
        }}
      />
    </>
  );
};
