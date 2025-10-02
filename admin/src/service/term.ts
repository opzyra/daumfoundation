import { orvalInstance } from '../library/axios';
import { useMutation, useQuery } from '@tanstack/react-query';
import type {
  MutationFunction,
  QueryFunction,
  QueryKey,
  UseMutationOptions,
  UseMutationResult,
  UseQueryOptions,
  UseQueryResult,
} from '@tanstack/react-query';

import type {
  AdminSearchTermParams,
  TermAdminParam,
  TermCategoryDto,
  TermDto,
  TermListAdminDto,
  TermRemoveAdminParam,
} from './model';

type AwaitedInput<T> = PromiseLike<T> | T;

type Awaited<O> = O extends AwaitedInput<infer T> ? T : never;

type SecondParameter<T extends (...args: never) => unknown> = Parameters<T>[1];

/**
 * @summary 약관 분류 전체 조회
 */
export const adminFindAllCategoryTerm = (
  options?: SecondParameter<typeof orvalInstance>,
  signal?: AbortSignal,
) => {
  return orvalInstance<TermCategoryDto[]>(
    { url: `/admin/term/category`, method: 'GET', signal },
    options,
  );
};

export const getAdminFindAllCategoryTermQueryKey = () => {
  return [`/admin/term/category`] as const;
};

export const getAdminFindAllCategoryTermQueryOptions = <
  TData = Awaited<ReturnType<typeof adminFindAllCategoryTerm>>,
  TError = unknown,
>(options?: {
  query?: UseQueryOptions<
    Awaited<ReturnType<typeof adminFindAllCategoryTerm>>,
    TError,
    TData
  >;
  request?: SecondParameter<typeof orvalInstance>;
}) => {
  const { query: queryOptions, request: requestOptions } = options ?? {};

  const queryKey =
    queryOptions?.queryKey ?? getAdminFindAllCategoryTermQueryKey();

  const queryFn: QueryFunction<
    Awaited<ReturnType<typeof adminFindAllCategoryTerm>>
  > = ({ signal }) => adminFindAllCategoryTerm(requestOptions, signal);

  return { queryKey, queryFn, ...queryOptions } as UseQueryOptions<
    Awaited<ReturnType<typeof adminFindAllCategoryTerm>>,
    TError,
    TData
  > & { queryKey: QueryKey };
};

export type AdminFindAllCategoryTermQueryResult = NonNullable<
  Awaited<ReturnType<typeof adminFindAllCategoryTerm>>
>;
export type AdminFindAllCategoryTermQueryError = unknown;

/**
 * @summary 약관 분류 전체 조회
 */

export function useAdminFindAllCategoryTerm<
  TData = Awaited<ReturnType<typeof adminFindAllCategoryTerm>>,
  TError = unknown,
>(options?: {
  query?: UseQueryOptions<
    Awaited<ReturnType<typeof adminFindAllCategoryTerm>>,
    TError,
    TData
  >;
  request?: SecondParameter<typeof orvalInstance>;
}): UseQueryResult<TData, TError> & { queryKey: QueryKey } {
  const queryOptions = getAdminFindAllCategoryTermQueryOptions(options);

  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
  };

  query.queryKey = queryOptions.queryKey;

  return query;
}

/**
 * @summary 약관 분류 조회
 */
export const adminFindOneCategoryTerm = (
  namekey: string,
  options?: SecondParameter<typeof orvalInstance>,
  signal?: AbortSignal,
) => {
  return orvalInstance<TermCategoryDto>(
    { url: `/admin/term/category/${namekey}`, method: 'GET', signal },
    options,
  );
};

export const getAdminFindOneCategoryTermQueryKey = (namekey: string) => {
  return [`/admin/term/category/${namekey}`] as const;
};

export const getAdminFindOneCategoryTermQueryOptions = <
  TData = Awaited<ReturnType<typeof adminFindOneCategoryTerm>>,
  TError = unknown,
