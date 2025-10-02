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
  AdminSearchArticleParams,
  ArticleAdminParam,
  ArticleBoardDto,
  ArticleDto,
  ArticleHitClientParam,
  ArticleListAdminDto,
  ArticleListClientDto,
  ArticleRemoveAdminParam,
  ArticleUploadAdminParam,
  ArticleUploadDto,
  ClientListArticleParams,
  ClientSearchArticleParams,
  ResourceDto,
  ResourceParam,
} from './model';

type AwaitedInput<T> = PromiseLike<T> | T;

type Awaited<O> = O extends AwaitedInput<infer T> ? T : never;

type SecondParameter<T extends (...args: never) => unknown> = Parameters<T>[1];

/**
 * @summary 첨부파일 업로드
 */
export const adminUploadArticle = (
  articleUploadAdminParam: ArticleUploadAdminParam,
  options?: SecondParameter<typeof orvalInstance>,
  signal?: AbortSignal,
) => {
  const formData = new FormData();
  formData.append(`file`, articleUploadAdminParam.file);

  return orvalInstance<ArticleUploadDto>(
    {
      url: `/admin/article/upload`,
      method: 'POST',
      headers: { 'Content-Type': 'multipart/form-data' },
      data: formData,
      signal,
    },
    options,
  );
};

export const getAdminUploadArticleMutationOptions = <
  TError = unknown,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof adminUploadArticle>>,
    TError,
    { data: ArticleUploadAdminParam },
    TContext
  >;
  request?: SecondParameter<typeof orvalInstance>;
}): UseMutationOptions<
  Awaited<ReturnType<typeof adminUploadArticle>>,
  TError,
  { data: ArticleUploadAdminParam },
  TContext
> => {
  const mutationKey = ['adminUploadArticle'];
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation &&
      'mutationKey' in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined };

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof adminUploadArticle>>,
    { data: ArticleUploadAdminParam }
  > = (props) => {
    const { data } = props ?? {};

    return adminUploadArticle(data, requestOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type AdminUploadArticleMutationResult = NonNullable<
  Awaited<ReturnType<typeof adminUploadArticle>>
>;
export type AdminUploadArticleMutationBody = ArticleUploadAdminParam;
export type AdminUploadArticleMutationError = unknown;

/**
 * @summary 첨부파일 업로드
 */
export const useAdminUploadArticle = <
  TError = unknown,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof adminUploadArticle>>,
    TError,
    { data: ArticleUploadAdminParam },
    TContext
  >;
  request?: SecondParameter<typeof orvalInstance>;
}): UseMutationResult<
  Awaited<ReturnType<typeof adminUploadArticle>>,
  TError,
  { data: ArticleUploadAdminParam },
  TContext
> => {
  const mutationOptions = getAdminUploadArticleMutationOptions(options);

  return useMutation(mutationOptions);
};
/**
 * @summary 첨부파일 다운로드
 */
export const adminDownloadArticle = (
  id: string,
  options?: SecondParameter<typeof orvalInstance>,
  signal?: AbortSignal,
) => {
  return orvalInstance<void>(
    { url: `/admin/article/download/${id}`, method: 'GET', signal },
    options,
  );
};

export const getAdminDownloadArticleQueryKey = (id: string) => {
  return [`/admin/article/download/${id}`] as const;
};

export const getAdminDownloadArticleQueryOptions = <
  TData = Awaited<ReturnType<typeof adminDownloadArticle>>,
  TError = unknown,
>(
  id: string,
  options?: {
    query?: UseQueryOptions<
      Awaited<ReturnType<typeof adminDownloadArticle>>,
      TError,
      TData
    >;
    request?: SecondParameter<typeof orvalInstance>;
  },
) => {
  const { query: queryOptions, request: requestOptions } = options ?? {};

  const queryKey =
    queryOptions?.queryKey ?? getAdminDownloadArticleQueryKey(id);

  const queryFn: QueryFunction<
    Awaited<ReturnType<typeof adminDownloadArticle>>
  > = ({ signal }) => adminDownloadArticle(id, requestOptions, signal);

  return {
    queryKey,
    queryFn,
    enabled: !!id,
    ...queryOptions,
  } as UseQueryOptions<
    Awaited<ReturnType<typeof adminDownloadArticle>>,
    TError,
    TData
  > & { queryKey: QueryKey };
};

export type AdminDownloadArticleQueryResult = NonNullable<
  Awaited<ReturnType<typeof adminDownloadArticle>>
>;
export type AdminDownloadArticleQueryError = unknown;

/**
 * @summary 첨부파일 다운로드
 */

export function useAdminDownloadArticle<
  TData = Awaited<ReturnType<typeof adminDownloadArticle>>,
  TError = unknown,
>(
  id: string,
  options?: {
    query?: UseQueryOptions<
      Awaited<ReturnType<typeof adminDownloadArticle>>,
      TError,
      TData
    >;
    request?: SecondParameter<typeof orvalInstance>;
  },
): UseQueryResult<TData, TError> & { queryKey: QueryKey } {
  const queryOptions = getAdminDownloadArticleQueryOptions(id, options);

  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
  };

  query.queryKey = queryOptions.queryKey;

  return query;
}

