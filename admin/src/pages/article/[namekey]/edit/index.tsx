import React, { ReactElement, useEffect } from 'react';
import { Controller } from 'react-hook-form';

import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';

import { QueryClient, dehydrate, useQueryClient } from '@tanstack/react-query';
import { Button, Checkbox, DatePicker, Divider, Input, Select } from 'antd';
import dayjs from 'dayjs';
import lodash from 'lodash';
import { useForm } from 'src/hooks/use-form';
import RegexUtils from 'src/utils/regex.utils';

import { AdminGuard } from 'src/components/provider/session-provider/session-guard';
import { useSession } from 'src/components/provider/session-provider/session-provider';
import { UploadFiles, UploadImage } from 'src/components/shared/upload';
import { SunEditor } from 'src/components/ui/sun-editor/sun-editor';

import parser from 'src/library/parser';
import reader from 'src/library/reader';
import toastr from 'src/library/toastr';

import * as articleService from 'src/service/article';
import { ArticleAdminParam } from 'src/service/model';

import './article-edit.css';

interface ArticleEditProps {
  id: number;
  namekey: string;
}

export const getServerSideProps: GetServerSideProps<ArticleEditProps> = async (
  context,
) => {
  const queryClient = new QueryClient();

  const params = parser.paramUrl(context.params);
  const queryString = lodash.omitBy(
    context.query,
    (value, key) => params[key] === value,
  );

  return {
    props: { dehydratedState: dehydrate(queryClient), ...params },
  };
};

ArticleEdit.getProvider = (page: ReactElement) => {
  return <AdminGuard>{page}</AdminGuard>;
};

