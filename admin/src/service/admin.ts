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
  AdminAdminParam,
  AdminAuthAdminParam,
  AdminDto,
  AdminListAdminDto,
  AdminPasswordAdminParam,
  AdminProfileAdminParam,
  AdminSearchAdminParams,
  AdminUsernameAdminParam,
  ResetPasswordAdminDto,
  ResetPasswordAdminParam,
} from './model';

type AwaitedInput<T> = PromiseLike<T> | T;

type Awaited<O> = O extends AwaitedInput<infer T> ? T : never;

type SecondParameter<T extends (...args: never) => unknown> = Parameters<T>[1];

/**
 * @summary 관리자 세션 연장
 */
export const adminConnectAdmin = (
  options?: SecondParameter<typeof orvalInstance>,
  signal?: AbortSignal,
) => {
  return orvalInstance<void>(
    { url: `/admin/admin/connect`, method: 'GET', signal },
    options,
  );
};

export const getAdminConnectAdminQueryKey = () => {
  return [`/admin/admin/connect`] as const;
};

export const getAdminConnectAdminQueryOptions = <
  TData = Awaited<ReturnType<typeof adminConnectAdmin>>,
  TError = unknown,
>(options?: {
  query?: UseQueryOptions<
    Awaited<ReturnType<typeof adminConnectAdmin>>,
    TError,
    TData
  >;
  request?: SecondParameter<typeof orvalInstance>;
}) => {
  const { query: queryOptions, request: requestOptions } = options ?? {};

  const queryKey = queryOptions?.queryKey ?? getAdminConnectAdminQueryKey();

  const queryFn: QueryFunction<
    Awaited<ReturnType<typeof adminConnectAdmin>>
  > = ({ signal }) => adminConnectAdmin(requestOptions, signal);

  return { queryKey, queryFn, ...queryOptions } as UseQueryOptions<
    Awaited<ReturnType<typeof adminConnectAdmin>>,
    TError,
    TData
  > & { queryKey: QueryKey };
};

export type AdminConnectAdminQueryResult = NonNullable<
  Awaited<ReturnType<typeof adminConnectAdmin>>
>;
export type AdminConnectAdminQueryError = unknown;

/**
 * @summary 관리자 세션 연장
 */

export function useAdminConnectAdmin<
  TData = Awaited<ReturnType<typeof adminConnectAdmin>>,
  TError = unknown,
>(options?: {
  query?: UseQueryOptions<
    Awaited<ReturnType<typeof adminConnectAdmin>>,
    TError,
    TData
  >;
  request?: SecondParameter<typeof orvalInstance>;
}): UseQueryResult<TData, TError> & { queryKey: QueryKey } {
  const queryOptions = getAdminConnectAdminQueryOptions(options);

  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
  };

  query.queryKey = queryOptions.queryKey;

  return query;
}

/**
 * @summary 관리자 세션 정보 취득
 */
export const adminSessionAdmin = (
  options?: SecondParameter<typeof orvalInstance>,
  signal?: AbortSignal,
) => {
  return orvalInstance<AdminDto>(
    { url: `/admin/admin/session`, method: 'GET', signal },
    options,
  );
};

export const getAdminSessionAdminQueryKey = () => {
  return [`/admin/admin/session`] as const;
};

export const getAdminSessionAdminQueryOptions = <
  TData = Awaited<ReturnType<typeof adminSessionAdmin>>,
  TError = unknown,
>(options?: {
  query?: UseQueryOptions<
    Awaited<ReturnType<typeof adminSessionAdmin>>,
    TError,
    TData
  >;
  request?: SecondParameter<typeof orvalInstance>;
}) => {
  const { query: queryOptions, request: requestOptions } = options ?? {};

  const queryKey = queryOptions?.queryKey ?? getAdminSessionAdminQueryKey();

  const queryFn: QueryFunction<
    Awaited<ReturnType<typeof adminSessionAdmin>>
  > = ({ signal }) => adminSessionAdmin(requestOptions, signal);

  return { queryKey, queryFn, ...queryOptions } as UseQueryOptions<
    Awaited<ReturnType<typeof adminSessionAdmin>>,
    TError,
    TData
  > & { queryKey: QueryKey };
};

export type AdminSessionAdminQueryResult = NonNullable<
  Awaited<ReturnType<typeof adminSessionAdmin>>
