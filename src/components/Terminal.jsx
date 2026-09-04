import React from 'react';

export const Terminal = ({ cmd, staggerClass = '', fontSize = '0.9rem', children }) => (
  <div className={`terminal ${staggerClass}`}>
    <div className="term-header">
      <div className="term-dot dot-r"></div>
      <div className="term-dot dot-y"></div>
      <div className="term-dot dot-g"></div>
    </div>
    <div className="term-body" style={{ padding: '1.5rem', fontSize }}>
      {cmd && (
        <div className="cmd">
          {cmd}<span className="cursor">_</span>
        </div>
      )}
      {children}
    </div>
  </div>
);
