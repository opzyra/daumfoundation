import jsFileDownload from 'js-file-download';

import instance from 'src/library/axios';
import toastr from 'src/library/toastr';

const download = async (url: string, filename?: string) => {
  try {
    const { data, headers } = await instance.get(url, {
      responseType: 'blob',
    });

    if (!filename) {
      let content = headers['content-disposition'] || '';
      content = content.substring(0, content.length - 1);
      filename = content.replace('attachment; filename="', '');
    }
    jsFileDownload(data, decodeURIComponent(filename || ''));
  } catch (error: any) {
    if (error?.response) {
      const reader = new FileReader();
      reader.onload = function () {
        const error = JSON.parse(reader.result as string);
        toastr.error(error?.message || '파일 다운로드에 실패하였습니다.');
      };
      reader.readAsText(error.response.data);
    }
  }
};

const reader = {
  download,
};

export default reader;
