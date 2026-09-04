import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { config } from '../config.js';

export const Terminal = ({ cmd, staggerClass = '', fontSize = '0.9rem', active = true, children }) => {
  const [typedCmd, setTypedCmd] = useState('');
  const [showOutput, setShowOutput] = useState(false);
  const promptText = config.presentation.terminalPrompt || "[px@archlinux ~]$";

  useEffect(() => {
    // Reset state on unmount or when slide becomes inactive/active
    setTypedCmd('');
    setShowOutput(false);

    // Only start typing if the slide is active
    if (!active) return;

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
  }, [cmd, active]);

  return (
    <div className={`terminal ${staggerClass}`}>
      <div className="term-header">
        <div className="term-dot dot-r"></div>
        <div className="term-dot dot-y"></div>
        <div className="term-dot dot-g"></div>
      </div>
      <div className="term-body" style={{ padding: '1.5rem', fontSize }}>
        {cmd && (
          <div className="cmd" style={{ marginBottom: showOutput ? '1rem' : '0', transition: 'margin 0.3s ease' }}>
            <span style={{ color: 'var(--emerald)', fontWeight: 'bold', marginRight: '8px' }}>
              {promptText}
            </span>
            {typedCmd}
            {!showOutput && <span className="cursor">_</span>}
          </div>
        )}
        
        <AnimatePresence>
          {showOutput && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              style={{ overflow: 'hidden' }}
            >
              {children}
              <div style={{ marginTop: '1rem' }}>
                <span style={{ color: 'var(--emerald)', fontWeight: 'bold', marginRight: '8px' }}>
                  {promptText}
                </span>
                <span className="cursor">_</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
