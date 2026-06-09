import { useEffect, useRef, useState } from 'react';

const SENSITIVITY = 0.8;

export const BackgroundVideo = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const prevXRef = useRef<number>(0);
  const targetTimeRef = useRef<number>(0);
  const isSeekingRef = useRef<boolean>(false);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [showVideo, setShowVideo] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedMetadata = () => {
      setIsVideoReady(true);
    };

    video.addEventListener('loadedmetadata', handleLoadedMetadata);

    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const heroHeight = window.innerHeight;
      
      // Hide video after scrolling 50% past hero section
      setShowVideo(scrollPosition < heroHeight * 0.5);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!isVideoReady) return;

    const video = videoRef.current;
    if (!video) return;

    const handleMouseMove = (e: MouseEvent) => {
      const currentX = e.clientX;
      const delta = currentX - prevXRef.current;
      prevXRef.current = currentX;

      const timeOffset = (delta / window.innerWidth) * SENSITIVITY * video.duration;
      let newTargetTime = targetTimeRef.current + timeOffset;
      newTargetTime = Math.max(0, Math.min(newTargetTime, video.duration));
      targetTimeRef.current = newTargetTime;

      if (!isSeekingRef.current) {
        isSeekingRef.current = true;
        video.currentTime = targetTimeRef.current;
      }
    };

    const handleSeeked = () => {
      if (Math.abs(video.currentTime - targetTimeRef.current) > 0.1) {
        video.currentTime = targetTimeRef.current;
      } else {
        isSeekingRef.current = false;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    video.addEventListener('seeked', handleSeeked);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      video.removeEventListener('seeked', handleSeeked);
    };
  }, [isVideoReady]);

  return (
    <>
      {/* Warm neutral gradient matching the video's studio backdrop tone */}
      <div 
        className="fixed inset-0 w-full h-full z-[-2]"
        style={{
          background: 'linear-gradient(135deg, #d6d3cc 0%, #cdc9c1 25%, #c5c1b8 50%, #cdc9c1 75%, #d2cfc7 100%)',
          backgroundSize: '400% 400%',
          animation: 'gradientShift 20s ease infinite',
        }}
      />

      {/* Video background - always visible, blurred into texture when scrolled past hero */}
      <video
        ref={videoRef}
        className="fixed inset-0 w-full h-full object-cover z-[-1] transition-[filter,transform] duration-700"
        style={{ 
          objectPosition: '70% center',
          filter: showVideo ? 'none' : 'blur(28px) saturate(0.9)',
          transform: showVideo ? 'scale(1)' : 'scale(1.1)',
        }}
        muted
        playsInline
        preload="auto"
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260530_042513_df96a13b-6155-4f6e-8b93-c9dee66fba08.mp4"
      />

      {/* Warm scrim that fades in on content sections to soften the figure into abstract texture */}
      <div
        className="fixed inset-0 w-full h-full z-[-1] pointer-events-none transition-opacity duration-700"
        style={{
          background: 'linear-gradient(135deg, #d6d3cc 0%, #cdc9c1 50%, #d2cfc7 100%)',
          opacity: showVideo ? 0 : 0.82,
        }}
      />
    </>
  );
};
