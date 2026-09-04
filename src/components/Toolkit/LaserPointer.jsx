import React, { useEffect, useRef, useState } from 'react';
import './LaserPointer.css';

export default function LaserPointer() {
  const canvasRef = useRef(null);
  const pointsRef = useRef([]);
  const [color, setColor] = useState('#06b6d4'); // Default Cyan

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    const handlePointerMove = (e) => {
      pointsRef.current.push({
        x: e.clientX,
        y: e.clientY,
        time: performance.now()
      });
    };

    window.addEventListener('pointermove', handlePointerMove);

    let animationId;
    const render = (time) => {
      ctx.clearRect(0, 0, width, height);

      // Filter points older than 4 seconds
      pointsRef.current = pointsRef.current.filter(p => time - p.time < 4000);

      if (pointsRef.current.length > 1) {
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';
        
        // Draw segmented paths to allow fading gradient per segment
        for (let i = 1; i < pointsRef.current.length; i++) {
          const p1 = pointsRef.current[i - 1];
          const p2 = pointsRef.current[i];
          const age = time - p2.time; // 0 to 4000
          
          // opacity goes from 1.0 down to 0 over 4000ms
          let opacity = 1 - (age / 4000);
          if (opacity < 0) opacity = 0;

          // Convert hex to rgba for stroke
          let r = 0, g = 0, b = 0;
          if (color === '#f43f5e') { r = 244; g = 63; b = 94; }
          else if (color === '#06b6d4') { r = 6; g = 182; b = 212; }
          else if (color === '#10b981') { r = 16; g = 185; b = 129; }

          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          
          // Thicker head, thinner tail
          const widthBase = Math.max(1, 8 * opacity);
          ctx.lineWidth = widthBase;
          ctx.strokeStyle = `rgba(\${r}, \${g}, \${b}, \${opacity})`;
          ctx.stroke();
          
          // Glow effect
          ctx.lineWidth = widthBase * 3;
          ctx.strokeStyle = `rgba(\${r}, \${g}, \${b}, \${opacity * 0.3})`;
          ctx.stroke();
        }
      }

      animationId = requestAnimationFrame(render);
    };
    
    animationId = requestAnimationFrame(render);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
    };
  }, [color]);

  return (
    <div className="laser-pointer-container">
      <canvas ref={canvasRef} className="laser-canvas" />
      <div className="laser-toolbar">
        <button 
          className={`laser-btn \${color === '#06b6d4' ? 'active' : ''}`} 
          style={{ background: '#06b6d4' }}
          onClick={() => setColor('#06b6d4')}
        />
        <button 
          className={`laser-btn \${color === '#10b981' ? 'active' : ''}`} 
          style={{ background: '#10b981' }}
          onClick={() => setColor('#10b981')}
        />
        <button 
          className={`laser-btn \${color === '#f43f5e' ? 'active' : ''}`} 
          style={{ background: '#f43f5e' }}
          onClick={() => setColor('#f43f5e')}
        />
      </div>
    </div>
  );
}
