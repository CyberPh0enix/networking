import React from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function ConfirmShutdown({ onConfirm, onCancel }) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        style={{
          position: 'fixed', top: 0, left: 0,
          width: '100vw', height: '100vh',
          backgroundColor: 'rgba(0,0,0,0.75)',
          backdropFilter: 'blur(8px)',
          zIndex: 9998,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onClick={onCancel}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          onClick={e => e.stopPropagation()}
          style={{
            background: 'rgba(10, 10, 12, 0.95)',
            border: '1px solid rgba(168, 85, 247, 0.3)',
            borderRadius: '16px',
            padding: '2.5rem 3rem',
            maxWidth: '480px',
            width: '90%',
            fontFamily: '"JetBrains Mono", monospace',
            boxShadow: '0 0 60px rgba(168, 85, 247, 0.15)',
          }}
        >
          {/* Icon */}
          <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
            <i className="fa-solid fa-power-off" style={{
              fontSize: '2.5rem',
              color: 'var(--rose)',
              filter: 'drop-shadow(0 0 12px var(--rose))',
            }} />
          </div>

          {/* Title */}
          <h2 style={{
            color: 'var(--text-main)',
            fontSize: '1.3rem',
            fontWeight: 700,
            textAlign: 'center',
            marginBottom: '0.75rem',
            letterSpacing: '1px',
          }}>
            Terminate Session?
          </h2>

          {/* Subtitle */}
          <p style={{
            color: 'var(--text-muted)',
            fontSize: '0.95rem',
            textAlign: 'center',
            marginBottom: '2rem',
            lineHeight: '1.6',
          }}>
            This will initiate a system shutdown sequence and reset the session to the boot screen.
          </p>

          {/* Buttons */}
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <button
              onClick={onCancel}
              style={{
                flex: 1,
                padding: '0.8rem 1.5rem',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '10px',
                color: 'var(--text-muted)',
                fontFamily: '"JetBrains Mono", monospace',
                fontSize: '0.95rem',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
              onMouseOver={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
              onMouseOut={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              style={{
                flex: 1,
                padding: '0.8rem 1.5rem',
                background: 'rgba(244, 63, 94, 0.15)',
                border: '1px solid rgba(244, 63, 94, 0.4)',
                borderRadius: '10px',
                color: 'var(--rose)',
                fontFamily: '"JetBrains Mono", monospace',
                fontSize: '0.95rem',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
              onMouseOver={e => e.currentTarget.style.background = 'rgba(244, 63, 94, 0.25)'}
              onMouseOut={e => e.currentTarget.style.background = 'rgba(244, 63, 94, 0.15)'}
            >
              <i className="fa-solid fa-power-off" style={{ marginRight: '8px' }} />
              Terminate
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
