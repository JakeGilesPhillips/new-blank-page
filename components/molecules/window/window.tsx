import { ReactNode } from 'react';
import { Rnd } from 'react-rnd';
import { observer } from 'mobx-react-lite';

import { IWindow } from '../../../variables/models';
import { Position } from '../../../variables/enums';

import Button from '../../atoms/button/button';
import { useStore } from '../../organisms/storeProvider/storeProvider';

import styles from './window.module.scss';
import Bar from '../../atoms/bar/bar';
import { useWindowSize } from '../../../hooks/useWindowSize';

export interface WindowProps extends IWindow {
  topBarContent?: ReactNode;
  windowContent?: ReactNode;
  botBarContent?: ReactNode;
  draggable?: boolean;
  resizable?: boolean;
  hideButtons?: boolean;
}

const Window = (props: WindowProps) => {
  const { windowStore, uiStore } = useStore();
  const {
    id = 0,
    title = '',
    topBarContent,
    windowContent,
    botBarContent,
    draggable = true,
    resizable = true,
    hideButtons = false,
    layout,
  } = props;
  const { size, position, minimised, zIndex } = layout;

  const bringWindowToFront = () => {
    uiStore.toggleMenu(false);
    windowStore.bringWindowToTop(id);
  };

  const toggleWindow = () => {
    uiStore.toggleMenu(false);
    windowStore.toggleWindow(id, true);
  };

  const closeWindow = () => {
    uiStore.toggleMenu(false);
    windowStore.closeWindow(id);
  };

  return (
    <Rnd
      className={styles.window}
      bounds="parent"
      default={{
        ...position,
        width: size?.width ?? `90%`,
        height: size?.height ?? `90%`,
      }}
      style={{
        zIndex,
        opacity: minimised ? '0' : '1',
        pointerEvents: minimised ? 'none' : 'all',
      }}
      dragGrid={[30, 30]}
      onMouseDown={() => bringWindowToFront()}
      onDragStop={(e, d) => windowStore.updateWindowPosition(id, d)}
      onResizeStart={() => bringWindowToFront()}
      onResizeStop={(ev, d, e) => windowStore.updateWindowSize(id, e.style)}
      enableResizing={resizable}
      disableDragging={!draggable}
      dragHandleClassName={styles.windowTopBarTitle}
    >
      <div className={styles.windowTopBar}>
        <div className={styles.windowTopBarTitle}>
          <span>{title}</span>
        </div>
        {!hideButtons && (
          <div className={styles.windowTopBarButtons}>
            <Button label="-" pattern="stripes" border={Position.Left} onClick={toggleWindow} />
            <Button label="x" pattern="stripes" border={Position.Left} onClick={closeWindow} />
          </div>
        )}
      </div>

      {topBarContent}
      <div className={styles.windowMain}>{windowContent}</div>
      {botBarContent}
    </Rnd>
  );
};

export default observer(Window);
