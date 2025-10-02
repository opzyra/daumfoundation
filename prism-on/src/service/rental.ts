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
  AdminSearchRentalParams,
  ClientSearchRentalParams,
  RentalAdminParam,
  RentalClientParam,
  RentalDocumentClientParam,
  RentalDocumentDto,
  RentalDto,
  RentalListAdminDto,
  RentalListClientDto,
  RentalRemoveAdminParam,
} from './model';

type AwaitedInput<T> = PromiseLike<T> | T;

type Awaited<O> = O extends AwaitedInput<infer T> ? T : never;

type SecondParameter<T extends (...args: never) => unknown> = Parameters<T>[1];

/**
 * @summary 대여 검색 목록
 */
export const adminSearchRental = (
  params?: AdminSearchRentalParams,
  options?: SecondParameter<typeof orvalInstance>,
  signal?: AbortSignal,
) => {
  return orvalInstance<RentalListAdminDto>(
    { url: `/admin/rental/search`, method: 'GET', params, signal },
    options,
  );
};

export const getAdminSearchRentalQueryKey = (
  params?: AdminSearchRentalParams,
) => {
  return [`/admin/rental/search`, ...(params ? [params] : [])] as const;
};

export const getAdminSearchRentalQueryOptions = <
  TData = Awaited<ReturnType<typeof adminSearchRental>>,
  TError = unknown,
>(
  params?: AdminSearchRentalParams,
  options?: {
    query?: UseQueryOptions<
      Awaited<ReturnType<typeof adminSearchRental>>,
      TError,
      TData
    >;
    request?: SecondParameter<typeof orvalInstance>;
  },
) => {
  const { query: queryOptions, request: requestOptions } = options ?? {};

  const queryKey =
    queryOptions?.queryKey ?? getAdminSearchRentalQueryKey(params);

  const queryFn: QueryFunction<
    Awaited<ReturnType<typeof adminSearchRental>>
  > = ({ signal }) => adminSearchRental(params, requestOptions, signal);

  return { queryKey, queryFn, ...queryOptions } as UseQueryOptions<
    Awaited<ReturnType<typeof adminSearchRental>>,
    TError,
    TData
  > & { queryKey: QueryKey };
};

export type AdminSearchRentalQueryResult = NonNullable<
  Awaited<ReturnType<typeof adminSearchRental>>
>;
export type AdminSearchRentalQueryError = unknown;

/**
 * @summary 대여 검색 목록
 */

export function useAdminSearchRental<
  TData = Awaited<ReturnType<typeof adminSearchRental>>,
  TError = unknown,
>(
  params?: AdminSearchRentalParams,
  options?: {
    query?: UseQueryOptions<
      Awaited<ReturnType<typeof adminSearchRental>>,
      TError,
      TData
    >;
    request?: SecondParameter<typeof orvalInstance>;
  },
): UseQueryResult<TData, TError> & { queryKey: QueryKey } {
  const queryOptions = getAdminSearchRentalQueryOptions(params, options);

  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
  };

  query.queryKey = queryOptions.queryKey;

  return query;
}

/**
 * @summary 대여 전체 목록
 */
export const adminFindAllRental = (
  options?: SecondParameter<typeof orvalInstance>,
  signal?: AbortSignal,
) => {
  return orvalInstance<RentalDto[]>(
    { url: `/admin/rental`, method: 'GET', signal },
    options,
  );
};

export const getAdminFindAllRentalQueryKey = () => {
  return [`/admin/rental`] as const;
};

export const getAdminFindAllRentalQueryOptions = <
  TData = Awaited<ReturnType<typeof adminFindAllRental>>,
  TError = unknown,
>(options?: {
  query?: UseQueryOptions<
    Awaited<ReturnType<typeof adminFindAllRental>>,
    TError,
    TData
  >;
  request?: SecondParameter<typeof orvalInstance>;
}) => {
  const { query: queryOptions, request: requestOptions } = options ?? {};

  const queryKey = queryOptions?.queryKey ?? getAdminFindAllRentalQueryKey();

  const queryFn: QueryFunction<
    Awaited<ReturnType<typeof adminFindAllRental>>
  > = ({ signal }) => adminFindAllRental(requestOptions, signal);

  return { queryKey, queryFn, ...queryOptions } as UseQueryOptions<
    Awaited<ReturnType<typeof adminFindAllRental>>,
    TError,
    TData
  > & { queryKey: QueryKey };
};