>;
export type AdminSessionAdminQueryError = unknown;

/**
 * @summary 관리자 세션 정보 취득
 */

export function useAdminSessionAdmin<
  TData = Awaited<ReturnType<typeof adminSessionAdmin>>,
  TError = unknown,
>(options?: {
  query?: UseQueryOptions<
    Awaited<ReturnType<typeof adminSessionAdmin>>,
    TError,
    TData
  >;
  request?: SecondParameter<typeof orvalInstance>;
}): UseQueryResult<TData, TError> & { queryKey: QueryKey } {
  const queryOptions = getAdminSessionAdminQueryOptions(options);

  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
  };

  query.queryKey = queryOptions.queryKey;

  return query;
}

/**
 * @summary 관리자 계정 프로필 수정
 */
export const adminProfileAdmin = (
  adminProfileAdminParam: AdminProfileAdminParam,
  options?: SecondParameter<typeof orvalInstance>,
  signal?: AbortSignal,
) => {
  return orvalInstance<void>(
    {
      url: `/admin/admin/profile`,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: adminProfileAdminParam,
      signal,
    },
    options,
  );
};

export const getAdminProfileAdminMutationOptions = <
  TError = unknown,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof adminProfileAdmin>>,
    TError,
    { data: AdminProfileAdminParam },
    TContext
  >;
  request?: SecondParameter<typeof orvalInstance>;
}): UseMutationOptions<
  Awaited<ReturnType<typeof adminProfileAdmin>>,
  TError,
  { data: AdminProfileAdminParam },
  TContext
> => {
  const mutationKey = ['adminProfileAdmin'];
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation &&
      'mutationKey' in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined };

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof adminProfileAdmin>>,
    { data: AdminProfileAdminParam }
  > = (props) => {
    const { data } = props ?? {};

    return adminProfileAdmin(data, requestOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type AdminProfileAdminMutationResult = NonNullable<
  Awaited<ReturnType<typeof adminProfileAdmin>>
>;
export type AdminProfileAdminMutationBody = AdminProfileAdminParam;
export type AdminProfileAdminMutationError = unknown;

/**
 * @summary 관리자 계정 프로필 수정
 */
export const useAdminProfileAdmin = <
  TError = unknown,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof adminProfileAdmin>>,
    TError,
    { data: AdminProfileAdminParam },
    TContext
  >;
  request?: SecondParameter<typeof orvalInstance>;
}): UseMutationResult<
  Awaited<ReturnType<typeof adminProfileAdmin>>,
  TError,
  { data: AdminProfileAdminParam },
  TContext
> => {
  const mutationOptions = getAdminProfileAdminMutationOptions(options);

  return useMutation(mutationOptions);
};
/**
 * @summary 관리자 계정 비밀번호 수정
 */
export const adminPasswordAdmin = (
  adminPasswordAdminParam: AdminPasswordAdminParam,
  options?: SecondParameter<typeof orvalInstance>,
  signal?: AbortSignal,
) => {
  return orvalInstance<AdminDto>(
    {
      url: `/admin/admin/password`,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: adminPasswordAdminParam,
      signal,
    },
    options,
  );
};

export const getAdminPasswordAdminMutationOptions = <
  TError = unknown,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof adminPasswordAdmin>>,
    TError,
    { data: AdminPasswordAdminParam },
    TContext
  >;
  request?: SecondParameter<typeof orvalInstance>;
}): UseMutationOptions<
  Awaited<ReturnType<typeof adminPasswordAdmin>>,
  TError,
  { data: AdminPasswordAdminParam },
  TContext
> => {
  const mutationKey = ['adminPasswordAdmin'];
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation &&
      'mutationKey' in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined };

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof adminPasswordAdmin>>,
    { data: AdminPasswordAdminParam }
  > = (props) => {
    const { data } = props ?? {};

    return adminPasswordAdmin(data, requestOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type AdminPasswordAdminMutationResult = NonNullable<
  Awaited<ReturnType<typeof adminPasswordAdmin>>
>;
export type AdminPasswordAdminMutationBody = AdminPasswordAdminParam;
export type AdminPasswordAdminMutationError = unknown;

/**
 * @summary 관리자 계정 비밀번호 수정
 */
export const useAdminPasswordAdmin = <
  TError = unknown,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof adminPasswordAdmin>>,
    TError,
    { data: AdminPasswordAdminParam },
    TContext
  >;
  request?: SecondParameter<typeof orvalInstance>;
}): UseMutationResult<
  Awaited<ReturnType<typeof adminPasswordAdmin>>,
  TError,
  { data: AdminPasswordAdminParam },
  TContext
