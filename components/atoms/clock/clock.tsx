import { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';

import { useStore } from '../../organisms/storeProvider/storeProvider';

import styles from './clock.module.scss';

const FooterClock = () => {
  const { timeStore } = useStore();
  const { timeString } = timeStore;

  const [ready, setReady] = useState<boolean>(false);

  useEffect(() => setReady(true), []);

  useEffect(() => {
    timeStore.start();
    return () => timeStore.stop();
  }, [timeStore]);

  return (
    <div className={styles.footerClock}>
      <span>{ready ? timeString : ''}</span>
    </div>
  );
};

export default observer(FooterClock);