>(
  namekey: string,
  options?: {
    query?: UseQueryOptions<
      Awaited<ReturnType<typeof adminFindOneCategoryTerm>>,
      TError,
      TData
    >;
    request?: SecondParameter<typeof orvalInstance>;
  },
) => {
  const { query: queryOptions, request: requestOptions } = options ?? {};

  const queryKey =
    queryOptions?.queryKey ?? getAdminFindOneCategoryTermQueryKey(namekey);

  const queryFn: QueryFunction<
    Awaited<ReturnType<typeof adminFindOneCategoryTerm>>
  > = ({ signal }) => adminFindOneCategoryTerm(namekey, requestOptions, signal);

  return {
    queryKey,
    queryFn,
    enabled: !!namekey,
    ...queryOptions,
  } as UseQueryOptions<
    Awaited<ReturnType<typeof adminFindOneCategoryTerm>>,
    TError,
    TData
  > & { queryKey: QueryKey };
};

export type AdminFindOneCategoryTermQueryResult = NonNullable<
  Awaited<ReturnType<typeof adminFindOneCategoryTerm>>
>;
export type AdminFindOneCategoryTermQueryError = unknown;

/**
 * @summary 약관 분류 조회
 */

export function useAdminFindOneCategoryTerm<
  TData = Awaited<ReturnType<typeof adminFindOneCategoryTerm>>,
  TError = unknown,
>(
  namekey: string,
  options?: {
    query?: UseQueryOptions<
      Awaited<ReturnType<typeof adminFindOneCategoryTerm>>,
      TError,
      TData
    >;
    request?: SecondParameter<typeof orvalInstance>;
  },
): UseQueryResult<TData, TError> & { queryKey: QueryKey } {
  const queryOptions = getAdminFindOneCategoryTermQueryOptions(
    namekey,
    options,
  );

  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
  };

  query.queryKey = queryOptions.queryKey;

  return query;
}

/**
 * @summary 약관 검색 목록
 */
export const adminSearchTerm = (
  params?: AdminSearchTermParams,
  options?: SecondParameter<typeof orvalInstance>,
  signal?: AbortSignal,
) => {
  return orvalInstance<TermListAdminDto>(
    { url: `/admin/term/search`, method: 'GET', params, signal },
    options,
  );
};

export const getAdminSearchTermQueryKey = (params?: AdminSearchTermParams) => {
  return [`/admin/term/search`, ...(params ? [params] : [])] as const;
};

export const getAdminSearchTermQueryOptions = <
  TData = Awaited<ReturnType<typeof adminSearchTerm>>,
  TError = unknown,
>(
  params?: AdminSearchTermParams,
  options?: {
    query?: UseQueryOptions<
      Awaited<ReturnType<typeof adminSearchTerm>>,
      TError,
      TData
    >;
    request?: SecondParameter<typeof orvalInstance>;
  },
) => {
  const { query: queryOptions, request: requestOptions } = options ?? {};

  const queryKey = queryOptions?.queryKey ?? getAdminSearchTermQueryKey(params);

  const queryFn: QueryFunction<Awaited<ReturnType<typeof adminSearchTerm>>> = ({
    signal,
  }) => adminSearchTerm(params, requestOptions, signal);

  return { queryKey, queryFn, ...queryOptions } as UseQueryOptions<
    Awaited<ReturnType<typeof adminSearchTerm>>,
    TError,
    TData
  > & { queryKey: QueryKey };
};

export type AdminSearchTermQueryResult = NonNullable<
  Awaited<ReturnType<typeof adminSearchTerm>>
>;
export type AdminSearchTermQueryError = unknown;

/**
 * @summary 약관 검색 목록
 */

export function useAdminSearchTerm<
  TData = Awaited<ReturnType<typeof adminSearchTerm>>,
  TError = unknown,
>(
  params?: AdminSearchTermParams,
  options?: {
    query?: UseQueryOptions<
      Awaited<ReturnType<typeof adminSearchTerm>>,
      TError,
      TData
    >;
    request?: SecondParameter<typeof orvalInstance>;
  },
): UseQueryResult<TData, TError> & { queryKey: QueryKey } {
  const queryOptions = getAdminSearchTermQueryOptions(params, options);

  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
  };

  query.queryKey = queryOptions.queryKey;

  return query;
}

/**
 * @summary 약관 조회
 */
