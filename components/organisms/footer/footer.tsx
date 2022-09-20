import { useState } from 'react';
import { observer } from 'mobx-react-lite';

import { IItem, IWindow } from '../../../variables/models';
import { Position, Size } from '../../../variables/enums';
import { useStore } from '../storeProvider/storeProvider';

import Clock from '../../atoms/clock/clock';
import Button from '../../atoms/button/button';
import PopupMenu from '../../molecules/popupMenu/popupMenu';

import styles from './footer.module.scss';

interface FooterProps {
  items?: IItem[];
}

const Footer = (props: FooterProps) => {
  const { windowStore } = useStore();
  const { windows } = windowStore;
  const { items = [] } = props;

  const [visible, setVisible] = useState<boolean>(false);

  const toggleMenuVisibility = () => {
    if (items?.length === 0) return;
    setVisible(!visible);
  };

  const toggleWindowVisibility = (window: IWindow) => {
    windowStore.toggleWindow(window?.id ?? -1);
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.footerButtons}>
        <Button
          label="MENU"
          bold
          border={Position.Right}
          size={Size.XL}
          pattern={'dots'}
          onClick={toggleMenuVisibility}
        />
        {windows?.map((window, index) => (
          <Button
            key={index}
            label={window.title}
            border={Position.Right}
            size={Size.L}
            pattern={'stripes'}
            active={!window.layout.minimised}
            onClick={() => toggleWindowVisibility(window)}
          />
        ))}
      </div>
      <Clock />

      <PopupMenu items={items} visible={visible} setVisible={toggleMenuVisibility} />
    </footer>
  );
};

export default observer(Footer);