/**
 * @summary 관리형 게시판 전체 조회
 */
export const adminFindAllBoardArticle = (
  options?: SecondParameter<typeof orvalInstance>,
  signal?: AbortSignal,
) => {
  return orvalInstance<ArticleBoardDto[]>(
    { url: `/admin/article/board`, method: 'GET', signal },
    options,
  );
};

export const getAdminFindAllBoardArticleQueryKey = () => {
  return [`/admin/article/board`] as const;
};

export const getAdminFindAllBoardArticleQueryOptions = <
  TData = Awaited<ReturnType<typeof adminFindAllBoardArticle>>,
  TError = unknown,
>(options?: {
  query?: UseQueryOptions<
    Awaited<ReturnType<typeof adminFindAllBoardArticle>>,
    TError,
    TData
  >;
  request?: SecondParameter<typeof orvalInstance>;
}) => {
  const { query: queryOptions, request: requestOptions } = options ?? {};

  const queryKey =
    queryOptions?.queryKey ?? getAdminFindAllBoardArticleQueryKey();

  const queryFn: QueryFunction<
    Awaited<ReturnType<typeof adminFindAllBoardArticle>>
  > = ({ signal }) => adminFindAllBoardArticle(requestOptions, signal);

  return { queryKey, queryFn, ...queryOptions } as UseQueryOptions<
    Awaited<ReturnType<typeof adminFindAllBoardArticle>>,
    TError,
    TData
  > & { queryKey: QueryKey };
};

export type AdminFindAllBoardArticleQueryResult = NonNullable<
  Awaited<ReturnType<typeof adminFindAllBoardArticle>>
>;
export type AdminFindAllBoardArticleQueryError = unknown;

/**
 * @summary 관리형 게시판 전체 조회
 */

export function useAdminFindAllBoardArticle<
  TData = Awaited<ReturnType<typeof adminFindAllBoardArticle>>,
  TError = unknown,
>(options?: {
  query?: UseQueryOptions<
    Awaited<ReturnType<typeof adminFindAllBoardArticle>>,
    TError,
    TData
  >;
  request?: SecondParameter<typeof orvalInstance>;
}): UseQueryResult<TData, TError> & { queryKey: QueryKey } {
  const queryOptions = getAdminFindAllBoardArticleQueryOptions(options);

  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
  };

  query.queryKey = queryOptions.queryKey;

  return query;
}

/**
 * @summary 아티클 게시판 조회
 */
export const adminFindOneBoardArticle = (
  namekey: string,
  options?: SecondParameter<typeof orvalInstance>,
  signal?: AbortSignal,
) => {
  return orvalInstance<ArticleBoardDto>(
    { url: `/admin/article/board/${namekey}`, method: 'GET', signal },
    options,
  );
};

export const getAdminFindOneBoardArticleQueryKey = (namekey: string) => {
  return [`/admin/article/board/${namekey}`] as const;
};

export const getAdminFindOneBoardArticleQueryOptions = <
  TData = Awaited<ReturnType<typeof adminFindOneBoardArticle>>,
  TError = unknown,
>(
  namekey: string,
  options?: {
    query?: UseQueryOptions<
      Awaited<ReturnType<typeof adminFindOneBoardArticle>>,
      TError,
      TData
    >;
    request?: SecondParameter<typeof orvalInstance>;
  },
) => {
  const { query: queryOptions, request: requestOptions } = options ?? {};

  const queryKey =
    queryOptions?.queryKey ?? getAdminFindOneBoardArticleQueryKey(namekey);

  const queryFn: QueryFunction<
    Awaited<ReturnType<typeof adminFindOneBoardArticle>>
  > = ({ signal }) => adminFindOneBoardArticle(namekey, requestOptions, signal);

  return {
    queryKey,
    queryFn,
    enabled: !!namekey,
    ...queryOptions,
  } as UseQueryOptions<
    Awaited<ReturnType<typeof adminFindOneBoardArticle>>,
    TError,
    TData
  > & { queryKey: QueryKey };
};

export type AdminFindOneBoardArticleQueryResult = NonNullable<
  Awaited<ReturnType<typeof adminFindOneBoardArticle>>
>;
export type AdminFindOneBoardArticleQueryError = unknown;

/**
 * @summary 아티클 게시판 조회
 */

export function useAdminFindOneBoardArticle<
  TData = Awaited<ReturnType<typeof adminFindOneBoardArticle>>,
  TError = unknown,
