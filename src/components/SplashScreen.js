import React from 'react';
import './SplashScreen.css';

export default function SplashScreen({ onFinish }) {
  React.useEffect(() => {
    const timer = setTimeout(() => {
      if (onFinish) onFinish();
    }, 2600);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="splash-overlay">
      <div className="splash-stars" aria-hidden="true" />
      <div className="splash-center">
        <div className="splash-ring">
          <div className="splash-ring-inner" />
          <span className="splash-node splash-node-1" />
          <span className="splash-node splash-node-2" />
          <span className="splash-node splash-node-3" />
        </div>
        <div className="splash-brand">KABIR MATHUR</div>
        <div className="splash-tagline">Initializing neural cosmos…</div>
        <div className="splash-loader-bar">
          <div className="splash-loader-progress"></div>
        </div>
      </div>
    </div>
  );
}
