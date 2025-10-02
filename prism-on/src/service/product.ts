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
  AdminFindAllCategoryProductParams,
  AdminSearchProductParams,
  ClientSearchProductParams,
  ProductAdminParam,
  ProductCategoryAdminParam,
  ProductCategoryDto,
  ProductCategorySortAdminParam,
  ProductDto,
  ProductListAdminDto,
  ProductListClientDto,
  ProductRemoveAdminParam,
  ResourceDto,
  ResourceParam,
} from './model';

type AwaitedInput<T> = PromiseLike<T> | T;

type Awaited<O> = O extends AwaitedInput<infer T> ? T : never;

type SecondParameter<T extends (...args: never) => unknown> = Parameters<T>[1];

/**
 * @summary 이미지 업로드
 */
export const adminResourceProduct = (
  resourceParam: ResourceParam,
  options?: SecondParameter<typeof orvalInstance>,
  signal?: AbortSignal,
) => {
  const formData = new FormData();
  formData.append(`file`, resourceParam.file);

  return orvalInstance<ResourceDto>(
    {
      url: `/admin/product/resource`,
      method: 'POST',
      headers: { 'Content-Type': 'multipart/form-data' },
      data: formData,
      signal,
    },
    options,
  );
};

export const getAdminResourceProductMutationOptions = <
  TError = unknown,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof adminResourceProduct>>,
    TError,
    { data: ResourceParam },
    TContext
  >;
  request?: SecondParameter<typeof orvalInstance>;
}): UseMutationOptions<
  Awaited<ReturnType<typeof adminResourceProduct>>,
  TError,
  { data: ResourceParam },
  TContext
> => {
  const mutationKey = ['adminResourceProduct'];
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation &&
      'mutationKey' in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined };

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof adminResourceProduct>>,
    { data: ResourceParam }
  > = (props) => {
    const { data } = props ?? {};

    return adminResourceProduct(data, requestOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type AdminResourceProductMutationResult = NonNullable<
  Awaited<ReturnType<typeof adminResourceProduct>>
>;
export type AdminResourceProductMutationBody = ResourceParam;
export type AdminResourceProductMutationError = unknown;

/**
 * @summary 이미지 업로드
 */
export const useAdminResourceProduct = <
  TError = unknown,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof adminResourceProduct>>,
    TError,
    { data: ResourceParam },
    TContext
  >;
  request?: SecondParameter<typeof orvalInstance>;
}): UseMutationResult<
  Awaited<ReturnType<typeof adminResourceProduct>>,
  TError,
  { data: ResourceParam },
  TContext
> => {
  const mutationOptions = getAdminResourceProductMutationOptions(options);

  return useMutation(mutationOptions);
};
/**
 * @summary 제품 검색 목록
 */
export const adminSearchProduct = (
  params?: AdminSearchProductParams,
  options?: SecondParameter<typeof orvalInstance>,
  signal?: AbortSignal,
) => {
  return orvalInstance<ProductListAdminDto>(
    { url: `/admin/product/search`, method: 'GET', params, signal },
    options,
  );
};

export const getAdminSearchProductQueryKey = (
  params?: AdminSearchProductParams,
) => {
  return [`/admin/product/search`, ...(params ? [params] : [])] as const;
};

export const getAdminSearchProductQueryOptions = <
  TData = Awaited<ReturnType<typeof adminSearchProduct>>,
  TError = unknown,
>(
  params?: AdminSearchProductParams,
  options?: {
    query?: UseQueryOptions<
      Awaited<ReturnType<typeof adminSearchProduct>>,
      TError,
      TData
    >;
    request?: SecondParameter<typeof orvalInstance>;
  },
) => {
  const { query: queryOptions, request: requestOptions } = options ?? {};

  const queryKey =
    queryOptions?.queryKey ?? getAdminSearchProductQueryKey(params);

  const queryFn: QueryFunction<
    Awaited<ReturnType<typeof adminSearchProduct>>
  > = ({ signal }) => adminSearchProduct(params, requestOptions, signal);

  return { queryKey, queryFn, ...queryOptions } as UseQueryOptions<
    Awaited<ReturnType<typeof adminSearchProduct>>,
    TError,
    TData
  > & { queryKey: QueryKey };
};

export type AdminSearchProductQueryResult = NonNullable<
  Awaited<ReturnType<typeof adminSearchProduct>>
>;
export type AdminSearchProductQueryError = unknown;

/**
 * @summary 제품 검색 목록
 */

export function useAdminSearchProduct<
  TData = Awaited<ReturnType<typeof adminSearchProduct>>,
  TError = unknown,
>(
  params?: AdminSearchProductParams,
  options?: {
    query?: UseQueryOptions<
      Awaited<ReturnType<typeof adminSearchProduct>>,
      TError,
      TData
    >;
    request?: SecondParameter<typeof orvalInstance>;
  },
): UseQueryResult<TData, TError> & { queryKey: QueryKey } {
  const queryOptions = getAdminSearchProductQueryOptions(params, options);

  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
  };

  query.queryKey = queryOptions.queryKey;

  return query;
}

/**
 * @summary 제품 전체 목록
 */
