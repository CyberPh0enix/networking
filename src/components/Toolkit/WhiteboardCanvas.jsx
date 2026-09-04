import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { audio } from '../../utils/audioEngine';
import './WhiteboardCanvas.css';

// Global cache for persisting drawings across slide changes
const slideDrawingsCache = {};

const PRESET_COLORS = ['#00f0ff', '#ff0055', '#00ffaa', '#ffe600', '#ffffff'];

export default function WhiteboardCanvas({ currentSlide, onClose }) {
  const canvasRef = useRef(null);
  const [color, setColor] = useState(PRESET_COLORS[0]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [paths, setPaths] = useState([]);
  
  // Current stroke being drawn
  const currentPath = useRef([]);

  // Load drawings from cache on mount or slide change
  useEffect(() => {
    const cachedPaths = slideDrawingsCache[currentSlide] || [];
    setPaths(cachedPaths);
    redraw(cachedPaths);
  }, [currentSlide]);

  const redraw = (pathsToDraw) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineWidth = 4;

    pathsToDraw.forEach(path => {
      if (path.points.length < 2) return;
      ctx.strokeStyle = path.color;
      ctx.beginPath();
      ctx.moveTo(path.points[0].x, path.points[0].y);
      
      // Quadratic Bezier curve smoothing
      for (let i = 1; i < path.points.length - 2; i++) {
        const xc = (path.points[i].x + path.points[i + 1].x) / 2;
        const yc = (path.points[i].y + path.points[i + 1].y) / 2;
        ctx.quadraticCurveTo(path.points[i].x, path.points[i].y, xc, yc);
      }
      
      // Curve through the last two points
      const len = path.points.length;
      if (len > 2) {
        ctx.quadraticCurveTo(
          path.points[len - 2].x, path.points[len - 2].y,
          path.points[len - 1].x, path.points[len - 1].y
        );
      }
      ctx.stroke();
    });
  };

  const handlePointerDown = (e) => {
    setIsDrawing(true);
    const { clientX, clientY } = e;
    currentPath.current = [{ x: clientX, y: clientY }];
  };

  const handlePointerMove = (e) => {
    if (!isDrawing) return;
    const { clientX, clientY } = e;
    currentPath.current.push({ x: clientX, y: clientY });
    
    // Efficiently just draw the new segment rather than a full redraw for performance
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.strokeStyle = color;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineWidth = 4;
    
    const len = currentPath.current.length;
    if (len >= 2) {
      ctx.beginPath();
      const p1 = currentPath.current[len - 2];
      const p2 = currentPath.current[len - 1];
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.stroke();
    }
  };

  const handlePointerUp = () => {
    if (!isDrawing) return;
    setIsDrawing(false);
    
    const newPaths = [...paths, { color, points: currentPath.current }];
    setPaths(newPaths);
    slideDrawingsCache[currentSlide] = newPaths; // Save to global cache
    currentPath.current = [];
    
    // Do a full redraw to apply bezier smoothing to the raw segmented path we just live-drew
    redraw(newPaths);
  };

  const clearCanvas = () => {
    audio.playClick();
    setPaths([]);
    slideDrawingsCache[currentSlide] = [];
    redraw([]);
  };

  // Handle resize
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        redraw(paths);
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize(); // Initial sizing
    return () => window.removeEventListener('resize', handleResize);
  }, [paths]);

  return (
    <motion.div 
      className="whiteboard-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <canvas
        ref={canvasRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        className="whiteboard-canvas"
      />
      
      <motion.div 
        className="whiteboard-toolbar"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 50, opacity: 0 }}
      >
        <div className="wb-colors">
          {PRESET_COLORS.map(c => (
            <button
              key={c}
              className={`wb-color-btn ${color === c ? 'active' : ''}`}
              style={{ backgroundColor: c }}
              onClick={() => { setColor(c); audio.playClick(); }}
            />
          ))}
          <div className="wb-color-picker-wrapper">
            <input 
              type="color" 
              value={color} 
              onChange={(e) => setColor(e.target.value)}
              className="wb-color-picker"
            />
          </div>
        </div>
        
        <div className="wb-actions">
          <button className="wb-action-btn" onClick={clearCanvas}>
            <i className="fa-solid fa-trash"></i> Clear
          </button>
          <button className="wb-action-btn close" onClick={onClose}>
            <i className="fa-solid fa-xmark"></i> Close
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