>(
  namekey: string,
  options?: {
    query?: UseQueryOptions<
      Awaited<ReturnType<typeof adminFindOneBoardArticle>>,
      TError,
      TData
    >;
    request?: SecondParameter<typeof orvalInstance>;
  },
): UseQueryResult<TData, TError> & { queryKey: QueryKey } {
  const queryOptions = getAdminFindOneBoardArticleQueryOptions(
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
 * @summary 이미지 업로드
 */
export const adminResourceArticle = (
  resourceParam: ResourceParam,
  options?: SecondParameter<typeof orvalInstance>,
  signal?: AbortSignal,
) => {
  const formData = new FormData();
  formData.append(`file`, resourceParam.file);

  return orvalInstance<ResourceDto>(
    {
      url: `/admin/article/resource`,
      method: 'POST',
      headers: { 'Content-Type': 'multipart/form-data' },
      data: formData,
      signal,
    },
    options,
  );
};

export const getAdminResourceArticleMutationOptions = <
  TError = unknown,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof adminResourceArticle>>,
    TError,
    { data: ResourceParam },
    TContext
  >;
  request?: SecondParameter<typeof orvalInstance>;
}): UseMutationOptions<
  Awaited<ReturnType<typeof adminResourceArticle>>,
  TError,
  { data: ResourceParam },
  TContext
> => {
  const mutationKey = ['adminResourceArticle'];
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation &&
      'mutationKey' in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined };

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof adminResourceArticle>>,
    { data: ResourceParam }
  > = (props) => {
    const { data } = props ?? {};

    return adminResourceArticle(data, requestOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type AdminResourceArticleMutationResult = NonNullable<
  Awaited<ReturnType<typeof adminResourceArticle>>
>;
export type AdminResourceArticleMutationBody = ResourceParam;
export type AdminResourceArticleMutationError = unknown;

/**
 * @summary 이미지 업로드
 */
export const useAdminResourceArticle = <
  TError = unknown,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof adminResourceArticle>>,
    TError,
    { data: ResourceParam },
    TContext
  >;
  request?: SecondParameter<typeof orvalInstance>;
}): UseMutationResult<
  Awaited<ReturnType<typeof adminResourceArticle>>,
  TError,
  { data: ResourceParam },
  TContext
> => {
  const mutationOptions = getAdminResourceArticleMutationOptions(options);

  return useMutation(mutationOptions);
};
/**
 * @summary 썸네일 업로드
 */
export const adminThumbnailArticle = (
  resourceParam: ResourceParam,
  options?: SecondParameter<typeof orvalInstance>,
  signal?: AbortSignal,
) => {
  const formData = new FormData();
  formData.append(`file`, resourceParam.file);

  return orvalInstance<ResourceDto>(
    {
      url: `/admin/article/thumbnail`,
      method: 'POST',
      headers: { 'Content-Type': 'multipart/form-data' },
      data: formData,
      signal,
    },
    options,
  );
};

export const getAdminThumbnailArticleMutationOptions = <
  TError = unknown,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof adminThumbnailArticle>>,
    TError,
    { data: ResourceParam },
    TContext
  >;
  request?: SecondParameter<typeof orvalInstance>;
}): UseMutationOptions<
  Awaited<ReturnType<typeof adminThumbnailArticle>>,
  TError,
  { data: ResourceParam },
  TContext
> => {
  const mutationKey = ['adminThumbnailArticle'];
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation &&
      'mutationKey' in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined };

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof adminThumbnailArticle>>,
    { data: ResourceParam }
  > = (props) => {
    const { data } = props ?? {};

    return adminThumbnailArticle(data, requestOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type AdminThumbnailArticleMutationResult = NonNullable<
  Awaited<ReturnType<typeof adminThumbnailArticle>>
>;
export type AdminThumbnailArticleMutationBody = ResourceParam;
export type AdminThumbnailArticleMutationError = unknown;

/**
 * @summary 썸네일 업로드
 */
export const useAdminThumbnailArticle = <
  TError = unknown,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof adminThumbnailArticle>>,
    TError,
    { data: ResourceParam },
    TContext
  >;
  request?: SecondParameter<typeof orvalInstance>;
}): UseMutationResult<
  Awaited<ReturnType<typeof adminThumbnailArticle>>,
  TError,
  { data: ResourceParam },
  TContext
> => {
  const mutationOptions = getAdminThumbnailArticleMutationOptions(options);

  return useMutation(mutationOptions);
};
/**
 * @summary 아티클 검색 목록
 */
export const adminSearchArticle = (
  params?: AdminSearchArticleParams,
  options?: SecondParameter<typeof orvalInstance>,
  signal?: AbortSignal,
) => {
  return orvalInstance<ArticleListAdminDto>(
    { url: `/admin/article/search`, method: 'GET', params, signal },
    options,
  );
};

export const getAdminSearchArticleQueryKey = (
  params?: AdminSearchArticleParams,
) => {
  return [`/admin/article/search`, ...(params ? [params] : [])] as const;
};

export const getAdminSearchArticleQueryOptions = <
  TData = Awaited<ReturnType<typeof adminSearchArticle>>,
  TError = unknown,
