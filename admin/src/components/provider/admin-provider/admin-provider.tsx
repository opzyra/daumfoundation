import React, { useEffect, useState } from 'react';

import cn from 'classnames';

import './admin-provider.css';

interface AdminProviderProps {
  children: React.ReactNode;
}

export function AdminProvider({ children }: AdminProviderProps) {
  const [render, setRender] = useState(false);

  // 초기 랜더링
  useEffect(() => {
    setRender(true);
  }, []);

  return (
    <>
      <div className={cn('admin-provider', { render })}>{children}</div>
    </>
  );
}
