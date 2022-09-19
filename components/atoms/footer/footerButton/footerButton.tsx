import styles from './footerButton.module.scss';

interface FooterButtonProps {
  label?: string;
  width?: number;
  onClick?: () => void;
}

const FooterButton = (props: FooterButtonProps) => {
  const { label = '', width = 150, onClick = () => null } = props;

  return (
    <div className={styles.footerButton} style={{ width: `${width}px` }} onClick={onClick}>
      <span>{label}</span>
    </div>
  );
};

export default FooterButton;