export type AdminFindAllRentalQueryResult = NonNullable<
  Awaited<ReturnType<typeof adminFindAllRental>>
>;
export type AdminFindAllRentalQueryError = unknown;

/**
 * @summary 대여 전체 목록
 */

export function useAdminFindAllRental<
  TData = Awaited<ReturnType<typeof adminFindAllRental>>,
  TError = unknown,
>(options?: {
  query?: UseQueryOptions<
    Awaited<ReturnType<typeof adminFindAllRental>>,
    TError,
    TData
  >;
  request?: SecondParameter<typeof orvalInstance>;
}): UseQueryResult<TData, TError> & { queryKey: QueryKey } {
  const queryOptions = getAdminFindAllRentalQueryOptions(options);

  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
  };

  query.queryKey = queryOptions.queryKey;

  return query;
}

/**
 * @summary 대여 등록
 */
export const adminCreateRental = (
  rentalAdminParam: RentalAdminParam,
  options?: SecondParameter<typeof orvalInstance>,
  signal?: AbortSignal,
) => {
  return orvalInstance<RentalDto>(
    {
      url: `/admin/rental`,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: rentalAdminParam,
      signal,
    },
    options,
  );
};

export const getAdminCreateRentalMutationOptions = <
  TError = unknown,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof adminCreateRental>>,
    TError,
    { data: RentalAdminParam },
    TContext
  >;
  request?: SecondParameter<typeof orvalInstance>;
}): UseMutationOptions<
  Awaited<ReturnType<typeof adminCreateRental>>,
  TError,
  { data: RentalAdminParam },
  TContext
> => {
  const mutationKey = ['adminCreateRental'];
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation &&
      'mutationKey' in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined };

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof adminCreateRental>>,
    { data: RentalAdminParam }
  > = (props) => {
    const { data } = props ?? {};

    return adminCreateRental(data, requestOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type AdminCreateRentalMutationResult = NonNullable<
  Awaited<ReturnType<typeof adminCreateRental>>
>;
export type AdminCreateRentalMutationBody = RentalAdminParam;
export type AdminCreateRentalMutationError = unknown;

/**
 * @summary 대여 등록
 */
export const useAdminCreateRental = <
  TError = unknown,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof adminCreateRental>>,
    TError,
    { data: RentalAdminParam },
    TContext
  >;
  request?: SecondParameter<typeof orvalInstance>;
}): UseMutationResult<
  Awaited<ReturnType<typeof adminCreateRental>>,
  TError,
  { data: RentalAdminParam },
  TContext
> => {
  const mutationOptions = getAdminCreateRentalMutationOptions(options);

  return useMutation(mutationOptions);
};
/**
 * @summary 대여 조회
 */
export const adminFindOneRental = (
  id: number,
  options?: SecondParameter<typeof orvalInstance>,
  signal?: AbortSignal,
) => {
  return orvalInstance<RentalDto>(
    { url: `/admin/rental/${id}`, method: 'GET', signal },
    options,
  );
};

export const getAdminFindOneRentalQueryKey = (id: number) => {
  return [`/admin/rental/${id}`] as const;
};

export const getAdminFindOneRentalQueryOptions = <
  TData = Awaited<ReturnType<typeof adminFindOneRental>>,
  TError = unknown,
>(
  id: number,
  options?: {
    query?: UseQueryOptions<
      Awaited<ReturnType<typeof adminFindOneRental>>,
      TError,
      TData
    >;
    request?: SecondParameter<typeof orvalInstance>;
  },
) => {
  const { query: queryOptions, request: requestOptions } = options ?? {};

  const queryKey = queryOptions?.queryKey ?? getAdminFindOneRentalQueryKey(id);

  const queryFn: QueryFunction<
    Awaited<ReturnType<typeof adminFindOneRental>>
  > = ({ signal }) => adminFindOneRental(id, requestOptions, signal);

  return {
    queryKey,
    queryFn,
    enabled: !!id,
    ...queryOptions,
  } as UseQueryOptions<
    Awaited<ReturnType<typeof adminFindOneRental>>,
    TError,
    TData
  > & { queryKey: QueryKey };
};

export type AdminFindOneRentalQueryResult = NonNullable<
  Awaited<ReturnType<typeof adminFindOneRental>>
