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
  AdminSearchUserParams,
  UserAdminParam,
  UserAuthEmailClientDto,
  UserAuthEmailClientParam,
  UserAuthPhoneClientDto,
  UserAuthPhoneClientParam,
  UserConnectEmailClientParam,
  UserConnectPhoneClientParam,
  UserDto,
  UserFindEmailClientParam,
  UserFindPasswordClientParam,
  UserFindPasswordResetClientParam,
  UserListAdminDto,
  UserLoginClientParam,
  UserLoginKakaoClientParam,
  UserPhoneClientParam,
  UserPhoneDto,
  UserProfilePasswordClientParam,
  UserRemoveAdminParam,
  UserSignEmailClientParam,
  UserUsernameClientParam,
  UserUsernameDto,
  UserVerifyEmailClientDto,
  UserVerifyEmailClientParam,
  UserVerifyPhoneClientDto,
  UserVerifyPhoneClientParam,
  UserWithdrawClientParam,
} from './model';

type AwaitedInput<T> = PromiseLike<T> | T;

type Awaited<O> = O extends AwaitedInput<infer T> ? T : never;

type SecondParameter<T extends (...args: never) => unknown> = Parameters<T>[1];

/**
 * @summary 사용자 검색 목록
 */
export const adminSearchUser = (
  params?: AdminSearchUserParams,
  options?: SecondParameter<typeof orvalInstance>,
  signal?: AbortSignal,
) => {
  return orvalInstance<UserListAdminDto>(
    { url: `/admin/user/search`, method: 'GET', params, signal },
    options,
  );
};

export const getAdminSearchUserQueryKey = (params?: AdminSearchUserParams) => {
  return [`/admin/user/search`, ...(params ? [params] : [])] as const;
};

export const getAdminSearchUserQueryOptions = <
  TData = Awaited<ReturnType<typeof adminSearchUser>>,
  TError = unknown,
>(
  params?: AdminSearchUserParams,
  options?: {
    query?: UseQueryOptions<
      Awaited<ReturnType<typeof adminSearchUser>>,
      TError,
      TData
    >;
    request?: SecondParameter<typeof orvalInstance>;
  },
) => {
  const { query: queryOptions, request: requestOptions } = options ?? {};

  const queryKey = queryOptions?.queryKey ?? getAdminSearchUserQueryKey(params);

  const queryFn: QueryFunction<Awaited<ReturnType<typeof adminSearchUser>>> = ({
    signal,
  }) => adminSearchUser(params, requestOptions, signal);

  return { queryKey, queryFn, ...queryOptions } as UseQueryOptions<
    Awaited<ReturnType<typeof adminSearchUser>>,
    TError,
    TData
  > & { queryKey: QueryKey };
};

export type AdminSearchUserQueryResult = NonNullable<
  Awaited<ReturnType<typeof adminSearchUser>>
>;
export type AdminSearchUserQueryError = unknown;

/**
 * @summary 사용자 검색 목록
 */

export function useAdminSearchUser<
  TData = Awaited<ReturnType<typeof adminSearchUser>>,
  TError = unknown,
>(
  params?: AdminSearchUserParams,
  options?: {
    query?: UseQueryOptions<
      Awaited<ReturnType<typeof adminSearchUser>>,
      TError,
      TData
    >;
    request?: SecondParameter<typeof orvalInstance>;
  },
): UseQueryResult<TData, TError> & { queryKey: QueryKey } {
  const queryOptions = getAdminSearchUserQueryOptions(params, options);

  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
  };

  query.queryKey = queryOptions.queryKey;

  return query;
}

/**
 * @summary 사용자 전체 목록
 */
export const adminFindAllUser = (
  options?: SecondParameter<typeof orvalInstance>,
  signal?: AbortSignal,
) => {
  return orvalInstance<UserDto[]>(
    { url: `/admin/user`, method: 'GET', signal },
    options,
  );
};

export const getAdminFindAllUserQueryKey = () => {
  return [`/admin/user`] as const;
};

export const getAdminFindAllUserQueryOptions = <
  TData = Awaited<ReturnType<typeof adminFindAllUser>>,
  TError = unknown,
>(options?: {
  query?: UseQueryOptions<
    Awaited<ReturnType<typeof adminFindAllUser>>,
    TError,
    TData
  >;
  request?: SecondParameter<typeof orvalInstance>;
}) => {
  const { query: queryOptions, request: requestOptions } = options ?? {};

  const queryKey = queryOptions?.queryKey ?? getAdminFindAllUserQueryKey();

  const queryFn: QueryFunction<
    Awaited<ReturnType<typeof adminFindAllUser>>
  > = ({ signal }) => adminFindAllUser(requestOptions, signal);

  return { queryKey, queryFn, ...queryOptions } as UseQueryOptions<
    Awaited<ReturnType<typeof adminFindAllUser>>,
    TError,
    TData
  > & { queryKey: QueryKey };
};

export type AdminFindAllUserQueryResult = NonNullable<
  Awaited<ReturnType<typeof adminFindAllUser>>
>;
export type AdminFindAllUserQueryError = unknown;

/**
 * @summary 사용자 전체 목록
 */

export function useAdminFindAllUser<
  TData = Awaited<ReturnType<typeof adminFindAllUser>>,
  TError = unknown,
>(options?: {
  query?: UseQueryOptions<
    Awaited<ReturnType<typeof adminFindAllUser>>,
    TError,
    TData
  >;
  request?: SecondParameter<typeof orvalInstance>;
}): UseQueryResult<TData, TError> & { queryKey: QueryKey } {
  const queryOptions = getAdminFindAllUserQueryOptions(options);

  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
  };

  query.queryKey = queryOptions.queryKey;

  return query;
}

/**
 * @summary 사용자 등록
 */
export const adminCreateUser = (
  userAdminParam: UserAdminParam,
  options?: SecondParameter<typeof orvalInstance>,
  signal?: AbortSignal,
) => {
  return orvalInstance<UserDto>(
    {
      url: `/admin/user`,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: userAdminParam,
      signal,
    },
    options,
  );
};

export const getAdminCreateUserMutationOptions = <
  TError = unknown,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof adminCreateUser>>,
    TError,
    { data: UserAdminParam },
    TContext
  >;
  request?: SecondParameter<typeof orvalInstance>;
}): UseMutationOptions<
  Awaited<ReturnType<typeof adminCreateUser>>,
  TError,
  { data: UserAdminParam },
  TContext
