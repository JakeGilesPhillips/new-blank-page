/* eslint-disable @next/next/no-img-element */
import { observer } from 'mobx-react-lite';
import { useStore } from '../../organisms/storeProvider/storeProvider';
import { PopupType, Position, Size } from '../../../variables/enums';
import Bar from '../../atoms/bar/bar';
import Button from '../../atoms/button/button';

import styles from './popupMessage.module.scss';
import { CSSProperties, useMemo } from 'react';

const PopupMessage = () => {
  const { uiStore } = useStore();
  const { popupMessage } = uiStore;

  const close = () => {
    if (popupMessage?.button?.onClick) popupMessage.button.onClick();

    uiStore.togglePopupMessage();
    uiStore.toggleMenu(false);
  };

  const backgroundColor: CSSProperties = useMemo(() => {
    if (popupMessage?.background === false) return { background: 'none' };
    return {};
  }, [popupMessage]);

  const icon: string = useMemo(() => {
    switch (popupMessage?.type) {
      case PopupType.Error:
        return '/icons/error.png';
      case PopupType.Warning:
        return '/icons/warning.png';
    }
    return '/icons/bell.png';
  }, [popupMessage]);

  const label: string = useMemo(() => {
    switch (popupMessage?.type) {
      case PopupType.Error:
        return 'ERROR';
      case PopupType.Warning:
        return 'Warning';
    }
    return 'Alert';
  }, [popupMessage]);

  if (!popupMessage) return <></>;
  return (
    <div className={styles.popupMessage} style={{ ...backgroundColor }}>
      <div id={styles.popupMessageInner} className={popupMessage.type == PopupType.Error ? styles.shake : ''}>
        <Bar border={Position.Bottom}>
          <div className={styles.popupMessageIcon}>
            <img src={icon} width={30} height={30} alt="icon" />
          </div>
          <div className={styles.popupMessageTitle}>
            <span>{label}</span>
          </div>
          <Button label="x" size={Size.S} border={Position.Left} pattern="stripes" onClick={close} />
        </Bar>
        <span className={styles.popupMessageMessage}>{popupMessage.message}</span>
        <div className={styles.popupMessageButton}>
          <Button
            label={popupMessage?.button?.label ?? 'ok'}
            size={popupMessage.button?.size ?? Size.M}
            pattern="dots"
            onClick={close}
          />
        </div>
      </div>
    </div>
  );
};

export default observer(PopupMessage);
