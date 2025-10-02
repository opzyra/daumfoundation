import React, { useContext, useEffect, useMemo, useState } from 'react';

import { useRouter } from 'next/router';

import { LoadingOutlined } from '@ant-design/icons';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { SyntheticListenerMap } from '@dnd-kit/core/dist/hooks/utilities';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import {
  SortableContext,
  arrayMove,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import {
  Button,
  Pagination,
  Radio,
  Select,
  Spin,
  Table,
  TableColumnsType,
  TableProps,
} from 'antd';
import { AnyObject } from 'antd/es/_util/type';
import { ColumnType } from 'antd/es/table';
import { SelectionSelectFn } from 'antd/lib/table/interface';
import cn from 'classnames';
import { DropdownMenu } from 'radix-ui';

import './source.css';

interface PaginateMetaProps {
  totalItems: number;
  itemCount: number;
  itemsPerPage: number;
  totalPages: number;
  currentPage: number;
}

interface SortProps {
  key: string;
  label: string;
}

interface TableSourceProps<T extends AnyObject>
  extends Omit<TableProps, 'pagination' | 'rowSelection'> {
  className?: string;
  meta?: PaginateMetaProps;
  sort?: SortProps[];
  loading?: boolean;
  pagination?: boolean;
  columns: TableColumnsType<T> | undefined;
  dataSource: readonly any[] | undefined;
  rowSelection?: boolean;
  tableAlertRender?: (
    selectedRowKeys: any[],
    resetSelectedRowKeys: () => void,
  ) => React.ReactNode;
  onClick?: (record: T) => void;
}

export function TableSource<T extends AnyObject>({
  className,
  meta,
  loading,
  sort,
  pagination = true,
  rowSelection = true,
  columns,
  dataSource,
  tableAlertRender,
  onClick,
  expandable,
  ...props
}: TableSourceProps<T>) {
  const router = useRouter();

  const [sortColumn, setSortColumn] = useState<string>();
  const [sortType, setSortType] = useState<'asc' | 'desc'>();
  const [limit, setLimit] = useState<number | undefined>();
  const [selectedRowKeys, setSelectedRowKeys] = useState<any[]>([]);
  const [expandedRowKeys, setExpandedRowKeys] = useState<any[]>([]);

  const generateChildrenColumnName = () => {
    const chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 10; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  const expandColumns = useMemo<TableColumnsType<any>>(() => {
    if (!columns) return [];

    const expandColumns: ColumnType<any>[] = [
      ...columns,
      {
        title: '',
        width: 68,
        align: 'center',
        render: (value, record) => (
          <div
            className="list-expand"
            onClick={() => {
              const key = record.id;
              if (expandedRowKeys.includes(key)) {
                setExpandedRowKeys(
                  expandedRowKeys.filter((item) => item !== key),
                );
              } else {
                setExpandedRowKeys([...expandedRowKeys, record.id]);
              }
            }}
          >
            {expandedRowKeys.includes(record.id) ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="-2 -2 24 24"
              >
                <path
                  fill="currentColor"
                  d="M4 2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2zm0-2h12a4 4 0 0 1 4 4v12a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4m1 9h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="-2 -2 24 24"
              >
                <path
                  fill="currentColor"
                  d="M4 2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2zm0-2h12a4 4 0 0 1 4 4v12a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4m7 11v4a1 1 0 0 1-2 0v-4H5a1 1 0 0 1 0-2h4V5a1 1 0 1 1 2 0v4h4a1 1 0 0 1 0 2z"
                />
              </svg>
            )}
          </div>
        ),
      },
    ];

    return expandColumns;
  }, [columns, expandable, expandedRowKeys]);

  const resetSelectedRowKeys = () => {
    setSelectedRowKeys([]);
  };

  const onSortColumn = async (value: string) => {
    const url = new URL(location.origin + router.asPath);
    const query = Object.fromEntries(new URLSearchParams(url.search));
    await router.push({
      pathname: url.pathname,
      query: {
        ...query,
        sortColumn: value,
        sortType,
      },
    });
  };

  const onSortType = async (value: 'asc' | 'desc') => {
    const url = new URL(location.origin + router.asPath);
    const query = Object.fromEntries(new URLSearchParams(url.search));
    await router.push({
      pathname: url.pathname,
      query: {
        ...query,
        sortColumn,
        sortType: value,
      },
    });
  };

  const onSelectRowSelected: SelectionSelectFn<any> = (
    record,
    selected,
    selectedRows,
  ) => {
    setSelectedRowKeys(selectedRows.map((row) => row?.id));
  };

  const onSize = async (limit: number) => {
    const url = new URL(location.origin + router.asPath);
    const query = Object.fromEntries(new URLSearchParams(url.search));
    await router.push({
      pathname: url.pathname,
      query: {
        ...query,
        limit,
      },
    });
  };

  const onPagination = async (page: number, limit: number) => {
    await router.push({
      pathname: router.pathname,
      query: {
        ...router.query,
        page,
        limit,
      },
    });
  };

  // sort + limit 설정
  useEffect(() => {
    const url = new URL(location.origin + router.asPath);
    const params = Object.fromEntries(new URLSearchParams(url.search));
    setLimit(+params.limit || 20);
    setSortColumn(params.sortColumn);
    setSortType(params.sortType as any);
  }, [router.query]);

  return (
    <div className={cn('sh-source', className)}>
      <div className="source-meta">
        {selectedRowKeys.length === 0 && (
          <>
            <div className="meta-data">
              <div className="data-total">
                전체 {meta?.totalItems || dataSource?.length || 0}건
              </div>
              {pagination && (
                <div className="data-page">
                  {meta?.currentPage || 1}/{meta?.totalPages || 1} Page
                </div>
              )}
            </div>

            <div className="meta-action">
              {sort && (
                <div className="action-item">
                  <DropdownMenu.Root>
                    <DropdownMenu.Trigger asChild>
                      <div className="action-icon">
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M5.293 2.293a.997.997 0 0 1 1.414 0l3 3a1 1 0 0 1-1.414 1.414L7 5.414V13a1 1 0 1 1-2 0V5.414L3.707 6.707a1 1 0 0 1-1.414-1.414l3-3ZM13 7a1 1 0 0 1 2 0v7.585l1.293-1.292a.999.999 0 1 1 1.414 1.414l-3 3a.997.997 0 0 1-1.414 0l-3-3a.997.997 0 0 1 0-1.414.999.999 0 0 1 1.414 0L13 14.585V7Z"
                            fill="currentColor"
                          ></path>
                        </svg>
                      </div>
                    </DropdownMenu.Trigger>

                    <DropdownMenu.Portal>
                      <DropdownMenu.Content
                        forceMount
                        sideOffset={8}
                        align="end"
                      >
                        <div className="sh-source-sort-dropdown">
                          <div className="dropdown-section">
                            <Radio.Group
                              name="sortColumn"
                              value={sortColumn}
                              onChange={(e) => onSortColumn(e.target.value)}
                            >
                              {sort.map((item) => (
                                <div className="dropdown-item" key={item.key}>
                                  <Radio value={item.key}>{item.label}</Radio>
                                </div>
                              ))}
                            </Radio.Group>
                          </div>
                          <div className="dropdown-section">
                            <div className="dropdown-item">
                              <div
                                className={cn('dropdown-button', {
                                  active: sortType === 'asc',
                                })}
                                onClick={() => onSortType('asc')}
                              >
                                <div className="dropdown-icon">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      fill="currentColor"
                                      d="M11 20V7.825l-5.6 5.6L4 12l8-8l8 8l-1.4 1.425l-5.6-5.6V20z"
                                    />
                                  </svg>
                                </div>
                                <div className="dropdown-text">오름차순</div>
                              </div>
                            </div>
                            <div className="dropdown-item">
                              <div
                                className={cn('dropdown-button', {
                                  active: sortType === 'desc',
                                })}
                                onClick={() => onSortType('desc')}
                              >
                                <div className="dropdown-icon">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      fill="currentColor"
                                      d="M11 4v12.175l-5.6-5.6L4 12l8 8l8-8l-1.4-1.425l-5.6 5.6V4z"
                                    />
                                  </svg>
                                </div>
                                <div className="dropdown-text">내림차순</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </DropdownMenu.Content>
                    </DropdownMenu.Portal>
                  </DropdownMenu.Root>
                </div>
              )}
              {pagination && (
                <div className="action-item">
                  <div className="action-control">
                    <Select
                      value={meta?.itemsPerPage || limit}
                      onSelect={onSize}
                    >
                      <Select.Option value={20}>20개씩 보기</Select.Option>
                      <Select.Option value={50}>50개씩 보기</Select.Option>
                      <Select.Option value={100}>100개씩 보기</Select.Option>
                    </Select>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
        {selectedRowKeys.length !== 0 && (
          <>
            <div className="meta-data">
              <div className="data-total">
                선택 {selectedRowKeys.length || 0}건
              </div>
            </div>
            {tableAlertRender && (
              <div className="meta-action">
                {tableAlertRender(selectedRowKeys, resetSelectedRowKeys)}
              </div>
            )}
          </>
        )}
      </div>

      <div className="source-list">
        <Table
          rowKey="id"
          bordered={false}
          rowHoverable={false}
          columns={expandable ? expandColumns : columns}
          dataSource={dataSource}
          showSorterTooltip={false}
          pagination={false}
          onRow={(record, rowIndex) => {
            return {
              onClick: (event) => {
                onClick && onClick(record);
              },
            };
          }}
          rowSelection={
            rowSelection
              ? {
                  selectedRowKeys: selectedRowKeys,
                  onSelect: onSelectRowSelected,
                  onSelectAll: (selected) => {
                    if (selected) {
                      setSelectedRowKeys(
                        dataSource?.map((data) => data.id) || [],
                      );
                    } else {
                      setSelectedRowKeys([]);
                    }
                  },
                }
              : undefined
          }
          locale={{
            emptyText: loading ? (
              <div className="list-spin">
                <Spin
                  indicator={<LoadingOutlined spin style={{ fontSize: 24 }} />}
                />
              </div>
            ) : (
              <div className="list-empty">해당되는 자료가 없습니다.</div>
            ),
          }}
          {...props}
          expandable={
            expandable
              ? {
                  ...expandable,
                  childrenColumnName: generateChildrenColumnName(),
                  expandedRowKeys,
                }
              : { showExpandColumn: false }
          }
        />
      </div>
      {pagination && (
        <div className="source-pagination">
          <Pagination
            showSizeChanger={false}
            total={meta?.totalItems || 1}
            current={meta?.currentPage || 1}
            pageSize={meta?.itemsPerPage || 1}
            onChange={(page, limit) => onPagination(page, limit)}
          />
        </div>
      )}
    </div>
  );
}

interface RowContextProps {
  setActivatorNodeRef?: (element: HTMLElement | null) => void;
  listeners?: SyntheticListenerMap;
}

const RowContext = React.createContext<RowContextProps>({});

const DragHandle: React.FC = () => {
  const { setActivatorNodeRef, listeners } = useContext(RowContext);
  return (
    <div style={{ cursor: 'grab' }} ref={setActivatorNodeRef} {...listeners}>
      <svg
        stroke="currentColor"
        fill="currentColor"
        stroke-width="0"
        viewBox="0 0 24 24"
        height="1em"
        width="1em"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M8.5 7C9.32843 7 10 6.32843 10 5.5C10 4.67157 9.32843 4 8.5 4C7.67157 4 7 4.67157 7 5.5C7 6.32843 7.67157 7 8.5 7ZM8.5 13.5C9.32843 13.5 10 12.8284 10 12C10 11.1716 9.32843 10.5 8.5 10.5C7.67157 10.5 7 11.1716 7 12C7 12.8284 7.67157 13.5 8.5 13.5ZM10 18.5C10 19.3284 9.32843 20 8.5 20C7.67157 20 7 19.3284 7 18.5C7 17.6716 7.67157 17 8.5 17C9.32843 17 10 17.6716 10 18.5ZM15.5 7C16.3284 7 17 6.32843 17 5.5C17 4.67157 16.3284 4 15.5 4C14.6716 4 14 4.67157 14 5.5C14 6.32843 14.6716 7 15.5 7ZM17 12C17 12.8284 16.3284 13.5 15.5 13.5C14.6716 13.5 14 12.8284 14 12C14 11.1716 14.6716 10.5 15.5 10.5C16.3284 10.5 17 11.1716 17 12ZM15.5 20C16.3284 20 17 19.3284 17 18.5C17 17.6716 16.3284 17 15.5 17C14.6716 17 14 17.6716 14 18.5C14 19.3284 14.6716 20 15.5 20Z"></path>
      </svg>
    </div>
  );
};

interface RowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  'data-row-key': string;
}

const Row: React.FC<RowProps> = (props) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: props['data-row-key'], transition: null });

  const style: React.CSSProperties = {
    ...props.style,
    transform: CSS.Translate.toString(transform),
    transition,
    ...(isDragging ? { position: 'relative', zIndex: 9999 } : {}),
  };

  const contextValue = useMemo<RowContextProps>(
    () => ({ setActivatorNodeRef, listeners }),
    [setActivatorNodeRef, listeners],
  );

  return (
    <RowContext.Provider value={contextValue}>
      <tr {...props} ref={setNodeRef} style={style} {...attributes} />
    </RowContext.Provider>
  );
};

interface SortSourceProps<T extends AnyObject> extends TableProps {
  className?: string;
  loading?: boolean;
  onSave?: (data: any[]) => void | Promise<void>;
  columns: TableColumnsType<T> | undefined;
  dataSource: readonly any[] | undefined;
  priorityColumn?: number;
  optionRender?: React.ReactNode;
  back?: boolean;
  action?: React.ReactNode[];
}

export function SortSource<T extends AnyObject>({
  className,
  loading,
  columns,
  dataSource,
  onSave,
  priorityColumn,
  optionRender,
  back = false,
  action,
  ...props
}: SortSourceProps<T>) {
  const router = useRouter();

  const [source, setSource] = useState<any>([]);
  const [sortList, setSortList] = useState<any>([]);
  const [moved, setMoved] = useState(false);
  const sortColumns = useMemo<TableColumnsType<any>>(() => {
    if (!columns) return [];

    const sortedColumns: ColumnType<any>[] = [
      {
        title: '선택',
        width: 68,
        align: 'center',
        render: () => <DragHandle />,
      },
      ...columns,
    ];

    sortedColumns.splice(
      priorityColumn ? priorityColumn - 1 : sortedColumns.length,
      0,
      {
        title: '우선 순위',
        align: 'center',
        width: 100,
        sorter: false,
        render: (dom, record, index) => (
          <>
            {moved ? (
              <div className="source-priority">
                {source.findIndex((item: any) => item.id === record.id) + 1}{' '}
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 24 24"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path fill="none" d="M0 0h24v24H0z"></path>
                  <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path>
                </svg>{' '}
                {index + 1}
              </div>
            ) : (
              index + 1
            )}
          </>
        ),
      },
    );

    return sortedColumns;
  }, [columns, moved, source, priorityColumn]);
  // 데이터 초기화
  useEffect(() => {
    if (!dataSource) return;
    setSource(dataSource);
    setSortList(dataSource);
  }, [dataSource]);

  return (
    <div className={cn('sh-source', className)}>
      <div className="source-meta">
        <div className="meta-data">전체 {dataSource?.length || 0}건</div>
        <div className="meta-action">
          {optionRender}
          <Button
            disabled={!moved}
            onClick={() => {
              setSortList(dataSource);
              setMoved(false);
            }}
            size="small"
            icon={
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
                  strokeLinecap="round"
                  strokeMiterlimit="10"
                  strokeWidth="32"
                  d="M400 148l-21.12-24.57A191.43 191.43 0 00240 64C134 64 48 150 48 256s86 192 192 192a192.09 192.09 0 00181.07-128"
                ></path>
                <path d="M464 97.42V208a16 16 0 01-16 16H337.42c-14.26 0-21.4-17.23-11.32-27.31L436.69 86.1C446.77 76 464 83.16 464 97.42z"></path>
              </svg>
            }
          >
            초기화
          </Button>
        </div>
      </div>
      <div className="source-list">
        <DndContext
          modifiers={[restrictToVerticalAxis]}
          onDragEnd={({ active, over }: DragEndEvent) => {
            if (active.id !== over?.id) {
              const activeIndex = sortList.findIndex(
                (record: any) => record.id === active?.id,
              );
              const overIndex = sortList.findIndex(
                (record: any) => record.id === over?.id,
              );

              const newDataSource = arrayMove(sortList, activeIndex, overIndex);

              const reset =
                JSON.stringify(dataSource) === JSON.stringify(newDataSource);

              setMoved(!reset);
              setSortList(newDataSource);
            }
          }}
        >
          <SortableContext
            items={dataSource?.map((i) => i.id) || []}
            strategy={verticalListSortingStrategy}
          >
            <Table
              rowKey="id"
              bordered={false}
              components={{ body: { row: Row } }}
              rowHoverable={false}
              columns={sortColumns}
              dataSource={sortList}
              showSorterTooltip={false}
              pagination={false}
              locale={{
                emptyText: loading ? (
                  <div className="list-spin">
                    <Spin
                      indicator={
                        <LoadingOutlined spin style={{ fontSize: 24 }} />
                      }
                    />
                  </div>
                ) : (
                  <div className="list-empty">해당되는 자료가 없습니다.</div>
                ),
              }}
              {...props}
              expandable={{ showExpandColumn: false }}
            />
          </SortableContext>
        </DndContext>
      </div>
      {dataSource?.length !== 0 && (
        <div className="source-action">
          {back && (
            <Button
              key="back"
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="m7.85 13l2.85 2.85q.3.3.288.7t-.288.7q-.3.3-.712.313t-.713-.288L4.7 12.7q-.3-.3-.3-.7t.3-.7l4.575-4.575q.3-.3.713-.287t.712.312q.275.3.288.7t-.288.7L7.85 11H19q.425 0 .713.288T20 12t-.288.713T19 13z"
                  />
                </svg>
              }
              onClick={() => router.back()}
            >
              뒤로가기
            </Button>
          )}

          <Button
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
            onClick={async () => {
              if (!onSave) return;
              onSave(sortList);
              setMoved(false);
            }}
          >
            저장
          </Button>
        </div>
      )}
    </div>
  );
}