export const adminFindAllProduct = (
  options?: SecondParameter<typeof orvalInstance>,
  signal?: AbortSignal,
) => {
  return orvalInstance<ProductDto[]>(
    { url: `/admin/product`, method: 'GET', signal },
    options,
  );
};

export const getAdminFindAllProductQueryKey = () => {
  return [`/admin/product`] as const;
};

export const getAdminFindAllProductQueryOptions = <
  TData = Awaited<ReturnType<typeof adminFindAllProduct>>,
  TError = unknown,
>(options?: {
  query?: UseQueryOptions<
    Awaited<ReturnType<typeof adminFindAllProduct>>,
    TError,
    TData
  >;
  request?: SecondParameter<typeof orvalInstance>;
}) => {
  const { query: queryOptions, request: requestOptions } = options ?? {};

  const queryKey = queryOptions?.queryKey ?? getAdminFindAllProductQueryKey();

  const queryFn: QueryFunction<
    Awaited<ReturnType<typeof adminFindAllProduct>>
  > = ({ signal }) => adminFindAllProduct(requestOptions, signal);

  return { queryKey, queryFn, ...queryOptions } as UseQueryOptions<
    Awaited<ReturnType<typeof adminFindAllProduct>>,
    TError,
    TData
  > & { queryKey: QueryKey };
};

export type AdminFindAllProductQueryResult = NonNullable<
  Awaited<ReturnType<typeof adminFindAllProduct>>
>;
export type AdminFindAllProductQueryError = unknown;

/**
 * @summary 제품 전체 목록
 */

export function useAdminFindAllProduct<
  TData = Awaited<ReturnType<typeof adminFindAllProduct>>,
  TError = unknown,
>(options?: {
  query?: UseQueryOptions<
    Awaited<ReturnType<typeof adminFindAllProduct>>,
    TError,
    TData
  >;
  request?: SecondParameter<typeof orvalInstance>;
}): UseQueryResult<TData, TError> & { queryKey: QueryKey } {
  const queryOptions = getAdminFindAllProductQueryOptions(options);

  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
  };

  query.queryKey = queryOptions.queryKey;

  return query;
}

/**
 * @summary 제품 등록
 */
export const adminCreateProduct = (
  productAdminParam: ProductAdminParam,
  options?: SecondParameter<typeof orvalInstance>,
  signal?: AbortSignal,
) => {
  return orvalInstance<ProductDto>(
    {
      url: `/admin/product`,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: productAdminParam,
      signal,
    },
    options,
  );
};

export const getAdminCreateProductMutationOptions = <
  TError = unknown,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof adminCreateProduct>>,
    TError,
    { data: ProductAdminParam },
    TContext
  >;
  request?: SecondParameter<typeof orvalInstance>;
}): UseMutationOptions<
  Awaited<ReturnType<typeof adminCreateProduct>>,
  TError,
  { data: ProductAdminParam },
  TContext
> => {
  const mutationKey = ['adminCreateProduct'];
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation &&
      'mutationKey' in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined };

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof adminCreateProduct>>,
    { data: ProductAdminParam }
  > = (props) => {
    const { data } = props ?? {};

    return adminCreateProduct(data, requestOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type AdminCreateProductMutationResult = NonNullable<
  Awaited<ReturnType<typeof adminCreateProduct>>
>;
export type AdminCreateProductMutationBody = ProductAdminParam;
export type AdminCreateProductMutationError = unknown;

/**
 * @summary 제품 등록
 */
export const useAdminCreateProduct = <
  TError = unknown,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof adminCreateProduct>>,
    TError,
    { data: ProductAdminParam },
    TContext
  >;
  request?: SecondParameter<typeof orvalInstance>;
}): UseMutationResult<
  Awaited<ReturnType<typeof adminCreateProduct>>,
  TError,
  { data: ProductAdminParam },
  TContext
> => {
  const mutationOptions = getAdminCreateProductMutationOptions(options);

  return useMutation(mutationOptions);
};
/**
 * @summary 제품 조회
 */
export const adminFindOneProduct = (
  id: number,
  options?: SecondParameter<typeof orvalInstance>,
  signal?: AbortSignal,
) => {
  return orvalInstance<ProductDto>(
    { url: `/admin/product/${id}`, method: 'GET', signal },
    options,
  );
};

export const getAdminFindOneProductQueryKey = (id: number) => {
  return [`/admin/product/${id}`] as const;
};

export const getAdminFindOneProductQueryOptions = <
  TData = Awaited<ReturnType<typeof adminFindOneProduct>>,
  TError = unknown,
>(
  id: number,
  options?: {
    query?: UseQueryOptions<
      Awaited<ReturnType<typeof adminFindOneProduct>>,
      TError,
      TData
    >;
    request?: SecondParameter<typeof orvalInstance>;
  },
) => {
  const { query: queryOptions, request: requestOptions } = options ?? {};

  const queryKey = queryOptions?.queryKey ?? getAdminFindOneProductQueryKey(id);

  const queryFn: QueryFunction<
    Awaited<ReturnType<typeof adminFindOneProduct>>
  > = ({ signal }) => adminFindOneProduct(id, requestOptions, signal);

  return {
    queryKey,
    queryFn,
    enabled: !!id,
    ...queryOptions,
  } as UseQueryOptions<
    Awaited<ReturnType<typeof adminFindOneProduct>>,
    TError,
    TData
  > & { queryKey: QueryKey };
};