> => {
  const mutationKey = ['adminCreateUser'];
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation &&
      'mutationKey' in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined };

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof adminCreateUser>>,
    { data: UserAdminParam }
  > = (props) => {
    const { data } = props ?? {};

    return adminCreateUser(data, requestOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type AdminCreateUserMutationResult = NonNullable<
  Awaited<ReturnType<typeof adminCreateUser>>
>;
export type AdminCreateUserMutationBody = UserAdminParam;
export type AdminCreateUserMutationError = unknown;

/**
 * @summary 사용자 등록
 */
export const useAdminCreateUser = <
  TError = unknown,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof adminCreateUser>>,
    TError,
    { data: UserAdminParam },
    TContext
  >;
  request?: SecondParameter<typeof orvalInstance>;
}): UseMutationResult<
  Awaited<ReturnType<typeof adminCreateUser>>,
  TError,
  { data: UserAdminParam },
  TContext
> => {
  const mutationOptions = getAdminCreateUserMutationOptions(options);

  return useMutation(mutationOptions);
};
/**
 * @summary 사용자 조회
 */
export const adminFindOneUser = (
  id: number,
  options?: SecondParameter<typeof orvalInstance>,
  signal?: AbortSignal,
) => {
  return orvalInstance<UserDto>(
    { url: `/admin/user/${id}`, method: 'GET', signal },
    options,
  );
};

export const getAdminFindOneUserQueryKey = (id: number) => {
  return [`/admin/user/${id}`] as const;
};

export const getAdminFindOneUserQueryOptions = <
  TData = Awaited<ReturnType<typeof adminFindOneUser>>,
  TError = unknown,
>(
  id: number,
  options?: {
    query?: UseQueryOptions<
      Awaited<ReturnType<typeof adminFindOneUser>>,
      TError,
      TData
    >;
    request?: SecondParameter<typeof orvalInstance>;
  },
) => {
  const { query: queryOptions, request: requestOptions } = options ?? {};

  const queryKey = queryOptions?.queryKey ?? getAdminFindOneUserQueryKey(id);

  const queryFn: QueryFunction<
    Awaited<ReturnType<typeof adminFindOneUser>>
  > = ({ signal }) => adminFindOneUser(id, requestOptions, signal);

  return {
    queryKey,
    queryFn,
    enabled: !!id,
    ...queryOptions,
  } as UseQueryOptions<
    Awaited<ReturnType<typeof adminFindOneUser>>,
    TError,
    TData
  > & { queryKey: QueryKey };
};

export type AdminFindOneUserQueryResult = NonNullable<
  Awaited<ReturnType<typeof adminFindOneUser>>
>;
export type AdminFindOneUserQueryError = unknown;

/**
 * @summary 사용자 조회
 */

export function useAdminFindOneUser<
  TData = Awaited<ReturnType<typeof adminFindOneUser>>,
  TError = unknown,
>(
  id: number,
  options?: {
    query?: UseQueryOptions<
      Awaited<ReturnType<typeof adminFindOneUser>>,
      TError,
      TData
    >;
    request?: SecondParameter<typeof orvalInstance>;
  },
): UseQueryResult<TData, TError> & { queryKey: QueryKey } {
  const queryOptions = getAdminFindOneUserQueryOptions(id, options);

  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
  };

  query.queryKey = queryOptions.queryKey;

  return query;
}

/**
 * @summary 사용자 수정
 */
export const adminUpdateUser = (
  id: number,
  userAdminParam: UserAdminParam,
  options?: SecondParameter<typeof orvalInstance>,
) => {
  return orvalInstance<void>(
    {
      url: `/admin/user/${id}`,
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      data: userAdminParam,
    },
    options,
  );
};

export const getAdminUpdateUserMutationOptions = <
  TError = unknown,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof adminUpdateUser>>,
    TError,
    { id: number; data: UserAdminParam },
    TContext
  >;
  request?: SecondParameter<typeof orvalInstance>;
}): UseMutationOptions<
  Awaited<ReturnType<typeof adminUpdateUser>>,
  TError,
  { id: number; data: UserAdminParam },
  TContext
> => {
  const mutationKey = ['adminUpdateUser'];
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation &&
      'mutationKey' in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined };

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof adminUpdateUser>>,
    { id: number; data: UserAdminParam }
  > = (props) => {
    const { id, data } = props ?? {};

    return adminUpdateUser(id, data, requestOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type AdminUpdateUserMutationResult = NonNullable<
  Awaited<ReturnType<typeof adminUpdateUser>>
>;
export type AdminUpdateUserMutationBody = UserAdminParam;
export type AdminUpdateUserMutationError = unknown;

/**
 * @summary 사용자 수정
 */
export const useAdminUpdateUser = <
  TError = unknown,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof adminUpdateUser>>,
    TError,
    { id: number; data: UserAdminParam },
    TContext
  >;
  request?: SecondParameter<typeof orvalInstance>;
}): UseMutationResult<
  Awaited<ReturnType<typeof adminUpdateUser>>,
  TError,
  { id: number; data: UserAdminParam },
  TContext
> => {
  const mutationOptions = getAdminUpdateUserMutationOptions(options);

  return useMutation(mutationOptions);
};
/**
 * @summary 사용자 삭제
 */
export const adminDeleteUser = (
  id: number,
  options?: SecondParameter<typeof orvalInstance>,
) => {
  return orvalInstance<void>(
    { url: `/admin/user/${id}`, method: 'DELETE' },
    options,
  );
};

export const getAdminDeleteUserMutationOptions = <
  TError = unknown,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof adminDeleteUser>>,
    TError,
    { id: number },
    TContext
  >;
  request?: SecondParameter<typeof orvalInstance>;
}): UseMutationOptions<
  Awaited<ReturnType<typeof adminDeleteUser>>,
  TError,
  { id: number },
  TContext
> => {
  const mutationKey = ['adminDeleteUser'];
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation &&
      'mutationKey' in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined };

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof adminDeleteUser>>,
    { id: number }
  > = (props) => {
    const { id } = props ?? {};

    return adminDeleteUser(id, requestOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type AdminDeleteUserMutationResult = NonNullable<
  Awaited<ReturnType<typeof adminDeleteUser>>
>;

export type AdminDeleteUserMutationError = unknown;

/**
 * @summary 사용자 삭제
 */
export const useAdminDeleteUser = <
  TError = unknown,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof adminDeleteUser>>,
    TError,
    { id: number },
    TContext
  >;
  request?: SecondParameter<typeof orvalInstance>;
}): UseMutationResult<
  Awaited<ReturnType<typeof adminDeleteUser>>,
  TError,
  { id: number },
  TContext
