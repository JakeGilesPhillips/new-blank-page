/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';

import { defaultLayout } from '../../../variables/constants';
import { IItem, IWindow } from '../../../variables/models';
import { WindowType } from '../../../variables/enums';
import { useStore } from '../storeProvider/storeProvider';

import HomeWindow from './homeWindow/homeWindow';
import FolderWindow from './folderWindow/folderWindow';
import BrowserWindow from './browserWindow/browserWindow';
import DocumentWindow from './documentWindow/documentWindow';

import styles from './windows.module.scss';
import ErrorWindow from './errorWindow/errorWindow';
import EmailWindow from './emailWindow/emailWindow';
import Window from '../../molecules/window/window';
import TerminalWindow from './terminalWindow/terminalWindow';

interface WindowsProps {
  items: IItem[];
  setVisited: (value: any) => void;
}

const Windows = (props: WindowsProps) => {
  const { items, setVisited } = props;

  const { windowStore, uiStore } = useStore();
  const { showStartUp } = uiStore;
  const { windows } = windowStore;

  const introTime = showStartUp ? 11000 : 2000;
  const [click] = useState(typeof Audio !== 'undefined' && new Audio('/sounds/click.mp3'));
  const [ready, setReady] = useState<boolean>(false);

  useEffect(() => {
    const timeout = setTimeout(openFirstWindow, introTime);
    return () => clearTimeout(timeout);
  }, [showStartUp, items, windowStore]);

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
      case WindowType.Mail:
        return <EmailWindow key={index} {...window} />;
    }
    return <ErrorWindow key={index} {...window} />;
  };

  return (
    <div className={styles.windows}>
      {windows?.map((window, index) => {
        return buildWindow(index, window);
      })}

      {/* <TerminalWindow /> */}
    </div>
  );
};

export default observer(Windows);
