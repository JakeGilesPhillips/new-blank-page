import { Position, Size } from '../../../variables/enums';
import Bar from '../../atoms/bar/bar';
import Button from '../../atoms/button/button';
import Input from '../../atoms/input/input';

import styles from './emailBar.module.scss';

interface EmailBarProps {
  email: string;
  setEmail: (email: string) => void;
  subject: string;
  setSubject: (subject: string) => void;
}

const EmailBar = (props: EmailBarProps) => {
  const { email, setEmail, subject, setSubject } = props;

  return (
    <div className={styles.emailBar}>
      <Bar border={Position.Bottom}>
        <span className={styles.emailBarTitle}>To:</span>
        <Input value={'jake@newblankpage.co.uk'} readOnly />
      </Bar>
      <Bar>
        <span className={styles.emailBarTitle}>From:</span>
        <Input value={email} onValueChange={setEmail} placeholder="email..." />
      </Bar>
      <Bar border={Position.Bottom}>
        <span className={styles.emailBarTitle}>Subject:</span>
        <Input value={subject} onValueChange={setSubject} placeholder="subject..." />
      </Bar>
    </div>
  );
};

export default EmailBar;