>(
  params?: AdminSearchArticleParams,
  options?: {
    query?: UseQueryOptions<
      Awaited<ReturnType<typeof adminSearchArticle>>,
      TError,
      TData
    >;
    request?: SecondParameter<typeof orvalInstance>;
  },
) => {
  const { query: queryOptions, request: requestOptions } = options ?? {};

  const queryKey =
    queryOptions?.queryKey ?? getAdminSearchArticleQueryKey(params);

  const queryFn: QueryFunction<
    Awaited<ReturnType<typeof adminSearchArticle>>
  > = ({ signal }) => adminSearchArticle(params, requestOptions, signal);

  return { queryKey, queryFn, ...queryOptions } as UseQueryOptions<
    Awaited<ReturnType<typeof adminSearchArticle>>,
    TError,
    TData
  > & { queryKey: QueryKey };
};

export type AdminSearchArticleQueryResult = NonNullable<
  Awaited<ReturnType<typeof adminSearchArticle>>
>;
export type AdminSearchArticleQueryError = unknown;

/**
 * @summary 아티클 검색 목록
 */

export function useAdminSearchArticle<
  TData = Awaited<ReturnType<typeof adminSearchArticle>>,
  TError = unknown,
>(
  params?: AdminSearchArticleParams,
  options?: {
    query?: UseQueryOptions<
      Awaited<ReturnType<typeof adminSearchArticle>>,
      TError,
      TData
    >;
    request?: SecondParameter<typeof orvalInstance>;
  },
): UseQueryResult<TData, TError> & { queryKey: QueryKey } {
  const queryOptions = getAdminSearchArticleQueryOptions(params, options);

  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
  };

  query.queryKey = queryOptions.queryKey;

  return query;
}

/**
 * @summary 아티클 조회
 */
export const adminFindOneArticle = (
  id: number,
  options?: SecondParameter<typeof orvalInstance>,
  signal?: AbortSignal,
) => {
  return orvalInstance<ArticleDto>(
    { url: `/admin/article/${id}`, method: 'GET', signal },
    options,
  );
};

export const getAdminFindOneArticleQueryKey = (id: number) => {
  return [`/admin/article/${id}`] as const;
};

export const getAdminFindOneArticleQueryOptions = <
  TData = Awaited<ReturnType<typeof adminFindOneArticle>>,
  TError = unknown,
>(
  id: number,
  options?: {
    query?: UseQueryOptions<
      Awaited<ReturnType<typeof adminFindOneArticle>>,
      TError,
      TData
    >;
    request?: SecondParameter<typeof orvalInstance>;
  },
) => {
  const { query: queryOptions, request: requestOptions } = options ?? {};

  const queryKey = queryOptions?.queryKey ?? getAdminFindOneArticleQueryKey(id);

  const queryFn: QueryFunction<
    Awaited<ReturnType<typeof adminFindOneArticle>>
  > = ({ signal }) => adminFindOneArticle(id, requestOptions, signal);

  return {
    queryKey,
    queryFn,
    enabled: !!id,
    ...queryOptions,
  } as UseQueryOptions<
    Awaited<ReturnType<typeof adminFindOneArticle>>,
    TError,
    TData
  > & { queryKey: QueryKey };
};

export type AdminFindOneArticleQueryResult = NonNullable<
  Awaited<ReturnType<typeof adminFindOneArticle>>
>;
export type AdminFindOneArticleQueryError = unknown;

/**
 * @summary 아티클 조회
 */

export function useAdminFindOneArticle<
  TData = Awaited<ReturnType<typeof adminFindOneArticle>>,
  TError = unknown,
>(
  id: number,
  options?: {
    query?: UseQueryOptions<
      Awaited<ReturnType<typeof adminFindOneArticle>>,
      TError,
      TData
    >;
    request?: SecondParameter<typeof orvalInstance>;
  },
): UseQueryResult<TData, TError> & { queryKey: QueryKey } {
  const queryOptions = getAdminFindOneArticleQueryOptions(id, options);

  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
  };

  query.queryKey = queryOptions.queryKey;

  return query;
}

/**
 * @summary 아티클 수정
 */
export const adminUpdateArticle = (
  id: number,
  articleAdminParam: ArticleAdminParam,
  options?: SecondParameter<typeof orvalInstance>,
) => {
  return orvalInstance<void>(
    {
      url: `/admin/article/${id}`,
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      data: articleAdminParam,
    },
    options,
  );
};

export const getAdminUpdateArticleMutationOptions = <
  TError = unknown,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof adminUpdateArticle>>,
    TError,
    { id: number; data: ArticleAdminParam },
    TContext
  >;
  request?: SecondParameter<typeof orvalInstance>;
}): UseMutationOptions<
  Awaited<ReturnType<typeof adminUpdateArticle>>,
  TError,
  { id: number; data: ArticleAdminParam },
  TContext