> => {
  const mutationOptions = getAdminDeleteUserMutationOptions(options);

  return useMutation(mutationOptions);
};
/**
 * @summary 사용자 일괄 삭제
 */
export const adminRemoveUser = (
  userRemoveAdminParam: UserRemoveAdminParam,
  options?: SecondParameter<typeof orvalInstance>,
  signal?: AbortSignal,
) => {
  return orvalInstance<void>(
    {
      url: `/admin/user/remove`,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: userRemoveAdminParam,
      signal,
    },
    options,
  );
};

export const getAdminRemoveUserMutationOptions = <
  TError = unknown,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof adminRemoveUser>>,
    TError,
    { data: UserRemoveAdminParam },
    TContext
  >;
  request?: SecondParameter<typeof orvalInstance>;
}): UseMutationOptions<
  Awaited<ReturnType<typeof adminRemoveUser>>,
  TError,
  { data: UserRemoveAdminParam },
  TContext
> => {
  const mutationKey = ['adminRemoveUser'];
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation &&
      'mutationKey' in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined };

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof adminRemoveUser>>,
    { data: UserRemoveAdminParam }
  > = (props) => {
    const { data } = props ?? {};

    return adminRemoveUser(data, requestOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type AdminRemoveUserMutationResult = NonNullable<
  Awaited<ReturnType<typeof adminRemoveUser>>
>;
export type AdminRemoveUserMutationBody = UserRemoveAdminParam;
export type AdminRemoveUserMutationError = unknown;

/**
 * @summary 사용자 일괄 삭제
 */
export const useAdminRemoveUser = <
  TError = unknown,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof adminRemoveUser>>,
    TError,
    { data: UserRemoveAdminParam },
    TContext
  >;
  request?: SecondParameter<typeof orvalInstance>;
}): UseMutationResult<
  Awaited<ReturnType<typeof adminRemoveUser>>,
  TError,
  { data: UserRemoveAdminParam },
  TContext
> => {
  const mutationOptions = getAdminRemoveUserMutationOptions(options);

  return useMutation(mutationOptions);
};
/**
 * @summary 사용자 휴대폰 인증 검증
 */
export const clientVerifyPhoneUser = (
  userVerifyPhoneClientParam: UserVerifyPhoneClientParam,
  options?: SecondParameter<typeof orvalInstance>,
  signal?: AbortSignal,
) => {
  return orvalInstance<UserVerifyPhoneClientDto>(
    {
      url: `/client/user/verify/phone`,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: userVerifyPhoneClientParam,
      signal,
    },
    options,
  );
};

export const getClientVerifyPhoneUserMutationOptions = <
  TError = unknown,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof clientVerifyPhoneUser>>,
    TError,
    { data: UserVerifyPhoneClientParam },
    TContext
  >;
  request?: SecondParameter<typeof orvalInstance>;
}): UseMutationOptions<
  Awaited<ReturnType<typeof clientVerifyPhoneUser>>,
  TError,
  { data: UserVerifyPhoneClientParam },
  TContext
> => {
  const mutationKey = ['clientVerifyPhoneUser'];
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation &&
      'mutationKey' in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined };

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof clientVerifyPhoneUser>>,
    { data: UserVerifyPhoneClientParam }
  > = (props) => {
    const { data } = props ?? {};

    return clientVerifyPhoneUser(data, requestOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type ClientVerifyPhoneUserMutationResult = NonNullable<
  Awaited<ReturnType<typeof clientVerifyPhoneUser>>
>;
export type ClientVerifyPhoneUserMutationBody = UserVerifyPhoneClientParam;
export type ClientVerifyPhoneUserMutationError = unknown;

/**
 * @summary 사용자 휴대폰 인증 검증
 */
export const useClientVerifyPhoneUser = <
  TError = unknown,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof clientVerifyPhoneUser>>,
    TError,
    { data: UserVerifyPhoneClientParam },
    TContext
  >;
  request?: SecondParameter<typeof orvalInstance>;
}): UseMutationResult<
  Awaited<ReturnType<typeof clientVerifyPhoneUser>>,
  TError,
  { data: UserVerifyPhoneClientParam },
  TContext
> => {
  const mutationOptions = getClientVerifyPhoneUserMutationOptions(options);

  return useMutation(mutationOptions);
};
/**
 * @summary 사용자 메일 인증 검증
 */
export const clientVerifyEmailUser = (
  userVerifyEmailClientParam: UserVerifyEmailClientParam,
  options?: SecondParameter<typeof orvalInstance>,
  signal?: AbortSignal,
) => {
  return orvalInstance<UserVerifyEmailClientDto>(
    {
      url: `/client/user/verify/email`,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: userVerifyEmailClientParam,
      signal,
    },
    options,
  );
};

export const getClientVerifyEmailUserMutationOptions = <
  TError = unknown,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof clientVerifyEmailUser>>,
    TError,
    { data: UserVerifyEmailClientParam },
    TContext
  >;
  request?: SecondParameter<typeof orvalInstance>;
}): UseMutationOptions<
  Awaited<ReturnType<typeof clientVerifyEmailUser>>,
  TError,
  { data: UserVerifyEmailClientParam },
  TContext
> => {
  const mutationKey = ['clientVerifyEmailUser'];
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation &&
      'mutationKey' in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined };

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof clientVerifyEmailUser>>,
    { data: UserVerifyEmailClientParam }
  > = (props) => {
    const { data } = props ?? {};

    return clientVerifyEmailUser(data, requestOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type ClientVerifyEmailUserMutationResult = NonNullable<
  Awaited<ReturnType<typeof clientVerifyEmailUser>>
>;
export type ClientVerifyEmailUserMutationBody = UserVerifyEmailClientParam;
export type ClientVerifyEmailUserMutationError = unknown;

/**
 * @summary 사용자 메일 인증 검증
 */
export const useClientVerifyEmailUser = <
  TError = unknown,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof clientVerifyEmailUser>>,
    TError,
    { data: UserVerifyEmailClientParam },
    TContext
  >;
  request?: SecondParameter<typeof orvalInstance>;
}): UseMutationResult<
  Awaited<ReturnType<typeof clientVerifyEmailUser>>,
  TError,
  { data: UserVerifyEmailClientParam },
  TContext
