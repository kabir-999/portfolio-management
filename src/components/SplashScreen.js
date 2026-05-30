import React from 'react';
import './SplashScreen.css';
import Plasma from './Plasma';

export default function SplashScreen({ onFinish }) {
  // Automatically hide splash after 4s (4000ms)
  React.useEffect(() => {
    const timer = setTimeout(() => {
      if (onFinish) onFinish();
    }, 4000);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="splash-overlay">
      <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
        <Plasma 
          color="#3c6e71"
          speed={0.4} // Elegant slow speed
          direction="forward"
          scale={1}
          opacity={1}
          mouseInteractive={false}
        />
      </div>
      <div className="splash-center">
        <div className="splash-brand">KABIR MATHUR</div>
        <div className="splash-loader-bar">
          <div className="splash-loader-progress"></div>
        </div>
      </div>
    </div>
  );
} 