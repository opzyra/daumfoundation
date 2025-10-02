import React, { useCallback } from 'react';

import cn from 'classnames';

import './html.css';

interface HtmlProps {
  border?: boolean;
  readonly?: boolean;
  textarea?: boolean;
  value?: string;
  style?: React.CSSProperties;
}

function Html({
  border = false,
  readonly = false,
  textarea = false,
  value = '',
  style,
}: HtmlProps) {
  const textToHtml = useCallback((value?: string) => {
    if (!value) return '-';

    return value.replace(/(\r\n|\r|\n)/g, '<br/>');
  }, []);

  return (
    <div
      className={cn('ui-html', { border, readonly })}
      dangerouslySetInnerHTML={{
        __html: textarea ? textToHtml(value) : value,
      }}
      style={style}
    ></div>
  );
}

export default Html;