> => {
  const mutationOptions = getClientVerifyEmailUserMutationOptions(options);

  return useMutation(mutationOptions);
};
/**
 * @summary 사용자 휴대폰 인증 발송
 */
export const clientAuthPhoneUser = (
  userAuthPhoneClientParam: UserAuthPhoneClientParam,
  options?: SecondParameter<typeof orvalInstance>,
  signal?: AbortSignal,
) => {
  return orvalInstance<UserAuthPhoneClientDto>(
    {
      url: `/client/user/auth/phone`,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: userAuthPhoneClientParam,
      signal,
    },
    options,
  );
};

export const getClientAuthPhoneUserMutationOptions = <
  TError = unknown,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof clientAuthPhoneUser>>,
    TError,
    { data: UserAuthPhoneClientParam },
    TContext
  >;
  request?: SecondParameter<typeof orvalInstance>;
}): UseMutationOptions<
  Awaited<ReturnType<typeof clientAuthPhoneUser>>,
  TError,
  { data: UserAuthPhoneClientParam },
  TContext
> => {
  const mutationKey = ['clientAuthPhoneUser'];
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation &&
      'mutationKey' in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined };

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof clientAuthPhoneUser>>,
    { data: UserAuthPhoneClientParam }
  > = (props) => {
    const { data } = props ?? {};

    return clientAuthPhoneUser(data, requestOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type ClientAuthPhoneUserMutationResult = NonNullable<
  Awaited<ReturnType<typeof clientAuthPhoneUser>>
>;
export type ClientAuthPhoneUserMutationBody = UserAuthPhoneClientParam;
export type ClientAuthPhoneUserMutationError = unknown;

/**
 * @summary 사용자 휴대폰 인증 발송
 */
export const useClientAuthPhoneUser = <
  TError = unknown,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof clientAuthPhoneUser>>,
    TError,
    { data: UserAuthPhoneClientParam },
    TContext
  >;
  request?: SecondParameter<typeof orvalInstance>;
}): UseMutationResult<
  Awaited<ReturnType<typeof clientAuthPhoneUser>>,
  TError,
  { data: UserAuthPhoneClientParam },
  TContext
> => {
  const mutationOptions = getClientAuthPhoneUserMutationOptions(options);

  return useMutation(mutationOptions);
};
/**
 * @summary 사용자 메일 인증 발송
 */
export const clientAuthEmailUser = (
  userAuthEmailClientParam: UserAuthEmailClientParam,
  options?: SecondParameter<typeof orvalInstance>,
  signal?: AbortSignal,
) => {
  return orvalInstance<UserAuthEmailClientDto>(
    {
      url: `/client/user/auth/email`,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: userAuthEmailClientParam,
      signal,
    },
    options,
  );
};

export const getClientAuthEmailUserMutationOptions = <
  TError = unknown,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof clientAuthEmailUser>>,
    TError,
    { data: UserAuthEmailClientParam },
    TContext
  >;
  request?: SecondParameter<typeof orvalInstance>;
}): UseMutationOptions<
  Awaited<ReturnType<typeof clientAuthEmailUser>>,
  TError,
  { data: UserAuthEmailClientParam },
  TContext
> => {
  const mutationKey = ['clientAuthEmailUser'];
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation &&
      'mutationKey' in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined };

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof clientAuthEmailUser>>,
    { data: UserAuthEmailClientParam }
  > = (props) => {
    const { data } = props ?? {};

    return clientAuthEmailUser(data, requestOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type ClientAuthEmailUserMutationResult = NonNullable<
  Awaited<ReturnType<typeof clientAuthEmailUser>>
>;
export type ClientAuthEmailUserMutationBody = UserAuthEmailClientParam;
export type ClientAuthEmailUserMutationError = unknown;

/**
 * @summary 사용자 메일 인증 발송
 */
export const useClientAuthEmailUser = <
  TError = unknown,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof clientAuthEmailUser>>,
    TError,
    { data: UserAuthEmailClientParam },
    TContext
  >;
  request?: SecondParameter<typeof orvalInstance>;
}): UseMutationResult<
  Awaited<ReturnType<typeof clientAuthEmailUser>>,
  TError,
  { data: UserAuthEmailClientParam },
  TContext
> => {
  const mutationOptions = getClientAuthEmailUserMutationOptions(options);

  return useMutation(mutationOptions);
};
/**
 * @summary 사용자 세션 정보 취득
 */
export const clientSessionUser = (
  options?: SecondParameter<typeof orvalInstance>,
  signal?: AbortSignal,
) => {
  return orvalInstance<UserDto>(
    { url: `/client/user/session`, method: 'GET', signal },
    options,
  );
};

export const getClientSessionUserQueryKey = () => {
  return [`/client/user/session`] as const;
};

export const getClientSessionUserQueryOptions = <
  TData = Awaited<ReturnType<typeof clientSessionUser>>,
  TError = unknown,
>(options?: {
  query?: UseQueryOptions<
    Awaited<ReturnType<typeof clientSessionUser>>,
    TError,
    TData
  >;
  request?: SecondParameter<typeof orvalInstance>;
}) => {
  const { query: queryOptions, request: requestOptions } = options ?? {};

  const queryKey = queryOptions?.queryKey ?? getClientSessionUserQueryKey();

  const queryFn: QueryFunction<
    Awaited<ReturnType<typeof clientSessionUser>>
  > = ({ signal }) => clientSessionUser(requestOptions, signal);

  return { queryKey, queryFn, ...queryOptions } as UseQueryOptions<
    Awaited<ReturnType<typeof clientSessionUser>>,
    TError,
    TData
  > & { queryKey: QueryKey };
};

export type ClientSessionUserQueryResult = NonNullable<
  Awaited<ReturnType<typeof clientSessionUser>>
>;
export type ClientSessionUserQueryError = unknown;

/**
 * @summary 사용자 세션 정보 취득
 */

export function useClientSessionUser<
  TData = Awaited<ReturnType<typeof clientSessionUser>>,
  TError = unknown,
>(options?: {
  query?: UseQueryOptions<
    Awaited<ReturnType<typeof clientSessionUser>>,
    TError,
    TData
  >;
  request?: SecondParameter<typeof orvalInstance>;
}): UseQueryResult<TData, TError> & { queryKey: QueryKey } {
  const queryOptions = getClientSessionUserQueryOptions(options);

  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
  };

  query.queryKey = queryOptions.queryKey;

  return query;
}

