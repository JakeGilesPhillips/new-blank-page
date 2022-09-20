import styles from './input.module.scss';

interface InputProps {
  value?: string;
  onValueChange?: (value: string) => void;
  onEnter?: (value: string) => void;
}

const Input = (props: InputProps) => {
  const { value = '', onValueChange = () => null, onEnter = () => null } = props;

  const onChange = (ev: any) => {
    onValueChange(ev.nativeEvent.target.value);
  };

  const handleKeyDown = (ev: any) => {
    if (ev.key === 'Enter') onEnter(ev.nativeEvent.target.value);
  };

  return (
    <div className={styles.input}>
      <input value={value} onChange={onChange} onKeyDown={handleKeyDown} />
    </div>
  );
};

export default Input;
