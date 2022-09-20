/* eslint-disable @next/next/no-img-element */
import { useState } from 'react';
import { IItem } from '../../../variables/models';

import { useStore } from '../../organisms/storeProvider/storeProvider';

import styles from './icon.module.scss';

const Icon = (props: IItem) => {
  const { windowStore } = useStore();
  const { name, iconUrl, window } = props;

  const [click] = useState(typeof Audio !== 'undefined' && new Audio('/sounds/click.mp3'));

  const openWindow = () => {
    click && click.play();
    windowStore.openWindow(window);
  };

  return (
    <div className={styles.icon} onClick={openWindow}>
      {iconUrl != null && <img src={iconUrl} alt={name} width={50} height={50} />}

      <span>{name.toLowerCase()}</span>
    </div>
  );
};

export default Icon;
