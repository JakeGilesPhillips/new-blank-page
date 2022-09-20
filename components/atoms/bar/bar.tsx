import { PropsWithChildren } from 'react';

import styles from './bar.module.scss';

const Bar = (props: PropsWithChildren) => {
  const { children } = props;

  return <div className={styles.bar}>{children}</div>;
};

export default Bar;
