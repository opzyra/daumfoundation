import React, { useEffect, useState } from 'react';

import { useRouter } from 'next/router';

import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';
import cn from 'classnames';
import { DropdownMenu } from 'radix-ui';
import { useStorage } from 'src/hooks/use-storage';

import { useSession } from 'src/components/provider/session-provider/session-provider';
import { Link } from 'src/components/ui/link/link';

import toastr from 'src/library/toastr';

import * as adminService from 'src/service/admin';

import './admin-layout.css';

type GnbType = 'app' | 'service' | 'contents' | 'system';
type LnbType =
  | 'dashboard'
  | 'rental'
  | 'product'
  | 'agency'
  | 'user'
  | 'qna'
  | 'term'
  | 'admin';

interface MetaDataProps {
  gnb: GnbType;
  lnb: LnbType;
}

interface AdminLayoutProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'full';
  metadata?: MetaDataProps;
  active?: string;
  aside?: boolean;
  loading?: boolean;
  background?: 'gray' | 'white';
  children: React.ReactNode;
}

export function AdminLayout({
  size = 'lg',
  background = 'white',
  metadata,
  active,
  aside = true,
  loading = false,
  children,
}: AdminLayoutProps) {
  const router = useRouter();
  const { admin, logout } = useSession();
  const screens = useBreakpoint();
  const storage = useStorage();

  // 우측 네비게이션 메뉴
  const [fold, setFold] = useState<boolean>();

  // 메뉴 펼침
  const [collapsed, setCollapsed] = useState<LnbType[]>([]);

  // 오버랩 여부
  const [overlap, setOverlap] = useState<boolean>(false);

  // 네비게이션 이벤트
  const onFold = () => {
    const state = !fold;
    setFold(state);
    storage.set('admin_layout_fold', !fold);
  };

  // 메뉴 펼침 이벤트
  const onCollapsed = (key: LnbType) => {
    let collapse = [...collapsed, key];

    if (collapsed.includes(key)) {
      collapse = collapsed.filter((item) => item !== key);
    }

    setCollapsed(collapse);
    storage.set('admin_layout_collapse', collapse);
  };

  // 로그아웃
  const onLogout = async () => {
    await adminService.adminLogoutAdmin();
    logout();
    await router.push('/auth');
    toastr.success({ content: '로그아웃이 완료되었습니다.' });
  };

  // 메뉴 펼침 처리
  useEffect(() => {
    let collapse = storage.get<LnbType[]>('admin_layout_collapse') || [];

    if (metadata?.lnb && !collapse.includes(metadata.lnb)) {
      collapse = [...collapse, metadata.lnb];
    }

    setCollapsed(collapse);
  }, [metadata]);

  // 메뉴 접힘 처리
  useEffect(() => {
    // 기본
    if (screens.xl) {
      const fold = storage.get<boolean>('admin_layout_fold');
      setFold(fold === undefined ? true : fold);
      setOverlap(false);
      return;
    }

    // 화면이 줄어들었을때
    setFold(false);
    setOverlap(true);
  }, [screens]);

  if (!admin) return;

  // 메뉴 처리 완료시 랜더링
  if (fold === undefined) return;

  return (
    <div className={cn('admin-layout', { fold, overlap, aside })}>
      <div className="admin-layout-container">
        <div className="layout-header">
          <Link className="header-brand">
            <img src="/images/brand-white.png" style={{ width: '132px' }} />
          </Link>
          <div className="header-action">
            <DropdownMenu.Root>
              <DropdownMenu.Trigger asChild>
                <div className="action-user">
                  <div className="user-avatar">
                    {admin.username.slice(0, 2)}
                  </div>
                  <div className="user-text">{admin.name}</div>
                  <div className="user-arrow">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="1em"
                      height="1em"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        d="M11.475 14.475L7.85 10.85q-.075-.075-.112-.162T7.7 10.5q0-.2.138-.35T8.2 10h7.6q.225 0 .363.15t.137.35q0 .05-.15.35l-3.625 3.625q-.125.125-.25.175T12 14.7t-.275-.05t-.25-.175"
                      />
                    </svg>
                  </div>
                </div>
              </DropdownMenu.Trigger>

              <DropdownMenu.Portal>
                <DropdownMenu.Content
                  className="admin-layout-user-dropdown"
                  sideOffset={6}
                  align="end"
                >
                  <div className="dropdown-list">
                    <Link className="dropdown-item" route="/profile">
                      계정 설정
                    </Link>
                    <div className="dropdown-item" onClick={() => onLogout()}>
                      로그아웃
                    </div>
                  </div>
                </DropdownMenu.Content>
              </DropdownMenu.Portal>
            </DropdownMenu.Root>
          </div>
        </div>

        <div className={cn('layout-main', { full: size === 'full' })}>
          {aside && (
            <div className="main-aside">
              <div
                className="aside-button"
                onClick={() => {
                  onFold();
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="m8.006 21.308l-1.064-1.064L15.187 12L6.942 3.756l1.064-1.064L17.314 12z"
                  />
                </svg>
              </div>
              <div className="aside-nav">
                <div className="nav-item">
                  <div className="nav-label">
                    PRISM:ON <small>&lt;2025.09&gt;</small>
                  </div>
                  <div className="nav-gnb">
                    <Link
                      route="/article/prismon-news"
                      className={cn('gnb-item', {
                        active: active === 'prismon-news',
                      })}
                    >
                      <div className="gnb-label">
                        <div className="gnb-text">소식</div>
                        <div className="gnb-arrow"></div>
                      </div>
                    </Link>
                    <div className="gnb-item">
                      <div className="gnb-label">
                        <div className="gnb-text">애널리틱스</div>
                        <div className="gnb-icon">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fill="currentColor"
                              d="M6.4 18L5 16.6L14.6 7H6V5h12v12h-2V8.4z"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="nav-item">
                  <div className="nav-label">시스템</div>
                  <div className="nav-gnb">
                    <div
                      className={cn('gnb-item', { active: active === 'admin' })}
                    >
                      <Link className="gnb-label" route="/admin">
                        <div className="gnb-text">관리자 계정</div>
                        <div className="gnb-arrow"></div>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {!loading && (
            <div className={cn('main-content', { [background]: background })}>
              <div
                className={cn('content-container', {
                  [size]: size,
                })}
              >
                {children}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