export const adminFindOneTerm = (
  id: number,
  options?: SecondParameter<typeof orvalInstance>,
  signal?: AbortSignal,
) => {
  return orvalInstance<TermDto>(
    { url: `/admin/term/${id}`, method: 'GET', signal },
    options,
  );
};

export const getAdminFindOneTermQueryKey = (id: number) => {
  return [`/admin/term/${id}`] as const;
};

export const getAdminFindOneTermQueryOptions = <
  TData = Awaited<ReturnType<typeof adminFindOneTerm>>,
  TError = unknown,
>(
  id: number,
  options?: {
    query?: UseQueryOptions<
      Awaited<ReturnType<typeof adminFindOneTerm>>,
      TError,
      TData
    >;
    request?: SecondParameter<typeof orvalInstance>;
  },
) => {
  const { query: queryOptions, request: requestOptions } = options ?? {};

  const queryKey = queryOptions?.queryKey ?? getAdminFindOneTermQueryKey(id);

  const queryFn: QueryFunction<
    Awaited<ReturnType<typeof adminFindOneTerm>>
  > = ({ signal }) => adminFindOneTerm(id, requestOptions, signal);

  return {
    queryKey,
    queryFn,
    enabled: !!id,
    ...queryOptions,
  } as UseQueryOptions<
    Awaited<ReturnType<typeof adminFindOneTerm>>,
    TError,
    TData
  > & { queryKey: QueryKey };
};

export type AdminFindOneTermQueryResult = NonNullable<
  Awaited<ReturnType<typeof adminFindOneTerm>>
>;
export type AdminFindOneTermQueryError = unknown;

/**
 * @summary 약관 조회
 */

export function useAdminFindOneTerm<
  TData = Awaited<ReturnType<typeof adminFindOneTerm>>,
  TError = unknown,
>(
  id: number,
  options?: {
    query?: UseQueryOptions<
      Awaited<ReturnType<typeof adminFindOneTerm>>,
      TError,
      TData
    >;
    request?: SecondParameter<typeof orvalInstance>;
  },
): UseQueryResult<TData, TError> & { queryKey: QueryKey } {
  const queryOptions = getAdminFindOneTermQueryOptions(id, options);

  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
  };

  query.queryKey = queryOptions.queryKey;

  return query;
}

/**
 * @summary 약관 수정
 */
export const adminUpdateTerm = (
  id: number,
  termAdminParam: TermAdminParam,
  options?: SecondParameter<typeof orvalInstance>,
) => {
  return orvalInstance<void>(
    {
      url: `/admin/term/${id}`,
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      data: termAdminParam,
    },
    options,
  );
};

export const getAdminUpdateTermMutationOptions = <
  TError = unknown,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof adminUpdateTerm>>,
    TError,
    { id: number; data: TermAdminParam },
    TContext
  >;
  request?: SecondParameter<typeof orvalInstance>;
}): UseMutationOptions<
  Awaited<ReturnType<typeof adminUpdateTerm>>,
  TError,
  { id: number; data: TermAdminParam },
  TContext
> => {
  const mutationKey = ['adminUpdateTerm'];
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation &&
      'mutationKey' in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined };

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof adminUpdateTerm>>,
    { id: number; data: TermAdminParam }
  > = (props) => {
    const { id, data } = props ?? {};

    return adminUpdateTerm(id, data, requestOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type AdminUpdateTermMutationResult = NonNullable<
  Awaited<ReturnType<typeof adminUpdateTerm>>
>;
export type AdminUpdateTermMutationBody = TermAdminParam;
export type AdminUpdateTermMutationError = unknown;

/**
 * @summary 약관 수정
 */
export const useAdminUpdateTerm = <
  TError = unknown,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof adminUpdateTerm>>,
    TError,
    { id: number; data: TermAdminParam },
    TContext
  >;
  request?: SecondParameter<typeof orvalInstance>;
}): UseMutationResult<
  Awaited<ReturnType<typeof adminUpdateTerm>>,
  TError,
  { id: number; data: TermAdminParam },
  TContext
> => {
  const mutationOptions = getAdminUpdateTermMutationOptions(options);

  return useMutation(mutationOptions);
};
/**
 * @summary 약관 삭제
 */
