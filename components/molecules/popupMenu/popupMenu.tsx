import { Position, Size } from '../../../variables/enums';
import { IItem } from '../../../variables/models';

import Button from '../../atoms/button/button';
import { useStore } from '../../organisms/storeProvider/storeProvider';

import styles from './popupMenu.module.scss';

interface PopupMenuProps {
  items: IItem[];
  visible?: boolean;
  setVisible?: (visible?: boolean) => void;
}

const PopupMenu = (props: PopupMenuProps) => {
  const { windowStore } = useStore();
  const { items, visible = false, setVisible = () => null } = props;

  const onButtonPress = (item: IItem) => {
    setVisible(false);
    windowStore.openWindow(item.window);
  };

  if (!visible) return <></>;
  return (
    <div className={styles.footerMenu}>
      {items?.map((item, index) => (
        <Button
          key={index}
          label={item.name}
          border={index < items.length - 1 ? Position.Bottom : undefined}
          size={Size.XL}
          pattern="stripes"
          onClick={() => onButtonPress(item)}
        />
      ))}
    </div>
  );
};

export default PopupMenu;
