/* eslint-disable @next/next/no-img-element */
import { PropsWithChildren } from 'react';
import LoginScreen from '../../molecules/loginScreen/loginScreen';

import styles from './crt.module.scss';

interface CrtProps extends PropsWithChildren {
  showIntro: boolean;
}

const Crt = (props: CrtProps) => {
  const { showIntro, children } = props;

  return (
    <div className={styles.crt}>
      {showIntro && (
        <>
          <div className={styles.crtTurnOn} />
          <LoginScreen />
        </>
      )}
      <div className={styles.crtMain} style={{ animationDelay: showIntro ? '8s' : '1.0s' }}>
        {children}
      </div>
    </div>
  );
};

export default Crt;