>;
export type AdminFindOneRentalQueryError = unknown;

/**
 * @summary 대여 조회
 */

export function useAdminFindOneRental<
  TData = Awaited<ReturnType<typeof adminFindOneRental>>,
  TError = unknown,
>(
  id: number,
  options?: {
    query?: UseQueryOptions<
      Awaited<ReturnType<typeof adminFindOneRental>>,
      TError,
      TData
    >;
    request?: SecondParameter<typeof orvalInstance>;
  },
): UseQueryResult<TData, TError> & { queryKey: QueryKey } {
  const queryOptions = getAdminFindOneRentalQueryOptions(id, options);

  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
  };

  query.queryKey = queryOptions.queryKey;

  return query;
}

/**
 * @summary 대여 수정
 */
export const adminUpdateRental = (
  id: number,
  rentalAdminParam: RentalAdminParam,
  options?: SecondParameter<typeof orvalInstance>,
) => {
  return orvalInstance<void>(
    {
      url: `/admin/rental/${id}`,
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      data: rentalAdminParam,
    },
    options,
  );
};

export const getAdminUpdateRentalMutationOptions = <
  TError = unknown,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof adminUpdateRental>>,
    TError,
    { id: number; data: RentalAdminParam },
    TContext
  >;
  request?: SecondParameter<typeof orvalInstance>;
}): UseMutationOptions<
  Awaited<ReturnType<typeof adminUpdateRental>>,
  TError,
  { id: number; data: RentalAdminParam },
  TContext
> => {
  const mutationKey = ['adminUpdateRental'];
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation &&
      'mutationKey' in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined };

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof adminUpdateRental>>,
    { id: number; data: RentalAdminParam }
  > = (props) => {
    const { id, data } = props ?? {};

    return adminUpdateRental(id, data, requestOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type AdminUpdateRentalMutationResult = NonNullable<
  Awaited<ReturnType<typeof adminUpdateRental>>
>;
export type AdminUpdateRentalMutationBody = RentalAdminParam;
export type AdminUpdateRentalMutationError = unknown;

/**
 * @summary 대여 수정
 */
export const useAdminUpdateRental = <
  TError = unknown,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof adminUpdateRental>>,
    TError,
    { id: number; data: RentalAdminParam },
    TContext
  >;
  request?: SecondParameter<typeof orvalInstance>;
}): UseMutationResult<
  Awaited<ReturnType<typeof adminUpdateRental>>,
  TError,
  { id: number; data: RentalAdminParam },
  TContext
> => {
  const mutationOptions = getAdminUpdateRentalMutationOptions(options);

  return useMutation(mutationOptions);
};
/**
 * @summary 대여 삭제
 */
export const adminDeleteRental = (
  id: number,
  options?: SecondParameter<typeof orvalInstance>,
) => {
  return orvalInstance<void>(
    { url: `/admin/rental/${id}`, method: 'DELETE' },
    options,
  );
};

export const getAdminDeleteRentalMutationOptions = <
  TError = unknown,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof adminDeleteRental>>,
    TError,
    { id: number },
    TContext
  >;
  request?: SecondParameter<typeof orvalInstance>;
}): UseMutationOptions<
  Awaited<ReturnType<typeof adminDeleteRental>>,
  TError,
  { id: number },
  TContext
> => {
  const mutationKey = ['adminDeleteRental'];
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation &&
      'mutationKey' in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined };

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof adminDeleteRental>>,
    { id: number }
  > = (props) => {
    const { id } = props ?? {};

    return adminDeleteRental(id, requestOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type AdminDeleteRentalMutationResult = NonNullable<
  Awaited<ReturnType<typeof adminDeleteRental>>
>;

export type AdminDeleteRentalMutationError = unknown;

/**
 * @summary 대여 삭제
 */
export const useAdminDeleteRental = <
  TError = unknown,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof adminDeleteRental>>,
    TError,
    { id: number },
    TContext
  >;
  request?: SecondParameter<typeof orvalInstance>;
}): UseMutationResult<
  Awaited<ReturnType<typeof adminDeleteRental>>,
  TError,
  { id: number },
  TContext
> => {
  const mutationOptions = getAdminDeleteRentalMutationOptions(options);

  return useMutation(mutationOptions);
};
/**
 * @summary 대여 일괄 삭제
 */
