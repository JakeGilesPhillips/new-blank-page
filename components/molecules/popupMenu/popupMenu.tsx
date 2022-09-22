import { observer } from 'mobx-react-lite';
import { useWindowSize } from '../../../hooks/useWindowSize';
import { Position, Size } from '../../../variables/enums';
import { IItem } from '../../../variables/models';
import Bar from '../../atoms/bar/bar';

import Button from '../../atoms/button/button';
import { useStore } from '../../organisms/storeProvider/storeProvider';

import styles from './popupMenu.module.scss';

interface PopupMenuProps {
  items: IItem[];
}

const PopupMenu = (props: PopupMenuProps) => {
  const { windowStore, uiStore } = useStore();
  const { menuOpen } = uiStore;
  const { items } = props;

  const size = useWindowSize();
  const wide = size.width < 500;

  const onButtonPress = (item: IItem) => {
    uiStore.toggleMenu(false);
    windowStore.openWindow(item.window);
  };

  if (!menuOpen) return <></>;
  return (
    <div className={styles.popupMenu}>
      {items?.map((item, index) => (
        <Button
          key={index}
          label={item.name}
          border={Position.Bottom}
          size={Size.XL}
          wide={wide}
          pattern="stripes"
          onClick={() => onButtonPress(item)}
        />
      ))}
      <div className={styles.popupMenuDefaults}>
        <Bar border={Position.Top}>
          <Button label="Log Off" wide size={Size.M} pattern="stripes" onClick={() => uiStore.logout()} />
          <Button
            label="Shut Down"
            wide
            border={Position.Left}
            size={Size.M}
            pattern="stripes"
            onClick={() => uiStore.shutdown()}
          />
        </Bar>
      </div>
    </div>
  );
};

export default observer(PopupMenu);
