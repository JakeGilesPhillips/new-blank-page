/* eslint-disable @next/next/no-img-element */
import Window, { WindowProps } from '../../../molecules/window/window';

import styles from './errorWindow.module.scss';

const ErrorWindow = (props: WindowProps) => {
  const { items = [] } = props;

  return (
    <Window
      {...props}
      windowContent={
        <div className={styles.errorWindow}>
          <img src={'/icons/brokenpage.png'} alt="error" width={50} height={50} />
          <span className={styles.error}>404</span>
        </div>
      }
    />
  );
};

export default ErrorWindow;