export type AdminFindOneProductQueryResult = NonNullable<
  Awaited<ReturnType<typeof adminFindOneProduct>>
>;
export type AdminFindOneProductQueryError = unknown;

/**
 * @summary 제품 조회
 */

export function useAdminFindOneProduct<
  TData = Awaited<ReturnType<typeof adminFindOneProduct>>,
  TError = unknown,
>(
  id: number,
  options?: {
    query?: UseQueryOptions<
      Awaited<ReturnType<typeof adminFindOneProduct>>,
      TError,
      TData
    >;
    request?: SecondParameter<typeof orvalInstance>;
  },
): UseQueryResult<TData, TError> & { queryKey: QueryKey } {
  const queryOptions = getAdminFindOneProductQueryOptions(id, options);

  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
  };

  query.queryKey = queryOptions.queryKey;

  return query;
}

/**
 * @summary 제품 수정
 */
export const adminUpdateProduct = (
  id: number,
  productAdminParam: ProductAdminParam,
  options?: SecondParameter<typeof orvalInstance>,
) => {
  return orvalInstance<void>(
    {
      url: `/admin/product/${id}`,
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      data: productAdminParam,
    },
    options,
  );
};

export const getAdminUpdateProductMutationOptions = <
  TError = unknown,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof adminUpdateProduct>>,
    TError,
    { id: number; data: ProductAdminParam },
    TContext
  >;
  request?: SecondParameter<typeof orvalInstance>;
}): UseMutationOptions<
  Awaited<ReturnType<typeof adminUpdateProduct>>,
  TError,
  { id: number; data: ProductAdminParam },
  TContext
> => {
  const mutationKey = ['adminUpdateProduct'];
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation &&
      'mutationKey' in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined };

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof adminUpdateProduct>>,
    { id: number; data: ProductAdminParam }
  > = (props) => {
    const { id, data } = props ?? {};

    return adminUpdateProduct(id, data, requestOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type AdminUpdateProductMutationResult = NonNullable<
  Awaited<ReturnType<typeof adminUpdateProduct>>
>;
export type AdminUpdateProductMutationBody = ProductAdminParam;
export type AdminUpdateProductMutationError = unknown;

/**
 * @summary 제품 수정
 */
export const useAdminUpdateProduct = <
  TError = unknown,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof adminUpdateProduct>>,
    TError,
    { id: number; data: ProductAdminParam },
    TContext
  >;
  request?: SecondParameter<typeof orvalInstance>;
}): UseMutationResult<
  Awaited<ReturnType<typeof adminUpdateProduct>>,
  TError,
  { id: number; data: ProductAdminParam },
  TContext
> => {
  const mutationOptions = getAdminUpdateProductMutationOptions(options);

  return useMutation(mutationOptions);
};
/**
 * @summary 제품 삭제
 */
export const adminDeleteProduct = (
  id: number,
  options?: SecondParameter<typeof orvalInstance>,
) => {
  return orvalInstance<void>(
    { url: `/admin/product/${id}`, method: 'DELETE' },
    options,
  );
};

export const getAdminDeleteProductMutationOptions = <
  TError = unknown,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof adminDeleteProduct>>,
    TError,
    { id: number },
    TContext
  >;
  request?: SecondParameter<typeof orvalInstance>;
}): UseMutationOptions<
  Awaited<ReturnType<typeof adminDeleteProduct>>,
  TError,
  { id: number },
  TContext
> => {
  const mutationKey = ['adminDeleteProduct'];
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation &&
      'mutationKey' in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined };

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof adminDeleteProduct>>,
    { id: number }
  > = (props) => {
    const { id } = props ?? {};

    return adminDeleteProduct(id, requestOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type AdminDeleteProductMutationResult = NonNullable<
  Awaited<ReturnType<typeof adminDeleteProduct>>
>;

export type AdminDeleteProductMutationError = unknown;

/**
 * @summary 제품 삭제
 */
export const useAdminDeleteProduct = <
  TError = unknown,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof adminDeleteProduct>>,
    TError,
    { id: number },
    TContext
  >;
  request?: SecondParameter<typeof orvalInstance>;
}): UseMutationResult<
  Awaited<ReturnType<typeof adminDeleteProduct>>,
  TError,
  { id: number },
  TContext
> => {
  const mutationOptions = getAdminDeleteProductMutationOptions(options);

  return useMutation(mutationOptions);
};
/**
 * @summary 제품 일괄 삭제
 */
export const adminRemoveProduct = (
  productRemoveAdminParam: ProductRemoveAdminParam,
  options?: SecondParameter<typeof orvalInstance>,
  signal?: AbortSignal,
) => {
  return orvalInstance<void>(
    {
      url: `/admin/product/remove`,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: productRemoveAdminParam,
      signal,
    },
    options,
  );
};

export const getAdminRemoveProductMutationOptions = <
  TError = unknown,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof adminRemoveProduct>>,
    TError,
    { data: ProductRemoveAdminParam },
    TContext
  >;
  request?: SecondParameter<typeof orvalInstance>;
}): UseMutationOptions<
  Awaited<ReturnType<typeof adminRemoveProduct>>,
  TError,
  { data: ProductRemoveAdminParam },
  TContext
