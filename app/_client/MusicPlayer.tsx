'use client';

import { useState, useEffect, useRef } from 'react';

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [musicSrc, setMusicSrc] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const handleStorageChange = () => {
      const profile = localStorage.getItem('profile.eduLevel');
      console.log("MusicPlayer: Read profile from localStorage:", profile);
      if (profile === 'kid') {
        console.log("MusicPlayer: Setting music for kid.");
        setMusicSrc('/assets/music-kid.mp3');
      } else if (profile === 'student' || profile === 'professional') {
        console.log("MusicPlayer: Setting music for student/professional.");
        setMusicSrc('/assets/music-general.mp3');
      } else {
        console.log("MusicPlayer: No valid profile found.");
        setMusicSrc(null);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    handleStorageChange(); // Initial check

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  if (!musicSrc) {
    return null;
  }

  return (
    <div style={{ position: 'fixed', top: '20px', right: '100px', zIndex: 1000 }}>
      <audio ref={audioRef} src={musicSrc} loop />
      <button onClick={togglePlayPause} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'white', fontSize: '24px' }}>
        {isPlaying ? '❚❚' : '▶'}
      </button>
    </div>
  );
};

export default MusicPlayer;