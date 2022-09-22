import { useEffect, useMemo, useState } from 'react';
import { TypeAnimation } from 'react-type-animation';
import { Position } from '../../../../variables/enums';

import Bar from '../../../atoms/bar/bar';
import styles from './terminalWindow.module.scss';

const TerminalWindow = () => {
  const [text, setText] = useState<string>();

  const parts = useMemo(() => {
    if (!text) return;
    const letters = text?.split('');
    return letters?.map((v, i) => text.slice(0, i));
  }, [text]);

  useEffect(() => {
    getText();
  }, []);

  const getText = () => {
    fetch('./text/code.txt').then((r) => r.text().then(setText));
  };

  return (
    <div className={styles.terminalWindow}>
      <Bar border={Position.Bottom}>
        <span className={styles.terminalWindowTyper}>Terminal</span>
      </Bar>
      {parts && <TypeAnimation sequence={parts} wrapper="span" />}
    </div>
  );
};

export default TerminalWindow;
