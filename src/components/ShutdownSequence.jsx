import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const OkStatus = () => (
  <span>[<span style={{ color: 'var(--emerald)', fontWeight: 'bold', margin: '0 8px' }}>OK</span>]</span>
);

const logs = [
  { text: <span><OkStatus /> Stopping OpenSSH server daemon...</span>, delay: 400 },
  { text: <span><OkStatus /> Stopped OpenSSH server daemon.</span>, delay: 200 },
  { text: <span><OkStatus /> Stopping Authorization Manager...</span>, delay: 300 },
  { text: <span><OkStatus /> Stopped Authorization Manager.</span>, delay: 150 },
  { text: <span><OkStatus /> Unmounting virtual filesystems...</span>, delay: 400 },
  { text: <span><OkStatus /> Reached target Unmount All Filesystems.</span>, delay: 200 },
  { text: <span><OkStatus /> Stopped Network Manager.</span>, delay: 300 },
  { text: ' ', delay: 100 },
  { text: <span style={{ color: 'var(--text-muted)' }}>Sending SIGTERM to remaining processes...</span>, delay: 500 },
  { text: <span style={{ color: 'var(--text-muted)' }}>Sending SIGKILL to remaining processes...</span>, delay: 600 },
  { text: ' ', delay: 100 },
  { text: <span style={{ color: 'var(--purple)', fontWeight: 'bold', letterSpacing: '2px' }}>   SYS.NET CORE SECURE SERVER - SESSION TERMINATED   </span>, delay: 300 },
  { text: ' ', delay: 100 },
  { text: <span style={{ color: 'var(--text-muted)' }}>System halted.</span>, delay: 800 },
];

export default function ShutdownSequence({ onComplete }) {
  const [displayedLogs, setDisplayedLogs] = useState([]);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    let currentIndex = 0;
    let timeoutId;

    const printNext = () => {
      const logEntry = logs[currentIndex];
      if (!logEntry || currentIndex >= logs.length) {
        // All logs printed — fade to black then call onComplete
        setTimeout(() => setFading(true), 400);
        setTimeout(() => onComplete(), 2200);
        return;
      }
      setDisplayedLogs(prev => [...prev, logEntry.text]);
      timeoutId = setTimeout(printNext, logEntry.delay);
      currentIndex++;
    };

    timeoutId = setTimeout(printNext, 300);
    return () => clearTimeout(timeoutId);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, ease: 'easeIn' }}
      style={{
        position: 'fixed', top: 0, left: 0,
        width: '100vw', height: '100vh',
        backgroundColor: '#0a0a0c',
        color: 'var(--text-main)',
        fontFamily: '"JetBrains Mono", monospace',
        fontSize: '1.1rem',
        padding: '3rem',
        boxSizing: 'border-box',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {/* Fading black overlay for fade-to-black at end */}
      <AnimatePresence>
        {fading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'absolute', top: 0, left: 0,
              width: '100%', height: '100%',
              backgroundColor: '#000',
              zIndex: 10,
            }}
          />
        )}
      </AnimatePresence>

      <div style={{ width: '100%', maxWidth: '850px', lineHeight: '1.6', position: 'relative', zIndex: 1 }}>
        {displayedLogs.map((log, i) => (
          <div key={i} style={{ minHeight: '1.6rem', whiteSpace: 'pre-wrap' }}>
            {log}
          </div>
        ))}
        {!fading && <span className="blinking-cursor">_</span>}
      </div>
    </motion.div>
  );
}
