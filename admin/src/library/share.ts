const pathname = process.env.NEXT_PUBLIC_URL_SHARE;

interface KaKaoShareProps {
  description: string;
  imageUrl: string;
  link: string;
}

const kakao = ({ description, imageUrl, link }: KaKaoShareProps) => {
  // @ts-ignore
  window.Kakao.Link.sendDefault({
    objectType: 'feed',
    content: {
      title: '',
      description,
      imageUrl,
      link: {
        mobileWebUrl: link,
        webUrl: link,
      },
    },
    buttons: [
      {
        title: '확인하기',
        link: {
          mobileWebUrl: link,
          webUrl: link,
        },
      },
    ],
    // 카카오톡 미설치 시 카카오톡 설치 경로이동
    installTalk: true,
  });
};

const facebook = (url: string) => {
  const shareUrl = `${pathname}${encodeURIComponent(url)}`;

  window.open('http://www.facebook.com/sharer.php?u=' + shareUrl);
};

const twitter = (url: string) => {
  const shareUrl = `${pathname}${encodeURIComponent(url)}`;

  window.open(`https://twitter.com/intent/tweet?url=${shareUrl}`);
};

const whatsapp = (url: string) => {
  const shareUrl = `${pathname}${encodeURIComponent(url)}`;

  window.open(`https://wa.me/?text=${shareUrl}`);
};

const link = (url: string) => {
  const content = `${pathname}${url}`;

  const textArea = document.createElement('textarea');
  textArea.value = content;
  document.body.appendChild(textArea);
  textArea.focus({ preventScroll: true });
  textArea.select();
  try {
    document.execCommand('copy');
  } catch (err) {
    console.error('Unable to copy to clipboard', err);
  }
  document.body.removeChild(textArea);
};

const share = { kakao, facebook, twitter, whatsapp, link };

export default share;
