import { Position, Size } from '../../../variables/enums';
import Bar from '../../atoms/bar/bar';
import Button from '../../atoms/button/button';

interface SendBarProps {
  onSend: () => void;
  onDelete: () => void;
}

const SendBar = (props: SendBarProps) => {
  const { onSend, onDelete } = props;

  return (
    <Bar border={Position.Top}>
      <Button label="SEND" bold border={Position.Right} size={Size.L} pattern="dots" onClick={onSend} />
      <Button icon="icons/bin.png" bold border={Position.Left} pattern="dots" onClick={onDelete} />
    </Bar>
  );
};

export default SendBar;
