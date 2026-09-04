import React, { useEffect, useState } from 'react';

export default function ZoomPanOverlay() {
  const [scale, setScale] = useState(1);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleWheel = (e) => {
      if (e.ctrlKey || e.metaKey) return; // Allow native zoom?
      e.preventDefault();
      setScale(s => {
        const newScale = s + (e.deltaY > 0 ? -0.1 : 0.1);
        return Math.min(Math.max(1, newScale), 4); // 1x to 4x
      });
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, []);

  // Apply transform to the app container
  useEffect(() => {
    const container = document.getElementById('root');
    if (container) {
      container.style.transition = isDragging ? 'none' : 'transform 0.2s ease-out';
      container.style.transform = `scale(\${scale}) translate(\${pos.x}px, \${pos.y}px)`;
      container.style.transformOrigin = 'center center';
    }
    
    return () => {
      if (container) {
        container.style.transition = 'all 0.3s';
        container.style.transform = 'none';
      }
    };
  }, [scale, pos, isDragging]);

  const handlePointerDown = (e) => {
    setIsDragging(true);
    setStartPos({ x: e.clientX - pos.x, y: e.clientY - pos.y });
  };

  const handlePointerMove = (e) => {
    if (!isDragging) return;
    setPos({
      x: e.clientX - startPos.x,
      y: e.clientY - startPos.y
    });
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0, bottom: 0,
        zIndex: 9997,
        cursor: isDragging ? 'grabbing' : 'grab',
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
    >
      <div style={{
        position: 'absolute', top: '2rem', left: '50%', transform: 'translateX(-50%)',
        background: 'rgba(15,23,42,0.9)', padding: '0.5rem 1.5rem', borderRadius: '20px',
        color: '#fff', fontFamily: 'monospace', border: '1px solid var(--cyan)',
        pointerEvents: 'none'
      }}>
        Zoom: {Math.round(scale * 100)}% (Scroll to zoom, Drag to pan)
      </div>
    </div>
  );
}