> => {
  const mutationOptions = getAdminPasswordAdminMutationOptions(options);

  return useMutation(mutationOptions);
};
/**
 * @summary 관리자 계정 비밀번호 초기화
 */
export const adminResetPasswordAdmin = (
  resetPasswordAdminParam: ResetPasswordAdminParam,
  options?: SecondParameter<typeof orvalInstance>,
  signal?: AbortSignal,
) => {
  return orvalInstance<ResetPasswordAdminDto>(
    {
      url: `/admin/admin/reset/password`,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: resetPasswordAdminParam,
      signal,
    },
    options,
  );
};

export const getAdminResetPasswordAdminMutationOptions = <
  TError = unknown,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof adminResetPasswordAdmin>>,
    TError,
    { data: ResetPasswordAdminParam },
    TContext
  >;
  request?: SecondParameter<typeof orvalInstance>;
}): UseMutationOptions<
  Awaited<ReturnType<typeof adminResetPasswordAdmin>>,
  TError,
  { data: ResetPasswordAdminParam },
  TContext
> => {
  const mutationKey = ['adminResetPasswordAdmin'];
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation &&
      'mutationKey' in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined };

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof adminResetPasswordAdmin>>,
    { data: ResetPasswordAdminParam }
  > = (props) => {
    const { data } = props ?? {};

    return adminResetPasswordAdmin(data, requestOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type AdminResetPasswordAdminMutationResult = NonNullable<
  Awaited<ReturnType<typeof adminResetPasswordAdmin>>
>;
export type AdminResetPasswordAdminMutationBody = ResetPasswordAdminParam;
export type AdminResetPasswordAdminMutationError = unknown;

/**
 * @summary 관리자 계정 비밀번호 초기화
 */
export const useAdminResetPasswordAdmin = <
  TError = unknown,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof adminResetPasswordAdmin>>,
    TError,
    { data: ResetPasswordAdminParam },
    TContext
  >;
  request?: SecondParameter<typeof orvalInstance>;
}): UseMutationResult<
  Awaited<ReturnType<typeof adminResetPasswordAdmin>>,
  TError,
  { data: ResetPasswordAdminParam },
  TContext
> => {
  const mutationOptions = getAdminResetPasswordAdminMutationOptions(options);

  return useMutation(mutationOptions);
};
/**
 * @summary 관리자 로그인
 */
export const adminAuthAdmin = (
  adminAuthAdminParam: AdminAuthAdminParam,
  options?: SecondParameter<typeof orvalInstance>,
  signal?: AbortSignal,
) => {
  return orvalInstance<AdminDto>(
    {
      url: `/admin/admin/auth`,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: adminAuthAdminParam,
      signal,
    },
    options,
  );
};

export const getAdminAuthAdminMutationOptions = <
  TError = unknown,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof adminAuthAdmin>>,
    TError,
    { data: AdminAuthAdminParam },
    TContext
  >;
  request?: SecondParameter<typeof orvalInstance>;
}): UseMutationOptions<
  Awaited<ReturnType<typeof adminAuthAdmin>>,
  TError,
  { data: AdminAuthAdminParam },
  TContext
> => {
  const mutationKey = ['adminAuthAdmin'];
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation &&
      'mutationKey' in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined };

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof adminAuthAdmin>>,
    { data: AdminAuthAdminParam }
  > = (props) => {
    const { data } = props ?? {};

    return adminAuthAdmin(data, requestOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type AdminAuthAdminMutationResult = NonNullable<
  Awaited<ReturnType<typeof adminAuthAdmin>>
>;
export type AdminAuthAdminMutationBody = AdminAuthAdminParam;
export type AdminAuthAdminMutationError = unknown;

/**
 * @summary 관리자 로그인
 */
export const useAdminAuthAdmin = <
  TError = unknown,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof adminAuthAdmin>>,
    TError,
    { data: AdminAuthAdminParam },
    TContext
  >;
  request?: SecondParameter<typeof orvalInstance>;
}): UseMutationResult<
  Awaited<ReturnType<typeof adminAuthAdmin>>,
  TError,
  { data: AdminAuthAdminParam },
  TContext
