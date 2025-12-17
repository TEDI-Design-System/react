import throttle from 'lodash-es/throttle';
import { useEffect, useState } from 'react';

type ScrollState = {
  scrollTop: number;
  scrollHeight: number;
  clientHeight: number;
};

const INITIAL_SCROLL: ScrollState = {
  scrollTop: 0,
  scrollHeight: 0,
  clientHeight: 0,
};

export const useScroll = (element?: HTMLElement) => {
  const [scroll, setScroll] = useState<ScrollState>(INITIAL_SCROLL);

  useEffect(() => {
    const target = element ?? document.documentElement;
    const eventTarget = element ?? window;

    const updateScroll = () => {
      setScroll({
        scrollTop: target.scrollTop,
        scrollHeight: target.scrollHeight,
        clientHeight: target.clientHeight,
      });
    };

    const listenToScroll = throttle(updateScroll, 50);

    eventTarget.addEventListener('scroll', listenToScroll);
    updateScroll();

    return () => {
      eventTarget.removeEventListener('scroll', listenToScroll);
      listenToScroll.cancel();
    };
  }, [element]);

  return scroll;
};
