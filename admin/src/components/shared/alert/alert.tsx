import React from 'react';

import { Modal, ModalFuncProps } from 'antd';

import './alert.css';

const defaultOptions: ModalFuncProps = {
  okText: '확인',
  transitionName: 'fadeIn',
  icon: null,
  okButtonProps: {
    size: 'small',
  },
  cancelButtonProps: {
    size: 'small',
  },
  style: {
    top: '40%',
    transformOrigin: 'top center !important',
  },
};

const info = async (options?: ModalFuncProps) =>
  new Promise((resolve) => {
    Modal.info({
      ...defaultOptions,
      ...options,
      icon: null,
      title: null,
      content: (
        <div className="confirm-alert">
          <div className="alert-icon">{options?.icon}</div>
          <div className="alert-title">{options?.title}</div>
          <div className="alert-content">{options?.content}</div>
        </div>
      ),
      width: '380px',
      footer: false,
      closable: true,
      maskClosable: false,
      onOk: () => resolve(true),
      afterClose: () => resolve(false),
    });
  });

const error = async (options?: ModalFuncProps) =>
  new Promise((resolve) => {
    Modal.error({
      ...defaultOptions,
      ...options,
      onOk: () => resolve(true),
      afterClose: () => resolve(false),
    });
  });

const warn = async (options?: ModalFuncProps) =>
  new Promise((resolve) => {
    Modal.warn({
      ...defaultOptions,
      ...options,
      onOk: () => resolve(true),
      afterClose: () => resolve(false),
    });
  });

const success = async (options?: ModalFuncProps) =>
  new Promise((resolve) => {
    Modal.success({
      ...defaultOptions,
      ...options,
      onOk: () => resolve(true),
      afterClose: () => resolve(false),
    });
  });

const confirm = async (options?: ModalFuncProps) =>
  new Promise((resolve) => {
    Modal.warn({
      ...defaultOptions,
      ...options,
      okCancel: true,
      onOk: () => resolve(true),
      afterClose: () => resolve(false),
    });
  });

const alert = {
  info,
  error,
  success,
  confirm,
  warn,
};

interface AlertProps {
  items: React.ReactNode[];
}

export function Alert({ items }: AlertProps) {
  return (
    <div className="sh-alert">
      <div className="alert-box">
        <div className="alert-description">
          {items.map((item, index) => (
            <div className="alert-item" key={index}>
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default alert;