> => {
  const mutationOptions = getAdminAuthAdminMutationOptions(options);

  return useMutation(mutationOptions);
};
/**
 * @summary 관리자 로그아웃
 */
export const adminLogoutAdmin = (
  options?: SecondParameter<typeof orvalInstance>,
  signal?: AbortSignal,
) => {
  return orvalInstance<void>(
    { url: `/admin/admin/logout`, method: 'POST', signal },
    options,
  );
};

export const getAdminLogoutAdminMutationOptions = <
  TError = unknown,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof adminLogoutAdmin>>,
    TError,
    void,
    TContext
  >;
  request?: SecondParameter<typeof orvalInstance>;
}): UseMutationOptions<
  Awaited<ReturnType<typeof adminLogoutAdmin>>,
  TError,
  void,
  TContext
> => {
  const mutationKey = ['adminLogoutAdmin'];
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation &&
      'mutationKey' in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined };

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof adminLogoutAdmin>>,
    void
  > = () => {
    return adminLogoutAdmin(requestOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type AdminLogoutAdminMutationResult = NonNullable<
  Awaited<ReturnType<typeof adminLogoutAdmin>>
>;

export type AdminLogoutAdminMutationError = unknown;

/**
 * @summary 관리자 로그아웃
 */
export const useAdminLogoutAdmin = <
  TError = unknown,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof adminLogoutAdmin>>,
    TError,
    void,
    TContext
  >;
  request?: SecondParameter<typeof orvalInstance>;
}): UseMutationResult<
  Awaited<ReturnType<typeof adminLogoutAdmin>>,
  TError,
  void,
  TContext
> => {
  const mutationOptions = getAdminLogoutAdminMutationOptions(options);

  return useMutation(mutationOptions);
};
/**
 * @summary 관리자 계정 아이디 중복 체크
 */
export const adminUsernameAdmin = (
  adminUsernameAdminParam: AdminUsernameAdminParam,
  options?: SecondParameter<typeof orvalInstance>,
  signal?: AbortSignal,
) => {
  return orvalInstance<AdminDto>(
    {
      url: `/admin/admin/username`,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: adminUsernameAdminParam,
      signal,
    },
    options,
  );
};

export const getAdminUsernameAdminMutationOptions = <
  TError = unknown,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof adminUsernameAdmin>>,
    TError,
    { data: AdminUsernameAdminParam },
    TContext
  >;
  request?: SecondParameter<typeof orvalInstance>;
}): UseMutationOptions<
  Awaited<ReturnType<typeof adminUsernameAdmin>>,
  TError,
  { data: AdminUsernameAdminParam },
  TContext
> => {
  const mutationKey = ['adminUsernameAdmin'];
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation &&
      'mutationKey' in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined };

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof adminUsernameAdmin>>,
    { data: AdminUsernameAdminParam }
  > = (props) => {
    const { data } = props ?? {};

    return adminUsernameAdmin(data, requestOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type AdminUsernameAdminMutationResult = NonNullable<
  Awaited<ReturnType<typeof adminUsernameAdmin>>
>;
export type AdminUsernameAdminMutationBody = AdminUsernameAdminParam;
export type AdminUsernameAdminMutationError = unknown;

/**
 * @summary 관리자 계정 아이디 중복 체크
 */
export const useAdminUsernameAdmin = <
  TError = unknown,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof adminUsernameAdmin>>,
    TError,
    { data: AdminUsernameAdminParam },
    TContext
  >;
  request?: SecondParameter<typeof orvalInstance>;
}): UseMutationResult<
  Awaited<ReturnType<typeof adminUsernameAdmin>>,
  TError,
  { data: AdminUsernameAdminParam },
  TContext
> => {
  const mutationOptions = getAdminUsernameAdminMutationOptions(options);

  return useMutation(mutationOptions);
};
/**
 * @summary 관리자 검색 목록
 */
