import React from 'react';

import cn from 'classnames';

import './image.css';

interface ImageProps {
  src: string;
  alt?: string;
  width?: number;
  height?: number;
  shape?: 'circle' | 'round';
}

export function Image({
  alt,
  shape = 'round',
  width,
  height,
  ...props
}: ImageProps) {
  return (
    <div
      className={cn('ui-image', { [shape || '']: shape })}
      style={{ width, height }}
    >
      <img src={props.src} />
    </div>
  );
}
