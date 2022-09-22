import Button from '../../atoms/button/button';
import styles from './enterScreen.module.scss';

interface EnterScreenProps {
  onClick: () => void;
}

const EnterScreen = (props: EnterScreenProps) => {
  const { onClick } = props;

  return (
    <div className={styles.enterScreen}>
      <div className={styles.enterScreenButton}>
        <Button label="ENTER" wide pattern="stripes" onClick={onClick} />
      </div>
    </div>
  );
};

export default EnterScreen;
