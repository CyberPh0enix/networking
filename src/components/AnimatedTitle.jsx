import React from 'react';
import { motion } from 'motion/react';

export const AnimatedTitle = ({ active, children, className = '', style = {} }) => {
  return (
    <motion.h2
      initial={false}
      animate={active ? 'visible' : 'hidden'}
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0 }
      }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
      className={className}
      style={style}
    >
      {children}
    </motion.h2>
  );
};
