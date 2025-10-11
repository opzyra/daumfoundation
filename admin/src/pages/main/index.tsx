import { ReactElement } from 'react';

import { GetServerSideProps } from 'next';

import { QueryClient, dehydrate } from '@tanstack/react-query';

import { AdminLayout } from 'src/components/layout/admin-layout/admin-layout';
import { AdminGuard } from 'src/components/provider/session-provider/session-guard';

import './main.css';

interface MainProps {}

export const getServerSideProps: GetServerSideProps<MainProps> = async (
  context,
) => {
  const queryClient = new QueryClient();

  return {
    redirect: {
      destination: '/article/prismon-news',
      permanent: false,
    },
  };

  // return {
  //   props: {
  //     dehydratedState: dehydrate(queryClient),
  //   },
  // };
};

Main.getProvider = (page: ReactElement) => {
  return <AdminGuard>{page}</AdminGuard>;
};

function Main(props: MainProps) {
  return (
    <AdminLayout
      metadata={{
        gnb: 'app',
        lnb: 'dashboard',
      }}
      active="dashboard"
    >
      <div className="pg-main">메인</div>
    </AdminLayout>
  );
}

export default Main;