export const adminDeleteTerm = (
  id: number,
  options?: SecondParameter<typeof orvalInstance>,
) => {
  return orvalInstance<void>(
    { url: `/admin/term/${id}`, method: 'DELETE' },
    options,
  );
};

export const getAdminDeleteTermMutationOptions = <
  TError = unknown,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof adminDeleteTerm>>,
    TError,
    { id: number },
    TContext
  >;
  request?: SecondParameter<typeof orvalInstance>;
}): UseMutationOptions<
  Awaited<ReturnType<typeof adminDeleteTerm>>,
  TError,
  { id: number },
  TContext
> => {
  const mutationKey = ['adminDeleteTerm'];
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation &&
      'mutationKey' in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined };

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof adminDeleteTerm>>,
    { id: number }
  > = (props) => {
    const { id } = props ?? {};

    return adminDeleteTerm(id, requestOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type AdminDeleteTermMutationResult = NonNullable<
  Awaited<ReturnType<typeof adminDeleteTerm>>
>;

export type AdminDeleteTermMutationError = unknown;

/**
 * @summary 약관 삭제
 */
export const useAdminDeleteTerm = <
  TError = unknown,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof adminDeleteTerm>>,
    TError,
    { id: number },
    TContext
  >;
  request?: SecondParameter<typeof orvalInstance>;
}): UseMutationResult<
  Awaited<ReturnType<typeof adminDeleteTerm>>,
  TError,
  { id: number },
  TContext
> => {
  const mutationOptions = getAdminDeleteTermMutationOptions(options);

  return useMutation(mutationOptions);
};
/**
 * @summary 약관 등록
 */
export const adminCreateTerm = (
  termAdminParam: TermAdminParam,
  options?: SecondParameter<typeof orvalInstance>,
  signal?: AbortSignal,
) => {
  return orvalInstance<TermDto>(
    {
      url: `/admin/term`,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: termAdminParam,
      signal,
    },
    options,
  );
};

export const getAdminCreateTermMutationOptions = <
  TError = unknown,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof adminCreateTerm>>,
    TError,
    { data: TermAdminParam },
    TContext
  >;
  request?: SecondParameter<typeof orvalInstance>;
}): UseMutationOptions<
  Awaited<ReturnType<typeof adminCreateTerm>>,
  TError,
  { data: TermAdminParam },
  TContext
> => {
  const mutationKey = ['adminCreateTerm'];
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation &&
      'mutationKey' in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined };

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof adminCreateTerm>>,
    { data: TermAdminParam }
  > = (props) => {
    const { data } = props ?? {};

    return adminCreateTerm(data, requestOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type AdminCreateTermMutationResult = NonNullable<
  Awaited<ReturnType<typeof adminCreateTerm>>
>;
export type AdminCreateTermMutationBody = TermAdminParam;
export type AdminCreateTermMutationError = unknown;

/**
 * @summary 약관 등록
 */
export const useAdminCreateTerm = <
  TError = unknown,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof adminCreateTerm>>,
    TError,
    { data: TermAdminParam },
    TContext
  >;
  request?: SecondParameter<typeof orvalInstance>;
}): UseMutationResult<
  Awaited<ReturnType<typeof adminCreateTerm>>,
  TError,
  { data: TermAdminParam },
  TContext
> => {
  const mutationOptions = getAdminCreateTermMutationOptions(options);

  return useMutation(mutationOptions);
};
/**
 * @summary 약관 일괄 삭제
 */
export const adminRemoveTerm = (
  termRemoveAdminParam: TermRemoveAdminParam,
  options?: SecondParameter<typeof orvalInstance>,
  signal?: AbortSignal,
) => {
  return orvalInstance<void>(
    {
      url: `/admin/term/remove`,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: termRemoveAdminParam,
      signal,
    },
    options,
  );
};

export const getAdminRemoveTermMutationOptions = <
  TError = unknown,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof adminRemoveTerm>>,
    TError,
    { data: TermRemoveAdminParam },
    TContext
  >;
  request?: SecondParameter<typeof orvalInstance>;
}): UseMutationOptions<
  Awaited<ReturnType<typeof adminRemoveTerm>>,
  TError,
  { data: TermRemoveAdminParam },
  TContext
