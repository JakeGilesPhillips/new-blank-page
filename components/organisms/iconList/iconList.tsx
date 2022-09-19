import { MenuItem } from '../../../variables/models';

import Icon from '../../molecules/icon/icon';

import styles from './iconList.module.scss';

interface IconListProps {
  items: MenuItem[];
}

const IconList = (props: IconListProps) => {
  const { items = [] } = props;

  return (
    <div className={styles.iconList}>
      {items?.map((item, index) => (
        <Icon key={index} {...item} />
      ))}
    </div>
  );
};

export default IconList;
