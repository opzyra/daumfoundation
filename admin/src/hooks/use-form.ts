import React, { useEffect } from 'react';
import {
  DefaultValues,
  FieldErrors,
  FieldValues,
  SubmitErrorHandler,
  SubmitHandler,
  useForm as uf,
} from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

type AsyncDefaultValues<TFieldValues> = (
  payload?: unknown,
) => Promise<TFieldValues>;

interface UseFormProps<T extends FieldValues> {
  id: string;
  onSubmit?: (form: T) => void | Promise<void>;
  onError?: (
    errors: FieldErrors<T>,
    event?: React.BaseSyntheticEvent,
  ) => void | Promise<unknown>;
  schema?:
    | yup.ObjectSchema<T>
    | yup.ObjectSchema<any>
    | ReturnType<typeof yup.lazy<yup.ObjectSchema<T>>>;
  value?: any;
  defaultValues?: AsyncDefaultValues<T> | DefaultValues<T>;
}

export function useForm<T extends FieldValues>({
  id,
  onSubmit,
  onError,
  schema,
  value,
  defaultValues,
}: UseFormProps<T>) {
  const hookForm = uf<T>({
    resolver: yupResolver(schema || yup.object({})),
    defaultValues,
  });

  const submit: SubmitHandler<T> = async (form) => {
    onSubmit && (await onSubmit(form));
  };

  const error: SubmitErrorHandler<T> = async (errors, event) => {
    onError && (await onError(errors, event));
  };

  const formValues = hookForm.watch();

  useEffect(() => {
    if (value) {
      hookForm.reset({ ...value });
    }
  }, [value]);

  return {
    ...hookForm,
    formId: id,
    formValues,
    errors: hookForm.formState.errors,
    handleSubmit: hookForm.handleSubmit(submit, error),
    defaultValues,
  };
}