/**
 * @summary 사용자 계정 이메일 중복 체크
 */
export const clientUsernameUser = (
  userUsernameClientParam: UserUsernameClientParam,
  options?: SecondParameter<typeof orvalInstance>,
  signal?: AbortSignal,
) => {
  return orvalInstance<UserUsernameDto>(
    {
      url: `/client/user/username`,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: userUsernameClientParam,
      signal,
    },
    options,
  );
};

export const getClientUsernameUserMutationOptions = <
  TError = unknown,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof clientUsernameUser>>,
    TError,
    { data: UserUsernameClientParam },
    TContext
  >;
  request?: SecondParameter<typeof orvalInstance>;
}): UseMutationOptions<
  Awaited<ReturnType<typeof clientUsernameUser>>,
  TError,
  { data: UserUsernameClientParam },
  TContext
> => {
  const mutationKey = ['clientUsernameUser'];
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation &&
      'mutationKey' in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined };

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof clientUsernameUser>>,
    { data: UserUsernameClientParam }
  > = (props) => {
    const { data } = props ?? {};

    return clientUsernameUser(data, requestOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type ClientUsernameUserMutationResult = NonNullable<
  Awaited<ReturnType<typeof clientUsernameUser>>
>;
export type ClientUsernameUserMutationBody = UserUsernameClientParam;
export type ClientUsernameUserMutationError = unknown;

/**
 * @summary 사용자 계정 이메일 중복 체크
 */
export const useClientUsernameUser = <
  TError = unknown,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof clientUsernameUser>>,
    TError,
    { data: UserUsernameClientParam },
    TContext
  >;
  request?: SecondParameter<typeof orvalInstance>;
}): UseMutationResult<
  Awaited<ReturnType<typeof clientUsernameUser>>,
  TError,
  { data: UserUsernameClientParam },
  TContext
> => {
  const mutationOptions = getClientUsernameUserMutationOptions(options);

  return useMutation(mutationOptions);
};
/**
 * @summary 사용자 계정 휴대폰 중복 체크
 */
export const clientPhoneUser = (
  userPhoneClientParam: UserPhoneClientParam,
  options?: SecondParameter<typeof orvalInstance>,
  signal?: AbortSignal,
) => {
  return orvalInstance<UserPhoneDto>(
    {
      url: `/client/user/phone`,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: userPhoneClientParam,
      signal,
    },
    options,
  );
};

export const getClientPhoneUserMutationOptions = <
  TError = unknown,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof clientPhoneUser>>,
    TError,
    { data: UserPhoneClientParam },
    TContext
  >;
  request?: SecondParameter<typeof orvalInstance>;
}): UseMutationOptions<
  Awaited<ReturnType<typeof clientPhoneUser>>,
  TError,
  { data: UserPhoneClientParam },
  TContext
> => {
  const mutationKey = ['clientPhoneUser'];
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation &&
      'mutationKey' in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined };

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof clientPhoneUser>>,
    { data: UserPhoneClientParam }
  > = (props) => {
    const { data } = props ?? {};

    return clientPhoneUser(data, requestOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type ClientPhoneUserMutationResult = NonNullable<
  Awaited<ReturnType<typeof clientPhoneUser>>
>;
export type ClientPhoneUserMutationBody = UserPhoneClientParam;
export type ClientPhoneUserMutationError = unknown;

/**
 * @summary 사용자 계정 휴대폰 중복 체크
 */
export const useClientPhoneUser = <
  TError = unknown,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof clientPhoneUser>>,
    TError,
    { data: UserPhoneClientParam },
    TContext
  >;
  request?: SecondParameter<typeof orvalInstance>;
}): UseMutationResult<
  Awaited<ReturnType<typeof clientPhoneUser>>,
  TError,
  { data: UserPhoneClientParam },
  TContext
> => {
  const mutationOptions = getClientPhoneUserMutationOptions(options);

  return useMutation(mutationOptions);
};
/**
 * @summary 사용자 아이디 찾기
 */
export const clientFindEmailUser = (
  userFindEmailClientParam: UserFindEmailClientParam,
  options?: SecondParameter<typeof orvalInstance>,
  signal?: AbortSignal,
) => {
  return orvalInstance<UserDto>(
    {
      url: `/client/user/find/email`,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: userFindEmailClientParam,
      signal,
    },
    options,
  );
};

export const getClientFindEmailUserMutationOptions = <
  TError = unknown,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof clientFindEmailUser>>,
    TError,
    { data: UserFindEmailClientParam },
    TContext
  >;
  request?: SecondParameter<typeof orvalInstance>;
}): UseMutationOptions<
  Awaited<ReturnType<typeof clientFindEmailUser>>,
  TError,
  { data: UserFindEmailClientParam },
  TContext
> => {
  const mutationKey = ['clientFindEmailUser'];
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation &&
      'mutationKey' in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined };

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof clientFindEmailUser>>,
    { data: UserFindEmailClientParam }
  > = (props) => {
    const { data } = props ?? {};

    return clientFindEmailUser(data, requestOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type ClientFindEmailUserMutationResult = NonNullable<
  Awaited<ReturnType<typeof clientFindEmailUser>>
>;
export type ClientFindEmailUserMutationBody = UserFindEmailClientParam;
export type ClientFindEmailUserMutationError = unknown;

/**
 * @summary 사용자 아이디 찾기
 */
export const useClientFindEmailUser = <
  TError = unknown,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof clientFindEmailUser>>,
    TError,
    { data: UserFindEmailClientParam },
    TContext
  >;
  request?: SecondParameter<typeof orvalInstance>;
}): UseMutationResult<
  Awaited<ReturnType<typeof clientFindEmailUser>>,
  TError,
  { data: UserFindEmailClientParam },
  TContext
> => {
  const mutationOptions = getClientFindEmailUserMutationOptions(options);

  return useMutation(mutationOptions);
};
/**
 * @summary 사용자 비밀번호 찾기
 */
export const clientFindPasswordUser = (
  userFindPasswordClientParam: UserFindPasswordClientParam,
  options?: SecondParameter<typeof orvalInstance>,
  signal?: AbortSignal,
) => {
  return orvalInstance<UserDto>(
    {
      url: `/client/user/find/password`,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: userFindPasswordClientParam,
      signal,
    },
    options,
  );
};

