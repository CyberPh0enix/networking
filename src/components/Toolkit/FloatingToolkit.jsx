import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, animate } from 'motion/react';
import { audio } from '../../utils/audioEngine';
import WhiteboardCanvas from './WhiteboardCanvas';
import MagicTimer from './MagicTimer';
import FocusSpotlight from './FocusSpotlight';
import LaserPointer from './LaserPointer';
import DecoderRing from './DecoderRing';
import BinaryRain from './BinaryRain';
import ZoomPanOverlay from './ZoomPanOverlay';
import './FloatingToolkit.css';

const BUTTON_SIZE = 60;
const MARGIN = 20;
const RADIUS = 85;

const MENU_STRUCTURE = {
  main: [
    { id: 'cat_draw', label: 'Draw', icon: 'M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z' },
    { id: 'cat_focus', label: 'Focus', icon: 'M15 12a3 3 0 11-6 0 3 3 0 016 0z M2 12h4 M18 12h4 M12 2v4 M12 18v4' },
    { id: 'cat_utils', label: 'Utils', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
    { id: 'cat_fx', label: 'FX', icon: 'M13 10V3L4 14h7v7l9-11h-7z' }
  ],
  cat_draw: [
    { id: 'whiteboard', label: 'Whiteboard', icon: 'M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z' },
    { id: 'laser', label: 'Laser Pointer', icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z' },
    { id: 'back', label: 'Back', icon: 'M10 19l-7-7m0 0l7-7m-7 7h18' }
  ],
  cat_focus: [
    { id: 'focus', label: 'Spotlight', icon: 'M15 12a3 3 0 11-6 0 3 3 0 016 0z M2 12h4 M18 12h4 M12 2v4 M12 18v4' },
    { id: 'zoom', label: 'Zoom/Pan', icon: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z M10 7v3m0 0v3m0-3h3m-3 0H7' },
    { id: 'back', label: 'Back', icon: 'M10 19l-7-7m0 0l7-7m-7 7h18' }
  ],
  cat_utils: [
    { id: 'timer', label: 'Magic Timer', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
    { id: 'decoder', label: 'Decoder Ring', icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z' },
    { id: 'back', label: 'Back', icon: 'M10 19l-7-7m0 0l7-7m-7 7h18' }
  ],
  cat_fx: [
    { id: 'rain', label: 'Binary Rain', icon: 'M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12' },
    { id: 'glitch', label: 'Glitch Trigger', icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
    { id: 'sound_bass', label: 'Bass Drop', icon: 'M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2z' },
    { id: 'sound_alert', label: 'Alert Sound', icon: 'M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9' },
    { id: 'sound_access', label: 'Access Granted', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
    { id: 'back', label: 'Back', icon: 'M10 19l-7-7m0 0l7-7m-7 7h18' }
  ]
};

export default function FloatingToolkit({ currentSlide }) {
  const [isOpen, setIsOpen] = useState(false);
  const [snapEdge, setSnapEdge] = useState('left');
  const [currentCategory, setCurrentCategory] = useState('main');
  const [isDecoderOpen, setIsDecoderOpen] = useState(false);
  const [isRainOpen, setIsRainOpen] = useState(false);
  
  // Active tool states
  const [activeTool, setActiveTool] = useState(null); // whiteboard, focus
  const [isTimerOpen, setIsTimerOpen] = useState(false);

  const x = useMotionValue(MARGIN);
  const y = useMotionValue(0);

  // Center vertically on mount
  useEffect(() => {
    y.set(window.innerHeight / 2 - BUTTON_SIZE / 2);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleOpen = () => {
    audio.init();
    if (isOpen) {
      audio.playSweep(false);
      setIsOpen(false);
      setCurrentCategory('main');
    } else {
      audio.playSweep(true);
      setIsOpen(true);
    }
  };

  const handleToolClick = (toolId) => {
    audio.playClick();
    
    // Category navigation
    if (toolId.startsWith('cat_')) {
      setCurrentCategory(toolId);
      return;
    }
    if (toolId === 'back') {
      setCurrentCategory('main');
      return;
    }
    
    // Soundboard
    if (toolId === 'sound_bass') return audio.playBassDrop();
    if (toolId === 'sound_alert') return audio.playAlert();
    if (toolId === 'sound_access') return audio.playAccessGranted();
    
    // FX
    if (toolId === 'glitch') {
      document.body.classList.add('glitch-active');
      setTimeout(() => document.body.classList.remove('glitch-active'), 1000);
      return;
    }
    if (toolId === 'rain') {
      setIsRainOpen(true);
      setIsOpen(false);
      setCurrentCategory('main');
      return;
    }

    // Utils
    if (toolId === 'timer') {
      setIsTimerOpen(!isTimerOpen);
    } else if (toolId === 'decoder') {
      setIsDecoderOpen(!isDecoderOpen);
    } else {
      if (activeTool === toolId) {
        setActiveTool(null); // toggle off
      } else {
        setActiveTool(toolId);
      }
    }
    setIsOpen(false);
    setCurrentCategory('main');
  };

  const handleDragEnd = (event, info) => {
    const currentX = x.get();
    const currentY = y.get();

    if (Math.abs(info.offset.x) < 5 && Math.abs(info.offset.y) < 5) return;

    const distLeft = currentX;
    const distRight = window.innerWidth - currentX - BUTTON_SIZE;
    const distTop = currentY;
    const distBottom = window.innerHeight - currentY - BUTTON_SIZE;

    const minDist = Math.min(distLeft, distRight, distTop, distBottom);
    const springConfig = { type: "spring", stiffness: 300, damping: 25 };

    if (minDist === distLeft) {
      animate(x, MARGIN, springConfig);
      setSnapEdge('left');
    } else if (minDist === distRight) {
      animate(x, window.innerWidth - BUTTON_SIZE - MARGIN, springConfig);
      setSnapEdge('right');
    } else if (minDist === distTop) {
      animate(y, MARGIN, springConfig);
      setSnapEdge('top');
    } else {
      animate(y, window.innerHeight - BUTTON_SIZE - MARGIN, springConfig);
      setSnapEdge('bottom');
    }
    
    // Bounds check for the non-snapped axis
    if (minDist === distLeft || minDist === distRight) {
      if (currentY < MARGIN) animate(y, MARGIN, springConfig);
      if (currentY > window.innerHeight - BUTTON_SIZE - MARGIN) animate(y, window.innerHeight - BUTTON_SIZE - MARGIN, springConfig);
    } else {
      if (currentX < MARGIN) animate(x, MARGIN, springConfig);
      if (currentX > window.innerWidth - BUTTON_SIZE - MARGIN) animate(x, window.innerWidth - BUTTON_SIZE - MARGIN, springConfig);
    }

    audio.playSnap();
  };

  // Calculate angles based on snap edge
  const getToolPosition = (index, total) => {
    let startAngle = 0;
    let endAngle = Math.PI;

    if (snapEdge === 'left') { startAngle = -Math.PI/2; endAngle = Math.PI/2; }
    else if (snapEdge === 'right') { startAngle = Math.PI/2; endAngle = 3*Math.PI/2; }
    else if (snapEdge === 'top') { startAngle = 0; endAngle = Math.PI; }
    else if (snapEdge === 'bottom') { startAngle = Math.PI; endAngle = 2*Math.PI; }

    // Spread tools evenly across the arc
    const angleStep = (endAngle - startAngle) / (total - 1 || 1);
    const angle = startAngle + (angleStep * index);

    // If there's only one tool or we want to condense the arc, we adjust.
    // For 3 tools, a 180-degree spread might be too wide, let's condense it slightly.
    const condensedAngle = startAngle + (Math.PI / 4) + ( (Math.PI / 2) / (total - 1) ) * index;
    
    // Using condensed arc (90 degrees instead of 180) looks better for fewer tools
    const finalAngle = total > 1 ? condensedAngle : startAngle + Math.PI/2;

    return {
      x: Math.cos(finalAngle) * RADIUS,
      y: Math.sin(finalAngle) * RADIUS
    };
  };

  return (
    <>
      <motion.div
        className="floating-toolkit-container"
        style={{ x, y }}
        drag
        dragMomentum={false}
        onDragEnd={handleDragEnd}
        onPointerDown={() => audio.init()}
      >
        <AnimatePresence>
          {isOpen && (MENU_STRUCTURE[currentCategory] || MENU_STRUCTURE.main).map((tool, index) => {
            const currentMenu = MENU_STRUCTURE[currentCategory] || MENU_STRUCTURE.main;
            const pos = getToolPosition(index, currentMenu.length);
            const isActive = tool.id === 'timer' ? isTimerOpen : tool.id === 'decoder' ? isDecoderOpen : activeTool === tool.id;
            return (
              <motion.button
                key={tool.id}
                className={`toolkit-tool-btn ${isActive ? 'active' : ''}`}
                initial={{ opacity: 0, x: 0, y: 0, scale: 0 }}
                animate={{ opacity: 1, x: pos.x, y: pos.y, scale: 1 }}
                exit={{ opacity: 0, x: 0, y: 0, scale: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 20, delay: index * 0.05 }}
                onClick={() => handleToolClick(tool.id)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onHoverStart={() => audio.playHover()}
              >
                <div className="tooltip">{tool.label}</div>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d={tool.icon} />
                </svg>
              </motion.button>
            );
          })}
        </AnimatePresence>

        <motion.button 
          className="toolkit-btn"
          onClick={toggleOpen}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onHoverStart={() => audio.playHover()}
        >
          <div className="toolkit-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.g key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </motion.g>
                ) : (
                  <motion.g key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    {/* Clean Command Node Icon */}
                    <polygon points="12 2 20.66 7 20.66 17 12 22 3.34 17 3.34 7" strokeDasharray="60" strokeDashoffset="0" />
                    <circle cx="12" cy="12" r="3" />
                  </motion.g>
                )}
              </AnimatePresence>
            </svg>
          </div>
        </motion.button>
      </motion.div>

      {/* Inject tools here. They render at root level so they don't move with the dragging button */}
      <AnimatePresence>
        {activeTool === 'whiteboard' && (
          <WhiteboardCanvas 
            key="whiteboard"
            currentSlide={currentSlide} 
            onClose={() => { setActiveTool(null); audio.playSweep(false); }} 
          />
        )}
        
        {isTimerOpen && (
          <MagicTimer 
            key="timer"
            onClose={() => { setIsTimerOpen(false); audio.playSweep(false); }} 
          />
        )}
        
        {activeTool === 'focus' && (
          <FocusSpotlight 
            key="focus"
            onClose={() => { setActiveTool(null); audio.playSweep(false); }} 
          />
        )}
        {activeTool === 'laser' && (
          <LaserPointer key="laser" />
        )}
        
        {activeTool === 'zoom' && (
          <ZoomPanOverlay key="zoom" />
        )}
        
        {isDecoderOpen && (
          <DecoderRing key="decoder" onClose={() => setIsDecoderOpen(false)} />
        )}
        
        {isRainOpen && (
          <BinaryRain key="rain" onClose={() => setIsRainOpen(false)} />
        )}
      </AnimatePresence>

    </>
  );
}
