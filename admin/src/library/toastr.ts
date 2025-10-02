import { ExternalToast, toast } from 'sonner';

interface ToastOptionsWithContent extends ExternalToast {
  content?: string;
}

const defaultOptions: ExternalToast = {
  position: 'top-center',
  richColors: true,
};

const validation = (options?: ToastOptionsWithContent) => {
  toast.error(options?.content || '입력항목을 확인해주세요.', {
    ...defaultOptions,
    ...options,
  });
};

const error = (options?: ToastOptionsWithContent) => {
  toast.error(options?.content || '업데이트에 실패했습니다.', {
    ...defaultOptions,
    ...options,
  });
};

const success = (options?: ToastOptionsWithContent) => {
  toast.success(options?.content || '성공적으로 업데이트 되었습니다.', {
    ...defaultOptions,
    ...options,
  });
};

const reload = (options?: ToastOptionsWithContent) => {
  toast.success(options?.content || '데이터가 갱신되었습니다.', {
    ...defaultOptions,
    ...options,
  });
};

const create = (options?: ToastOptionsWithContent) => {
  toast.success(`데이터가 등록 되었습니다.`, {
    ...defaultOptions,
    ...options,
  });
};

const update = (options?: ToastOptionsWithContent) => {
  toast.success(`데이터가 업데이트 되었습니다.`, {
    ...defaultOptions,
    ...options,
  });
};

const remove = (options?: ToastOptionsWithContent) => {
  toast.success(`데이터가 삭제 되었습니다.`, {
    ...defaultOptions,
    ...options,
  });
};

const toastr = {
  validation,
  error,
  success,
  reload,
  create,
  update,
  remove,
};

export default toastr;
