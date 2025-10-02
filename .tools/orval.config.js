module.exports = {
  admin: {
    input: 'http://localhost:4000/api-docs-json',
    output: {
      mode: 'tags',
      target: '../admin/src/service/api.ts',
      schemas: '../admin/src/service/model',
      client: 'react-query',
      clean: true,
      tsconfig: false,
      prettier: true,
      override: {
        mutator: {
          path: '../admin/src/lib/axios.ts',
          name: 'orvalInstance',
        },
        header: false,
      },
    },
  },
  client: {
    input: 'http://localhost:4000/api-docs-json',
    output: {
      mode: 'tags',
      target: '../client/src/service/api.ts',
      schemas: '../client/src/service/model',
      client: 'react-query',
      clean: true,
      tsconfig: false,
      prettier: true,
      override: {
        mutator: {
          path: '../client/src/lib/axios.ts',
          name: 'orvalInstance',
        },
        header: false,
      },
    },
  },
};