export const adminSearchAdmin = (
  params?: AdminSearchAdminParams,
  options?: SecondParameter<typeof orvalInstance>,
  signal?: AbortSignal,
) => {
  return orvalInstance<AdminListAdminDto>(
    { url: `/admin/admin/search`, method: 'GET', params, signal },
    options,
  );
};

export const getAdminSearchAdminQueryKey = (
  params?: AdminSearchAdminParams,
) => {
  return [`/admin/admin/search`, ...(params ? [params] : [])] as const;
};

export const getAdminSearchAdminQueryOptions = <
  TData = Awaited<ReturnType<typeof adminSearchAdmin>>,
  TError = unknown,
>(
  params?: AdminSearchAdminParams,
  options?: {
    query?: UseQueryOptions<
      Awaited<ReturnType<typeof adminSearchAdmin>>,
      TError,
      TData
    >;
    request?: SecondParameter<typeof orvalInstance>;
  },
) => {
  const { query: queryOptions, request: requestOptions } = options ?? {};

  const queryKey =
    queryOptions?.queryKey ?? getAdminSearchAdminQueryKey(params);

  const queryFn: QueryFunction<
    Awaited<ReturnType<typeof adminSearchAdmin>>
  > = ({ signal }) => adminSearchAdmin(params, requestOptions, signal);

  return { queryKey, queryFn, ...queryOptions } as UseQueryOptions<
    Awaited<ReturnType<typeof adminSearchAdmin>>,
    TError,
    TData
  > & { queryKey: QueryKey };
};

export type AdminSearchAdminQueryResult = NonNullable<
  Awaited<ReturnType<typeof adminSearchAdmin>>
>;
export type AdminSearchAdminQueryError = unknown;

/**
 * @summary 관리자 검색 목록
 */

export function useAdminSearchAdmin<
  TData = Awaited<ReturnType<typeof adminSearchAdmin>>,
  TError = unknown,
>(
  params?: AdminSearchAdminParams,
  options?: {
    query?: UseQueryOptions<
      Awaited<ReturnType<typeof adminSearchAdmin>>,
      TError,
      TData
    >;
    request?: SecondParameter<typeof orvalInstance>;
  },
): UseQueryResult<TData, TError> & { queryKey: QueryKey } {
  const queryOptions = getAdminSearchAdminQueryOptions(params, options);

  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
  };

  query.queryKey = queryOptions.queryKey;

  return query;
}

/**
 * @summary 관리자 조회
 */
export const adminFindOneAdmin = (
  id: number,
  options?: SecondParameter<typeof orvalInstance>,
  signal?: AbortSignal,
) => {
  return orvalInstance<AdminDto>(
    { url: `/admin/admin/${id}`, method: 'GET', signal },
    options,
  );
};

export const getAdminFindOneAdminQueryKey = (id: number) => {
  return [`/admin/admin/${id}`] as const;
};

export const getAdminFindOneAdminQueryOptions = <
  TData = Awaited<ReturnType<typeof adminFindOneAdmin>>,
  TError = unknown,
>(
  id: number,
  options?: {
    query?: UseQueryOptions<
      Awaited<ReturnType<typeof adminFindOneAdmin>>,
      TError,
      TData
    >;
    request?: SecondParameter<typeof orvalInstance>;
  },
) => {
  const { query: queryOptions, request: requestOptions } = options ?? {};

  const queryKey = queryOptions?.queryKey ?? getAdminFindOneAdminQueryKey(id);

  const queryFn: QueryFunction<
    Awaited<ReturnType<typeof adminFindOneAdmin>>
  > = ({ signal }) => adminFindOneAdmin(id, requestOptions, signal);

  return {
    queryKey,
    queryFn,
    enabled: !!id,
    ...queryOptions,
  } as UseQueryOptions<
    Awaited<ReturnType<typeof adminFindOneAdmin>>,
    TError,
    TData
  > & { queryKey: QueryKey };
};

export type AdminFindOneAdminQueryResult = NonNullable<
  Awaited<ReturnType<typeof adminFindOneAdmin>>
>;
export type AdminFindOneAdminQueryError = unknown;

/**
 * @summary 관리자 조회
 */

export function useAdminFindOneAdmin<
  TData = Awaited<ReturnType<typeof adminFindOneAdmin>>,
  TError = unknown,