> => {
  const mutationKey = ['adminRemoveProduct'];
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation &&
      'mutationKey' in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined };

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof adminRemoveProduct>>,
    { data: ProductRemoveAdminParam }
  > = (props) => {
    const { data } = props ?? {};

    return adminRemoveProduct(data, requestOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type AdminRemoveProductMutationResult = NonNullable<
  Awaited<ReturnType<typeof adminRemoveProduct>>
>;
export type AdminRemoveProductMutationBody = ProductRemoveAdminParam;
export type AdminRemoveProductMutationError = unknown;

/**
 * @summary 제품 일괄 삭제
 */
export const useAdminRemoveProduct = <
  TError = unknown,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof adminRemoveProduct>>,
    TError,
    { data: ProductRemoveAdminParam },
    TContext
  >;
  request?: SecondParameter<typeof orvalInstance>;
}): UseMutationResult<
  Awaited<ReturnType<typeof adminRemoveProduct>>,
  TError,
  { data: ProductRemoveAdminParam },
  TContext
> => {
  const mutationOptions = getAdminRemoveProductMutationOptions(options);

  return useMutation(mutationOptions);
};
/**
 * @summary 카테고리 부모 목록
 */
export const adminLabelCategoryProduct = (
  id: number,
  options?: SecondParameter<typeof orvalInstance>,
  signal?: AbortSignal,
) => {
  return orvalInstance<ProductCategoryDto[]>(
    { url: `/admin/product/category/label/${id}`, method: 'GET', signal },
    options,
  );
};

export const getAdminLabelCategoryProductQueryKey = (id: number) => {
  return [`/admin/product/category/label/${id}`] as const;
};

export const getAdminLabelCategoryProductQueryOptions = <
  TData = Awaited<ReturnType<typeof adminLabelCategoryProduct>>,
  TError = unknown,
>(
  id: number,
  options?: {
    query?: UseQueryOptions<
      Awaited<ReturnType<typeof adminLabelCategoryProduct>>,
      TError,
      TData
    >;
    request?: SecondParameter<typeof orvalInstance>;
  },
) => {
  const { query: queryOptions, request: requestOptions } = options ?? {};

  const queryKey =
    queryOptions?.queryKey ?? getAdminLabelCategoryProductQueryKey(id);

  const queryFn: QueryFunction<
    Awaited<ReturnType<typeof adminLabelCategoryProduct>>
  > = ({ signal }) => adminLabelCategoryProduct(id, requestOptions, signal);

  return {
    queryKey,
    queryFn,
    enabled: !!id,
    ...queryOptions,
  } as UseQueryOptions<
    Awaited<ReturnType<typeof adminLabelCategoryProduct>>,
    TError,
    TData
  > & { queryKey: QueryKey };
};

export type AdminLabelCategoryProductQueryResult = NonNullable<
  Awaited<ReturnType<typeof adminLabelCategoryProduct>>
>;
export type AdminLabelCategoryProductQueryError = unknown;

/**
 * @summary 카테고리 부모 목록
 */

export function useAdminLabelCategoryProduct<
  TData = Awaited<ReturnType<typeof adminLabelCategoryProduct>>,
  TError = unknown,
>(
  id: number,
  options?: {
    query?: UseQueryOptions<
      Awaited<ReturnType<typeof adminLabelCategoryProduct>>,
      TError,
      TData
    >;
    request?: SecondParameter<typeof orvalInstance>;
  },
): UseQueryResult<TData, TError> & { queryKey: QueryKey } {
  const queryOptions = getAdminLabelCategoryProductQueryOptions(id, options);

  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
  };

  query.queryKey = queryOptions.queryKey;

  return query;
}

/**
 * @summary 카테고리 부모 목록
 */
export const adminParentCategoryProduct = (
  options?: SecondParameter<typeof orvalInstance>,
  signal?: AbortSignal,
) => {
  return orvalInstance<ProductCategoryDto[]>(
    { url: `/admin/product/category/parent`, method: 'GET', signal },
    options,
  );
};

export const getAdminParentCategoryProductQueryKey = () => {
  return [`/admin/product/category/parent`] as const;
};

export const getAdminParentCategoryProductQueryOptions = <
  TData = Awaited<ReturnType<typeof adminParentCategoryProduct>>,
  TError = unknown,
>(options?: {
  query?: UseQueryOptions<
    Awaited<ReturnType<typeof adminParentCategoryProduct>>,
    TError,
    TData
  >;
  request?: SecondParameter<typeof orvalInstance>;
}) => {
  const { query: queryOptions, request: requestOptions } = options ?? {};

  const queryKey =
    queryOptions?.queryKey ?? getAdminParentCategoryProductQueryKey();

  const queryFn: QueryFunction<
    Awaited<ReturnType<typeof adminParentCategoryProduct>>
  > = ({ signal }) => adminParentCategoryProduct(requestOptions, signal);

  return { queryKey, queryFn, ...queryOptions } as UseQueryOptions<
    Awaited<ReturnType<typeof adminParentCategoryProduct>>,
    TError,
    TData
  > & { queryKey: QueryKey };
};

export type AdminParentCategoryProductQueryResult = NonNullable<
  Awaited<ReturnType<typeof adminParentCategoryProduct>>