export const getClientFindPasswordUserMutationOptions = <
  TError = unknown,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof clientFindPasswordUser>>,
    TError,
    { data: UserFindPasswordClientParam },
    TContext
  >;
  request?: SecondParameter<typeof orvalInstance>;
}): UseMutationOptions<
  Awaited<ReturnType<typeof clientFindPasswordUser>>,
  TError,
  { data: UserFindPasswordClientParam },
  TContext
> => {
  const mutationKey = ['clientFindPasswordUser'];
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation &&
      'mutationKey' in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined };

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof clientFindPasswordUser>>,
    { data: UserFindPasswordClientParam }
  > = (props) => {
    const { data } = props ?? {};

    return clientFindPasswordUser(data, requestOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type ClientFindPasswordUserMutationResult = NonNullable<
  Awaited<ReturnType<typeof clientFindPasswordUser>>
>;
export type ClientFindPasswordUserMutationBody = UserFindPasswordClientParam;
export type ClientFindPasswordUserMutationError = unknown;

/**
 * @summary 사용자 비밀번호 찾기
 */
export const useClientFindPasswordUser = <
  TError = unknown,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof clientFindPasswordUser>>,
    TError,
    { data: UserFindPasswordClientParam },
    TContext
  >;
  request?: SecondParameter<typeof orvalInstance>;
}): UseMutationResult<
  Awaited<ReturnType<typeof clientFindPasswordUser>>,
  TError,
  { data: UserFindPasswordClientParam },
  TContext
> => {
  const mutationOptions = getClientFindPasswordUserMutationOptions(options);

  return useMutation(mutationOptions);
};
/**
 * @summary 사용자 비밀번호 찾기 후 변경
 */
export const clientFindPasswordResetUser = (
  userFindPasswordResetClientParam: UserFindPasswordResetClientParam,
  options?: SecondParameter<typeof orvalInstance>,
  signal?: AbortSignal,
) => {
  return orvalInstance<void>(
    {
      url: `/client/user/find/password/reset`,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: userFindPasswordResetClientParam,
      signal,
    },
    options,
  );
};

export const getClientFindPasswordResetUserMutationOptions = <
  TError = unknown,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof clientFindPasswordResetUser>>,
    TError,
    { data: UserFindPasswordResetClientParam },
    TContext
  >;
  request?: SecondParameter<typeof orvalInstance>;
}): UseMutationOptions<
  Awaited<ReturnType<typeof clientFindPasswordResetUser>>,
  TError,
  { data: UserFindPasswordResetClientParam },
  TContext
> => {
  const mutationKey = ['clientFindPasswordResetUser'];
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation &&
      'mutationKey' in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined };

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof clientFindPasswordResetUser>>,
    { data: UserFindPasswordResetClientParam }
  > = (props) => {
    const { data } = props ?? {};

    return clientFindPasswordResetUser(data, requestOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type ClientFindPasswordResetUserMutationResult = NonNullable<
  Awaited<ReturnType<typeof clientFindPasswordResetUser>>
>;
export type ClientFindPasswordResetUserMutationBody =
  UserFindPasswordResetClientParam;
export type ClientFindPasswordResetUserMutationError = unknown;

/**
 * @summary 사용자 비밀번호 찾기 후 변경
 */
export const useClientFindPasswordResetUser = <
  TError = unknown,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof clientFindPasswordResetUser>>,
    TError,
    { data: UserFindPasswordResetClientParam },
    TContext
  >;
  request?: SecondParameter<typeof orvalInstance>;
}): UseMutationResult<
  Awaited<ReturnType<typeof clientFindPasswordResetUser>>,
  TError,
  { data: UserFindPasswordResetClientParam },
  TContext
> => {
  const mutationOptions =
    getClientFindPasswordResetUserMutationOptions(options);

  return useMutation(mutationOptions);
};
/**
 * @summary 사용자 가입
 */
export const clientSignEmailUser = (
  userSignEmailClientParam: UserSignEmailClientParam,
  options?: SecondParameter<typeof orvalInstance>,
  signal?: AbortSignal,
) => {
  return orvalInstance<UserDto>(
    {
      url: `/client/user/sign/email`,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: userSignEmailClientParam,
      signal,
    },
    options,
  );
};

export const getClientSignEmailUserMutationOptions = <
  TError = unknown,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof clientSignEmailUser>>,
    TError,
    { data: UserSignEmailClientParam },
    TContext
  >;
  request?: SecondParameter<typeof orvalInstance>;
}): UseMutationOptions<
  Awaited<ReturnType<typeof clientSignEmailUser>>,
  TError,
  { data: UserSignEmailClientParam },
  TContext
> => {
  const mutationKey = ['clientSignEmailUser'];
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation &&
      'mutationKey' in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined };

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof clientSignEmailUser>>,
    { data: UserSignEmailClientParam }
  > = (props) => {
    const { data } = props ?? {};

    return clientSignEmailUser(data, requestOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type ClientSignEmailUserMutationResult = NonNullable<
  Awaited<ReturnType<typeof clientSignEmailUser>>
>;
export type ClientSignEmailUserMutationBody = UserSignEmailClientParam;
export type ClientSignEmailUserMutationError = unknown;

/**
 * @summary 사용자 가입
 */
export const useClientSignEmailUser = <
  TError = unknown,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof clientSignEmailUser>>,
    TError,
    { data: UserSignEmailClientParam },
    TContext
  >;
  request?: SecondParameter<typeof orvalInstance>;
}): UseMutationResult<
  Awaited<ReturnType<typeof clientSignEmailUser>>,
  TError,
  { data: UserSignEmailClientParam },
  TContext
> => {
  const mutationOptions = getClientSignEmailUserMutationOptions(options);

  return useMutation(mutationOptions);
};
/**
 * @summary 사용자 카카오 로그인
 */
export const clientLoginKakaoUser = (
  userLoginKakaoClientParam: UserLoginKakaoClientParam,
  options?: SecondParameter<typeof orvalInstance>,
  signal?: AbortSignal,
) => {
  return orvalInstance<UserDto>(
    {
      url: `/client/user/login/kakao`,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: userLoginKakaoClientParam,
      signal,
    },
    options,
  );
};

export const getClientLoginKakaoUserMutationOptions = <
  TError = unknown,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof clientLoginKakaoUser>>,
    TError,
    { data: UserLoginKakaoClientParam },
    TContext
  >;
  request?: SecondParameter<typeof orvalInstance>;
}): UseMutationOptions<
  Awaited<ReturnType<typeof clientLoginKakaoUser>>,
  TError,
  { data: UserLoginKakaoClientParam },
  TContext
