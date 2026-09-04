import React, { useState, useEffect } from 'react';
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
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isAnimating, currentSlide, totalSlides]);

  const progress = ((currentSlide + 1) / totalSlides) * 100;
  
  // Extract color from slide markup via dirty hack, or just default to cyan for now
  // We'll update this in Chunk 2 when we port the slides as objects { color, component }
  const themeColor = config.theme.colors.cyan;

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
        {slides.map((SlideComponent, index) => (
          <SlideComponent key={index} active={index === currentSlide} />
        ))}
      </div>
    </div>
  );
}

export default App;
