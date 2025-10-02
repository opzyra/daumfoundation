/// <reference types="@dayjs/relative-time" />
import * as React from 'react';

declare module 'next/app' {
  export declare type AppProps = Pick<
    CompletePrivateRouteInfo,
    'Component' | 'err'
  > & {
    router: Router;
  } & Record<string, any> & {
      Component: {
        getProvider?: (page: JSX.Element) => JSX.Element;
      };
    };
}

declare module 'framer-motion' {
  export interface AnimatePresenceProps {
    initial?: boolean;
    custom?: any;
    onExitComplete?: () => void;
    mode?: 'sync' | 'popLayout' | 'wait';
    presenceAffectsLayout?: boolean;
    propagate?: boolean;
    children?: React.ReactNode;
  }
}