export const adminRemoveRental = (
  rentalRemoveAdminParam: RentalRemoveAdminParam,
  options?: SecondParameter<typeof orvalInstance>,
  signal?: AbortSignal,
) => {
  return orvalInstance<void>(
    {
      url: `/admin/rental/remove`,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: rentalRemoveAdminParam,
      signal,
    },
    options,
  );
};

export const getAdminRemoveRentalMutationOptions = <
  TError = unknown,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof adminRemoveRental>>,
    TError,
    { data: RentalRemoveAdminParam },
    TContext
  >;
  request?: SecondParameter<typeof orvalInstance>;
}): UseMutationOptions<
  Awaited<ReturnType<typeof adminRemoveRental>>,
  TError,
  { data: RentalRemoveAdminParam },
  TContext
> => {
  const mutationKey = ['adminRemoveRental'];
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation &&
      'mutationKey' in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined };

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof adminRemoveRental>>,
    { data: RentalRemoveAdminParam }
  > = (props) => {
    const { data } = props ?? {};

    return adminRemoveRental(data, requestOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type AdminRemoveRentalMutationResult = NonNullable<
  Awaited<ReturnType<typeof adminRemoveRental>>
>;
export type AdminRemoveRentalMutationBody = RentalRemoveAdminParam;
export type AdminRemoveRentalMutationError = unknown;

/**
 * @summary 대여 일괄 삭제
 */
export const useAdminRemoveRental = <
  TError = unknown,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof adminRemoveRental>>,
    TError,
    { data: RentalRemoveAdminParam },
    TContext
  >;
  request?: SecondParameter<typeof orvalInstance>;
}): UseMutationResult<
  Awaited<ReturnType<typeof adminRemoveRental>>,
  TError,
  { data: RentalRemoveAdminParam },
  TContext
> => {
  const mutationOptions = getAdminRemoveRentalMutationOptions(options);

  return useMutation(mutationOptions);
};
/**
 * @summary 대여 등록
 */
export const clientCreateRental = (
  rentalClientParam: RentalClientParam,
  options?: SecondParameter<typeof orvalInstance>,
  signal?: AbortSignal,
) => {
  return orvalInstance<void>(
    {
      url: `/client/rental`,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: rentalClientParam,
      signal,
    },
    options,
  );
};

export const getClientCreateRentalMutationOptions = <
  TError = unknown,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof clientCreateRental>>,
    TError,
    { data: RentalClientParam },
    TContext
  >;
  request?: SecondParameter<typeof orvalInstance>;
}): UseMutationOptions<
  Awaited<ReturnType<typeof clientCreateRental>>,
  TError,
  { data: RentalClientParam },
  TContext
> => {
  const mutationKey = ['clientCreateRental'];
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation &&
      'mutationKey' in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined };

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof clientCreateRental>>,
    { data: RentalClientParam }
  > = (props) => {
    const { data } = props ?? {};

    return clientCreateRental(data, requestOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type ClientCreateRentalMutationResult = NonNullable<
  Awaited<ReturnType<typeof clientCreateRental>>
>;
export type ClientCreateRentalMutationBody = RentalClientParam;
export type ClientCreateRentalMutationError = unknown;

/**
 * @summary 대여 등록
 */
export const useClientCreateRental = <
  TError = unknown,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof clientCreateRental>>,
    TError,
    { data: RentalClientParam },
    TContext
  >;
  request?: SecondParameter<typeof orvalInstance>;
}): UseMutationResult<
  Awaited<ReturnType<typeof clientCreateRental>>,
  TError,
  { data: RentalClientParam },
  TContext
> => {
  const mutationOptions = getClientCreateRentalMutationOptions(options);

  return useMutation(mutationOptions);
};
/**
 * @summary 문서 미리보기
 */
export const clientDocumentPreviewRental = (
  id: string,
  options?: SecondParameter<typeof orvalInstance>,
  signal?: AbortSignal,
) => {
  return orvalInstance<void>(
    { url: `/client/rental/document/preview/${id}`, method: 'GET', signal },
    options,
  );
};

export const getClientDocumentPreviewRentalQueryKey = (id: string) => {
  return [`/client/rental/document/preview/${id}`] as const;
};

export const getClientDocumentPreviewRentalQueryOptions = <
  TData = Awaited<ReturnType<typeof clientDocumentPreviewRental>>,
  TError = unknown,