> => {
  const mutationKey = ['clientLoginKakaoUser'];
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation &&
      'mutationKey' in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined };

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof clientLoginKakaoUser>>,
    { data: UserLoginKakaoClientParam }
  > = (props) => {
    const { data } = props ?? {};

    return clientLoginKakaoUser(data, requestOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type ClientLoginKakaoUserMutationResult = NonNullable<
  Awaited<ReturnType<typeof clientLoginKakaoUser>>
>;
export type ClientLoginKakaoUserMutationBody = UserLoginKakaoClientParam;
export type ClientLoginKakaoUserMutationError = unknown;

/**
 * @summary 사용자 카카오 로그인
 */
export const useClientLoginKakaoUser = <
  TError = unknown,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof clientLoginKakaoUser>>,
    TError,
    { data: UserLoginKakaoClientParam },
    TContext
  >;
  request?: SecondParameter<typeof orvalInstance>;
}): UseMutationResult<
  Awaited<ReturnType<typeof clientLoginKakaoUser>>,
  TError,
  { data: UserLoginKakaoClientParam },
  TContext
> => {
  const mutationOptions = getClientLoginKakaoUserMutationOptions(options);

  return useMutation(mutationOptions);
};
/**
 * @summary 사용자 이메일 로그인
 */
export const clientLoginEmailUser = (
  userLoginClientParam: UserLoginClientParam,
  options?: SecondParameter<typeof orvalInstance>,
  signal?: AbortSignal,
) => {
  return orvalInstance<UserDto>(
    {
      url: `/client/user/login/email`,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: userLoginClientParam,
      signal,
    },
    options,
  );
};

export const getClientLoginEmailUserMutationOptions = <
  TError = unknown,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof clientLoginEmailUser>>,
    TError,
    { data: UserLoginClientParam },
    TContext
  >;
  request?: SecondParameter<typeof orvalInstance>;
}): UseMutationOptions<
  Awaited<ReturnType<typeof clientLoginEmailUser>>,
  TError,
  { data: UserLoginClientParam },
  TContext
> => {
  const mutationKey = ['clientLoginEmailUser'];
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation &&
      'mutationKey' in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined };

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof clientLoginEmailUser>>,
    { data: UserLoginClientParam }
  > = (props) => {
    const { data } = props ?? {};

    return clientLoginEmailUser(data, requestOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type ClientLoginEmailUserMutationResult = NonNullable<
  Awaited<ReturnType<typeof clientLoginEmailUser>>
>;
export type ClientLoginEmailUserMutationBody = UserLoginClientParam;
export type ClientLoginEmailUserMutationError = unknown;

/**
 * @summary 사용자 이메일 로그인
 */
export const useClientLoginEmailUser = <
  TError = unknown,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof clientLoginEmailUser>>,
    TError,
    { data: UserLoginClientParam },
    TContext
  >;
  request?: SecondParameter<typeof orvalInstance>;
}): UseMutationResult<
  Awaited<ReturnType<typeof clientLoginEmailUser>>,
  TError,
  { data: UserLoginClientParam },
  TContext
> => {
  const mutationOptions = getClientLoginEmailUserMutationOptions(options);

  return useMutation(mutationOptions);
};
/**
 * @summary 사용자 로그아웃
 */
export const clientLogoutUser = (
  options?: SecondParameter<typeof orvalInstance>,
  signal?: AbortSignal,
) => {
  return orvalInstance<void>(
    { url: `/client/user/logout`, method: 'POST', signal },
    options,
  );
};

export const getClientLogoutUserMutationOptions = <
  TError = unknown,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof clientLogoutUser>>,
    TError,
    void,
    TContext
  >;
  request?: SecondParameter<typeof orvalInstance>;
}): UseMutationOptions<
  Awaited<ReturnType<typeof clientLogoutUser>>,
  TError,
  void,
  TContext
> => {
  const mutationKey = ['clientLogoutUser'];
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation &&
      'mutationKey' in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined };

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof clientLogoutUser>>,
    void
  > = () => {
    return clientLogoutUser(requestOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type ClientLogoutUserMutationResult = NonNullable<
  Awaited<ReturnType<typeof clientLogoutUser>>
>;

export type ClientLogoutUserMutationError = unknown;

/**
 * @summary 사용자 로그아웃
 */
export const useClientLogoutUser = <
  TError = unknown,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof clientLogoutUser>>,
    TError,
    void,
    TContext
  >;
  request?: SecondParameter<typeof orvalInstance>;
}): UseMutationResult<
  Awaited<ReturnType<typeof clientLogoutUser>>,
  TError,
  void,
  TContext
> => {
  const mutationOptions = getClientLogoutUserMutationOptions(options);

  return useMutation(mutationOptions);
};
/**
 * @summary 사용자 휴대폰 인증
 */
export const clientConnectPhoneUser = (
  userConnectPhoneClientParam: UserConnectPhoneClientParam,
  options?: SecondParameter<typeof orvalInstance>,
  signal?: AbortSignal,
) => {
  return orvalInstance<UserDto>(
    {
      url: `/client/user/connect/phone`,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: userConnectPhoneClientParam,
      signal,
    },
    options,
  );
};

export const getClientConnectPhoneUserMutationOptions = <
  TError = unknown,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof clientConnectPhoneUser>>,
    TError,
    { data: UserConnectPhoneClientParam },
    TContext
  >;
  request?: SecondParameter<typeof orvalInstance>;
}): UseMutationOptions<
  Awaited<ReturnType<typeof clientConnectPhoneUser>>,
  TError,
  { data: UserConnectPhoneClientParam },
  TContext
> => {
  const mutationKey = ['clientConnectPhoneUser'];
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation &&
      'mutationKey' in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined };

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof clientConnectPhoneUser>>,
    { data: UserConnectPhoneClientParam }
  > = (props) => {
    const { data } = props ?? {};

    return clientConnectPhoneUser(data, requestOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type ClientConnectPhoneUserMutationResult = NonNullable<
  Awaited<ReturnType<typeof clientConnectPhoneUser>>
>;
export type ClientConnectPhoneUserMutationBody = UserConnectPhoneClientParam;
export type ClientConnectPhoneUserMutationError = unknown;

/**
 * @summary 사용자 휴대폰 인증
 */
export const useClientConnectPhoneUser = <
  TError = unknown,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof clientConnectPhoneUser>>,
    TError,
    { data: UserConnectPhoneClientParam },
    TContext
  >;
  request?: SecondParameter<typeof orvalInstance>;
}): UseMutationResult<
  Awaited<ReturnType<typeof clientConnectPhoneUser>>,
  TError,
  { data: UserConnectPhoneClientParam },
  TContext
