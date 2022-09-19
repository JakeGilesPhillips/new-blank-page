import { useEffect, useState } from 'react';
import styles from './browserBar.module.scss';

interface BrowserBarProps {
  iframeUrl?: string;
  setIframeUrl?: (url: string) => void;
  onRefresh?: () => void;
}

const BrowserBar = (props: BrowserBarProps) => {
  const { iframeUrl = '', setIframeUrl = () => null, onRefresh = () => null } = props;

  const [url, setUrl] = useState<string>(iframeUrl);

  useEffect(() => {
    setUrl(iframeUrl);
  }, [iframeUrl]);

  const onChangeUrl = (ev: any) => {
    setUrl(ev.nativeEvent.target.value);
  };

  const onEnterUrl = () => {
    setIframeUrl(url);
  };

  const handleKeyDown = (ev: any) => {
    if (ev.key === 'Enter') onEnterUrl();
  };

  return (
    <div className={styles.browserBar}>
      <div className={styles.browserBarButtons}>
        <div className={styles.browserBarButton}>
          <span>←</span>
        </div>
        <div className={styles.browserBarButton}>
          <span>→</span>
        </div>
        <div className={styles.browserBarButton} onClick={onRefresh}>
          <span>⟳</span>
        </div>
      </div>
      <div className={styles.browserBarInput}>
        <input value={url} onChange={onChangeUrl} onKeyDown={handleKeyDown} />
      </div>
      <div className={styles.browserBarSearch} onClick={onEnterUrl}>
        <span>GO</span>
      </div>
    </div>
  );
};

export default BrowserBar;
