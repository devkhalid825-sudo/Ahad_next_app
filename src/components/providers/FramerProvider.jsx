'use client';

import React from 'react';
import { LazyMotion, domAnimation } from 'framer-motion';

/**
 * FramerProvider
 * Wraps the app in LazyMotion with domAnimation features.
 * When combined with `import { m as motion } from 'framer-motion'`,
 * this eliminates the monolithic framer-motion proxy bundle (249 modules)
 * and only loads the core DOM animation capabilities needed by the client.
 */
export default function FramerProvider({ children }) {
  return (
    <LazyMotion features={domAnimation} strict={false}>
      {children}
    </LazyMotion>
  );
}
