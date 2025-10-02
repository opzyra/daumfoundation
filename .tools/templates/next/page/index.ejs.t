---
to: <%= h.src() %>/pages/<% if(path){ -%><%= path %>/<% }-%><%= name %>/index.tsx
Name: <%= Name = h.capitalize(name) %>
---
import { ReactElement } from 'react';

import { QueryClient, dehydrate } from '@tanstack/react-query';

import { GetServerSideProps } from 'next';

import './<%= name %>.css';

interface <%= Name %>Props {}

export const getServerSideProps: GetServerSideProps<<%= Name %>Props> = async () => {
  const queryClient = new QueryClient();

  return {
    props: { dehydratedState: dehydrate(queryClient) },
  };
};

<%= Name %>.getProvider = (page: ReactElement) => {
  return <>{page}</>;
};

function <%= Name %>(props:<%= Name %>Props) {
  return (
    <div className="<%= name %>">
      <div className="<%= name %>-container"></div>
    </div>
  );
}

export default <%= Name %>;
