import React, { useEffect } from 'react';

import { useRouter } from 'next/router';

import { useSession } from './session-provider';

type RoleType = 'master' | 'manager';

export interface SessionGuardProps {
  role?: RoleType[] | 'master';
  children: React.ReactNode;
}

export function AuthGuard({ children }: SessionGuardProps) {
  const { admin, fetched } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (fetched && admin) {
      router.replace('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [admin, fetched]);

  return <>{fetched && !admin && children}</>;
}

export function AdminGuard({ role, children }: SessionGuardProps) {
  const { admin, fetched } = useSession();
  const router = useRouter();

  useEffect(() => {
    let roles = new Set();
    roles.add('master');
    roles.add('manager');

    if (role) {
      for (let i = 0; i < role.length; i++) {
        const item = role[i];
        roles.add(item);
      }
    }

    if (role && role === 'master') {
      roles = new Set();
      roles.add('master');
    }

    if (fetched && (!admin || !roles.has(admin.role))) {
      router.replace('/auth');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [admin, role, fetched]);

  return <>{fetched && admin && children}</>;
}
