import React, { useEffect, useState } from 'react';

import cn from 'classnames';
import { AnimatePresence } from 'framer-motion';

import './app-provider.css';

interface AppProviderProps {
  children: React.ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  const [render, setRender] = useState(false);

  // 초기 랜더링
  useEffect(() => {
    setRender(true);
  }, []);

  return (
    <AnimatePresence mode="wait">
      <div className={cn('app-provider', { render })}>{children}</div>
    </AnimatePresence>
  );
}
