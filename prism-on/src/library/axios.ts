import axios, { AxiosRequestConfig } from 'axios';

import toastr from 'src/library/toastr';

export const convertFormData = (params: any) => {
  const formData = new FormData();
  Object.keys(params).forEach((key: string) =>
    formData.append(key, params[key]),
  );
  return formData;
};

const instance = axios.create({
  withCredentials: true,
  baseURL: process.env.NEXT_PUBLIC_URL_API,
});

instance.interceptors.response.use(
  function (response) {
    return response;
  },

  async function (error) {
    if (axios.isCancel(error)) {
      return;
    }

    if (error.response) {
      const response = error.response;
      const status = response.status;
      const message = response.data?.message;

      if (status === 400) {
        toastr.validation({ content: message });
        return Promise.reject(error);
      }

      if (
        (status === 401 || status === 403) &&
        !window.location.pathname.startsWith('auth')
      ) {
        window.location.href = `${process.env.NEXT_PUBLIC_URL_AUTH}`;
        return;
      }

      if (status !== 404 && error.response.config.responseType === 'file') {
        throw error;
      }

      if (status === 404) {
        toastr.error({ content: '잘못된 접근입니다.' });
        return Promise.reject(error);
      }

      toastr.error({ content: '시스템 오류가 발생하였습니다.' });
      return Promise.reject(error);
    }
    return;
  },
);

export const orvalInstance = async <T>(
  config: AxiosRequestConfig,
  options?: AxiosRequestConfig,
): Promise<T> => {
  const response = await instance({
    ...config,
    ...options,
  });
  return response?.data?.data;
};

export default instance;
