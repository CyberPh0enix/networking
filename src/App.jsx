import React, { useState, useEffect, useRef } from 'react';
import { config } from './config.js';
import { slides } from './presentations/Networking.jsx';

function App() {
  const totalSlides = slides.length;

  const [currentSlide, setCurrentSlide] = useState(() => {
    const saved = localStorage.getItem("networking_slide_index");
    let initial = saved ? parseInt(saved, 10) : 0;
    if (initial >= totalSlides) initial = 0;
    return initial;
  });

  const [isAnimating, setIsAnimating] = useState(false);
  const [orbPositions, setOrbPositions] = useState({ p1x: 50, p1y: 50, p2x: 50, p2y: 50 });
  const touchStartX = useRef(0);

  useEffect(() => {
    localStorage.setItem("networking_slide_index", currentSlide);
    
    setOrbPositions({
      p1x: 10 + Math.random() * 30,
      p1y: 10 + Math.random() * 30,
      p2x: 60 + Math.random() * 30,
      p2y: 60 + Math.random() * 30,
    });
    
    const timer = setTimeout(() => setIsAnimating(false), 800);
    return () => clearTimeout(timer);
  }, [currentSlide]);

  const nextSlide = () => {
    if (isAnimating) return;
    if (currentSlide < totalSlides - 1) {
      setIsAnimating(true);
      setCurrentSlide(s => s + 1);
    }
  };

  const prevSlide = () => {
    if (isAnimating) return;
    if (currentSlide > 0) {
      setIsAnimating(true);
      setCurrentSlide(s => s - 1);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (["ArrowRight", " ", "PageDown"].includes(e.key)) {
        e.preventDefault();
        nextSlide();
      }
      if (["ArrowLeft", "PageUp"].includes(e.key)) {
        e.preventDefault();
        prevSlide();
      }
    };

    const handleTouchStart = (e) => {
      touchStartX.current = e.changedTouches[0].screenX;
    };

    const handleTouchEnd = (e) => {
      const touchEndX = e.changedTouches[0].screenX;
      const swipeThreshold = 50;
      if (touchEndX < touchStartX.current - swipeThreshold) {
        nextSlide();
      }
      if (touchEndX > touchStartX.current + swipeThreshold) {
        prevSlide();
      }
    };

    const handleDoubleClick = () => {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(console.error);
      } else {
        if (document.exitFullscreen) document.exitFullscreen();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("touchstart", handleTouchStart, { passive: true });
    document.addEventListener("touchend", handleTouchEnd, { passive: true });
    document.addEventListener("dblclick", handleDoubleClick);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchend", handleTouchEnd);
      document.removeEventListener("dblclick", handleDoubleClick);
    };
  }, [isAnimating, currentSlide, totalSlides]);

  const progress = ((currentSlide + 1) / totalSlides) * 100;
  
  const currentSlideObj = slides[currentSlide] || slides[0];
  const themeColor = config.theme.colors[currentSlideObj.color] || config.theme.colors.cyan;

  return (
    <div style={{ width: '100%', height: '100%' }}>
      {/* Ambient Background */}
      <div className="ambient-bg">
        <div className="glow-orb" id="orb1" style={{ background: themeColor.glow, transform: `translate3d(${orbPositions.p1x}vw, ${orbPositions.p1y}vh, 0)` }}></div>
        <div className="glow-orb" id="orb2" style={{ background: config.theme.colors.purple.glow, transform: `translate3d(${orbPositions.p2x}vw, ${orbPositions.p2y}vh, 0)` }}></div>
      </div>

      {/* UI Overlay */}
      <div className="progress-container">
        <div id="progress-bar" style={{ width: `${progress}%` }}></div>
      </div>
      
      <div className="global-footer">{config.presentation.footerText}</div>

      <div className="virtual-controls">
        <button className="control-btn" id="btn-prev" onClick={prevSlide}><i className="fa-solid fa-chevron-left"></i></button>
        <button className="control-btn" id="btn-next" onClick={nextSlide}><i className="fa-solid fa-chevron-right"></i></button>
      </div>

      {/* Presentation Deck */}
      <div id="deck">
        {slides.map((slideObj, index) => {
          const SlideComponent = slideObj.component;
          return <SlideComponent key={index} active={index === currentSlide} />;
        })}
      </div>
    </div>
  );
}

export default App;
