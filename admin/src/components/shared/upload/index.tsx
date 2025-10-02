import React, { useCallback, useState } from 'react';

import {
  Upload as AntdUpload,
  UploadFile as AntdUploadFile,
  Button,
  Popconfirm,
} from 'antd';
import { RcFile } from 'antd/lib/upload';
import cn from 'classnames';

import './upload.css';

interface UploadImageProps {
  onUpload: (file: RcFile) => Promise<void> | void;
  onClear: () => void;
  width: number;
  height: number;
  status?: 'error';
  value?: string;
  thumbnail?: boolean;
}

export function UploadImage({
  width,
  height,
  onUpload,
  onClear,
  status,
  value,
  thumbnail = true,
}: UploadImageProps) {
  const [open, setOpen] = useState(false);

  const aspectRatio = useCallback((width: number, height: number) => {
    const gcd: any = (a: number, b: number) => (b === 0 ? a : gcd(b, a % b));
    const highestFirst = (a: number, b: number) => (a < b ? [b, a] : [a, b]);
    const formatAspectRatio = (
      h: number,
      w: number,
      divisor: number,
      separator: string,
    ) => `${h / divisor}${separator}${w / divisor}`;

    const [h, w] = highestFirst(height, width);
    const divisor = gcd(h, w);
    return formatAspectRatio(width, height, divisor, '/');
  }, []);

  return (
    <div className="sh-upload-image">
      {!thumbnail && (
        <div className="image-list">
          <div className="image-button">
            <AntdUpload
              accept=".png,.jpg,.jpeg,.gif,.bmp"
              maxCount={1}
              customRequest={({ file }) => {
                // @ts-ignore
                onUpload(file);
              }}
            >
              <Button
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    height="1em"
                    viewBox="0 0 24 24"
                  >
                    <g
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                    >
                      <path
                        stroke-dasharray="2 4"
                        stroke-dashoffset="6"
                        d="M12 21c-4.97 0 -9 -4.03 -9 -9c0 -4.97 4.03 -9 9 -9"
                      >
                        <animate
                          attributeName="stroke-dashoffset"
                          dur="0.6s"
                          repeatCount="indefinite"
                          values="6;0"
                        />
                      </path>
                      <path
                        stroke-dasharray="32"
                        stroke-dashoffset="32"
                        d="M12 3c4.97 0 9 4.03 9 9c0 4.97 -4.03 9 -9 9"
                      >
                        <animate
                          fill="freeze"
                          attributeName="stroke-dashoffset"
                          begin="0.1s"
                          dur="0.4s"
                          values="32;0"
                        />
                      </path>
                      <path
                        stroke-dasharray="10"
                        stroke-dashoffset="10"
                        d="M12 16v-7.5"
                      >
                        <animate
                          fill="freeze"
                          attributeName="stroke-dashoffset"
                          begin="0.5s"
                          dur="0.2s"
                          values="10;0"
                        />
                      </path>
                      <path
                        stroke-dasharray="6"
                        stroke-dashoffset="6"
                        d="M12 8.5l3.5 3.5M12 8.5l-3.5 3.5"
                      >
                        <animate
                          fill="freeze"
                          attributeName="stroke-dashoffset"
                          begin="0.7s"
                          dur="0.2s"
                          values="6;0"
                        />
                      </path>
                    </g>
                  </svg>
                }
                size="small"
              >
                이미지 업로드
                <small className="image-description">
                  (권장 사이즈: {width}px x {height}px)
                </small>
              </Button>
            </AntdUpload>
          </div>
          {value && (
            <div className="image-item">
              <div className="item-image">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={value} alt="" />
              </div>
              <Popconfirm
                title={
                  <>
                    삭제된 데이터는 복구가 불가능합니다.
                    <br />
                    정말 삭제하시겠습니까?
                  </>
                }
                open={open}
                getPopupContainer={() => document.body}
                placement="bottom"
                onConfirm={() => {
                  setOpen(false);
                  onClear();
                }}
                onCancel={() => setOpen(false)}
              >
                <div
                  className="image-clear"
                  onClick={() => {
                    setOpen(true);
                  }}
                >
                  <svg
                    viewBox="64 64 896 896"
                    focusable="false"
                    data-icon="delete"
                    width="1em"
                    height="1em"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M360 184h-8c4.4 0 8-3.6 8-8v8h304v-8c0 4.4 3.6 8 8 8h-8v72h72v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80h72v-72zm504 72H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zM731.3 840H292.7l-24.2-512h487l-24.2 512z"></path>
                  </svg>
                </div>
              </Popconfirm>
            </div>
          )}
        </div>
      )}
      {thumbnail && (
        <div className="image-thumbnail">
          <div
            className={cn('image-box', { error: status === 'error', open })}
            style={{
              aspectRatio: `${aspectRatio(width, height)}`,
            }}
          >
            <AntdUpload
              accept=".png,.jpg,.jpeg,.gif,.bmp"
              maxCount={1}
              customRequest={({ file }) => {
                // @ts-ignore
                onUpload(file);
              }}
            >
              {value && (
                <div className="image-container">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={value} alt="" />
                  <div
                    className="image-hover"
                    onClick={(event) => {
                      event.stopPropagation();
                    }}
                  >
                    <Popconfirm
                      title={
                        <>
                          삭제된 데이터는 복구가 불가능합니다.
                          <br />
                          정말 삭제하시겠습니까?
                        </>
                      }
                      open={open}
                      getPopupContainer={() => document.body}
                      placement="bottomLeft"
                      onConfirm={() => {
                        setOpen(false);
                        onClear();
                      }}
                      onCancel={() => setOpen(false)}
                    >
                      <div
                        className="image-clear"
                        onClick={() => {
                          setOpen(true);
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="1em"
                          height="1em"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill="currentColor"
                            d="m12 13.4l2.9 2.9q.275.275.7.275t.7-.275t.275-.7t-.275-.7L13.4 12l2.9-2.9q.275-.275.275-.7t-.275-.7t-.7-.275t-.7.275L12 10.6L9.1 7.7q-.275-.275-.7-.275t-.7.275t-.275.7t.275.7l2.9 2.9l-2.9 2.9q-.275.275-.275.7t.275.7t.7.275t.7-.275zm0 8.6q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22m0-2q3.35 0 5.675-2.325T20 12t-2.325-5.675T12 4T6.325 6.325T4 12t2.325 5.675T12 20m0-8"
                          />
                        </svg>
                        <span>삭제</span>
                      </div>
                    </Popconfirm>
                  </div>
                </div>
              )}
              {!value && (
                <div className="image-empty">
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 1024 1024"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M518.3 459a8 8 0 0 0-12.6 0l-112 141.7a7.98 7.98 0 0 0 6.3 12.9h73.9V856c0 4.4 3.6 8 8 8h60c4.4 0 8-3.6 8-8V613.7H624c6.7 0 10.4-7.7 6.3-12.9L518.3 459z"></path>
                    <path d="M811.4 366.7C765.6 245.9 648.9 160 512.2 160S258.8 245.8 213 366.6C127.3 389.1 64 467.2 64 560c0 110.5 89.5 200 199.9 200H304c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8h-40.1c-33.7 0-65.4-13.4-89-37.7-23.5-24.2-36-56.8-34.9-90.6.9-26.4 9.9-51.2 26.2-72.1 16.7-21.3 40.1-36.8 66.1-43.7l37.9-9.9 13.9-36.6c8.6-22.8 20.6-44.1 35.7-63.4a245.6 245.6 0 0 1 52.4-49.9c41.1-28.9 89.5-44.2 140-44.2s98.9 15.3 140 44.2c19.9 14 37.5 30.8 52.4 49.9 15.1 19.3 27.1 40.7 35.7 63.4l13.8 36.5 37.8 10C846.1 454.5 884 503.8 884 560c0 33.1-12.9 64.3-36.3 87.7a123.07 123.07 0 0 1-87.6 36.3H720c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h40.1C870.5 760 960 670.5 960 560c0-92.7-63.1-170.7-148.6-193.3z"></path>
                  </svg>
                  <span>이미지 업로드</span>
                </div>
              )}
            </AntdUpload>
          </div>
          <div className="image-description">
            권장 사이즈: {width}px x {height}px
          </div>
        </div>
      )}
    </div>
  );
}

interface UploadFilesProps {
  onUpload: (file: RcFile) => Promise<void>;
  onRemove: (file: any) => Promise<void> | void;
  onDownload: (file: AntdUploadFile<any>) => Promise<void> | void;
  value?: any[];
  maxCount?: number;
  children: React.ReactNode;
}

export function UploadFiles({
  onUpload,
  onRemove,
  onDownload,
  value = [],
  maxCount,
  children,
}: UploadFilesProps) {
  return (
    <div className="sh-upload-files">
      <AntdUpload
        customRequest={({ file }) => {
          // @ts-ignore
          onUpload(file);
        }}
        fileList={(() => {
          const list = value;
          const fileList: AntdUploadFile[] = [];

          if (!list || !Array.isArray(list) || list.length === 0) return [];
          list.forEach((item) =>
            fileList.push({
              ...item,
              uid: item.id,
              name: item.originalname + '.' + item.extension,
              url: '/',
            }),
          );
          return fileList;
        })()}
        onRemove={(file) => onRemove(file)}
        onPreview={(file) => onDownload(file)}
        maxCount={maxCount}
      >
        {children}
      </AntdUpload>
    </div>
  );
}