>;
export type AdminParentCategoryProductQueryError = unknown;

/**
 * @summary 카테고리 부모 목록
 */

export function useAdminParentCategoryProduct<
  TData = Awaited<ReturnType<typeof adminParentCategoryProduct>>,
  TError = unknown,
>(options?: {
  query?: UseQueryOptions<
    Awaited<ReturnType<typeof adminParentCategoryProduct>>,
    TError,
    TData
  >;
  request?: SecondParameter<typeof orvalInstance>;
}): UseQueryResult<TData, TError> & { queryKey: QueryKey } {
  const queryOptions = getAdminParentCategoryProductQueryOptions(options);

  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
  };

  query.queryKey = queryOptions.queryKey;

  return query;
}

/**
 * @summary 카테고리 조회
 */
export const adminFindOneCategoryProduct = (
  id: number,
  options?: SecondParameter<typeof orvalInstance>,
  signal?: AbortSignal,
) => {
  return orvalInstance<ProductCategoryDto>(
    { url: `/admin/product/category/${id}`, method: 'GET', signal },
    options,
  );
};

export const getAdminFindOneCategoryProductQueryKey = (id: number) => {
  return [`/admin/product/category/${id}`] as const;
};

export const getAdminFindOneCategoryProductQueryOptions = <
  TData = Awaited<ReturnType<typeof adminFindOneCategoryProduct>>,
  TError = unknown,
>(
  id: number,
  options?: {
    query?: UseQueryOptions<
      Awaited<ReturnType<typeof adminFindOneCategoryProduct>>,
      TError,
      TData
    >;
    request?: SecondParameter<typeof orvalInstance>;
  },
) => {
  const { query: queryOptions, request: requestOptions } = options ?? {};

  const queryKey =
    queryOptions?.queryKey ?? getAdminFindOneCategoryProductQueryKey(id);

  const queryFn: QueryFunction<
    Awaited<ReturnType<typeof adminFindOneCategoryProduct>>
  > = ({ signal }) => adminFindOneCategoryProduct(id, requestOptions, signal);

  return {
    queryKey,
    queryFn,
    enabled: !!id,
    ...queryOptions,
  } as UseQueryOptions<
    Awaited<ReturnType<typeof adminFindOneCategoryProduct>>,
    TError,
    TData
  > & { queryKey: QueryKey };
};

export type AdminFindOneCategoryProductQueryResult = NonNullable<
  Awaited<ReturnType<typeof adminFindOneCategoryProduct>>
>;
export type AdminFindOneCategoryProductQueryError = unknown;

/**
 * @summary 카테고리 조회
 */

export function useAdminFindOneCategoryProduct<
  TData = Awaited<ReturnType<typeof adminFindOneCategoryProduct>>,
  TError = unknown,
>(
  id: number,
  options?: {
    query?: UseQueryOptions<
      Awaited<ReturnType<typeof adminFindOneCategoryProduct>>,
      TError,
      TData
    >;
    request?: SecondParameter<typeof orvalInstance>;
  },
): UseQueryResult<TData, TError> & { queryKey: QueryKey } {
  const queryOptions = getAdminFindOneCategoryProductQueryOptions(id, options);

  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
  };

  query.queryKey = queryOptions.queryKey;

  return query;
}

/**
 * @summary 카테고리 수정
 */
export const adminUpdateCategoryProduct = (
  id: number,
  productCategoryAdminParam: ProductCategoryAdminParam,
  options?: SecondParameter<typeof orvalInstance>,
) => {
  return orvalInstance<void>(
    {
      url: `/admin/product/category/${id}`,
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      data: productCategoryAdminParam,
    },
    options,
  );
};

export const getAdminUpdateCategoryProductMutationOptions = <
  TError = unknown,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof adminUpdateCategoryProduct>>,
    TError,
    { id: number; data: ProductCategoryAdminParam },
    TContext
  >;
  request?: SecondParameter<typeof orvalInstance>;
}): UseMutationOptions<
  Awaited<ReturnType<typeof adminUpdateCategoryProduct>>,
  TError,
  { id: number; data: ProductCategoryAdminParam },
  TContext
> => {
  const mutationKey = ['adminUpdateCategoryProduct'];
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation &&
      'mutationKey' in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined };

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof adminUpdateCategoryProduct>>,
    { id: number; data: ProductCategoryAdminParam }
  > = (props) => {
    const { id, data } = props ?? {};

    return adminUpdateCategoryProduct(id, data, requestOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type AdminUpdateCategoryProductMutationResult = NonNullable<
  Awaited<ReturnType<typeof adminUpdateCategoryProduct>>
>;
export type AdminUpdateCategoryProductMutationBody = ProductCategoryAdminParam;
export type AdminUpdateCategoryProductMutationError = unknown;

/**
 * @summary 카테고리 수정
 */
export const useAdminUpdateCategoryProduct = <
  TError = unknown,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof adminUpdateCategoryProduct>>,
    TError,
    { id: number; data: ProductCategoryAdminParam },
    TContext
  >;
  request?: SecondParameter<typeof orvalInstance>;
}): UseMutationResult<
  Awaited<ReturnType<typeof adminUpdateCategoryProduct>>,
  TError,
  { id: number; data: ProductCategoryAdminParam },
  TContext
