import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import './FocusSpotlight.css';

export default function FocusSpotlight({ onClose }) {
  const [mousePos, setMousePos] = useState({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const [radius, setRadius] = useState(120); // Default spotlight radius

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    
    const handleWheel = (e) => {
      // Prevent default page scroll
      e.preventDefault();
      // Increase/decrease radius based on scroll direction
      setRadius(r => Math.max(50, Math.min(r - e.deltaY * 0.5, 600)));
    };
    
    // Listen on document to catch mouse even if dragging fast
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('wheel', handleWheel);
    };
  }, []);

  // Handle keyboard ESC to close
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <motion.div 
      className="focus-spotlight-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      style={{
        background: `radial-gradient(circle ${radius}px at ${mousePos.x}px ${mousePos.y}px, transparent 0%, rgba(0,0,0,0.85) 100%)`
      }}
    >
      <div className="spotlight-hint">
        Scroll to adjust size • Click anywhere or press ESC to dismiss
      </div>
    </motion.div>
  );
}
