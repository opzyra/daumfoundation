import React from 'react';

import { useRouter } from 'next/router';

import './button-more.css';

interface ButtonMoreProps {
  route?: string;
  text?: string;
}

function ButtonMore({ route, text = '자세히 보기' }: ButtonMoreProps) {
  const router = useRouter();

  return (
    <button
      className="ui-button-more"
      onClick={async () => {
        if (route) {
          await router.push(route);
          return;
        }
      }}
    >
      <div className="more-text">{text}</div>
      <div className="more-arrow">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="m14 18l-1.4-1.45L16.15 13H4v-2h12.15L12.6 7.45L14 6l6 6z"
          />
        </svg>
      </div>
    </button>
  );
}

export default ButtonMore;