> => {
  const mutationOptions = getAdminUpdateCategoryProductMutationOptions(options);

  return useMutation(mutationOptions);
};
/**
 * @summary 카테고리 삭제
 */
export const adminDeleteCategoryProduct = (
  id: number,
  options?: SecondParameter<typeof orvalInstance>,
) => {
  return orvalInstance<void>(
    { url: `/admin/product/category/${id}`, method: 'DELETE' },
    options,
  );
};

export const getAdminDeleteCategoryProductMutationOptions = <
  TError = unknown,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof adminDeleteCategoryProduct>>,
    TError,
    { id: number },
    TContext
  >;
  request?: SecondParameter<typeof orvalInstance>;
}): UseMutationOptions<
  Awaited<ReturnType<typeof adminDeleteCategoryProduct>>,
  TError,
  { id: number },
  TContext
> => {
  const mutationKey = ['adminDeleteCategoryProduct'];
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation &&
      'mutationKey' in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined };

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof adminDeleteCategoryProduct>>,
    { id: number }
  > = (props) => {
    const { id } = props ?? {};

    return adminDeleteCategoryProduct(id, requestOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type AdminDeleteCategoryProductMutationResult = NonNullable<
  Awaited<ReturnType<typeof adminDeleteCategoryProduct>>
>;

export type AdminDeleteCategoryProductMutationError = unknown;

/**
 * @summary 카테고리 삭제
 */
export const useAdminDeleteCategoryProduct = <
  TError = unknown,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof adminDeleteCategoryProduct>>,
    TError,
    { id: number },
    TContext
  >;
  request?: SecondParameter<typeof orvalInstance>;
}): UseMutationResult<
  Awaited<ReturnType<typeof adminDeleteCategoryProduct>>,
  TError,
  { id: number },
  TContext
> => {
  const mutationOptions = getAdminDeleteCategoryProductMutationOptions(options);

  return useMutation(mutationOptions);
};
/**
 * @summary 카테고리 전체 목록
 */
export const adminFindAllCategoryProduct = (
  params?: AdminFindAllCategoryProductParams,
  options?: SecondParameter<typeof orvalInstance>,
  signal?: AbortSignal,
) => {
  return orvalInstance<ProductCategoryDto[]>(
    { url: `/admin/product/category`, method: 'GET', params, signal },
    options,
  );
};

export const getAdminFindAllCategoryProductQueryKey = (
  params?: AdminFindAllCategoryProductParams,
) => {
  return [`/admin/product/category`, ...(params ? [params] : [])] as const;
};

export const getAdminFindAllCategoryProductQueryOptions = <
  TData = Awaited<ReturnType<typeof adminFindAllCategoryProduct>>,
  TError = unknown,
>(
  params?: AdminFindAllCategoryProductParams,
  options?: {
    query?: UseQueryOptions<
      Awaited<ReturnType<typeof adminFindAllCategoryProduct>>,
      TError,
      TData
    >;
    request?: SecondParameter<typeof orvalInstance>;
  },
) => {
  const { query: queryOptions, request: requestOptions } = options ?? {};

  const queryKey =
    queryOptions?.queryKey ?? getAdminFindAllCategoryProductQueryKey(params);

  const queryFn: QueryFunction<
    Awaited<ReturnType<typeof adminFindAllCategoryProduct>>
  > = ({ signal }) =>
    adminFindAllCategoryProduct(params, requestOptions, signal);

  return { queryKey, queryFn, ...queryOptions } as UseQueryOptions<
    Awaited<ReturnType<typeof adminFindAllCategoryProduct>>,
    TError,
    TData
  > & { queryKey: QueryKey };
};

export type AdminFindAllCategoryProductQueryResult = NonNullable<
  Awaited<ReturnType<typeof adminFindAllCategoryProduct>>
>;
export type AdminFindAllCategoryProductQueryError = unknown;

/**
 * @summary 카테고리 전체 목록
 */

export function useAdminFindAllCategoryProduct<
  TData = Awaited<ReturnType<typeof adminFindAllCategoryProduct>>,
  TError = unknown,
>(
  params?: AdminFindAllCategoryProductParams,
  options?: {
    query?: UseQueryOptions<
      Awaited<ReturnType<typeof adminFindAllCategoryProduct>>,
      TError,
      TData
    >;
    request?: SecondParameter<typeof orvalInstance>;
  },
): UseQueryResult<TData, TError> & { queryKey: QueryKey } {
  const queryOptions = getAdminFindAllCategoryProductQueryOptions(
    params,
    options,
  );

  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
  };

  query.queryKey = queryOptions.queryKey;

  return query;
}

/**
 * @summary 카테고리 등록
 */
export const adminCreateCategoryProduct = (
  productCategoryAdminParam: ProductCategoryAdminParam,
  options?: SecondParameter<typeof orvalInstance>,
  signal?: AbortSignal,
) => {
  return orvalInstance<ProductCategoryDto>(
    {
      url: `/admin/product/category`,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: productCategoryAdminParam,
      signal,
    },
    options,
  );
};

