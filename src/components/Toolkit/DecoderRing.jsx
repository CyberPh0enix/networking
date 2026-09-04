import React, { useState } from 'react';
import { motion } from 'motion/react';
import { audio } from '../../utils/audioEngine';
import './DecoderRing.css';

export default function DecoderRing({ onClose }) {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState(false);

  const handleDecode = (val) => {
    setInput(val);
    if (!val) {
      setOutput('');
      setError(false);
      return;
    }
    
    // Quick heuristic: play tick on type
    if (val.length % 3 === 0) audio.playTypingTick();

    try {
      // Try Base64 decode
      const decoded = atob(val);
      setOutput(decoded);
      setError(false);
    } catch (e) {
      // If it fails, just show error state
      setOutput('ERR_INVALID_BASE64');
      setError(true);
    }
  };

  return (
    <motion.div 
      className="decoder-ring-widget"
      initial={{ scale: 0.8, opacity: 0, y: 50 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      exit={{ scale: 0.8, opacity: 0, y: 50 }}
      drag
      dragMomentum={false}
    >
      <div className="decoder-header">
        <i className="fa-solid fa-unlock-keyhole"></i> Base64 Decoder
        <button className="decoder-close" onClick={onClose}>
          <i className="fa-solid fa-xmark"></i>
        </button>
      </div>
      <div className="decoder-body">
        <textarea 
          placeholder="Paste Base64 payload here..."
          value={input}
          onChange={(e) => handleDecode(e.target.value)}
          spellCheck={false}
        />
        <div className="decoder-divider">
          <i className="fa-solid fa-arrow-down"></i>
        </div>
        <div className={`decoder-output ${error ? 'error' : 'success'}`}>
          {output || 'Awaiting input...'}
        </div>
      </div>
    </motion.div>
  );
}