>(
  id: number,
  options?: {
    query?: UseQueryOptions<
      Awaited<ReturnType<typeof adminFindOneAdmin>>,
      TError,
      TData
    >;
    request?: SecondParameter<typeof orvalInstance>;
  },
): UseQueryResult<TData, TError> & { queryKey: QueryKey } {
  const queryOptions = getAdminFindOneAdminQueryOptions(id, options);

  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
  };

  query.queryKey = queryOptions.queryKey;

  return query;
}

/**
 * @summary 관리자 수정
 */
export const adminUpdateAdmin = (
  id: number,
  adminAdminParam: AdminAdminParam,
  options?: SecondParameter<typeof orvalInstance>,
) => {
  return orvalInstance<AdminDto>(
    {
      url: `/admin/admin/${id}`,
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      data: adminAdminParam,
    },
    options,
  );
};

export const getAdminUpdateAdminMutationOptions = <
  TError = unknown,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof adminUpdateAdmin>>,
    TError,
    { id: number; data: AdminAdminParam },
    TContext
  >;
  request?: SecondParameter<typeof orvalInstance>;
}): UseMutationOptions<
  Awaited<ReturnType<typeof adminUpdateAdmin>>,
  TError,
  { id: number; data: AdminAdminParam },
  TContext
> => {
  const mutationKey = ['adminUpdateAdmin'];
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation &&
      'mutationKey' in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined };

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof adminUpdateAdmin>>,
    { id: number; data: AdminAdminParam }
  > = (props) => {
    const { id, data } = props ?? {};

    return adminUpdateAdmin(id, data, requestOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type AdminUpdateAdminMutationResult = NonNullable<
  Awaited<ReturnType<typeof adminUpdateAdmin>>
>;
export type AdminUpdateAdminMutationBody = AdminAdminParam;
export type AdminUpdateAdminMutationError = unknown;

/**
 * @summary 관리자 수정
 */
export const useAdminUpdateAdmin = <
  TError = unknown,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof adminUpdateAdmin>>,
    TError,
    { id: number; data: AdminAdminParam },
    TContext
  >;
  request?: SecondParameter<typeof orvalInstance>;
}): UseMutationResult<
  Awaited<ReturnType<typeof adminUpdateAdmin>>,
  TError,
  { id: number; data: AdminAdminParam },
  TContext
> => {
  const mutationOptions = getAdminUpdateAdminMutationOptions(options);

  return useMutation(mutationOptions);
};
/**
 * @summary 관리자 등록
 */
export const adminCreateAdmin = (
  adminAdminParam: AdminAdminParam,
  options?: SecondParameter<typeof orvalInstance>,
  signal?: AbortSignal,
) => {
  return orvalInstance<AdminDto>(
    {
      url: `/admin/admin`,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: adminAdminParam,
      signal,
    },
    options,
  );
};

export const getAdminCreateAdminMutationOptions = <
  TError = unknown,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof adminCreateAdmin>>,
    TError,
    { data: AdminAdminParam },
    TContext
  >;
  request?: SecondParameter<typeof orvalInstance>;
}): UseMutationOptions<
  Awaited<ReturnType<typeof adminCreateAdmin>>,
  TError,
  { data: AdminAdminParam },
  TContext
> => {
  const mutationKey = ['adminCreateAdmin'];
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation &&
      'mutationKey' in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined };

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof adminCreateAdmin>>,
    { data: AdminAdminParam }
  > = (props) => {
    const { data } = props ?? {};

    return adminCreateAdmin(data, requestOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type AdminCreateAdminMutationResult = NonNullable<
  Awaited<ReturnType<typeof adminCreateAdmin>>
>;
export type AdminCreateAdminMutationBody = AdminAdminParam;
export type AdminCreateAdminMutationError = unknown;

/**
 * @summary 관리자 등록
 */
export const useAdminCreateAdmin = <
  TError = unknown,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof adminCreateAdmin>>,
    TError,
    { data: AdminAdminParam },
    TContext
  >;
  request?: SecondParameter<typeof orvalInstance>;
}): UseMutationResult<
  Awaited<ReturnType<typeof adminCreateAdmin>>,
  TError,
  { data: AdminAdminParam },
  TContext
> => {
  const mutationOptions = getAdminCreateAdminMutationOptions(options);

  return useMutation(mutationOptions);
};