> => {
  const mutationOptions = getClientConnectPhoneUserMutationOptions(options);

  return useMutation(mutationOptions);
};
/**
 * @summary 사용자 이메일 연결
 */
export const clientConnectEmailUser = (
  userConnectEmailClientParam: UserConnectEmailClientParam,
  options?: SecondParameter<typeof orvalInstance>,
  signal?: AbortSignal,
) => {
  return orvalInstance<UserDto>(
    {
      url: `/client/user/connect/email`,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: userConnectEmailClientParam,
      signal,
    },
    options,
  );
};

export const getClientConnectEmailUserMutationOptions = <
  TError = unknown,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof clientConnectEmailUser>>,
    TError,
    { data: UserConnectEmailClientParam },
    TContext
  >;
  request?: SecondParameter<typeof orvalInstance>;
}): UseMutationOptions<
  Awaited<ReturnType<typeof clientConnectEmailUser>>,
  TError,
  { data: UserConnectEmailClientParam },
  TContext
> => {
  const mutationKey = ['clientConnectEmailUser'];
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation &&
      'mutationKey' in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined };

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof clientConnectEmailUser>>,
    { data: UserConnectEmailClientParam }
  > = (props) => {
    const { data } = props ?? {};

    return clientConnectEmailUser(data, requestOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type ClientConnectEmailUserMutationResult = NonNullable<
  Awaited<ReturnType<typeof clientConnectEmailUser>>
>;
export type ClientConnectEmailUserMutationBody = UserConnectEmailClientParam;
export type ClientConnectEmailUserMutationError = unknown;

/**
 * @summary 사용자 이메일 연결
 */
export const useClientConnectEmailUser = <
  TError = unknown,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof clientConnectEmailUser>>,
    TError,
    { data: UserConnectEmailClientParam },
    TContext
  >;
  request?: SecondParameter<typeof orvalInstance>;
}): UseMutationResult<
  Awaited<ReturnType<typeof clientConnectEmailUser>>,
  TError,
  { data: UserConnectEmailClientParam },
  TContext
> => {
  const mutationOptions = getClientConnectEmailUserMutationOptions(options);

  return useMutation(mutationOptions);
};
/**
 * @summary 사용자 비밀번호 변경
 */
export const clientProfilePasswordUser = (
  userProfilePasswordClientParam: UserProfilePasswordClientParam,
  options?: SecondParameter<typeof orvalInstance>,
  signal?: AbortSignal,
) => {
  return orvalInstance<void>(
    {
      url: `/client/user/profile/password`,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: userProfilePasswordClientParam,
      signal,
    },
    options,
  );
};

export const getClientProfilePasswordUserMutationOptions = <
  TError = unknown,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof clientProfilePasswordUser>>,
    TError,
    { data: UserProfilePasswordClientParam },
    TContext
  >;
  request?: SecondParameter<typeof orvalInstance>;
}): UseMutationOptions<
  Awaited<ReturnType<typeof clientProfilePasswordUser>>,
  TError,
  { data: UserProfilePasswordClientParam },
  TContext
> => {
  const mutationKey = ['clientProfilePasswordUser'];
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation &&
      'mutationKey' in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined };

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof clientProfilePasswordUser>>,
    { data: UserProfilePasswordClientParam }
  > = (props) => {
    const { data } = props ?? {};

    return clientProfilePasswordUser(data, requestOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type ClientProfilePasswordUserMutationResult = NonNullable<
  Awaited<ReturnType<typeof clientProfilePasswordUser>>
>;
export type ClientProfilePasswordUserMutationBody =
  UserProfilePasswordClientParam;
export type ClientProfilePasswordUserMutationError = unknown;

/**
 * @summary 사용자 비밀번호 변경
 */
export const useClientProfilePasswordUser = <
  TError = unknown,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof clientProfilePasswordUser>>,
    TError,
    { data: UserProfilePasswordClientParam },
    TContext
  >;
  request?: SecondParameter<typeof orvalInstance>;
}): UseMutationResult<
  Awaited<ReturnType<typeof clientProfilePasswordUser>>,
  TError,
  { data: UserProfilePasswordClientParam },
  TContext
> => {
  const mutationOptions = getClientProfilePasswordUserMutationOptions(options);

  return useMutation(mutationOptions);
};
/**
 * @summary 사용자 탈퇴
 */
export const clientWithdrawUser = (
  userWithdrawClientParam: UserWithdrawClientParam,
  options?: SecondParameter<typeof orvalInstance>,
  signal?: AbortSignal,
) => {
  return orvalInstance<void>(
    {
      url: `/client/user/withdraw`,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: userWithdrawClientParam,
      signal,
    },
    options,
  );
};

export const getClientWithdrawUserMutationOptions = <
  TError = unknown,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof clientWithdrawUser>>,
    TError,
    { data: UserWithdrawClientParam },
    TContext
  >;
  request?: SecondParameter<typeof orvalInstance>;
}): UseMutationOptions<
  Awaited<ReturnType<typeof clientWithdrawUser>>,
  TError,
  { data: UserWithdrawClientParam },
  TContext
> => {
  const mutationKey = ['clientWithdrawUser'];
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation &&
      'mutationKey' in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined };

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof clientWithdrawUser>>,
    { data: UserWithdrawClientParam }
  > = (props) => {
    const { data } = props ?? {};

    return clientWithdrawUser(data, requestOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type ClientWithdrawUserMutationResult = NonNullable<
  Awaited<ReturnType<typeof clientWithdrawUser>>
>;
export type ClientWithdrawUserMutationBody = UserWithdrawClientParam;
export type ClientWithdrawUserMutationError = unknown;

/**
 * @summary 사용자 탈퇴
 */
export const useClientWithdrawUser = <
  TError = unknown,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof clientWithdrawUser>>,
    TError,
    { data: UserWithdrawClientParam },
    TContext
  >;
  request?: SecondParameter<typeof orvalInstance>;
}): UseMutationResult<
  Awaited<ReturnType<typeof clientWithdrawUser>>,
  TError,
  { data: UserWithdrawClientParam },
  TContext
> => {
  const mutationOptions = getClientWithdrawUserMutationOptions(options);

  return useMutation(mutationOptions);
};
