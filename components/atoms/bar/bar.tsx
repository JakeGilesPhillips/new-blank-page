import { CSSProperties, PropsWithChildren, useMemo } from 'react';
import { Position } from '../../../variables/enums';

import styles from './bar.module.scss';

interface BarProps extends PropsWithChildren {
  border?: Position;
}

const Bar = (props: BarProps) => {
  const { border, children } = props;

  const _border: CSSProperties = useMemo(() => {
    if (border === Position.Top) return { borderTopStyle: 'solid' };
    if (border === Position.Bottom) return { borderBottomStyle: 'solid' };
    return {};
  }, [border]);

  return (
    <div className={styles.bar} style={{ ..._border }}>
      {children}
    </div>
  );
};

export default Bar;
