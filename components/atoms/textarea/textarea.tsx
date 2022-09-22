import { TextareaHTMLAttributes } from 'react';
import styles from './textarea.module.scss';

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  onValueChange: (value: string) => void;
  onEnter?: (value: string) => void;
}

const TextArea = (props: TextAreaProps) => {
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
    <div className={styles.textarea}>
      <textarea {...props} onChange={onChange} onKeyDown={handleKeyDown} />
    </div>
  );
};

export default TextArea;