>(
  id: string,
  options?: {
    query?: UseQueryOptions<
      Awaited<ReturnType<typeof clientDocumentPreviewRental>>,
      TError,
      TData
    >;
    request?: SecondParameter<typeof orvalInstance>;
  },
) => {
  const { query: queryOptions, request: requestOptions } = options ?? {};

  const queryKey =
    queryOptions?.queryKey ?? getClientDocumentPreviewRentalQueryKey(id);

  const queryFn: QueryFunction<
    Awaited<ReturnType<typeof clientDocumentPreviewRental>>
  > = ({ signal }) => clientDocumentPreviewRental(id, requestOptions, signal);

  return {
    queryKey,
    queryFn,
    enabled: !!id,
    ...queryOptions,
  } as UseQueryOptions<
    Awaited<ReturnType<typeof clientDocumentPreviewRental>>,
    TError,
    TData
  > & { queryKey: QueryKey };
};

export type ClientDocumentPreviewRentalQueryResult = NonNullable<
  Awaited<ReturnType<typeof clientDocumentPreviewRental>>
>;
export type ClientDocumentPreviewRentalQueryError = unknown;

/**
 * @summary 문서 미리보기
 */

export function useClientDocumentPreviewRental<
  TData = Awaited<ReturnType<typeof clientDocumentPreviewRental>>,
  TError = unknown,
>(
  id: string,
  options?: {
    query?: UseQueryOptions<
      Awaited<ReturnType<typeof clientDocumentPreviewRental>>,
      TError,
      TData
    >;
    request?: SecondParameter<typeof orvalInstance>;
  },
): UseQueryResult<TData, TError> & { queryKey: QueryKey } {
  const queryOptions = getClientDocumentPreviewRentalQueryOptions(id, options);

  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
  };

  query.queryKey = queryOptions.queryKey;

  return query;
}

/**
 * @summary 문서 업로드
 */
export const clientDocumentRental = (
  rentalDocumentClientParam: RentalDocumentClientParam,
  options?: SecondParameter<typeof orvalInstance>,
  signal?: AbortSignal,
) => {
  const formData = new FormData();
  formData.append(`file`, rentalDocumentClientParam.file);
  if (rentalDocumentClientParam.category !== undefined) {
    formData.append(`category`, rentalDocumentClientParam.category);
  }

  return orvalInstance<RentalDocumentDto>(
    {
      url: `/client/rental/document`,
      method: 'POST',
      headers: { 'Content-Type': 'multipart/form-data' },
      data: formData,
      signal,
    },
    options,
  );
};

export const getClientDocumentRentalMutationOptions = <
  TError = unknown,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof clientDocumentRental>>,
    TError,
    { data: RentalDocumentClientParam },
    TContext
  >;
  request?: SecondParameter<typeof orvalInstance>;
}): UseMutationOptions<
  Awaited<ReturnType<typeof clientDocumentRental>>,
  TError,
  { data: RentalDocumentClientParam },
  TContext
> => {
  const mutationKey = ['clientDocumentRental'];
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation &&
      'mutationKey' in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined };

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof clientDocumentRental>>,
    { data: RentalDocumentClientParam }
  > = (props) => {
    const { data } = props ?? {};

    return clientDocumentRental(data, requestOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type ClientDocumentRentalMutationResult = NonNullable<
  Awaited<ReturnType<typeof clientDocumentRental>>
>;
export type ClientDocumentRentalMutationBody = RentalDocumentClientParam;
export type ClientDocumentRentalMutationError = unknown;

/**
 * @summary 문서 업로드
 */
export const useClientDocumentRental = <
  TError = unknown,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof clientDocumentRental>>,
    TError,
    { data: RentalDocumentClientParam },
    TContext
  >;
  request?: SecondParameter<typeof orvalInstance>;
}): UseMutationResult<
  Awaited<ReturnType<typeof clientDocumentRental>>,
  TError,
  { data: RentalDocumentClientParam },
  TContext
> => {
  const mutationOptions = getClientDocumentRentalMutationOptions(options);

  return useMutation(mutationOptions);
};
/**
 * @summary 홈 화면 기기대여 현황
 */
export const clientHomeRental = (
  options?: SecondParameter<typeof orvalInstance>,
  signal?: AbortSignal,
) => {
  return orvalInstance<RentalDto[]>(
    { url: `/client/rental/home`, method: 'GET', signal },
    options,
  );
};

