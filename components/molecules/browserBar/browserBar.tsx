import { useEffect, useState } from 'react';
import { Position, Size } from '../../../variables/enums';

import Bar from '../../atoms/bar/bar';
import Button from '../../atoms/button/button';
import Input from '../../atoms/input/input';

interface BrowserBarProps {
  iframeUrl?: string;
  setIframeUrl?: (url: string) => void;
  onRefresh?: () => void;
}

const EmailBar = (props: BrowserBarProps) => {
  const { iframeUrl = '', setIframeUrl = () => null, onRefresh = () => null } = props;

  const [url, setUrl] = useState<string>(iframeUrl);

  useEffect(() => {
    setUrl(iframeUrl);
  }, [iframeUrl]);

  const onEnterUrl = () => {
    setIframeUrl(url);
  };

  return (
    <Bar border={Position.Bottom}>
      <Button label="⟳" size={Size.S} border={Position.Right} onClick={onRefresh} />
      <Input value={url} onValueChange={setUrl} onEnter={onEnterUrl} />
      <Button label="GO" size={Size.M} border={Position.Left} onClick={onEnterUrl} />
    </Bar>
  );
};

export default EmailBar;
