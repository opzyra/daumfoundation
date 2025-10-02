import React, { useEffect, useState } from 'react';
import { Control, Controller } from 'react-hook-form';

import { useRouter } from 'next/router';

import { Button, Input, Select } from 'antd';
import cn from 'classnames';
import { DropdownMenu } from 'radix-ui';

import './filter.css';

interface TabProps {
  label: string;
  enable?: boolean;
  render: (
    onSearch: (name: string, value: string) => void,
  ) => React.ReactElement;
}

interface SearchProps {
  label: React.ReactNode;
  value: string;
}

interface FilterItemProps {
  label?: React.ReactNode;
  render: (control: Control, onSearch: () => void) => React.ReactNode;
}

interface FilterProps {
  form: any;
  keys?: string[];
  tabs?: TabProps[];
  filter?: FilterItemProps[];
  search?: SearchProps[];
}

export function Filter({ form, keys, tabs, filter, search }: FilterProps) {
  const router = useRouter();
  const [open, setOpen] = useState<boolean>(false);
  const [enable, setEnable] = useState<number>(0);

  // 탭 처리
  const onTab = async (name: string, value: string) => {
    const url = new URL(location.origin + router.asPath);
    const params = Object.fromEntries(new URLSearchParams(url.search));
    const formValues = form.getValues();

    let routerParams: any = {
      ...params,
      ...formValues,
      [name]: value,
      limit: params.limit || 20,
      page: 1,
    };

    if (params.query) {
      routerParams.query = params.query;
    }

    await router.replace({
      pathname: url.pathname,
      query: routerParams,
    });
  };

  // 검색
  const onSearch = async () => {
    const url = new URL(location.origin + router.asPath);
    const params = Object.fromEntries(new URLSearchParams(url.search));
    const formValues = form.getValues();

    let routerParams: any = {
      ...params,
      ...formValues,
      limit: params.limit || 20,
      page: 1,
    };

    if (params.query) {
      routerParams.query = params.query;
    }

    await router.replace({
      pathname: url.pathname,
      query: routerParams,
    });
  };

  // 검색어 클리어
  const onSearchClear = async () => {
    form.setValue('searchQuery', undefined);
    onSearch();
  };

  // 필터 초기화 -> 검색어는 남긴다.
  const onConditionClear = async () => {
    const values = form.getValues();
    const defaultValues = form.defaultValues;

    // 페이지 정보, 검색어, 검색타입, 탭 정보는 남기고 리셋
    form.reset({
      ...defaultValues,
      searchType: values.searchType,
      searchQuery: values.searchQuery,
      searchTab: values.searchTab,
      page: values.page,
      limit: values.limit,
    });
  };

  useEffect(() => {
    let count = 0;
    if (!keys) {
      setEnable(count);
      return;
    }
    const values = keys.map((item) => form.getValues(item));
    for (let i = 0, len = values.length; i < len; i++) {
      const value = values[i];
      if (value) {
        count++;
      }
    }
    setEnable(count);
  }, [router.query]);

  return (
    <div className="sh-filter">
      <div className="filter-button">
        <div className="button-condition">
          {filter && (
            <DropdownMenu.Root
              open={open}
              onOpenChange={(open) => setOpen(open)}
            >
              <DropdownMenu.Trigger asChild>
                <Button
                  className={cn('condition-button', { enable: enable !== 0 })}
                  color="default"
                  variant="outlined"
                  icon={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="1em"
                      height="1em"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeMiterlimit="10"
                        strokeWidth="1.5"
                        d="M21.25 12H8.895m-4.361 0H2.75m18.5 6.607h-5.748m-4.361 0H2.75m18.5-13.214h-3.105m-4.361 0H2.75m13.214 2.18a2.18 2.18 0 1 0 0-4.36a2.18 2.18 0 0 0 0 4.36Zm-9.25 6.607a2.18 2.18 0 1 0 0-4.36a2.18 2.18 0 0 0 0 4.36Zm6.607 6.608a2.18 2.18 0 1 0 0-4.361a2.18 2.18 0 0 0 0 4.36Z"
                      />
                    </svg>
                  }
                >
                  필터{' '}
                  {enable !== 0 && (
                    <span className="condition-count">{enable}</span>
                  )}
                </Button>
              </DropdownMenu.Trigger>
              <DropdownMenu.Portal>
                <DropdownMenu.Content forceMount align="start" sideOffset={6}>
                  <div className="sh-filter-dropdown">
                    <div className="dropdown-title">검색 필터</div>
                    <div className="dropdown-body">
                      <form
                        id={form?.formId}
                        onSubmit={async (e) => {
                          e.preventDefault();
                          setOpen(false);
                          onSearch();
                        }}
                      >
                        {filter.map((item, index) => (
                          <div className="dropdown-item" key={index}>
                            {item.label && (
                              <div className="item-label">{item.label}</div>
                            )}
                            <div className="item-control">
                              {item.render(form.control, onSearch)}
                            </div>
                          </div>
                        ))}
                      </form>
                    </div>
                    <div className="dropdown-footer">
                      <div className="footer-action">
                        <button
                          className="footer-reset"
                          onClick={() => onConditionClear()}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="1em"
                            height="1em"
                            viewBox="0 0 21 21"
                          >
                            <g
                              fill="none"
                              fillRule="evenodd"
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M3.578 6.487A8 8 0 1 1 2.5 10.5" />
                              <path d="M7.5 6.5h-4v-4" />
                            </g>
                          </svg>
                          <span>초기화</span>
                        </button>
                      </div>
                      <div className="footer-action">
                        <button
                          className="action-button"
                          onClick={() => setOpen(false)}
                        >
                          취소
                        </button>
                        <button
                          type="submit"
                          form={form?.formId}
                          className="action-button confirm"
                        >
                          적용하기
                        </button>
                      </div>
                    </div>
                  </div>
                </DropdownMenu.Content>
              </DropdownMenu.Portal>
            </DropdownMenu.Root>
          )}
        </div>
        <div className="button-tab">
          {tabs &&
            tabs
              .filter((item) => item.enable !== false)
              .map((item, index) => (
                <div key={index}>{item.render(onTab)}</div>
              ))}
        </div>
      </div>
      <div className="filter-search">
        {search && (
          <>
            <div className="search-type">
              <Controller
                name="searchType"
                control={form.control}
                render={({ field }) => (
                  <Select {...field}>
                    {search.map((item) => (
                      <Select.Option key={item.value} value={item.value}>
                        {item.label}
                      </Select.Option>
                    ))}
                  </Select>
                )}
              />
            </div>
            <div className="search-query">
              <Controller
                name="searchQuery"
                control={form.control}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="검색어를 입력해주세요."
                    allowClear={true}
                    onClear={() => onSearchClear()}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter') {
                        onSearch();
                      }
                    }}
                    suffix={
                      <div className="query-suffix" onClick={() => onSearch()}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="1em"
                          height="1em"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill="currentColor"
                            d="m19.6 21l-6.3-6.3q-.75.6-1.725.95T9.5 16q-2.725 0-4.612-1.888T3 9.5t1.888-4.612T9.5 3t4.613 1.888T16 9.5q0 1.1-.35 2.075T14.7 13.3l6.3 6.3zM9.5 14q1.875 0 3.188-1.312T14 9.5t-1.312-3.187T9.5 5T6.313 6.313T5 9.5t1.313 3.188T9.5 14"
                          />
                        </svg>
                      </div>
                    }
                  />
                )}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
