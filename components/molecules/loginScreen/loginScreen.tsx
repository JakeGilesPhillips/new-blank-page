/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import { useState } from 'react';
import { TypeAnimation } from 'react-type-animation';
import styles from './loginScreen.module.scss';

interface LoginScreenProps {
  onComplete: () => void;
}

const LoginScreen = (props: LoginScreenProps) => {
  const { onComplete } = props;

  const [click] = useState(typeof Audio !== 'undefined' && new Audio('/sounds/click.mp3'));
  const [opacity, setOpacity] = useState<number>(1.0);

  const play = () => {
    click && click.play();
  };

  return (
    <div className={styles.loginScreen} style={{ opacity }}>
      <img src={'/icons/page.png'} alt="login" width={50} height={50} />
      <span className={styles.username}>New Blank Page</span>
      <div className={styles.password}>
        <span className={styles.passwordTitle}>Password:</span>
        <div className={styles.passwordBox}>
          <TypeAnimation
            sequence={[
              1000,
              '*',
              play,
              300,
              '**',
              play,
              300,
              '***',
              play,
              200,
              '****',
              play,
              400,
              '*****',
              play,
              200,
              '******',
              play,
              500,
              '*******',
              play,
              500,
              '******',
              play,
              100,
              '*****',
              play,
              100,
              '****',
              play,
              400,
              '*****',
              play,
              300,
              '******',
              play,
              200,
              '*******',
              play,
              300,
              '********',
              play,
              200,
              '*********',
              play,
              600,
              () => setOpacity(0.0),
              1000,
              onComplete,
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
