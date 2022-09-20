import { useRef, useState } from 'react';

import BrowserBar from '../../../molecules/browserBar/browserBar';
import Window, { WindowProps } from '../../../molecules/window/window';

import styles from './browserWindow.module.scss';

const BrowserWindow = (props: WindowProps) => {
  const { url = '' } = props;

  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const [iframeUrl, setIframeUrl] = useState<string>(url);
  const [iframeState, setIframeState] = useState<number>(0);

  const refresh = () => {
    setIframeState(iframeState + 1);
  };

  return (
    <Window
      {...props}
      topBarContent={<BrowserBar iframeUrl={iframeUrl} setIframeUrl={setIframeUrl} onRefresh={refresh} />}
      windowContent={<iframe key={iframeState} className={styles.browserIframe} ref={iframeRef} src={iframeUrl} />}
    />
  );
};

export default BrowserWindow;