export const getClientHomeRentalQueryKey = () => {
  return [`/client/rental/home`] as const;
};

export const getClientHomeRentalQueryOptions = <
  TData = Awaited<ReturnType<typeof clientHomeRental>>,
  TError = unknown,
>(options?: {
  query?: UseQueryOptions<
    Awaited<ReturnType<typeof clientHomeRental>>,
    TError,
    TData
  >;
  request?: SecondParameter<typeof orvalInstance>;
}) => {
  const { query: queryOptions, request: requestOptions } = options ?? {};

  const queryKey = queryOptions?.queryKey ?? getClientHomeRentalQueryKey();

  const queryFn: QueryFunction<
    Awaited<ReturnType<typeof clientHomeRental>>
  > = ({ signal }) => clientHomeRental(requestOptions, signal);

  return { queryKey, queryFn, ...queryOptions } as UseQueryOptions<
    Awaited<ReturnType<typeof clientHomeRental>>,
    TError,
    TData
  > & { queryKey: QueryKey };
};

export type ClientHomeRentalQueryResult = NonNullable<
  Awaited<ReturnType<typeof clientHomeRental>>
>;
export type ClientHomeRentalQueryError = unknown;

/**
 * @summary 홈 화면 기기대여 현황
 */

export function useClientHomeRental<
  TData = Awaited<ReturnType<typeof clientHomeRental>>,
  TError = unknown,
>(options?: {
  query?: UseQueryOptions<
    Awaited<ReturnType<typeof clientHomeRental>>,
    TError,
    TData
  >;
  request?: SecondParameter<typeof orvalInstance>;
}): UseQueryResult<TData, TError> & { queryKey: QueryKey } {
  const queryOptions = getClientHomeRentalQueryOptions(options);

  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
  };

  query.queryKey = queryOptions.queryKey;

  return query;
}

/**
 * @summary 마이페이지 화면 기기대여 현황
 */
export const clientMypageRental = (
  options?: SecondParameter<typeof orvalInstance>,
  signal?: AbortSignal,
) => {
  return orvalInstance<RentalDto>(
    { url: `/client/rental/mypage`, method: 'GET', signal },
    options,
  );
};

export const getClientMypageRentalQueryKey = () => {
  return [`/client/rental/mypage`] as const;
};

export const getClientMypageRentalQueryOptions = <
  TData = Awaited<ReturnType<typeof clientMypageRental>>,
  TError = unknown,
>(options?: {
  query?: UseQueryOptions<
    Awaited<ReturnType<typeof clientMypageRental>>,
    TError,
    TData
  >;
  request?: SecondParameter<typeof orvalInstance>;
}) => {
  const { query: queryOptions, request: requestOptions } = options ?? {};

  const queryKey = queryOptions?.queryKey ?? getClientMypageRentalQueryKey();

  const queryFn: QueryFunction<
    Awaited<ReturnType<typeof clientMypageRental>>
  > = ({ signal }) => clientMypageRental(requestOptions, signal);

  return { queryKey, queryFn, ...queryOptions } as UseQueryOptions<
    Awaited<ReturnType<typeof clientMypageRental>>,
    TError,
    TData
  > & { queryKey: QueryKey };
};

export type ClientMypageRentalQueryResult = NonNullable<
  Awaited<ReturnType<typeof clientMypageRental>>
>;
export type ClientMypageRentalQueryError = unknown;

/**
 * @summary 마이페이지 화면 기기대여 현황
 */

export function useClientMypageRental<
  TData = Awaited<ReturnType<typeof clientMypageRental>>,
  TError = unknown,
>(options?: {
  query?: UseQueryOptions<
    Awaited<ReturnType<typeof clientMypageRental>>,
    TError,
    TData
  >;
  request?: SecondParameter<typeof orvalInstance>;
}): UseQueryResult<TData, TError> & { queryKey: QueryKey } {
  const queryOptions = getClientMypageRentalQueryOptions(options);

  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
  };

  query.queryKey = queryOptions.queryKey;

  return query;
}

/**
 * @summary 기기대여 검색 조회
 */
export const clientSearchRental = (
  params?: ClientSearchRentalParams,
  options?: SecondParameter<typeof orvalInstance>,
  signal?: AbortSignal,
) => {
  return orvalInstance<RentalListClientDto>(
    { url: `/client/rental/search`, method: 'GET', params, signal },
    options,
  );
};

