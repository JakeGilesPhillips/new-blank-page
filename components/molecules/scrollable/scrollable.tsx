/* eslint-disable react-hooks/exhaustive-deps */
import { PropsWithChildren, UIEvent, useEffect, useRef } from 'react';
import { DraggableData, ResizableDelta, Rnd } from 'react-rnd';

import { IWindow } from '../../../variables/models';
import { useStore } from '../../organisms/storeProvider/storeProvider';

import styles from './scrollable.module.scss';

interface ScrollableProps extends PropsWithChildren {
  window: IWindow;
  hideScrollbar?: boolean;
}

const Scrollable = (props: ScrollableProps) => {
  const { windowStore } = useStore();
  const { window, hideScrollbar = false, children } = props;

  const pageRef = useRef<HTMLDivElement | null>(null);
  const scrollableRef = useRef<Rnd | null>(null);
  const scrollBarRef = useRef<HTMLDivElement | null>(null);
  const scrollBarWrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    onScroll(undefined, window.layout.scroll);
    onDrag(undefined, window.layout.scroll);
  }, [window, pageRef, scrollBarRef, scrollableRef, scrollBarWrapperRef]);

  const onScroll = (event?: UIEvent<HTMLDivElement, any>, percentage?: number) => {
    if (!event || !event.currentTarget) return;
    if (!scrollableRef.current || !scrollBarRef.current || !scrollBarWrapperRef.current) return;

    // Get calculations
    const { clientHeight: barHeight } = scrollBarRef.current;
    const { scrollHeight: wrapperHeight } = scrollBarWrapperRef.current;
    const { scrollTop, scrollHeight, clientHeight } = event.currentTarget;

    // Scroll bar to percentage
    const perc = percentage ?? scrollTop / (scrollHeight - clientHeight);
    scrollableRef.current.updatePosition({ x: 0, y: (wrapperHeight - barHeight) * perc });
    updateScroll(perc);
  };

  const onDrag = (data?: DraggableData, percentage?: number) => {
    if (!data || !data.y) return;
    if (!pageRef.current || !scrollBarRef.current || !scrollBarWrapperRef.current) return;

    // Get calculations
    const { clientHeight: barHeight } = scrollBarRef.current;
    const { scrollHeight: wrapperHeight } = scrollBarWrapperRef.current;
    const { scrollHeight: pageHeight, clientHeight: pageSize } = pageRef.current;

    // Scroll page to percentage
    const perc = percentage ?? data.y / (wrapperHeight - barHeight);
    pageRef.current?.scrollTo(0, (pageHeight - pageSize) * perc);
    updateScroll(perc);
  };

  const updateScroll = (perc: number) => {
    if (!window || !window.id) return;
    windowStore.updateWindowScroll(window.id, perc);
  };

  return (
    <div className={styles.scrollable}>
      <div className={styles.scrollableContentWrapper} ref={pageRef} onScroll={onScroll}>
        {children}
      </div>
      {!hideScrollbar && (
        <div className={styles.scrollableScrollbarWrapper} ref={scrollBarWrapperRef}>
          <Rnd
            ref={scrollableRef}
            onDrag={(e, d) => onDrag(d)}
            className={styles.window}
            bounds="parent"
            enableResizing={false}
            dragAxis="y"
            default={{ x: 0, y: 0, width: '100%', height: '50%' }}
            dragHandleClassName={styles.scrollableScrollbar}
          >
            <div className={styles.scrollableScrollbar} ref={scrollBarRef} />
          </Rnd>
        </div>
      )}
    </div>
  );
};

export default Scrollable;
