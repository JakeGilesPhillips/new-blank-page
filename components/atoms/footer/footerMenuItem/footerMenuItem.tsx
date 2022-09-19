import { MenuItem } from '../../../variables/models';

import styles from './footerMenuItem.module.scss';

interface FooterMenuItemProps extends MenuItem {
  bordered?: boolean;
}

const FooterMenuItem = (props: FooterMenuItemProps) => {
  const { bordered, name } = props;

  const classes = [styles.footerMenuItem, bordered ? styles.bordered : ''].join(' ');

  return (
    <div className={classes}>
      <span>{name}</span>
    </div>
  );
};

export default FooterMenuItem;
