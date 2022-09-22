/* eslint-disable @next/next/no-img-element */
import { observer } from 'mobx-react-lite';
import { PropsWithChildren, useEffect } from 'react';
import { useStore } from '../../organisms/storeProvider/storeProvider';

import EnterScreen from '../../molecules/enterScreen/enterScreen';
import LoginScreen from '../../molecules/loginScreen/loginScreen';

import styles from './crt.module.scss';

const Crt = (props: PropsWithChildren) => {
  const { uiStore } = useStore();
  const { showStartUp, showShutDown, startupState } = uiStore;
  const { children } = props;

  return (
    <div id={styles.crt} className={showShutDown ? '' : styles.on}>
      <div id={styles.crtWrapper} className={showShutDown ? styles.out : ''}>
        {showStartUp ? (
          <div className={styles.crtTurnOn}>
            {startupState === 0 && <EnterScreen onClick={() => uiStore.changeStartupState(1)} />}
            {startupState === 1 && <LoginScreen onComplete={() => uiStore.toggleStartup(false)} />}
          </div>
        ) : (
          <div className={styles.crtMain}>{children}</div>
        )}
      </div>
    </div>
  );
};

export default observer(Crt);
