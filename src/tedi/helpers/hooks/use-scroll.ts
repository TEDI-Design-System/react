import throttle from 'lodash-es/throttle';
import { useContext, useEffect, useState } from 'react';

import { StyleContext } from '../../providers/style-provider/style-provider';

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
  const { scrollContainer } = useContext(StyleContext);
  const container = element ?? scrollContainer;

  useEffect(() => {
    if (container === null) return undefined;

    const target = container ?? document.documentElement;
    const eventTarget = container ?? window;

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
  }, [container]);

  return scroll;
};
