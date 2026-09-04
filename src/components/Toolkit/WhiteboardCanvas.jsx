import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { audio } from '../../utils/audioEngine';
import './WhiteboardCanvas.css';

// Global cache for persisting drawings across slide changes
// Now stores: { paths: [], undoStack: [], redoStack: [] }
const slideDrawingsCache = {};

const PRESET_COLORS = ['#00f0ff', '#ff0055', '#00ffaa', '#ffe600', '#ffffff'];

export default function WhiteboardCanvas({ currentSlide, onClose }) {
  const canvasRef = useRef(null);
  const [color, setColor] = useState(PRESET_COLORS[0]);
  const [isEraser, setIsEraser] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);
  
  const [paths, setPaths] = useState([]);
  const [undoStack, setUndoStack] = useState([]);
  const [redoStack, setRedoStack] = useState([]);
  
  // Current stroke being drawn
  const currentPath = useRef([]);

  // Load drawings from cache on mount or slide change
  useEffect(() => {
    if (!slideDrawingsCache[currentSlide]) {
      slideDrawingsCache[currentSlide] = { paths: [], undoStack: [], redoStack: [] };
    }
    const cached = slideDrawingsCache[currentSlide];
    setPaths(cached.paths);
    setUndoStack(cached.undoStack);
    setRedoStack(cached.redoStack);
    redraw(cached.paths);
  }, [currentSlide]);

  // Sync state to cache whenever it changes
  useEffect(() => {
    slideDrawingsCache[currentSlide] = { paths, undoStack, redoStack };
  }, [paths, undoStack, redoStack, currentSlide]);

  const redraw = (pathsToDraw) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    pathsToDraw.forEach(path => {
      if (path.points.length < 2) return;
      
      ctx.globalCompositeOperation = path.isEraser ? 'destination-out' : 'source-over';
      ctx.strokeStyle = path.isEraser ? 'rgba(0,0,0,1)' : path.color;
      ctx.lineWidth = path.isEraser ? 30 : 4;
      
      ctx.beginPath();
      ctx.moveTo(path.points[0].x, path.points[0].y);
      
      // Quadratic Bezier curve smoothing
      for (let i = 1; i < path.points.length - 2; i++) {
        const xc = (path.points[i].x + path.points[i + 1].x) / 2;
        const yc = (path.points[i].y + path.points[i + 1].y) / 2;
        ctx.quadraticCurveTo(path.points[i].x, path.points[i].y, xc, yc);
      }
      
      const len = path.points.length;
      if (len > 2) {
        ctx.quadraticCurveTo(
          path.points[len - 2].x, path.points[len - 2].y,
          path.points[len - 1].x, path.points[len - 1].y
        );
      }
      ctx.stroke();
    });
    
    // Reset to default
    ctx.globalCompositeOperation = 'source-over';
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
    
    // Efficient live drawing
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.globalCompositeOperation = isEraser ? 'destination-out' : 'source-over';
    ctx.strokeStyle = isEraser ? 'rgba(0,0,0,1)' : color;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineWidth = isEraser ? 30 : 4;
    
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
    
    if (currentPath.current.length < 2) {
      currentPath.current = [];
      return;
    }
    
    const newPath = { color, isEraser, points: currentPath.current };
    const newPaths = [...paths, newPath];
    
    setUndoStack([...undoStack, paths]); // push old state
    setRedoStack([]); // clear redo
    setPaths(newPaths);
    
    currentPath.current = [];
    redraw(newPaths); // smooth it out
  };

  const undo = () => {
    if (undoStack.length === 0) return;
    audio.playClick();
    const previousState = undoStack[undoStack.length - 1];
    setRedoStack([...redoStack, paths]);
    setUndoStack(undoStack.slice(0, -1));
    setPaths(previousState);
    redraw(previousState);
  };

  const redo = () => {
    if (redoStack.length === 0) return;
    audio.playClick();
    const nextState = redoStack[redoStack.length - 1];
    setUndoStack([...undoStack, paths]);
    setRedoStack(redoStack.slice(0, -1));
    setPaths(nextState);
    redraw(nextState);
  };

  const clearCanvas = () => {
    audio.playClick();
    setUndoStack([...undoStack, paths]);
    setRedoStack([]);
    setPaths([]);
    redraw([]);
  };

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
        className={`whiteboard-canvas ${isEraser ? 'eraser-mode' : ''}`}
      />
      
      <motion.div 
        className="whiteboard-toolbar"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 50, opacity: 0 }}
      >
        <div className="wb-colors">
          <button 
            className={`wb-tool-btn ${!isEraser ? 'active' : ''}`} 
            onClick={() => { setIsEraser(false); audio.playClick(); }}
            title="Pen"
          >
            <i className="fa-solid fa-pen"></i>
          </button>
          <button 
            className={`wb-tool-btn ${isEraser ? 'active' : ''}`} 
            onClick={() => { setIsEraser(true); audio.playClick(); }}
            title="Eraser"
          >
            <i className="fa-solid fa-eraser"></i>
          </button>
          
          <div className="wb-divider"></div>

          {!isEraser && PRESET_COLORS.map(c => (
            <button
              key={c}
              className={`wb-color-btn ${color === c ? 'active' : ''}`}
              style={{ backgroundColor: c }}
              onClick={() => { setColor(c); audio.playClick(); }}
            />
          ))}
          {!isEraser && (
            <div className="wb-color-picker-wrapper">
              <input 
                type="color" 
                value={color} 
                onChange={(e) => setColor(e.target.value)}
                className="wb-color-picker"
              />
            </div>
          )}
        </div>
        
        <div className="wb-actions">
          <button className="wb-action-btn" onClick={undo} disabled={undoStack.length === 0} title="Undo">
            <i className="fa-solid fa-rotate-left"></i>
          </button>
          <button className="wb-action-btn" onClick={redo} disabled={redoStack.length === 0} title="Redo">
            <i className="fa-solid fa-rotate-right"></i>
          </button>
          <div className="wb-divider"></div>
          <button className="wb-action-btn" onClick={clearCanvas} title="Clear All">
            <i className="fa-solid fa-trash"></i>
          </button>
          <button className="wb-action-btn close" onClick={onClose} title="Close Whiteboard">
            <i className="fa-solid fa-xmark"></i> Close
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
