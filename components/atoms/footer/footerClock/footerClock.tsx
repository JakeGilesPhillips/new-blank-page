import { format } from 'date-fns';
import { useEffect, useState } from 'react';

import styles from './FooterClock.module.scss';

const FooterClock = () => {
  const [time, setTime] = useState<Date>(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.footerClock}>
      <span>{format(time, 'H:mm:ss')}</span>
    </div>
  );
};

export default FooterClock;
