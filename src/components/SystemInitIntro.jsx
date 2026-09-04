import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { config } from '../config.js';

const logs = [
  { text: "[  OK  ] Started OpenSSH server daemon.", delay: 400 },
  { text: "[  OK  ] Started Authorization Manager.", delay: 100 },
  { text: "[  OK  ] Reached target Multi-User System.", delay: 300 },
  { text: " ", delay: 100 },
  { text: "Arch Linux 6.10.3-arch1-1 (tty1)", delay: 100 },
  { text: " ", delay: 100 },
  { text: "archlinux login: root", delay: 300 },
  { text: "Password: ", delay: 500 },
  { text: "Last login: Fri Sep  4 19:00:10 on tty1", delay: 200 },
  { text: " ", delay: 100 },
  { text: `${config.presentation.terminalPrompt} ssh px@10.0.13.37 -p 2222`, delay: 600 },
  { text: "px@10.0.13.37's password: ", delay: 500 },
  { text: "Authentication successful.", delay: 200 },
  { text: " ", delay: 100 },
  { text: "==================================================", delay: 50 },
  { text: "   SYS.NET CORE SECURE SERVER - ACCESS GRANTED    ", delay: 50 },
  { text: "==================================================", delay: 50 },
  { text: " ", delay: 100 },
  { text: "[px@sys-net-core ~]$ ./init_masterclass.sh", delay: 600 }
];

export default function SystemInitIntro({ onComplete }) {
  // 'waiting_to_start', 'running', 'waiting_to_advance', 'transitioning'
  const [status, setStatus] = useState('waiting_to_start');
  const [displayedLogs, setDisplayedLogs] = useState([]);
  
  const bottomRef = useRef(null);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "auto" });
    }
  }, [displayedLogs]);

  useEffect(() => {
    if (status !== 'running') return;

    let currentIndex = 0;
    let timeoutId;

    const printNext = () => {
      if (currentIndex >= logs.length) {
        setStatus('waiting_to_advance');
        return;
      }

      setDisplayedLogs(prev => [...prev, logs[currentIndex].text]);
      timeoutId = setTimeout(printNext, logs[currentIndex].delay);
      currentIndex++;
    };

    timeoutId = setTimeout(printNext, 300);

    return () => clearTimeout(timeoutId);
  }, [status]);

  useEffect(() => {
    const handleAction = (e) => {
      // Ignore keydown if it's not a trigger key
      if (e.type === 'keydown' && ![' ', 'Enter', 'ArrowRight', 'PageDown'].includes(e.key)) {
        return;
      }

      if (e.type === 'keydown') e.preventDefault();

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
            backgroundColor: '#050505',
            color: '#0f0',
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: '1.2rem',
            padding: '2rem',
            boxSizing: 'border-box',
            zIndex: 9999,
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'flex-start'
          }}
        >
          {status === 'waiting_to_start' && (
            <div style={{ opacity: 0.7 }}>
              <span className="blinking-cursor">_</span>
            </div>
          )}

          {(status === 'running' || status === 'waiting_to_advance') && (
            <div style={{ width: '100%', maxWidth: '800px' }}>
              {displayedLogs.map((log, i) => (
                <div key={i} style={{ minHeight: '1.5rem', whiteSpace: 'pre-wrap' }}>
                  {log}
                </div>
              ))}
              {status === 'running' && (
                 <span className="blinking-cursor">_</span>
              )}
              {status === 'waiting_to_advance' && (
                <div style={{ marginTop: '2rem', opacity: 0.5 }}>
                  [ Process halted. Press Space to execute. ] <span className="blinking-cursor">_</span>
                </div>
              )}
              <div ref={bottomRef} />
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
