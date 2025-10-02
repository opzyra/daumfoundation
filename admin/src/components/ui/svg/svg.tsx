import React, { useCallback } from 'react';

import cn from 'classnames';

import './svg.css';

interface SvgProps extends React.HTMLAttributes<HTMLDivElement> {
  cursor?: 'default' | 'pointer';
  color?: 'primary' | 'error';
  children: React.ReactNode;
}

function Svg({ className, color, cursor, children, ...props }: SvgProps) {
  return (
    <div
      className={cn('ui-svg', className, {
        [cursor || '']: cursor,
        [color || '']: color,
      })}
      {...props}
    >
      {children}
    </div>
  );
}

export default Svg;
