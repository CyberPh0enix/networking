import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, animate, AnimatePresence } from 'motion/react';
import { audio } from '../../utils/audioEngine';
import './FloatingToolkit.css';
import WhiteboardCanvas from './WhiteboardCanvas';
import MagicTimer from './MagicTimer';

const BUTTON_SIZE = 60;
const MARGIN = 20;
const RADIUS = 80; // Distance of tools from main button

const TOOLS = [
  { id: 'whiteboard', icon: 'M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z' }, // Pen
  { id: 'timer', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' }, // Clock
  { id: 'focus', icon: 'M15 12a3 3 0 11-6 0 3 3 0 016 0z M2 12h4 M18 12h4 M12 2v4 M12 18v4' }, // Target/Crosshair
];

export default function FloatingToolkit({ currentSlide }) {
  const [isOpen, setIsOpen] = useState(false);
  const [snapEdge, setSnapEdge] = useState('left');
  
  // Active tool states
  const [activeTool, setActiveTool] = useState(null);

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
    } else {
      audio.playSweep(true);
      setIsOpen(true);
    }
  };

  const handleToolClick = (toolId) => {
    audio.playClick();
    if (activeTool === toolId) {
      setActiveTool(null); // toggle off
    } else {
      setActiveTool(toolId);
    }
    setIsOpen(false); // Close menu when a tool is selected
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
          {isOpen && TOOLS.map((tool, index) => {
            const pos = getToolPosition(index, TOOLS.length);
            return (
              <motion.button
                key={tool.id}
                className={`toolkit-tool-btn ${activeTool === tool.id ? 'active' : ''}`}
                initial={{ opacity: 0, x: 0, y: 0, scale: 0 }}
                animate={{ opacity: 1, x: pos.x, y: pos.y, scale: 1 }}
                exit={{ opacity: 0, x: 0, y: 0, scale: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 20, delay: index * 0.05 }}
                onClick={() => handleToolClick(tool.id)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onHoverStart={() => audio.playHover()}
              >
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
                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                    <circle cx="12" cy="12" r="10" strokeDasharray="15 45" strokeWidth="2" />
                    <path d="M12 8l4 4-4 4" />
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
        
        {activeTool === 'timer' && (
          <MagicTimer 
            key="timer"
            onClose={() => { setActiveTool(null); audio.playSweep(false); }} 
          />
        )}
      </AnimatePresence>
    </>
  );
}
