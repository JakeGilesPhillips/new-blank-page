/* eslint-disable @next/next/no-img-element */
import { useState } from 'react';
import { IItem } from '../../../variables/models';

import { useStore } from '../../organisms/storeProvider/storeProvider';

import styles from './icon.module.scss';

const Icon = (props: IItem) => {
  const { windowStore, uiStore } = useStore();
  const { name, iconUrl, link, window: _window } = props;

  const [click] = useState(typeof Audio !== 'undefined' && new Audio('/sounds/click.mp3'));

  const onIconClick = () => {
    click && click.play();
    uiStore.toggleMenu(false);

    if (link != null) window.open(link, '_blank', 'noopener,noreferrer');
    else windowStore.openWindow(_window);
  };

  return (
    <div className={styles.icon} onClick={onIconClick}>
      {iconUrl != null && <img src={iconUrl} alt={name} width={50} height={50} />}

      <span>{name.toLowerCase()}</span>
    </div>
  );
};

export default Icon;
