import './error.css';

interface ErrorProps {
  code: 404 | 500;
}

function Error({ code }: ErrorProps) {
  return (
    <div className="ui-error">
      <div className="container">
        <div className="error-code">{code}</div>
        <div className="error-title">페이지를 찾을 수 없습니다.</div>
        <div className="error-description">
          존재하지 않는 주소를 입력하셨거나,
          <br />
          요청하신 페이지의 주소가 변경, 삭제되어 찾을 수 없습니다.
        </div>
        <div className="error-action">
          <a href={process.env.NEXT_PUBLIC_URL_DOMAIN || '/'}>
            <span>메인으로</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1.2em"
              height="1.2em"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="m13.692 17.308l-.707-.72l4.088-4.088H5v-1h12.073l-4.088-4.088l.707-.72L19 12z"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Error;
