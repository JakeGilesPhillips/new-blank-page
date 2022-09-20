import Icon from '../../../molecules/icon/icon';
import FolderBar from '../../../molecules/folderBar/folderBar';
import Window, { WindowProps } from '../../../molecules/window/window';
import Scrollable from '../../../molecules/scrollable/scrollable';

import styles from './folderWindow.module.scss';

const FolderWindow = (props: WindowProps) => {
  const { items = [] } = props;

  return (
    <Window
      {...props}
      topBarContent={<FolderBar items={items} />}
      windowContent={
        <Scrollable window={props}>
          <div className={styles.folderWindow}>
            {items?.map((item, index) => (
              <div key={index} className={styles.folderWindowItem}>
                <Icon {...item} />
              </div>
            ))}
          </div>
        </Scrollable>
      }
    />
  );
};

export default FolderWindow;
