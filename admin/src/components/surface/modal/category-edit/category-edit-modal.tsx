import React, { useEffect } from 'react';
import { Controller } from 'react-hook-form';

import { useRouter } from 'next/router';

import { useQueryClient } from '@tanstack/react-query';
import { Button, Input, Modal, Select } from 'antd';
import { useForm } from 'src/hooks/use-form';
import { create } from 'zustand/react';

import { Form, FormAction, FormItem } from 'src/components/shared/form/form';
import { UploadImage } from 'src/components/shared/upload';

import toastr from 'src/library/toastr';
import { yup } from 'src/library/yup';

import {
  ProductCategoryAdminParam,
  ProductCategoryDto,
} from 'src/service/model';
import * as productService from 'src/service/product';

import './category-edit-modal.css';

const schema = (context: any) =>
  yup.object({
    name: yup.string().required('필수 항목입니다.'),
    image: yup.string().when([], {
      is: () => context.type === 'parent',
      then: (schema) => schema.required('필수 항목입니다.'),
      otherwise: (schema) => schema.notRequired(),
    }),
    parentId: yup.number().when([], {
      is: () => context.type === 'children',
      then: (schema) => schema.required('필수 항목입니다.'),
      otherwise: (schema) => schema.notRequired(),
    }),
  });

interface CategoryEditModalStore {
  category?: ProductCategoryDto;
  show?: boolean;
  type?: 'parent' | 'children';
  parentId?: number;
}

const useCategoryEditModalStore = create<
  StoreProps<CategoryEditModalStore> & CategoryEditModalStore
>((set) => ({
  show: false,
  set: (data) => set((state) => ({ ...data, set: state.set }), true),
}));

export function useCategoryEditModal() {
  const store = useCategoryEditModalStore();
  const { set } = store;

  const open = (param: Omit<CategoryEditModalStore, 'show'>) => {
    set({ show: true, ...param });
  };

  const close = () => {
    set({ show: false });
  };

  return { open, close, ...store };
}

interface CategoryEditModalProps {}

export function CategoryEditModal({}: CategoryEditModalProps) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { category, parentId, type, show, close } = useCategoryEditModal();

  const { data: parents } = productService.useAdminParentCategoryProduct({
    query: { enabled: show && type === 'children' },
  });

  const mode = category ? 'update' : 'create';

  const { formId, control, errors, handleSubmit, reset, clearErrors } =
    useForm<ProductCategoryAdminParam>({
      id: 'CategoryForm',
      schema: schema({ type }),
      onSubmit: async (form) => {
        let dto = category;
        if (dto) {
          await productService.adminUpdateCategoryProduct(dto.id, form);
        } else {
          dto = await productService.adminCreateCategoryProduct(form);
        }

        const adminFindAllCategoryProductQueryKey =
          productService.getAdminFindAllCategoryProductQueryKey();
        const adminFindOneCategoryProductParentQueryKey =
          productService.getAdminFindOneCategoryProductQueryKey(parentId || 0);

        const adminFindOneCategoryProductQueryKey =
          productService.getAdminFindOneCategoryProductQueryKey(dto.id);

        const adminParentCategoryProductQueryKey =
          productService.getAdminParentCategoryProductQueryKey();

        await queryClient.invalidateQueries(
          adminFindAllCategoryProductQueryKey,
        );

        await queryClient.invalidateQueries(
          adminFindOneCategoryProductParentQueryKey,
        );

        await queryClient.invalidateQueries(
          adminFindOneCategoryProductQueryKey,
        );

        await queryClient.invalidateQueries(adminParentCategoryProductQueryKey);

        mode === 'create' ? toastr.create() : toastr.update();
        onCancel();
      },
    });

  const onCancel = () => {
    close();
  };

  // 데이터 초기화
  useEffect(() => {
    clearErrors();

    if (parentId && !category) {
      reset({ parentId });
    } else if (category) {
      reset({ ...category });
    } else {
      reset({});
    }
  }, [show, category, parentId]);

  return (
    <Modal
      title={
        <>
          {type === 'parent' ? '카테고리' : '검색 라벨'}{' '}
          {mode === 'create' ? '등록' : '수정'}
        </>
      }
      width={480}
      centered
      open={show}
      onCancel={onCancel}
      closable={false}
      maskClosable={false}
      keyboard={false}
      footer={false}
      transitionName="fadeIn"
    >
      <div className="profile-password-modal">
        <form id={formId} onSubmit={handleSubmit}>
          <Form layout="vertical" variant="borderless" size="small">
            {type === 'children' && (
              <FormItem
                label="카테고리"
                required
                message={{ error: errors.parentId }}
              >
                <Controller
                  name="parentId"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      disabled={!category && !!parent}
                      status={errors[field.name] && 'error'}
                    >
                      {parents?.map((item) => (
                        <Select.Option value={item.id} key={item.id}>
                          {item.name}
                        </Select.Option>
                      ))}
                    </Select>
                  )}
                />
              </FormItem>
            )}

            <FormItem label={type === 'parent' ? '카테고리명' : '검색 라벨명'}>
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <Input
                    status={errors[field.name] && 'error'}
                    placeholder={`${type === 'parent' ? '카테고리' : '검색 라벨'}명을 입력해주세요`}
                    {...field}
                  />
                )}
              />
            </FormItem>
            {type === 'parent' && (
              <FormItem
                label="이미지"
                width="50%"
                message={{ error: errors.image }}
              >
                <Controller
                  name="image"
                  control={control}
                  render={({ field }) => (
                    <UploadImage
                      {...field}
                      status={errors.image && 'error'}
                      onUpload={async (file) => {
                        const image = await productService.adminResourceProduct(
                          {
                            file,
                          },
                        );
                        field.onChange(image.path);
                      }}
                      onClear={() => {
                        field.onChange(null);
                      }}
                      width={100}
                      height={100}
                    />
                  )}
                />
              </FormItem>
            )}
            <FormAction>
              <Button
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    height="1em"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12z"
                    />
                  </svg>
                }
                htmlType="button"
                onClick={onCancel}
              >
                취소
              </Button>
              <Button
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    height="1em"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="m9.55 18l-5.7-5.7l1.425-1.425L9.55 15.15l9.175-9.175L20.15 7.4z"
                    ></path>
                  </svg>
                }
                form={formId}
                type="primary"
                htmlType="submit"
              >
                저장
              </Button>
            </FormAction>
          </Form>
        </form>
      </div>
    </Modal>
  );
}