export const getAdminCreateCategoryProductMutationOptions = <
  TError = unknown,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof adminCreateCategoryProduct>>,
    TError,
    { data: ProductCategoryAdminParam },
    TContext
  >;
  request?: SecondParameter<typeof orvalInstance>;
}): UseMutationOptions<
  Awaited<ReturnType<typeof adminCreateCategoryProduct>>,
  TError,
  { data: ProductCategoryAdminParam },
  TContext
> => {
  const mutationKey = ['adminCreateCategoryProduct'];
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation &&
      'mutationKey' in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined };

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof adminCreateCategoryProduct>>,
    { data: ProductCategoryAdminParam }
  > = (props) => {
    const { data } = props ?? {};

    return adminCreateCategoryProduct(data, requestOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type AdminCreateCategoryProductMutationResult = NonNullable<
  Awaited<ReturnType<typeof adminCreateCategoryProduct>>
>;
export type AdminCreateCategoryProductMutationBody = ProductCategoryAdminParam;
export type AdminCreateCategoryProductMutationError = unknown;

/**
 * @summary 카테고리 등록
 */
export const useAdminCreateCategoryProduct = <
  TError = unknown,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof adminCreateCategoryProduct>>,
    TError,
    { data: ProductCategoryAdminParam },
    TContext
  >;
  request?: SecondParameter<typeof orvalInstance>;
}): UseMutationResult<
  Awaited<ReturnType<typeof adminCreateCategoryProduct>>,
  TError,
  { data: ProductCategoryAdminParam },
  TContext
> => {
  const mutationOptions = getAdminCreateCategoryProductMutationOptions(options);

  return useMutation(mutationOptions);
};
/**
 * @summary 카테고리 정렬
 */
export const adminSortCategoryProduct = (
  productCategorySortAdminParam: ProductCategorySortAdminParam,
  options?: SecondParameter<typeof orvalInstance>,
  signal?: AbortSignal,
) => {
  return orvalInstance<void>(
    {
      url: `/admin/product/category/sort`,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: productCategorySortAdminParam,
      signal,
    },
    options,
  );
};

export const getAdminSortCategoryProductMutationOptions = <
  TError = unknown,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof adminSortCategoryProduct>>,
    TError,
    { data: ProductCategorySortAdminParam },
    TContext
  >;
  request?: SecondParameter<typeof orvalInstance>;
}): UseMutationOptions<
  Awaited<ReturnType<typeof adminSortCategoryProduct>>,
  TError,
  { data: ProductCategorySortAdminParam },
  TContext
> => {
  const mutationKey = ['adminSortCategoryProduct'];
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation &&
      'mutationKey' in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined };

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof adminSortCategoryProduct>>,
    { data: ProductCategorySortAdminParam }
  > = (props) => {
    const { data } = props ?? {};

    return adminSortCategoryProduct(data, requestOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type AdminSortCategoryProductMutationResult = NonNullable<
  Awaited<ReturnType<typeof adminSortCategoryProduct>>
>;
export type AdminSortCategoryProductMutationBody =
  ProductCategorySortAdminParam;
export type AdminSortCategoryProductMutationError = unknown;

/**
 * @summary 카테고리 정렬
 */
export const useAdminSortCategoryProduct = <
  TError = unknown,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof adminSortCategoryProduct>>,
    TError,
    { data: ProductCategorySortAdminParam },
    TContext
  >;
  request?: SecondParameter<typeof orvalInstance>;
}): UseMutationResult<
  Awaited<ReturnType<typeof adminSortCategoryProduct>>,
  TError,
  { data: ProductCategorySortAdminParam },
  TContext
> => {
  const mutationOptions = getAdminSortCategoryProductMutationOptions(options);

  return useMutation(mutationOptions);
};
/**
 * @summary 카테고리 부모 목록
 */
export const clientParentCategoryProduct = (
  options?: SecondParameter<typeof orvalInstance>,
  signal?: AbortSignal,
) => {
  return orvalInstance<ProductCategoryDto[]>(
    { url: `/client/product/category/parent`, method: 'GET', signal },
    options,
  );
};

export const getClientParentCategoryProductQueryKey = () => {
  return [`/client/product/category/parent`] as const;
};

export const getClientParentCategoryProductQueryOptions = <
  TData = Awaited<ReturnType<typeof clientParentCategoryProduct>>,
  TError = unknown,
>(options?: {
  query?: UseQueryOptions<
    Awaited<ReturnType<typeof clientParentCategoryProduct>>,
    TError,
    TData
  >;
  request?: SecondParameter<typeof orvalInstance>;
}) => {
  const { query: queryOptions, request: requestOptions } = options ?? {};

  const queryKey =
    queryOptions?.queryKey ?? getClientParentCategoryProductQueryKey();

  const queryFn: QueryFunction<
    Awaited<ReturnType<typeof clientParentCategoryProduct>>
  > = ({ signal }) => clientParentCategoryProduct(requestOptions, signal);

  return { queryKey, queryFn, ...queryOptions } as UseQueryOptions<
    Awaited<ReturnType<typeof clientParentCategoryProduct>>,
    TError,
    TData
  > & { queryKey: QueryKey };
};

export type ClientParentCategoryProductQueryResult = NonNullable<
  Awaited<ReturnType<typeof clientParentCategoryProduct>>
>;
export type ClientParentCategoryProductQueryError = unknown;

/**
 * @summary 카테고리 부모 목록
 */

