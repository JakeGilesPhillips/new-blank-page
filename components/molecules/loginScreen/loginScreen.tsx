/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from 'react';
import { TypeAnimation } from 'react-type-animation';
import styles from './loginScreen.module.scss';

const LoginScreen = () => {
  const [password, setPassword] = useState<string>('');

  return (
    <div className={styles.loginScreen}>
      <img src={'/icons/page.png'} alt="login" width={50} height={50} />
      <span className={styles.username}>New Blank Page</span>
      <div className={styles.password}>
        <span className={styles.passwordTitle}>Password:</span>
        <div className={styles.passwordBox}>
          <TypeAnimation
            sequence={[
              3000,
              '*',
              300,
              '**',
              300,
              '***',
              200,
              '****',
              400,
              '*****',
              200,
              '******',
              500,
              '*******',
              500,
              '******',
              100,
              '*****',
              100,
              '****',
              400,
              '*****',
              300,
              '******',
              200,
              '*******',
              300,
              '********',
              200,
              '*********',
              200,
              '**********',
            ]}
            wrapper="span"
            cursor
          />
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
