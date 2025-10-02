import React, { PropsWithChildren } from 'react';

import cn from 'classnames';

import './form.css';

interface FromMessageProps {
  info?: React.ReactNode;
  error?: any;
  errors?: React.ReactNode;
}

interface FormProps extends PropsWithChildren {
  type?: 'form' | 'detail';
  size?: 'small' | 'middle' | 'large';
  layout?: 'horizontal' | 'vertical';
  variant?: 'outlined' | 'borderless';
  block?: boolean;
}

export function Form({
  type = 'form',
  size = 'middle',
  layout = 'horizontal',
  variant = 'outlined',
  block = false,
  children,
}: FormProps) {
  return (
    <div
      className={cn('sh-form', {
        [size]: !!size, // small | middle | large
        [layout]: !!layout, // horizontal | vertical
        [variant]: !!variant, // outlined | borderless
        [type]: !!type, // form | detail
        block,
      })}
    >
      {children}
    </div>
  );
}

interface FormSectionProps extends PropsWithChildren {
  title?: React.ReactNode;
  action?: React.ReactNode;
  borderless?: boolean;
}

export function FormSection({
  title,
  action,
  borderless,
  children,
}: FormSectionProps) {
  return (
    <div className={cn('form-section', { borderless })}>
      {(title || action) && (
        <div className={cn('form-head')}>
          <div className={cn('form-head-title')}>{title}</div>
          {action && <div className={cn('form-head-action')}>{action}</div>}
        </div>
      )}
      <div className={cn('form-body')}>{children}</div>
    </div>
  );
}

interface FormRowProps extends PropsWithChildren {}

export function FormRow({ children }: FormRowProps) {
  return <div className={cn('form-row')}>{children}</div>;
}

interface FormItemProps extends PropsWithChildren {
  label?: React.ReactNode;
  required?: boolean;
  edit?: () => void;
  center?: boolean;
  width?: number | string;
  message?: FromMessageProps;
  borderless?: boolean;
}

export function FormItem({
  label,
  required,
  edit,
  center = false,
  width,
  message,
  borderless = false,
  children,
}: FormItemProps) {
  return (
    <div className={cn('form-item', { borderless })}>
      {label && (
        <div className={cn('form-label')}>
          <div className={cn('form-label-text')}>{label}</div>
          {edit && (
            <div className={cn('form-label-edit')} onClick={() => edit()}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="11"
                height="11"
                viewBox="0 0 1024 1024"
              >
                <path
                  fill="currentColor"
                  d="M964.256 49.664C929.392 16.256 890.933-.672 849.877-.672c-64.192 0-111.024 41.472-123.841 54.176c-18.032 17.856-633.152 633.2-633.152 633.2a33 33 0 0 0-8.447 14.592C70.565 752.559 1.077 980.016.387 982.304c-3.567 11.648-.384 24.337 8.208 32.928a32.34 32.34 0 0 0 22.831 9.44c3.312 0 6.655-.496 9.919-1.569c2.352-.767 237.136-76.655 275.775-88.19a32.74 32.74 0 0 0 13.536-8.033c24.416-24.128 598.128-591.456 636.208-630.784c39.392-40.592 58.96-82.864 58.208-125.616c-.784-42.208-21.248-82.848-60.816-120.816M715.845 155.84c16.304 3.952 54.753 16.862 94.017 56.479c39.68 40.032 50.416 85.792 52.416 96.208c-125.824 125.168-415.456 411.728-529.632 524.672c-10.544-24.56-27.584-54.144-54.993-81.76c-33.471-33.728-67.536-52.783-93.808-63.503c112.992-113.008 408.08-408.224 532-532.096M140.39 741.95c17.584 4.672 54.111 18.224 91.344 55.76c28.672 28.912 42.208 60.8 48.288 80.24c-44.48 14.304-141.872 47.92-203.76 67.872c18.336-60.336 49.311-154.304 64.128-203.872m780.031-491.584a1749 1749 0 0 1-6.065 6.16c-10.113-26.049-27.857-59.52-58.577-90.496c-31.391-31.648-63.231-50.32-88.75-61.36c2.175-2.16 3.855-3.857 4.511-4.496c3.664-3.617 36.897-35.376 78.32-35.376c23.84 0 47.248 10.88 69.617 32.32c26.511 25.424 40.175 50.512 40.624 74.592c.431 24.576-12.913 51.04-39.68 78.656"
                ></path>
              </svg>
            </div>
          )}
          {required && <div className={cn('form-label-required')}>*</div>}
        </div>
      )}

      <div className={cn('form-content')}>
        <div
          className={cn('form-control', { center })}
          style={{ maxWidth: width }}
        >
          {children ?? '-'}
        </div>

        {message && (message.info || message.error || message.errors) && (
          <div className={cn('form-message')}>
            {message.error ? (
              <div className={cn('form-message-error')}>
                {Array.isArray(message.error)
                  ? message.error[0].message
                  : message.error?.message}
              </div>
            ) : message.errors ? (
              <div>{message.errors}</div>
            ) : (
              message.info && (
                <div className={cn('form-message-info')}>{message.info}</div>
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
}

interface FormActionProps extends PropsWithChildren {
  align?: 'center' | 'left' | 'right';
}

export function FormAction({ align = 'right', children }: FormActionProps) {
  return (
    <div className={cn('form-action', { [align]: !!align })}>{children}</div>
  );
}
