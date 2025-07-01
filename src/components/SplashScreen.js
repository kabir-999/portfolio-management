import React from 'react';
import './SplashScreen.css';
import LetterGlitch from './LetterGlitch';

export default function SplashScreen({ onFinish }) {
  // Automatically hide splash after 2.5s
  React.useEffect(() => {
    const timer = setTimeout(() => {
      if (onFinish) onFinish();
    }, 2500);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="splash-overlay">
      <LetterGlitch glitchSpeed={50} centerVignette={true} outerVignette={false} smooth={true} />
      <div className="splash-center">
        <div className="spinner">
          <div></div><div></div><div></div><div></div><div></div><div></div>
        </div>
        <div className="splash-title-glow">Kabir's Portfolio</div>
        <div className="splash-subtext">Loading the Matrix...</div>
      </div>
    </div>
  );
} 