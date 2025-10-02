import React from 'react';

import { AnimatePresence } from 'framer-motion';

interface AnimationProviderProps {
  children: React.ReactNode;
}

export function AnimationProvider({ children }: AnimationProviderProps) {
  return <AnimatePresence mode="wait">{children}</AnimatePresence>;
}
