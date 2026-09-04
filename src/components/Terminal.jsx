import React, { useState, useEffect } from 'react';
import { config } from '../config.js';

export const Terminal = ({ cmd, staggerClass = '', fontSize = '0.9rem', children }) => {
  const [typedCmd, setTypedCmd] = useState('');
  const [showOutput, setShowOutput] = useState(false);
  const promptText = config.presentation.terminalPrompt || "[px@archlinux ~]$";

  useEffect(() => {
    // Reset state on unmount or cmd change
    setTypedCmd('');
    setShowOutput(false);

    if (!cmd) {
      setShowOutput(true);
      return;
    }

    let i = 0;
    const typeInterval = setInterval(() => {
      setTypedCmd(cmd.substring(0, i + 1));
      i++;
      if (i >= cmd.length) {
        clearInterval(typeInterval);
        setTimeout(() => setShowOutput(true), 400); // 400ms delay before output
      }
    }, 40); // 40ms per char

    return () => clearInterval(typeInterval);
  }, [cmd]);

  return (
    <div className={`terminal ${staggerClass}`}>
      <div className="term-header">
        <div className="term-dot dot-r"></div>
        <div className="term-dot dot-y"></div>
        <div className="term-dot dot-g"></div>
      </div>
      <div className="term-body" style={{ padding: '1.5rem', fontSize }}>
        {cmd && (
          <div className="cmd" style={{ marginBottom: showOutput ? '1rem' : '0' }}>
            <span style={{ color: 'var(--emerald)', fontWeight: 'bold', marginRight: '8px' }}>
              {promptText}
            </span>
            {typedCmd}
            {!showOutput && <span className="cursor">_</span>}
          </div>
        )}
        
        {/* Render children only if we finished typing or there's no command */}
        {showOutput && children}

        {/* Show a blinking cursor on a new empty prompt line after execution */}
        {showOutput && (
          <div style={{ marginTop: '1rem' }}>
            <span style={{ color: 'var(--emerald)', fontWeight: 'bold', marginRight: '8px' }}>
              {promptText}
            </span>
            <span className="cursor">_</span>
          </div>
        )}
      </div>
    </div>
  );
};
