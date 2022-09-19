import { PropsWithChildren, ReactNode } from 'react';

import styles from './window.module.scss';

export interface WindowProps {
  title?: string;
  topBarContent?: ReactNode;
  windowContent?: ReactNode;
  visible?: boolean;
  minimised?: boolean;
  onClose?: () => void;
  onMinimise?: () => void;
}

const Window = (props: WindowProps) => {
  const { title = '', topBarContent, windowContent, visible, minimised, onClose, onMinimise } = props;
  return (
    <div className={styles.window}>
      <div className={styles.windowTopBar}>
        <div className={styles.windowTopBarTitle}>
          <span>{title}</span>
        </div>
        <div className={styles.windowTopBarButtons}>
          <div className={styles.windowTopBarButton}>
            <span>-</span>
          </div>
          <div className={styles.windowTopBarButton}>
            <span>x</span>
          </div>
        </div>
      </div>

      {topBarContent}

      <div className={styles.windowMain}>{windowContent}</div>
    </div>
  );
};

export default Window;
