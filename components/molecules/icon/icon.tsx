import { IconType } from '../../../variables/enums';
import { MenuItem } from '../../../variables/models';

import FileIcon from '../../atoms/icons/fileIcon/fileIcon';
import FolderIcon from '../../atoms/icons/folderIcon/folderIcon';
import ComputerIcon from '../../atoms/icons/computerIcon/computerIcon';

import styles from './icon.module.scss';
import MailIcon from '../../atoms/icons/mailIcon/mailIcon';

const Icon = (props: MenuItem) => {
  const { name, icon } = props;

  const getIcon = (): JSX.Element => {
    switch (icon) {
      case IconType.Home:
        return <ComputerIcon />;
      case IconType.Folder:
        return <FolderIcon />;
      case IconType.File:
        return <FileIcon />;
      case IconType.Mail:
        return <MailIcon />;
    }
    return <></>;
  };

  return (
    <div className={styles.icon}>
      {getIcon()}
      <span>{name}</span>
    </div>
  );
};

export default Icon;
