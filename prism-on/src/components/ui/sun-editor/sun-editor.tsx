import { useEffect, useRef, useState } from 'react';

import dynamic from 'next/dynamic';

import cn from 'classnames';
import SunEditorCore from 'suneditor/src/lib/core';

import './sun-editor.css';

interface SunEditorProps {
  value?: string;
  inline?: boolean;
  blur?: boolean;
  height?: string;
  name?: string;
  container?: boolean;
  status?: string;
  focus?: boolean;
  onChange: (content: string) => void;
  onUpload?: ({ file }: { file: File }) => Promise<any>;
}

const Editor = dynamic(() => import('suneditor-react'), { ssr: false });

export function SunEditor({
  value,
  inline = false,
  blur = true,
  container = false,
  status = '',
  height = '100%',
  name,
  focus,
  onChange,
  onUpload,
}: SunEditorProps) {
  const editor = useRef<SunEditorCore>(null);

  const [focused, setFocused] = useState<boolean>();

  const onBlur = (event: FocusEvent, editorContents: string) => {
    setFocused(false);
    onChange(editorContents);
  };

  const onFocus = () => {
    setFocused(true);
  };

  const getSunEditorInstance = (sunEditor: SunEditorCore) => {
    editor.current = sunEditor;
  };

  const onImageUploadBefore = (
    files: Array<File>,
    info: object,
    uploadHandler: Function,
  ) => {
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      onUpload &&
        onUpload({ file }).then((value) => {
          uploadHandler({
            result: [
              { url: value.path, name: value.originalname, size: value.size },
            ],
          });
        });
    }

    return undefined;
  };

  const showController = (name: string, controllers: any[]) => {
    controllers[controllers.length - 2].style.display = 'flex';
  };

  // 에디터 포커스 처리
  useEffect(() => {
    if (focus) {
      editor.current?.core.focus();
    }
  }, [focus]);

  return (
    <div className={cn('ui-editor', { inline, focused, [status]: status })}>
      <Editor
        lang="ko"
        name={name}
        autoFocus={false}
        onImageUploadBefore={onImageUploadBefore}
        showController={showController}
        setContents={value}
        onChange={onChange}
        onBlur={onBlur}
        onFocus={onFocus}
        setOptions={{
          imageMultipleFile: true,
          videoFileInput: false,
          resizeEnable: true,
          imageUrlInput: false,
          popupDisplay: container ? 'local' : 'full',
          fontSizeUnit: 'px',
          defaultStyle: `font-size: ${inline ? 14 : 16}px`,
          imageUploadUrl: 'a',
          fontSize: [10, 11, 12, 14, 16, 18, 24, 30, 38],
          height,
          minHeight: height,
          buttonList: [
            [
              'fontSize',
              'bold',
              'underline',
              'italic',
              'strike',
              'subscript',
              'superscript',
            ],
            ['fontColor', 'hiliteColor', 'removeFormat'],
            ['outdent', 'indent', 'align', 'horizontalRule', 'list'],
            onUpload ? ['table', 'link', 'image', 'video'] : ['table', 'link'],
            '/',
            ['fullScreen', 'showBlocks', 'codeView', 'preview', 'print'],
            ['undo', 'redo'],
          ],
        }}
        getSunEditorInstance={getSunEditorInstance}
      />
    </div>
  );
}