> => {
  const mutationKey = ['adminUpdateArticle'];
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation &&
      'mutationKey' in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined };

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof adminUpdateArticle>>,
    { id: number; data: ArticleAdminParam }
  > = (props) => {
    const { id, data } = props ?? {};

    return adminUpdateArticle(id, data, requestOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type AdminUpdateArticleMutationResult = NonNullable<
  Awaited<ReturnType<typeof adminUpdateArticle>>
>;
export type AdminUpdateArticleMutationBody = ArticleAdminParam;
export type AdminUpdateArticleMutationError = unknown;

/**
 * @summary 아티클 수정
 */
export const useAdminUpdateArticle = <
  TError = unknown,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof adminUpdateArticle>>,
    TError,
    { id: number; data: ArticleAdminParam },
    TContext
  >;
  request?: SecondParameter<typeof orvalInstance>;
}): UseMutationResult<
  Awaited<ReturnType<typeof adminUpdateArticle>>,
  TError,
  { id: number; data: ArticleAdminParam },
  TContext
> => {
  const mutationOptions = getAdminUpdateArticleMutationOptions(options);

  return useMutation(mutationOptions);
};
/**
 * @summary 아티클 삭제
 */
export const adminDeleteArticle = (
  id: number,
  options?: SecondParameter<typeof orvalInstance>,
) => {
  return orvalInstance<void>(
    { url: `/admin/article/${id}`, method: 'DELETE' },
    options,
  );
};

export const getAdminDeleteArticleMutationOptions = <
  TError = unknown,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof adminDeleteArticle>>,
    TError,
    { id: number },
    TContext
  >;
  request?: SecondParameter<typeof orvalInstance>;
}): UseMutationOptions<
  Awaited<ReturnType<typeof adminDeleteArticle>>,
  TError,
  { id: number },
  TContext
> => {
  const mutationKey = ['adminDeleteArticle'];
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation &&
      'mutationKey' in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined };

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof adminDeleteArticle>>,
    { id: number }
  > = (props) => {
    const { id } = props ?? {};

    return adminDeleteArticle(id, requestOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type AdminDeleteArticleMutationResult = NonNullable<
  Awaited<ReturnType<typeof adminDeleteArticle>>
>;

export type AdminDeleteArticleMutationError = unknown;

/**
 * @summary 아티클 삭제
 */
export const useAdminDeleteArticle = <
  TError = unknown,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof adminDeleteArticle>>,
    TError,
    { id: number },
    TContext
  >;
  request?: SecondParameter<typeof orvalInstance>;
}): UseMutationResult<
  Awaited<ReturnType<typeof adminDeleteArticle>>,
  TError,
  { id: number },
  TContext
> => {
  const mutationOptions = getAdminDeleteArticleMutationOptions(options);

  return useMutation(mutationOptions);
};
/**
 * @summary 아티클 등록
 */
export const adminCreateArticle = (
  articleAdminParam: ArticleAdminParam,
  options?: SecondParameter<typeof orvalInstance>,
  signal?: AbortSignal,
) => {
  return orvalInstance<ArticleDto>(
    {
      url: `/admin/article`,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: articleAdminParam,
      signal,
    },
    options,
  );
};

export const getAdminCreateArticleMutationOptions = <
  TError = unknown,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof adminCreateArticle>>,
    TError,
    { data: ArticleAdminParam },
    TContext
  >;
  request?: SecondParameter<typeof orvalInstance>;
}): UseMutationOptions<
  Awaited<ReturnType<typeof adminCreateArticle>>,
  TError,
  { data: ArticleAdminParam },
  TContext
> => {
  const mutationKey = ['adminCreateArticle'];
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation &&
      'mutationKey' in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined };

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof adminCreateArticle>>,
    { data: ArticleAdminParam }
  > = (props) => {
    const { data } = props ?? {};

    return adminCreateArticle(data, requestOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type AdminCreateArticleMutationResult = NonNullable<
  Awaited<ReturnType<typeof adminCreateArticle>>
>;
export type AdminCreateArticleMutationBody = ArticleAdminParam;
export type AdminCreateArticleMutationError = unknown;

/**
 * @summary 아티클 등록
 */
export const useAdminCreateArticle = <
  TError = unknown,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof adminCreateArticle>>,
    TError,
    { data: ArticleAdminParam },
    TContext
  >;
  request?: SecondParameter<typeof orvalInstance>;
}): UseMutationResult<
  Awaited<ReturnType<typeof adminCreateArticle>>,
  TError,
  { data: ArticleAdminParam },
  TContext
> => {
  const mutationOptions = getAdminCreateArticleMutationOptions(options);

  return useMutation(mutationOptions);
};
/**
 * @summary 아티클 일괄 삭제
 */
export const adminRemoveArticle = (
  articleRemoveAdminParam: ArticleRemoveAdminParam,
  options?: SecondParameter<typeof orvalInstance>,
  signal?: AbortSignal,
) => {
  return orvalInstance<void>(
    {
      url: `/admin/article/remove`,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: articleRemoveAdminParam,
      signal,
    },
    options,
  );
};

export const getAdminRemoveArticleMutationOptions = <
  TError = unknown,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof adminRemoveArticle>>,
    TError,
    { data: ArticleRemoveAdminParam },
    TContext
  >;
  request?: SecondParameter<typeof orvalInstance>;
}): UseMutationOptions<
  Awaited<ReturnType<typeof adminRemoveArticle>>,
  TError,
  { data: ArticleRemoveAdminParam },
  TContext
