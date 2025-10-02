import { PropsWithChildren } from 'react';

import cn from 'classnames';

import './status.css';

export interface StatusProps extends PropsWithChildren {
  type?: 'primary' | 'success' | 'error' | 'warn' | 'new';
  variant?: 'icon' | 'pulse';
}

function Status({ type, variant = 'icon', children }: StatusProps) {
  return (
    <div className={cn('ui-status', { [type || '']: type })}>
      {variant === 'icon' && (
        <div className="status-icon">
          {type === 'new' && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M6.5 5A1.5 1.5 0 1 0 8 6.5A1.5 1.5 0 0 0 6.5 5m0 0A1.5 1.5 0 1 0 8 6.5A1.5 1.5 0 0 0 6.5 5m14.91 6.58l-9-9A2 2 0 0 0 11 2H4a2 2 0 0 0-2 2v7a2 2 0 0 0 .59 1.42l.41.4a5.6 5.6 0 0 1 2.08-.74L4 11V4h7l9 9l-7 7l-1.08-1.08a5.6 5.6 0 0 1-.74 2.08l.41.41A2 2 0 0 0 13 22a2 2 0 0 0 1.41-.59l7-7A2 2 0 0 0 22 13a2 2 0 0 0-.59-1.42M6.5 5A1.5 1.5 0 1 0 8 6.5A1.5 1.5 0 0 0 6.5 5M10 19H7v3H5v-3H2v-2h3v-3h2v3h3Z"
              />
            </svg>
          )}
          {type === 'success' && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="m9.55 15.15l8.475-8.475q.3-.3.7-.3t.7.3t.3.713t-.3.712l-9.175 9.2q-.3.3-.7.3t-.7-.3L4.55 13q-.3-.3-.288-.712t.313-.713t.713-.3t.712.3z"
              />
            </svg>
          )}
          {type === 'error' && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M6.4 19L5 17.6l5.6-5.6L5 6.4L6.4 5l5.6 5.6L17.6 5L19 6.4L13.4 12l5.6 5.6l-1.4 1.4l-5.6-5.6z"
              />
            </svg>
          )}
        </div>
      )}
      {variant === 'pulse' && (
        <div className={cn('status-pulse', { [type || '']: type })}></div>
      )}

      <div className={'status-text'}>{children}</div>
    </div>
  );
}

export default Status;
