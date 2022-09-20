/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';

import { IItem, IWindow } from '../../../variables/models';
import { WindowType } from '../../../variables/enums';
import { useStore } from '../storeProvider/storeProvider';

import HomeWindow from './homeWindow/homeWindow';
import FolderWindow from './folderWindow/folderWindow';
import BrowserWindow from './browserWindow/browserWindow';
import DocumentWindow from './documentWindow/documentWindow';

import styles from './windows.module.scss';
import ErrorWindow from './errorWindow/errorWindow';

interface WindowsProps {
  items: IItem[];
  showIntro: boolean;
  setVisited: (value: any) => void;
}

const Windows = (props: WindowsProps) => {
  const { items, showIntro, setVisited } = props;

  const { windowStore } = useStore();
  const { windows } = windowStore;

  const introTime = showIntro ? 11000 : 2000;
  const [click] = useState(typeof Audio !== 'undefined' && new Audio('/sounds/click.mp3'));

  useEffect(() => {
    const timeout = setTimeout(openFirstWindow, introTime);
    return () => clearTimeout(timeout);
  }, [showIntro, items, windowStore]);

  const openFirstWindow = () => {
    click && click.play();
    windowStore.openWindow(items?.[0]?.window);
    setVisited(true);
  };

  const buildWindow = (index: number, window: IWindow): JSX.Element => {
    switch (window?.type) {
      case WindowType.Home:
        return <HomeWindow key={index} {...window} />;
      case WindowType.Folder:
        return <FolderWindow key={index} {...window} />;
      case WindowType.Page:
        return <DocumentWindow key={index} {...window} />;
      case WindowType.Browser:
        return <BrowserWindow key={index} {...window} />;
      case WindowType.Error:
      case WindowType.Mail:
        return <ErrorWindow key={index} {...window} />;
    }
  };

  return (
    <div className={styles.windows}>
      {windows?.map((window, index) => {
        return buildWindow(index, window);
      })}
    </div>
  );
};

export default observer(Windows);