> => {
  const mutationKey = ['adminRemoveTerm'];
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation &&
      'mutationKey' in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined };

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof adminRemoveTerm>>,
    { data: TermRemoveAdminParam }
  > = (props) => {
    const { data } = props ?? {};

    return adminRemoveTerm(data, requestOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type AdminRemoveTermMutationResult = NonNullable<
  Awaited<ReturnType<typeof adminRemoveTerm>>
>;
export type AdminRemoveTermMutationBody = TermRemoveAdminParam;
export type AdminRemoveTermMutationError = unknown;

/**
 * @summary 약관 일괄 삭제
 */
export const useAdminRemoveTerm = <
  TError = unknown,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof adminRemoveTerm>>,
    TError,
    { data: TermRemoveAdminParam },
    TContext
  >;
  request?: SecondParameter<typeof orvalInstance>;
}): UseMutationResult<
  Awaited<ReturnType<typeof adminRemoveTerm>>,
  TError,
  { data: TermRemoveAdminParam },
  TContext
> => {
  const mutationOptions = getAdminRemoveTermMutationOptions(options);

  return useMutation(mutationOptions);
};
/**
 * @summary 약관 분류 조회
 */
export const clientFindOneCategoryTerm = (
  namekey: string,
  options?: SecondParameter<typeof orvalInstance>,
  signal?: AbortSignal,
) => {
  return orvalInstance<TermCategoryDto>(
    { url: `/client/term/category/${namekey}`, method: 'GET', signal },
    options,
  );
};

export const getClientFindOneCategoryTermQueryKey = (namekey: string) => {
  return [`/client/term/category/${namekey}`] as const;
};

export const getClientFindOneCategoryTermQueryOptions = <
  TData = Awaited<ReturnType<typeof clientFindOneCategoryTerm>>,
  TError = unknown,
>(
  namekey: string,
  options?: {
    query?: UseQueryOptions<
      Awaited<ReturnType<typeof clientFindOneCategoryTerm>>,
      TError,
      TData
    >;
    request?: SecondParameter<typeof orvalInstance>;
  },
) => {
  const { query: queryOptions, request: requestOptions } = options ?? {};

  const queryKey =
    queryOptions?.queryKey ?? getClientFindOneCategoryTermQueryKey(namekey);

  const queryFn: QueryFunction<
    Awaited<ReturnType<typeof clientFindOneCategoryTerm>>
  > = ({ signal }) =>
    clientFindOneCategoryTerm(namekey, requestOptions, signal);

  return {
    queryKey,
    queryFn,
    enabled: !!namekey,
    ...queryOptions,
  } as UseQueryOptions<
    Awaited<ReturnType<typeof clientFindOneCategoryTerm>>,
    TError,
    TData
  > & { queryKey: QueryKey };
};

export type ClientFindOneCategoryTermQueryResult = NonNullable<
  Awaited<ReturnType<typeof clientFindOneCategoryTerm>>
>;
export type ClientFindOneCategoryTermQueryError = unknown;

/**
 * @summary 약관 분류 조회
 */

export function useClientFindOneCategoryTerm<
  TData = Awaited<ReturnType<typeof clientFindOneCategoryTerm>>,
  TError = unknown,
>(
  namekey: string,
  options?: {
    query?: UseQueryOptions<
      Awaited<ReturnType<typeof clientFindOneCategoryTerm>>,
      TError,
      TData
    >;
    request?: SecondParameter<typeof orvalInstance>;
  },
): UseQueryResult<TData, TError> & { queryKey: QueryKey } {
  const queryOptions = getClientFindOneCategoryTermQueryOptions(
    namekey,
    options,
  );

  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
  };

  query.queryKey = queryOptions.queryKey;

  return query;
}

/**
 * @summary 약관 최신 조회
 */
export const clientRecentTerm = (
  namekey: string,
  options?: SecondParameter<typeof orvalInstance>,
  signal?: AbortSignal,
) => {
  return orvalInstance<TermDto>(
    { url: `/client/term/recent/${namekey}`, method: 'GET', signal },
    options,
  );
};

export const getClientRecentTermQueryKey = (namekey: string) => {
  return [`/client/term/recent/${namekey}`] as const;
};

