import React, { PropsWithChildren } from 'react';

import './page.css';

interface PageProps extends PropsWithChildren {
  title?: React.ReactNode;
  action?: React.ReactNode[];
}

export function Page({ title, action, children }: PageProps) {
  return (
    <div className="sh-page">
      <div className="page-head">
        <div className="head-title">{title}</div>
        <div className="head-action">
          {action?.map((item, index) => (
            <div className="action-item" key={index}>
              {item}
            </div>
          ))}
        </div>
      </div>
      <div className="page-body">{children}</div>
    </div>
  );
}
