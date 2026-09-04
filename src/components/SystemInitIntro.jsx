import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { config } from '../config.js';

const OkStatus = () => (
  <span>[<span style={{ color: 'var(--emerald)', fontWeight: 'bold', margin: '0 8px' }}>OK</span>]</span>
);

const logs = [
  { text: <span><OkStatus/> Started Network Manager.</span>, delay: 150 },
  { text: <span><OkStatus/> Reached target Network.</span>, delay: 50 },
  { text: <span><OkStatus/> Started OpenSSH server daemon.</span>, delay: 200 },
  { text: <span><OkStatus/> Started Authorization Manager.</span>, delay: 100 },
  { text: <span><OkStatus/> Reached target Multi-User System.</span>, delay: 300 },
  { text: " ", delay: 100 },
  { text: <span style={{ color: 'var(--text-muted)' }}>Arch Linux 6.10.3-arch1-1 (tty1)</span>, delay: 100 },
  { text: " ", delay: 100 },
  { text: <span><span style={{ color: 'var(--cyan)' }}>archlinux login:</span> root</span>, delay: 300 },
  { text: <span><span style={{ color: 'var(--cyan)' }}>Password:</span> </span>, delay: 500 },
  { text: <span style={{ color: 'var(--text-muted)' }}>Last login: Fri Sep  4 19:00:10 on tty1</span>, delay: 200 },
  { text: " ", delay: 100 },
  { text: <span><span style={{ color: 'var(--cyan)' }}>{config.presentation.terminalPrompt}</span> ssh px@10.0.13.37 -p 2222</span>, delay: 600 },
  { text: <span><span style={{ color: 'var(--cyan)' }}>px@10.0.13.37's password:</span> </span>, delay: 500 },
  { text: <span style={{ color: 'var(--emerald)' }}>Authentication successful.</span>, delay: 200 },
  { text: " ", delay: 100 },
  { text: <span style={{ color: 'var(--text-muted)' }}>==================================================</span>, delay: 50 },
  { text: <span style={{ color: 'var(--purple)', fontWeight: 'bold', letterSpacing: '2px' }}>   SYS.NET CORE SECURE SERVER - ACCESS GRANTED    </span>, delay: 50 },
  { text: <span style={{ color: 'var(--text-muted)' }}>==================================================</span>, delay: 50 },
  { text: " ", delay: 100 },
  { text: <span><span style={{ color: 'var(--cyan)' }}>[px@sys-net-core ~]$</span> ./init_masterclass.sh</span>, delay: 600 }
];

export default function SystemInitIntro({ onComplete }) {
  // 'waiting_to_start', 'running', 'waiting_to_advance', 'transitioning'
  const [status, setStatus] = useState('waiting_to_start');
  const [displayedLogs, setDisplayedLogs] = useState([]);

  useEffect(() => {
    if (status !== 'running') return;

    let currentIndex = 0;
    let timeoutId;

    const printNext = () => {
      const logEntry = logs[currentIndex];
      if (!logEntry || currentIndex >= logs.length) {
        setStatus('waiting_to_advance');
        return;
      }

      setDisplayedLogs(prev => [...prev, logEntry.text]);
      timeoutId = setTimeout(printNext, logEntry.delay);
      currentIndex++;
    };

    timeoutId = setTimeout(printNext, 200);

    return () => clearTimeout(timeoutId);
  }, [status]);

  useEffect(() => {
    const handleAction = (e) => {
      // Ignore keydown if it's not a trigger key
      if (e.type === 'keydown' && ![' ', 'Enter', 'ArrowRight', 'PageDown'].includes(e.key)) {
        return;
      }
      if (e.type === 'keydown' && e.repeat) return; // Prevent key hold from skipping
      if (e.type === 'keydown') e.preventDefault();

      // Auto fullscreen on first interaction
      if (!document.fullscreenElement && document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen().catch(() => {});
      }

      setStatus(prev => {
        if (prev === 'waiting_to_start') return 'running';
        if (prev === 'waiting_to_advance') return 'transitioning';
        return prev;
      });
    };

    document.addEventListener('keydown', handleAction);
    document.addEventListener('touchstart', handleAction);
    document.addEventListener('click', handleAction);

    return () => {
      document.removeEventListener('keydown', handleAction);
      document.removeEventListener('touchstart', handleAction);
      document.removeEventListener('click', handleAction);
    };
  }, []);

  useEffect(() => {
    if (status === 'transitioning') {
      const timer = setTimeout(() => {
        onComplete();
      }, 1000); // 1s transition out
      return () => clearTimeout(timer);
    }
  }, [status, onComplete]);

  return (
    <AnimatePresence>
      {status !== 'transitioning' && (
        <motion.div 
          initial={{ opacity: 1, filter: 'blur(0px)' }}
          exit={{ opacity: 0, filter: 'blur(10px)' }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: '#0a0a0c', // deep, realistic dark background
            color: 'var(--text-main)', // clean off-white
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: '1.1rem',
            padding: '3rem',
            boxSizing: 'border-box',
            zIndex: 9999,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center', // Center vertically
            alignItems: 'center' // Center horizontally
          }}
        >
          {status === 'waiting_to_start' && (
            <div style={{ opacity: 0.5 }}>
              <span className="blinking-cursor">_</span>
            </div>
          )}

          {(status === 'running' || status === 'waiting_to_advance' || status === 'transitioning') && (
            <div style={{ width: '100%', maxWidth: '850px', lineHeight: '1.6' }}>
              {displayedLogs.map((log, i) => (
                <div key={i} style={{ minHeight: '1.6rem', whiteSpace: 'pre-wrap' }}>
                  {log}
                </div>
              ))}
              {status === 'running' && (
                 <span className="blinking-cursor">_</span>
              )}
              {(status === 'waiting_to_advance' || status === 'transitioning') && (
                <div style={{ marginTop: '3rem', opacity: 0.7, color: 'var(--cyan)' }}>
                  <i className="fa-solid fa-terminal" style={{ marginRight: '10px' }}></i>
                  [ Session Ready. Press Space to execute. ] <span className="blinking-cursor">_</span>
                </div>
              )}
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