> => {
  const mutationKey = ['adminRemoveArticle'];
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation &&
      'mutationKey' in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined };

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof adminRemoveArticle>>,
    { data: ArticleRemoveAdminParam }
  > = (props) => {
    const { data } = props ?? {};

    return adminRemoveArticle(data, requestOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type AdminRemoveArticleMutationResult = NonNullable<
  Awaited<ReturnType<typeof adminRemoveArticle>>
>;
export type AdminRemoveArticleMutationBody = ArticleRemoveAdminParam;
export type AdminRemoveArticleMutationError = unknown;

/**
 * @summary 아티클 일괄 삭제
 */
export const useAdminRemoveArticle = <
  TError = unknown,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof adminRemoveArticle>>,
    TError,
    { data: ArticleRemoveAdminParam },
    TContext
  >;
  request?: SecondParameter<typeof orvalInstance>;
}): UseMutationResult<
  Awaited<ReturnType<typeof adminRemoveArticle>>,
  TError,
  { data: ArticleRemoveAdminParam },
  TContext
> => {
  const mutationOptions = getAdminRemoveArticleMutationOptions(options);

  return useMutation(mutationOptions);
};
/**
 * @summary 첨부파일 다운로드
 */
export const clientDownloadArticle = (
  id: string,
  options?: SecondParameter<typeof orvalInstance>,
  signal?: AbortSignal,
) => {
  return orvalInstance<void>(
    { url: `/client/article/download/${id}`, method: 'GET', signal },
    options,
  );
};

export const getClientDownloadArticleQueryKey = (id: string) => {
  return [`/client/article/download/${id}`] as const;
};

export const getClientDownloadArticleQueryOptions = <
  TData = Awaited<ReturnType<typeof clientDownloadArticle>>,
  TError = unknown,
>(
  id: string,
  options?: {
    query?: UseQueryOptions<
      Awaited<ReturnType<typeof clientDownloadArticle>>,
      TError,
      TData
    >;
    request?: SecondParameter<typeof orvalInstance>;
  },
) => {
  const { query: queryOptions, request: requestOptions } = options ?? {};

  const queryKey =
    queryOptions?.queryKey ?? getClientDownloadArticleQueryKey(id);

  const queryFn: QueryFunction<
    Awaited<ReturnType<typeof clientDownloadArticle>>
  > = ({ signal }) => clientDownloadArticle(id, requestOptions, signal);

  return {
    queryKey,
    queryFn,
    enabled: !!id,
    ...queryOptions,
  } as UseQueryOptions<
    Awaited<ReturnType<typeof clientDownloadArticle>>,
    TError,
    TData
  > & { queryKey: QueryKey };
};

export type ClientDownloadArticleQueryResult = NonNullable<
  Awaited<ReturnType<typeof clientDownloadArticle>>
>;
export type ClientDownloadArticleQueryError = unknown;

/**
 * @summary 첨부파일 다운로드
 */

export function useClientDownloadArticle<
  TData = Awaited<ReturnType<typeof clientDownloadArticle>>,
  TError = unknown,
>(
  id: string,
  options?: {
    query?: UseQueryOptions<
      Awaited<ReturnType<typeof clientDownloadArticle>>,
      TError,
      TData
    >;
    request?: SecondParameter<typeof orvalInstance>;
  },
): UseQueryResult<TData, TError> & { queryKey: QueryKey } {
  const queryOptions = getClientDownloadArticleQueryOptions(id, options);

  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
  };

  query.queryKey = queryOptions.queryKey;

  return query;
}

/**
 * @summary 아티클 게시판 조회
 */
export const clientFindOneBoardArticle = (
  namekey: string,
  options?: SecondParameter<typeof orvalInstance>,
  signal?: AbortSignal,
) => {
  return orvalInstance<ArticleBoardDto>(
    { url: `/client/article/board/${namekey}`, method: 'GET', signal },
    options,
  );
};

export const getClientFindOneBoardArticleQueryKey = (namekey: string) => {
  return [`/client/article/board/${namekey}`] as const;
};

export const getClientFindOneBoardArticleQueryOptions = <
  TData = Awaited<ReturnType<typeof clientFindOneBoardArticle>>,
  TError = unknown,
>(
  namekey: string,
  options?: {
    query?: UseQueryOptions<
      Awaited<ReturnType<typeof clientFindOneBoardArticle>>,
      TError,
      TData
    >;
    request?: SecondParameter<typeof orvalInstance>;
  },
) => {
  const { query: queryOptions, request: requestOptions } = options ?? {};

  const queryKey =
    queryOptions?.queryKey ?? getClientFindOneBoardArticleQueryKey(namekey);

  const queryFn: QueryFunction<
    Awaited<ReturnType<typeof clientFindOneBoardArticle>>
  > = ({ signal }) =>
    clientFindOneBoardArticle(namekey, requestOptions, signal);

  return {
    queryKey,
    queryFn,
    enabled: !!namekey,
    ...queryOptions,
  } as UseQueryOptions<
    Awaited<ReturnType<typeof clientFindOneBoardArticle>>,
    TError,
    TData
  > & { queryKey: QueryKey };
};