function ArticleEdit(props: ArticleEditProps) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const id = props.id || 0;
  const mode = id !== 0 ? 'update' : 'create';

  const { admin } = useSession();

  const { data: boards } = articleService.useAdminFindAllBoardArticle();

  const { data: board } = articleService.useAdminFindOneBoardArticle(
    props.namekey,
  );

  const { data: article } = articleService.useAdminFindOneArticle(id, {
    query: {
      enabled: mode === 'update',
    },
  });

  const {
    formId,
    handleSubmit,
    control,
    errors,
    clearErrors,
    setValue,
    getValues,
    setError,
    setFocus,
    reset,
  } = useForm<ArticleAdminParam>({
    id: 'ArticleForm',
    onSubmit: async (form) => {
      if (!board?.thumbnail && board?.view === 'list' && !form.thumbnail) {
        form.extract = true;
      }

      if (!form.subject) {
        toastr.error({ content: '제목을 입력해주세요.' });
        setError('subject', { message: '제목을 입력해주세요.' });
        setFocus('subject');
        return;
      }

      if (!form.content || !form.content.match(RegexUtils.content)) {
        toastr.error({ content: '내용을 입력해주세요.' });
        setError('content', { message: '내용을 입력해주세요.' });
        return;
      }

      let dto = article;
      if (dto) {
        await articleService.adminUpdateArticle(dto.id, form);
      } else {
        dto = await articleService.adminCreateArticle(form);
      }

      const adminFindOneArticleQueryKey =
        articleService.getAdminFindOneArticleQueryKey(dto.id);
      const adminSearchArticleQueryKey =
        articleService.getAdminSearchArticleQueryKey();
      await queryClient.invalidateQueries(adminFindOneArticleQueryKey);
      await queryClient.invalidateQueries(adminSearchArticleQueryKey);

      await router.push(`/article/${form.boardKey}/${dto.id}`);
      mode === 'create' ? toastr.create() : toastr.update();
    },
  });

  // 데이터 초기화
  useEffect(() => {
    reset({
      ...article,
      adminId: article?.admin.id || admin.id,
      extract: !article?.thumbnail,
      boardKey: board?.namekey,
    });
  }, [board, article]);

  return (
    <div className="pg-article-edit">
      <form id={formId} onSubmit={handleSubmit}>
        <div className="edit-aside">
          <div className="aside-header">
            <div className="title">게시글 설정</div>
            <div className="back" onClick={() => router.back()}>
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 512 512"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="48"
                  d="M244 400L100 256l144-144M120 256h292"
                ></path>
              </svg>
            </div>
          </div>
          <div className="aside-content">
            <div className="group">
              <div className="form">
                <div className="form-item">
                  <div className="label">
                    <div className="text">제목</div>
                    <div className="required">*</div>
                  </div>
                  <div className="content">
                    <div className="control">
                      <Controller
                        name="subject"
                        control={control}
                        render={({ field }) => (
                          <Input
                            placeholder="제목을 입력해주세요"
                            status={errors.subject && 'error'}
                            {...field}
                            value={field?.value as string}
                          />
                        )}
                      />
                    </div>
                    <div className="message"></div>
                  </div>
                </div>
                <div className="form-item">
                  <div className="label">
                    <div className="text">게시판</div>
                    <div className="required">*</div>
                  </div>
                  <div className="content">
                    <div className="control">
                      <Controller
                        name="boardKey"
                        control={control}
                        render={({ field }) => (
                          <Select
                            {...field}
                            status={errors.boardKey && 'error'}
                            placeholder="게시판을 선택해주세요"
                          >
                            {boards?.map((board) => (
                              <Select.Option
                                value={board.namekey}
                                key={board.namekey}
                              >
                                {board.name}
                              </Select.Option>
                            ))}
                          </Select>
                        )}
                      />
                    </div>
                    <div className="message"></div>
                  </div>
                </div>
                {(board?.view === 'image' || board?.thumbnail) && (
                  <div className="form-item">
                    <div className="label">
                      <div className="text">썸네일</div>
                    </div>
                    <div className="content">
                      <div className="control">
                        <div className="thumbnail">
                          <div className="image">
                            <Controller
                              name="thumbnail"
                              control={control}
                              render={({ field }) => (
                                <UploadImage
                                  width={board?.thumbWidth || 600}
                                  height={board?.thumbHeight || 400}
                                  status={errors.thumbnail && 'error'}
                                  onUpload={async (file) => {
                                    const resource =
                                      await articleService.adminThumbnailArticle(
                                        {
                                          file: file as Blob,
                                        },
                                      );
                                    setValue('thumbnail', resource.path);
                                    setValue('extract', false);
                                    clearErrors('thumbnail');
                                  }}
                                  onClear={() => {
                                    setValue('thumbnail', undefined);
                                    setValue('extract', true);
                                  }}
                                  {...field}
                                />
                              )}
                            />
                          </div>
                          <div className="extract">
                            <Controller
                              name="extract"
                              control={control}
                              render={({ field }) => (
                                <Checkbox {...field} checked={!!field.value}>
                                  내용에서 썸네일 추출
                                </Checkbox>
                              )}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="message"></div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="group">
              <div className="form">
                <div className="form-item">
                  <div className="label">
                    <div className="text">첨부파일</div>
                    <div className="tooltip">
                      <span>최대 10개</span>
                      <Divider type="vertical" />
                      <span>50MB 미만</span>
                    </div>
                  </div>
                  <div className="content">
                    <div className="control">
                      <Controller
                        name="upload"
                        control={control}
                        render={({ field }) => (
                          <UploadFiles
                            onUpload={async (file) => {
                              const upload =
                                await articleService.adminUploadArticle({
                                  // @ts-ignore
                                  file,
                                });
                              const fileList = getValues('upload') || [];
                              setValue('upload', [...fileList, upload]);
                            }}
                            value={field.value}
                            onRemove={(file) => {
                              const fileList = getValues('upload') || [];

                              setValue(
                                'upload',
                                fileList.filter((item) => item.id !== file.uid),
                              );
                            }}
                            onDownload={async (file) => {
                              await reader.download(
                                `/admin/article/download/${file.uid}`,
                              );
                            }}
                            maxCount={5}
                          >
                            <Button
                              block
                              icon={
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="1em"
                                  height="1em"
                                  viewBox="0 0 1024 1024"
                                >
                                  <path
                                    fill="currentColor"
                                    d="M518.3 459a8 8 0 0 0-12.6 0l-112 141.7a7.98 7.98 0 0 0 6.3 12.9h73.9V856c0 4.4 3.6 8 8 8h60c4.4 0 8-3.6 8-8V613.7H624c6.7 0 10.4-7.7 6.3-12.9z"
                                  />
                                  <path
                                    fill="currentColor"
                                    d="M811.4 366.7C765.6 245.9 648.9 160 512.2 160S258.8 245.8 213 366.6C127.3 389.1 64 467.2 64 560c0 110.5 89.5 200 199.9 200H304c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8h-40.1c-33.7 0-65.4-13.4-89-37.7c-23.5-24.2-36-56.8-34.9-90.6c.9-26.4 9.9-51.2 26.2-72.1c16.7-21.3 40.1-36.8 66.1-43.7l37.9-9.9l13.9-36.6c8.6-22.8 20.6-44.1 35.7-63.4a245.6 245.6 0 0 1 52.4-49.9c41.1-28.9 89.5-44.2 140-44.2s98.9 15.3 140 44.2c19.9 14 37.5 30.8 52.4 49.9c15.1 19.3 27.1 40.7 35.7 63.4l13.8 36.5l37.8 10C846.1 454.5 884 503.8 884 560c0 33.1-12.9 64.3-36.3 87.7a123.07 123.07 0 0 1-87.6 36.3H720c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h40.1C870.5 760 960 670.5 960 560c0-92.7-63.1-170.7-148.6-193.3"
                                  />
                                </svg>
                              }
                            >
                              첨부파일 업로드
                            </Button>
                          </UploadFiles>
                        )}
                      />
                    </div>
                    <div className="message"></div>
                  </div>
                </div>
                <div className="form-item">
                  <div className="label">
                    <div className="text">등록일시</div>
                    <div className="tooltip">자동 등록됩니다.</div>
                  </div>
                  <div className="content">
                    <div className="control">
                      <Controller
                        name="createdAt"
                        control={control}
                        render={({ field }) => (
                          <DatePicker
                            {...field}
                            placeholder="등록일시를 선택해주세요"
                            status={errors.createdAt && 'error'}
                            value={field?.value ? dayjs(field?.value) : null}
                            getPopupContainer={() => document.body}
                            showTime
                            showSecond={false}
                          />
                        )}
                      />
                    </div>
                    <div className="message"></div>
                  </div>
                </div>
                <div className="form-item">
                  <div className="content">
                    <div className="control">
                      <div className="option">
                        <div className="option-item">
                          <Controller
                            name="notice"
                            control={control}
                            render={({ field }) => (
                              <Checkbox {...field} checked={!!field.value}>
                                공지글 설정
                              </Checkbox>
                            )}
                          />
                        </div>
                        <div className="option-item">
                          <Controller
                            name="secret"
                            control={control}
                            render={({ field }) => (
                              <Checkbox {...field} checked={!!field.value}>
                                비공개 설정
                              </Checkbox>
                            )}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="message"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="edit-main">
          <div className="main-head">
            <div className="title">상세 내용</div>
          </div>
          <div className="main-body">
            <div className="editor">
              <Controller
                name="content"
                control={control}
                render={({ field }) => (
                  <SunEditor
                    value={field.value as string}
                    height="calc(100dvh - 234px)"
                    name={field.name}
                    focus={!!errors.content}
                    onChange={field.onChange}
                    onUpload={async ({ file }) => {
                      return await articleService.adminResourceArticle({
                        file,
                      });
                    }}
                  />
                )}
              />
            </div>
            <div className="action">
              <div></div>
              <div>
                <Button
                  form={formId}
                  htmlType="submit"
                  type="primary"
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
                      />
                    </svg>
                  }
                >
                  저장
                </Button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ArticleEdit;
