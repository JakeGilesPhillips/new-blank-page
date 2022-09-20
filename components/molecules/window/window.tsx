import { ReactNode } from 'react';
import { Rnd } from 'react-rnd';
import { observer } from 'mobx-react-lite';

import { IWindow } from '../../../variables/models';
import { Position, Size } from '../../../variables/enums';

import Button from '../../atoms/button/button';
import { useStore } from '../../organisms/storeProvider/storeProvider';

import styles from './window.module.scss';

export interface WindowProps extends IWindow {
  topBarContent?: ReactNode;
  windowContent?: ReactNode;
}

const Window = (props: WindowProps) => {
  const { windowStore } = useStore();
  const { id = 0, title = '', topBarContent, windowContent, layout } = props;
  const { size, position, minimised, zIndex } = layout;

  const toggleWindow = () => windowStore.toggleWindow(id, true);
  const closeWindow = () => windowStore.closeWindow(id);

  return (
    <Rnd
      className={styles.window}
      bounds="parent"
      default={{
        x: position?.x ?? 0,
        y: position?.y ?? 0,
        width: size?.width ?? `90%`,
        height: size?.height ?? `90%`,
      }}
      style={{ zIndex, opacity: minimised ? '0' : '1', pointerEvents: minimised ? 'none' : 'all' }}
      dragGrid={[30, 30]}
      onMouseDown={() => windowStore.bringWindowToTop(id)}
      onDragStop={(e, d) => windowStore.updateWindowPosition(id, d)}
      onResizeStart={() => windowStore.bringWindowToTop(id)}
      onResizeStop={(ev, d, e) => windowStore.updateWindowSize(id, e.style)}
      dragHandleClassName={styles.windowTopBarTitle}
    >
      <div className={styles.windowTopBar}>
        <div className={styles.windowTopBarTitle}>
          <span>{title}</span>
        </div>
        <div className={styles.windowTopBarButtons}>
          <Button label="-" pattern="stripes" border={Position.Left} onClick={toggleWindow} />
          <Button label="x" pattern="stripes" border={Position.Left} onClick={closeWindow} />
        </div>
      </div>

      {topBarContent}

      <div className={styles.windowMain}>{windowContent}</div>
    </Rnd>
  );
};

export default observer(Window);
