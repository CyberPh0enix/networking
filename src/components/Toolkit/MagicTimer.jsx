import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { audio } from '../../utils/audioEngine';
import './MagicTimer.css';

const DEFAULT_TIME = 60; // 60 seconds

export default function MagicTimer({ onClose }) {
  const [totalTime, setTotalTime] = useState(DEFAULT_TIME);
  const [timeLeft, setTimeLeft] = useState(DEFAULT_TIME);
  const [isActive, setIsActive] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  
  const circumference = 2 * Math.PI * 45;

  useEffect(() => {
    let interval = null;
    
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(time => {
          if (time <= 1) {
            audio.playSweep(false); // Timer done sound
            setIsActive(false);
            return 0;
          }
          // Tick sound every second when <= 5 seconds
          if (time <= 6) audio.playClick();
          return time - 1;
        });
      }, 1000);
    } else if (timeLeft === 0) {
      clearInterval(interval);
    }
    
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const toggleTimer = () => {
    audio.playClick();
    if (timeLeft === 0) {
      setTimeLeft(DEFAULT_TIME);
      setIsActive(true);
    } else {
      setIsActive(!isActive);
    }
  };

  const handleReset = () => {
    audio.playSnap();
    setIsActive(false);
    setTimeLeft(totalTime);
  };

  const setPreset = (seconds) => {
    audio.playClick();
    setIsActive(false);
    setTotalTime(seconds);
    setTimeLeft(seconds);
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const strokeDashoffset = circumference - (timeLeft / totalTime) * circumference;

  return (
    <motion.div 
      className="magic-timer-overlay"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.8, opacity: 0 }}
      drag
      dragMomentum={false}
    >
      <div className="magic-timer-container">
        <button className="timer-close-btn" onClick={onClose}>
          <i className="fa-solid fa-xmark"></i>
        </button>
        
        <div className="timer-circle-wrapper" onClick={toggleTimer}>
          <svg width="120" height="120" viewBox="0 0 100 100">
            {/* Background track */}
            <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="6" />
            
            {/* Animated progress ring */}
            <motion.circle 
              cx="50" 
              cy="50" 
              r="45" 
              fill="none" 
              stroke={timeLeft <= 10 ? "#ff0055" : "#00f0ff"} 
              strokeWidth="6" 
              strokeLinecap="round"
              strokeDasharray={circumference}
              animate={{ strokeDashoffset }}
              transition={{ duration: 1, ease: "linear" }}
              transform="rotate(-90 50 50)"
            />
          </svg>
          
          <div className={`timer-text ${timeLeft <= 10 && isActive ? 'urgent' : ''}`}>
            {formatTime(timeLeft)}
          </div>
        </div>
        
        <div className="timer-presets">
          {[10, 15, 30, 45, 60].map(p => (
            <button key={p} className="timer-preset-btn" onClick={() => setPreset(p)}>{p}s</button>
          ))}
        </div>

        <div className="timer-controls">
          <button className="timer-btn" onClick={handleReset}>Reset</button>
        </div>
      </div>
    </motion.div>
  );
}
