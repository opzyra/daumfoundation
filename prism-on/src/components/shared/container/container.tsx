import React from 'react';

import './container.css';

interface ContainerProps {
  children?: React.ReactNode;
}

function Container({ children }: ContainerProps) {
  return <div className="sh-container">{children}</div>;
}

export default Container;
