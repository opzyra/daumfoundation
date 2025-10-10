import { useEffect, useState } from 'react';

import lodash from 'lodash';

export const device = {
  mobile: 767,
  tablet: 1024,
  laptop: 1440,
  desktop: 1920,
};

export const breakpoint = {
  mobile: `@media (max-width: ${device.mobile}px)`,
  tablet: `@media (max-width: ${device.tablet}px)`,
  laptop: `@media (max-width: ${device.laptop}px)`,
  desktop: `@media (max-width: ${device.desktop}px)`,
};

export function useDevice() {
  const [media, setMedia] = useState<
    'mobile' | 'tablet' | 'laptop' | 'desktop'
  >();

  useEffect(() => {
    const handleResize = lodash.throttle(() => {
      if (
        window.matchMedia(
          `(min-width: ${device.tablet}px) and (max-width: ${device.laptop}px)`,
        ).matches
      ) {
        setMedia('laptop');
        return;
      }

      if (
        window.matchMedia(
          `(min-width: ${device.mobile}px) and (max-width: ${device.tablet}px)`,
        ).matches
      ) {
        setMedia('tablet');
        return;
      }

      if (window.matchMedia(`(max-width: ${device.mobile}px)`).matches) {
        setMedia('mobile');
        return;
      }

      setMedia('desktop');
    }, 0);

    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return {
    mobile: media === 'mobile',
    tablet: media === 'tablet',
    laptop: media === 'laptop',
    desktop: media === 'desktop',
    portable: media === 'mobile' || media === 'tablet',
  };
}
