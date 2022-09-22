import { useMemo, useState } from 'react';
import { observer } from 'mobx-react-lite';

import { useWindowSize } from '../../../hooks/useWindowSize';
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
  const { windowStore, uiStore } = useStore();
  const { windows } = windowStore;
  const { items = [] } = props;

  const size = useWindowSize();

  const buttonWidth = useMemo(() => {
    if (size.width < 750) return Size.S;
    if (size.width < 1100) return Size.M;
    return Size.L;
  }, [size]);

  const toggleMenuVisibility = () => {
    if (items?.length === 0) return;
    uiStore.toggleMenu();
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
        <div className={styles.footerWindowButtons}>
          {windows?.map((window, index) => (
            <Button
              key={index}
              label={window.title}
              icon={window.iconUrl}
              border={Position.Right}
              size={buttonWidth}
              pattern={'stripes'}
              active={!window.layout.minimised}
              onClick={() => toggleWindowVisibility(window)}
            />
          ))}
        </div>
      </div>
      <Clock />

      <PopupMenu items={items} />
    </footer>
  );
};

export default observer(Footer);