export const getClientSearchRentalQueryKey = (
  params?: ClientSearchRentalParams,
) => {
  return [`/client/rental/search`, ...(params ? [params] : [])] as const;
};

export const getClientSearchRentalQueryOptions = <
  TData = Awaited<ReturnType<typeof clientSearchRental>>,
  TError = unknown,
>(
  params?: ClientSearchRentalParams,
  options?: {
    query?: UseQueryOptions<
      Awaited<ReturnType<typeof clientSearchRental>>,
      TError,
      TData
    >;
    request?: SecondParameter<typeof orvalInstance>;
  },
) => {
  const { query: queryOptions, request: requestOptions } = options ?? {};

  const queryKey =
    queryOptions?.queryKey ?? getClientSearchRentalQueryKey(params);

  const queryFn: QueryFunction<
    Awaited<ReturnType<typeof clientSearchRental>>
  > = ({ signal }) => clientSearchRental(params, requestOptions, signal);

  return { queryKey, queryFn, ...queryOptions } as UseQueryOptions<
    Awaited<ReturnType<typeof clientSearchRental>>,
    TError,
    TData
  > & { queryKey: QueryKey };
};

export type ClientSearchRentalQueryResult = NonNullable<
  Awaited<ReturnType<typeof clientSearchRental>>
>;
export type ClientSearchRentalQueryError = unknown;

/**
 * @summary 기기대여 검색 조회
 */

export function useClientSearchRental<
  TData = Awaited<ReturnType<typeof clientSearchRental>>,
  TError = unknown,
>(
  params?: ClientSearchRentalParams,
  options?: {
    query?: UseQueryOptions<
      Awaited<ReturnType<typeof clientSearchRental>>,
      TError,
      TData
    >;
    request?: SecondParameter<typeof orvalInstance>;
  },
): UseQueryResult<TData, TError> & { queryKey: QueryKey } {
  const queryOptions = getClientSearchRentalQueryOptions(params, options);

  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
  };

  query.queryKey = queryOptions.queryKey;

  return query;
}

/**
 * @summary 기기대여 조회
 */
export const clientFindOneRental = (
  id: number,
  options?: SecondParameter<typeof orvalInstance>,
  signal?: AbortSignal,
) => {
  return orvalInstance<RentalDto>(
    { url: `/client/rental/${id}`, method: 'GET', signal },
    options,
  );
};

export const getClientFindOneRentalQueryKey = (id: number) => {
  return [`/client/rental/${id}`] as const;
};

export const getClientFindOneRentalQueryOptions = <
  TData = Awaited<ReturnType<typeof clientFindOneRental>>,
  TError = unknown,
>(
  id: number,
  options?: {
    query?: UseQueryOptions<
      Awaited<ReturnType<typeof clientFindOneRental>>,
      TError,
      TData
    >;
    request?: SecondParameter<typeof orvalInstance>;
  },
) => {
  const { query: queryOptions, request: requestOptions } = options ?? {};

  const queryKey = queryOptions?.queryKey ?? getClientFindOneRentalQueryKey(id);

  const queryFn: QueryFunction<
    Awaited<ReturnType<typeof clientFindOneRental>>
  > = ({ signal }) => clientFindOneRental(id, requestOptions, signal);

  return {
    queryKey,
    queryFn,
    enabled: !!id,
    ...queryOptions,
  } as UseQueryOptions<
    Awaited<ReturnType<typeof clientFindOneRental>>,
    TError,
    TData
  > & { queryKey: QueryKey };
};

export type ClientFindOneRentalQueryResult = NonNullable<
  Awaited<ReturnType<typeof clientFindOneRental>>
>;
export type ClientFindOneRentalQueryError = unknown;

/**
 * @summary 기기대여 조회
 */

export function useClientFindOneRental<
  TData = Awaited<ReturnType<typeof clientFindOneRental>>,
  TError = unknown,
>(
  id: number,
  options?: {
    query?: UseQueryOptions<
      Awaited<ReturnType<typeof clientFindOneRental>>,
      TError,
      TData
    >;
    request?: SecondParameter<typeof orvalInstance>;
  },
): UseQueryResult<TData, TError> & { queryKey: QueryKey } {
  const queryOptions = getClientFindOneRentalQueryOptions(id, options);

  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
  };

  query.queryKey = queryOptions.queryKey;

  return query;
}