export const getClientRecentTermQueryOptions = <
  TData = Awaited<ReturnType<typeof clientRecentTerm>>,
  TError = unknown,
>(
  namekey: string,
  options?: {
    query?: UseQueryOptions<
      Awaited<ReturnType<typeof clientRecentTerm>>,
      TError,
      TData
    >;
    request?: SecondParameter<typeof orvalInstance>;
  },
) => {
  const { query: queryOptions, request: requestOptions } = options ?? {};

  const queryKey =
    queryOptions?.queryKey ?? getClientRecentTermQueryKey(namekey);

  const queryFn: QueryFunction<
    Awaited<ReturnType<typeof clientRecentTerm>>
  > = ({ signal }) => clientRecentTerm(namekey, requestOptions, signal);

  return {
    queryKey,
    queryFn,
    enabled: !!namekey,
    ...queryOptions,
  } as UseQueryOptions<
    Awaited<ReturnType<typeof clientRecentTerm>>,
    TError,
    TData
  > & { queryKey: QueryKey };
};

export type ClientRecentTermQueryResult = NonNullable<
  Awaited<ReturnType<typeof clientRecentTerm>>
>;
export type ClientRecentTermQueryError = unknown;

/**
 * @summary 약관 최신 조회
 */

export function useClientRecentTerm<
  TData = Awaited<ReturnType<typeof clientRecentTerm>>,
  TError = unknown,
>(
  namekey: string,
  options?: {
    query?: UseQueryOptions<
      Awaited<ReturnType<typeof clientRecentTerm>>,
      TError,
      TData
    >;
    request?: SecondParameter<typeof orvalInstance>;
  },
): UseQueryResult<TData, TError> & { queryKey: QueryKey } {
  const queryOptions = getClientRecentTermQueryOptions(namekey, options);

  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
  };

  query.queryKey = queryOptions.queryKey;

  return query;
}

/**
 * @summary 약관 조회
 */
export const clientFindOneTerm = (
  id: number,
  options?: SecondParameter<typeof orvalInstance>,
  signal?: AbortSignal,
) => {
  return orvalInstance<TermDto>(
    { url: `/client/term/${id}`, method: 'GET', signal },
    options,
  );
};

export const getClientFindOneTermQueryKey = (id: number) => {
  return [`/client/term/${id}`] as const;
};

export const getClientFindOneTermQueryOptions = <
  TData = Awaited<ReturnType<typeof clientFindOneTerm>>,
  TError = unknown,
>(
  id: number,
  options?: {
    query?: UseQueryOptions<
      Awaited<ReturnType<typeof clientFindOneTerm>>,
      TError,
      TData
    >;
    request?: SecondParameter<typeof orvalInstance>;
  },
) => {
  const { query: queryOptions, request: requestOptions } = options ?? {};

  const queryKey = queryOptions?.queryKey ?? getClientFindOneTermQueryKey(id);

  const queryFn: QueryFunction<
    Awaited<ReturnType<typeof clientFindOneTerm>>
  > = ({ signal }) => clientFindOneTerm(id, requestOptions, signal);

  return {
    queryKey,
    queryFn,
    enabled: !!id,
    ...queryOptions,
  } as UseQueryOptions<
    Awaited<ReturnType<typeof clientFindOneTerm>>,
    TError,
    TData
  > & { queryKey: QueryKey };
};

export type ClientFindOneTermQueryResult = NonNullable<
  Awaited<ReturnType<typeof clientFindOneTerm>>
>;
export type ClientFindOneTermQueryError = unknown;

/**
 * @summary 약관 조회
 */

export function useClientFindOneTerm<
  TData = Awaited<ReturnType<typeof clientFindOneTerm>>,
  TError = unknown,
>(
  id: number,
  options?: {
    query?: UseQueryOptions<
      Awaited<ReturnType<typeof clientFindOneTerm>>,
      TError,
      TData
    >;
    request?: SecondParameter<typeof orvalInstance>;
  },
): UseQueryResult<TData, TError> & { queryKey: QueryKey } {
  const queryOptions = getClientFindOneTermQueryOptions(id, options);

  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
  };

  query.queryKey = queryOptions.queryKey;

  return query;
}
