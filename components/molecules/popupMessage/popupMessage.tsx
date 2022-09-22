import { observer } from 'mobx-react-lite';
import { useStore } from '../../organisms/storeProvider/storeProvider';
import { Position, Size } from '../../../variables/enums';
import Bar from '../../atoms/bar/bar';
import Button from '../../atoms/button/button';

import styles from './popupMessage.module.scss';

const PopupMessage = () => {
  const { uiStore } = useStore();
  const { popupMessage } = uiStore;

  const close = () => {
    uiStore.togglePopupMessage();
    uiStore.toggleMenu(false);
  };

  if (!popupMessage) return <></>;
  return (
    <div className={styles.popupMessage}>
      <div className={styles.popupMessageInner}>
        <Bar border={Position.Bottom}>
          <div className={styles.popupMessageTitle}>
            <span>Alert</span>
          </div>
          <Button label="x" size={Size.S} border={Position.Left} pattern="stripes" onClick={close} />
        </Bar>
        <span className={styles.popupMessageMessage}>{popupMessage.message}</span>
        <div className={styles.popupMessageButton}>
          <Button label={popupMessage?.button ?? 'OK'} pattern="dots" onClick={close} />
        </div>
      </div>
    </div>
  );
};

export default observer(PopupMessage);
