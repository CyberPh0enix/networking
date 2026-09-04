import React from 'react';

export const Slide = ({ color = 'cyan', titleIcon, title, active, alignCenter, children }) => {
  const contentStyle = alignCenter ? { alignItems: 'center', textAlign: 'center' } : {};
  const titleStyle = alignCenter ? { justifyContent: 'center' } : {};

  return (
    <div className={`slide ${active ? 'active' : ''}`} data-color={color}>
      <div className="slide-content" style={contentStyle}>
        {title && (
          <h2 className={`slide-title text-gradient grad-${color} stagger d-1`} style={titleStyle}>
            {titleIcon && <i className={`fa-solid ${titleIcon}`}></i>} {title}
          </h2>
        )}
        {children}
      </div>
    </div>
  );
};
