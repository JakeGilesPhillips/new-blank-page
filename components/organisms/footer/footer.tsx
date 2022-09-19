import { useState } from 'react';

import { MenuItem } from '../../../variables/models';

import FooterButton from '../../atoms/footer/footerButton/footerButton';
import FooterClock from '../../atoms/footer/footerClock/footerClock';
import FooterMenu from '../../molecules/footerMenu/footerMenu';

import styles from './footer.module.scss';

interface FooterProps {
  items?: MenuItem[];
}

const Footer = (props: FooterProps) => {
  const { items = [] } = props;

  const [visible, setVisible] = useState<boolean>(false);

  const toggleVisibility = () => {
    if (items?.length === 0) return;
    setVisible(!visible);
  };

  return (
    <footer className={styles.footer}>
      {/* Data along the bottom */}
      <div className={styles.footerButtons}>
        <FooterButton label="MENU" onClick={toggleVisibility} />
      </div>
      <FooterClock />

      {/* Popup menu */}
      <FooterMenu items={items} visible={visible} />
    </footer>
  );
};

export default Footer;