export type ClientFindOneBoardArticleQueryResult = NonNullable<
  Awaited<ReturnType<typeof clientFindOneBoardArticle>>
>;
export type ClientFindOneBoardArticleQueryError = unknown;

/**
 * @summary 아티클 게시판 조회
 */

export function useClientFindOneBoardArticle<
  TData = Awaited<ReturnType<typeof clientFindOneBoardArticle>>,
  TError = unknown,
>(
  namekey: string,
  options?: {
    query?: UseQueryOptions<
      Awaited<ReturnType<typeof clientFindOneBoardArticle>>,
      TError,
      TData
    >;
    request?: SecondParameter<typeof orvalInstance>;
  },
): UseQueryResult<TData, TError> & { queryKey: QueryKey } {
  const queryOptions = getClientFindOneBoardArticleQueryOptions(
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
 * @summary 아티클 조회수
 */
export const clientHitArticle = (
  articleHitClientParam: ArticleHitClientParam,
  options?: SecondParameter<typeof orvalInstance>,
  signal?: AbortSignal,
) => {
  return orvalInstance<void>(
    {
      url: `/client/article/hit`,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: articleHitClientParam,
      signal,
    },
    options,
  );
};

export const getClientHitArticleMutationOptions = <
  TError = unknown,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof clientHitArticle>>,
    TError,
    { data: ArticleHitClientParam },
    TContext
  >;
  request?: SecondParameter<typeof orvalInstance>;
}): UseMutationOptions<
  Awaited<ReturnType<typeof clientHitArticle>>,
  TError,
  { data: ArticleHitClientParam },
  TContext
> => {
  const mutationKey = ['clientHitArticle'];
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation &&
      'mutationKey' in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined };

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof clientHitArticle>>,
    { data: ArticleHitClientParam }
  > = (props) => {
    const { data } = props ?? {};

    return clientHitArticle(data, requestOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type ClientHitArticleMutationResult = NonNullable<
  Awaited<ReturnType<typeof clientHitArticle>>
>;
export type ClientHitArticleMutationBody = ArticleHitClientParam;
export type ClientHitArticleMutationError = unknown;

/**
 * @summary 아티클 조회수
 */
export const useClientHitArticle = <
  TError = unknown,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof clientHitArticle>>,
    TError,
    { data: ArticleHitClientParam },
    TContext
  >;
  request?: SecondParameter<typeof orvalInstance>;
}): UseMutationResult<
  Awaited<ReturnType<typeof clientHitArticle>>,
  TError,
  { data: ArticleHitClientParam },
  TContext
> => {
  const mutationOptions = getClientHitArticleMutationOptions(options);

  return useMutation(mutationOptions);
};
/**
 * @summary 아티클 검색 목록
 */
export const clientSearchArticle = (
  params: ClientSearchArticleParams,
  options?: SecondParameter<typeof orvalInstance>,
  signal?: AbortSignal,
) => {
  return orvalInstance<ArticleListClientDto>(
    { url: `/client/article/search`, method: 'GET', params, signal },
    options,
  );
};

export const getClientSearchArticleQueryKey = (
  params: ClientSearchArticleParams,
) => {
  return [`/client/article/search`, ...(params ? [params] : [])] as const;
};

export const getClientSearchArticleQueryOptions = <
  TData = Awaited<ReturnType<typeof clientSearchArticle>>,
  TError = unknown,
>(
  params: ClientSearchArticleParams,
  options?: {
    query?: UseQueryOptions<
      Awaited<ReturnType<typeof clientSearchArticle>>,
      TError,
      TData
    >;
    request?: SecondParameter<typeof orvalInstance>;
  },
) => {
  const { query: queryOptions, request: requestOptions } = options ?? {};

  const queryKey =
    queryOptions?.queryKey ?? getClientSearchArticleQueryKey(params);

  const queryFn: QueryFunction<
    Awaited<ReturnType<typeof clientSearchArticle>>
  > = ({ signal }) => clientSearchArticle(params, requestOptions, signal);

  return { queryKey, queryFn, ...queryOptions } as UseQueryOptions<
    Awaited<ReturnType<typeof clientSearchArticle>>,
    TError,
    TData
  > & { queryKey: QueryKey };
};

export type ClientSearchArticleQueryResult = NonNullable<
  Awaited<ReturnType<typeof clientSearchArticle>>
>;
export type ClientSearchArticleQueryError = unknown;

/**
 * @summary 아티클 검색 목록
 */

export function useClientSearchArticle<
  TData = Awaited<ReturnType<typeof clientSearchArticle>>,
  TError = unknown,
