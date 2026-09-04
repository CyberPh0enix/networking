import React from 'react';
import { Slide } from '../components/Slide.jsx';
import { config } from '../config.js';

export const slides = [
  // Slide 1: Title
  ({ active }) => (
    <Slide active={active} color="cyan" alignCenter>
      <div className="speaker-badge stagger d-1" style={{ marginBottom: '2rem' }}>
        <div className="speaker-avatar"><i className={`fa-solid ${config.speaker.avatarIcon}`}></i></div>
        {config.speaker.role} // {config.speaker.name}
      </div>
      <h1 className="title-massive text-gradient grad-cyan stagger d-2">{config.presentation.title}</h1>
      <p className="stagger d-3" style={{ maxWidth: '900px', fontSize: '2rem' }}>{config.presentation.subtitle}</p>
      <div className="glass-panel stagger d-4" style={{ padding: '1rem 2rem', borderRadius: '50px', marginTop: '2rem' }}>
        <span className="mono" style={{ color: 'var(--cyan)', fontSize: '1rem' }}>
          [ <i className="fa-solid fa-network-wired"></i> Masterclass Session Init ]
        </span>
      </div>
    </Slide>
  )
];
