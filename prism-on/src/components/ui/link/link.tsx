import React from 'react';

import NextLink from 'next/link';

import cn from 'classnames';

import './link.css';

interface LinkProps {
  type?: 'primary' | 'error';
  variant?: 'solid' | 'outline';
  style?: React.CSSProperties;
  icon?: React.ReactNode;
  iconPosition?: 'start' | 'end';
  popconfirm?: boolean;
  underline?: boolean;
  route?: string;
  href?: string;
  children?: React.ReactNode;
  className?: string;
  onClick?: () => any;
}

export function Link({
  type,
  variant = 'solid',
  icon,
  iconPosition,
  popconfirm = false,
  underline,
  route,
  href,
  className,
  style,
  onClick,
  children,
}: LinkProps) {
  if (route) {
    return (
      <NextLink
        className={cn('ui-link', className, {
          icon,
          underline,
          [iconPosition || '']: iconPosition,
        })}
        style={style}
        href={route}
      >
        {icon && (
          <>
            {icon && <span className={cn('link-icon')}>{icon}</span>}
            <span className={cn('link-text')}>{children}</span>
          </>
        )}
        {!icon && children}
      </NextLink>
    );
  }

  if (popconfirm) {
    return (
      <div
        className={cn('ui-link', className, {
          icon,
          underline,
          [iconPosition || '']: iconPosition,
          [type || '']: type,
          [variant]: variant,
        })}
        style={style}
      >
        {children}
      </div>
    );
  }

  return (
    <a
      className={cn('ui-link', className, {
        icon,
        underline,
        [iconPosition || '']: iconPosition,
        [type || '']: type,
        [variant]: variant,
      })}
      style={style}
      onClick={(event) => {
        event.stopPropagation();
        if (onClick) {
          onClick();
        }
      }}
      href={href}
      target={href && '_blank'}
    >
      {icon && (
        <>
          {icon && <span className={cn('link-icon')}>{icon}</span>}
          {children && <span className={cn('link-text')}>{children}</span>}
        </>
      )}
      {!icon && children}
    </a>
  );
}
