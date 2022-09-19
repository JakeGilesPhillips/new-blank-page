import { MenuItem } from '../../../variables/models';

import FooterMenuItem from '../../atoms/footer/footerMenuItem/footerMenuItem';

import styles from './footerMenu.module.scss';

interface FooterMenuProps {
  items: MenuItem[];
  visible?: boolean;
}

const FooterMenu = (props: FooterMenuProps) => {
  const { items, visible = false } = props;

  if (!visible) return <></>;

  return (
    <div className={styles.footerMenu}>
      {items?.map((item, index) => (
        <FooterMenuItem key={index} {...item} bordered={index + 1 < items.length} />
      ))}
    </div>
  );
};

export default FooterMenu;
