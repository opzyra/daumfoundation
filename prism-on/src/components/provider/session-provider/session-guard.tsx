import React, { useEffect } from 'react';

import { useRouter } from 'next/router';

import { useSession } from './session-provider';

type RoleType = 'user';

export interface SessionGuardProps {
  role?: RoleType[];
  children: React.ReactNode;
}

export function AuthGuard({ children }: SessionGuardProps) {
  const { user, fetched } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (fetched && user) {
      router.replace('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, fetched]);

  return <>{fetched && !user && children}</>;
}

export function UserGuard({ role, children }: SessionGuardProps) {
  const { user, fetched } = useSession();
  const router = useRouter();

  useEffect(() => {
    let roles = new Set();
    roles.add('user');

    if (role) {
      for (let i = 0; i < role.length; i++) {
        const item = role[i];
        roles.add(item);
      }
    }

    if (role) {
      roles = new Set();
      roles.add('user');
    }

    if (fetched && (!user || !roles.has(user.role))) {
      router.replace('/login');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, role, fetched]);

  return <>{fetched && user && children}</>;
}
