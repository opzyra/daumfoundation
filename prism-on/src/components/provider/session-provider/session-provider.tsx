import React, { useEffect } from 'react';

import { create } from 'zustand/react';

interface SessionStore {
  user?: any;
  error?: boolean;
  fetched?: boolean;
}

const useSessionStore = create<StoreProps<SessionStore> & SessionStore>(
  (set) => ({
    fetched: false,
    error: false,
    set: (data) => set((state) => ({ ...data, set: state.set }), true),
  }),
);

export function useSession() {
  const { user, error, fetched, set } = useSessionStore();

  const login = (user: any) => {
    set({ user, fetched: true });
  };

  const logout = () => {
    set({ user: undefined, fetched: true });
  };

  const session = (user: any) => {
    set({ user, fetched: true });
  };

  return {
    user,
    error,
    fetched,
    login,
    logout,
    session,
    set,
  };
}

interface SessionProviderProps {
  children: React.ReactNode;
}

export function SessionProvider({ children }: SessionProviderProps) {
  const { error, session, set } = useSession();

  // 세션 주입
  useEffect(() => {
    // adminService.adminSessionAdmin().then((admin) => session(admin));
  }, []);

  return <>{children}</>;
}
