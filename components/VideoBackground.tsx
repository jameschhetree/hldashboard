'use client';

import { useEffect, useRef } from 'react';

export default function VideoBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      // Force play
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.error('Video autoplay failed:', error);
        });
      }
      
      // Add event listeners for debugging
      video.addEventListener('loadeddata', () => {
        console.log('Video loaded successfully');
      });
      
      video.addEventListener('error', (e) => {
        console.error('Video error:', e);
      });
    }
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full -z-[3]">
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="w-full h-full object-cover"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
      >
        <source src="/videos/background.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}