export function useClientParentCategoryProduct<
  TData = Awaited<ReturnType<typeof clientParentCategoryProduct>>,
  TError = unknown,
>(options?: {
  query?: UseQueryOptions<
    Awaited<ReturnType<typeof clientParentCategoryProduct>>,
    TError,
    TData
  >;
  request?: SecondParameter<typeof orvalInstance>;
}): UseQueryResult<TData, TError> & { queryKey: QueryKey } {
  const queryOptions = getClientParentCategoryProductQueryOptions(options);

  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
  };

  query.queryKey = queryOptions.queryKey;

  return query;
}

/**
 * @summary 제품 검색 목록
 */
export const clientSearchProduct = (
  params?: ClientSearchProductParams,
  options?: SecondParameter<typeof orvalInstance>,
  signal?: AbortSignal,
) => {
  return orvalInstance<ProductListClientDto>(
    { url: `/client/product/search`, method: 'GET', params, signal },
    options,
  );
};

export const getClientSearchProductQueryKey = (
  params?: ClientSearchProductParams,
) => {
  return [`/client/product/search`, ...(params ? [params] : [])] as const;
};

export const getClientSearchProductQueryOptions = <
  TData = Awaited<ReturnType<typeof clientSearchProduct>>,
  TError = unknown,
>(
  params?: ClientSearchProductParams,
  options?: {
    query?: UseQueryOptions<
      Awaited<ReturnType<typeof clientSearchProduct>>,
      TError,
      TData
    >;
    request?: SecondParameter<typeof orvalInstance>;
  },
) => {
  const { query: queryOptions, request: requestOptions } = options ?? {};

  const queryKey =
    queryOptions?.queryKey ?? getClientSearchProductQueryKey(params);

  const queryFn: QueryFunction<
    Awaited<ReturnType<typeof clientSearchProduct>>
  > = ({ signal }) => clientSearchProduct(params, requestOptions, signal);

  return { queryKey, queryFn, ...queryOptions } as UseQueryOptions<
    Awaited<ReturnType<typeof clientSearchProduct>>,
    TError,
    TData
  > & { queryKey: QueryKey };
};

export type ClientSearchProductQueryResult = NonNullable<
  Awaited<ReturnType<typeof clientSearchProduct>>
>;
export type ClientSearchProductQueryError = unknown;

/**
 * @summary 제품 검색 목록
 */

export function useClientSearchProduct<
  TData = Awaited<ReturnType<typeof clientSearchProduct>>,
  TError = unknown,
>(
  params?: ClientSearchProductParams,
  options?: {
    query?: UseQueryOptions<
      Awaited<ReturnType<typeof clientSearchProduct>>,
      TError,
      TData
    >;
    request?: SecondParameter<typeof orvalInstance>;
  },
): UseQueryResult<TData, TError> & { queryKey: QueryKey } {
  const queryOptions = getClientSearchProductQueryOptions(params, options);

  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
  };

  query.queryKey = queryOptions.queryKey;

  return query;
}

/**
 * @summary 제품 조회
 */
export const clientFindOneProduct = (
  id: number,
  options?: SecondParameter<typeof orvalInstance>,
  signal?: AbortSignal,
) => {
  return orvalInstance<ProductDto>(
    { url: `/client/product/${id}`, method: 'GET', signal },
    options,
  );
};

export const getClientFindOneProductQueryKey = (id: number) => {
  return [`/client/product/${id}`] as const;
};

export const getClientFindOneProductQueryOptions = <
  TData = Awaited<ReturnType<typeof clientFindOneProduct>>,
  TError = unknown,
>(
  id: number,
  options?: {
    query?: UseQueryOptions<
      Awaited<ReturnType<typeof clientFindOneProduct>>,
      TError,
      TData
    >;
    request?: SecondParameter<typeof orvalInstance>;
  },
) => {
  const { query: queryOptions, request: requestOptions } = options ?? {};

  const queryKey =
    queryOptions?.queryKey ?? getClientFindOneProductQueryKey(id);

  const queryFn: QueryFunction<
    Awaited<ReturnType<typeof clientFindOneProduct>>
  > = ({ signal }) => clientFindOneProduct(id, requestOptions, signal);

  return {
    queryKey,
    queryFn,
    enabled: !!id,
    ...queryOptions,
  } as UseQueryOptions<
    Awaited<ReturnType<typeof clientFindOneProduct>>,
    TError,
    TData
  > & { queryKey: QueryKey };
};

export type ClientFindOneProductQueryResult = NonNullable<
  Awaited<ReturnType<typeof clientFindOneProduct>>
>;
export type ClientFindOneProductQueryError = unknown;

/**
 * @summary 제품 조회
 */

export function useClientFindOneProduct<
  TData = Awaited<ReturnType<typeof clientFindOneProduct>>,
  TError = unknown,
>(
  id: number,
  options?: {
    query?: UseQueryOptions<
      Awaited<ReturnType<typeof clientFindOneProduct>>,
      TError,
      TData
    >;
    request?: SecondParameter<typeof orvalInstance>;
  },
): UseQueryResult<TData, TError> & { queryKey: QueryKey } {
  const queryOptions = getClientFindOneProductQueryOptions(id, options);

  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
  };

  query.queryKey = queryOptions.queryKey;

  return query;
}
