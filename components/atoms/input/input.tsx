import { InputHTMLAttributes } from 'react';
import styles from './input.module.scss';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  onValueChange?: (value: string) => void;
  onEnter?: (value: string) => void;
}

const Input = (props: InputProps) => {
  const { onValueChange = () => null, onEnter = () => null, readOnly } = props;

  const onChange = (ev: any) => {
    if (readOnly) return;
    onValueChange(ev.nativeEvent.target.value);
  };

  const handleKeyDown = (ev: any) => {
    if (readOnly) return;
    if (ev.key === 'Enter') onEnter(ev.nativeEvent.target.value);
  };

  return (
    <div className={styles.input}>
      <input {...props} onChange={onChange} onKeyDown={handleKeyDown} />
    </div>
  );
};

export default Input;