>(
  params: ClientSearchArticleParams,
  options?: {
    query?: UseQueryOptions<
      Awaited<ReturnType<typeof clientSearchArticle>>,
      TError,
      TData
    >;
    request?: SecondParameter<typeof orvalInstance>;
  },
): UseQueryResult<TData, TError> & { queryKey: QueryKey } {
  const queryOptions = getClientSearchArticleQueryOptions(params, options);

  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
  };

  query.queryKey = queryOptions.queryKey;

  return query;
}

/**
 * @summary 아티클 조회
 */
export const clientFindOneArticle = (
  id: number,
  options?: SecondParameter<typeof orvalInstance>,
  signal?: AbortSignal,
) => {
  return orvalInstance<ArticleDto>(
    { url: `/client/article/${id}`, method: 'GET', signal },
    options,
  );
};

export const getClientFindOneArticleQueryKey = (id: number) => {
  return [`/client/article/${id}`] as const;
};

export const getClientFindOneArticleQueryOptions = <
  TData = Awaited<ReturnType<typeof clientFindOneArticle>>,
  TError = unknown,
>(
  id: number,
  options?: {
    query?: UseQueryOptions<
      Awaited<ReturnType<typeof clientFindOneArticle>>,
      TError,
      TData
    >;
    request?: SecondParameter<typeof orvalInstance>;
  },
) => {
  const { query: queryOptions, request: requestOptions } = options ?? {};

  const queryKey =
    queryOptions?.queryKey ?? getClientFindOneArticleQueryKey(id);

  const queryFn: QueryFunction<
    Awaited<ReturnType<typeof clientFindOneArticle>>
  > = ({ signal }) => clientFindOneArticle(id, requestOptions, signal);

  return {
    queryKey,
    queryFn,
    enabled: !!id,
    ...queryOptions,
  } as UseQueryOptions<
    Awaited<ReturnType<typeof clientFindOneArticle>>,
    TError,
    TData
  > & { queryKey: QueryKey };
};

export type ClientFindOneArticleQueryResult = NonNullable<
  Awaited<ReturnType<typeof clientFindOneArticle>>
>;
export type ClientFindOneArticleQueryError = unknown;

/**
 * @summary 아티클 조회
 */

export function useClientFindOneArticle<
  TData = Awaited<ReturnType<typeof clientFindOneArticle>>,
  TError = unknown,
>(
  id: number,
  options?: {
    query?: UseQueryOptions<
      Awaited<ReturnType<typeof clientFindOneArticle>>,
      TError,
      TData
    >;
    request?: SecondParameter<typeof orvalInstance>;
  },
): UseQueryResult<TData, TError> & { queryKey: QueryKey } {
  const queryOptions = getClientFindOneArticleQueryOptions(id, options);

  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
  };

  query.queryKey = queryOptions.queryKey;

  return query;
}

/**
 * @summary 아티클 전체 조회
 */
export const clientListArticle = (
  params?: ClientListArticleParams,
  options?: SecondParameter<typeof orvalInstance>,
  signal?: AbortSignal,
) => {
  return orvalInstance<ArticleDto[]>(
    { url: `/client/article/list`, method: 'GET', params, signal },
    options,
  );
};

export const getClientListArticleQueryKey = (
  params?: ClientListArticleParams,
) => {
  return [`/client/article/list`, ...(params ? [params] : [])] as const;
};

export const getClientListArticleQueryOptions = <
  TData = Awaited<ReturnType<typeof clientListArticle>>,
  TError = unknown,
>(
  params?: ClientListArticleParams,
  options?: {
    query?: UseQueryOptions<
      Awaited<ReturnType<typeof clientListArticle>>,
      TError,
      TData
    >;
    request?: SecondParameter<typeof orvalInstance>;
  },
) => {
  const { query: queryOptions, request: requestOptions } = options ?? {};

  const queryKey =
    queryOptions?.queryKey ?? getClientListArticleQueryKey(params);

  const queryFn: QueryFunction<
    Awaited<ReturnType<typeof clientListArticle>>
  > = ({ signal }) => clientListArticle(params, requestOptions, signal);

  return { queryKey, queryFn, ...queryOptions } as UseQueryOptions<
    Awaited<ReturnType<typeof clientListArticle>>,
    TError,
    TData
  > & { queryKey: QueryKey };
};

export type ClientListArticleQueryResult = NonNullable<
  Awaited<ReturnType<typeof clientListArticle>>
>;
export type ClientListArticleQueryError = unknown;

/**
 * @summary 아티클 전체 조회
 */

export function useClientListArticle<
  TData = Awaited<ReturnType<typeof clientListArticle>>,
  TError = unknown,
>(
  params?: ClientListArticleParams,
  options?: {
    query?: UseQueryOptions<
      Awaited<ReturnType<typeof clientListArticle>>,
      TError,
      TData
    >;
    request?: SecondParameter<typeof orvalInstance>;
  },
): UseQueryResult<TData, TError> & { queryKey: QueryKey } {
  const queryOptions = getClientListArticleQueryOptions(params, options);

  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
  };

  query.queryKey = queryOptions.queryKey;

  return query;
}
