import { useState } from 'react';
import { sendContactEmail } from '../../../../services/api';
import { useStore } from '../../storeProvider/storeProvider';

import TextArea from '../../../atoms/textarea/textarea';
import EmailBar from '../../../molecules/emailBar/emailBar';
import SendBar from '../../../molecules/sendBar/sendBar';

import Window, { WindowProps } from '../../../molecules/window/window';

const EmailWindow = (props: WindowProps) => {
  const { uiStore } = useStore();

  const [from, setFrom] = useState<string>('');
  const [subject, setSubject] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const onSend = async () => {
    const success = await sendContactEmail({ from, subject, message });
    if (success) {
      onDelete();
      uiStore.togglePopupMessage({ message: 'Mail sent successfully!' });
    } else {
      uiStore.togglePopupMessage({ message: 'Mail failed to send, please try again.' });
    }
  };

  const onDelete = () => {
    setFrom('');
    setSubject('');
    setMessage('');
  };

  return (
    <Window
      {...props}
      topBarContent={<EmailBar email={from} setEmail={setFrom} subject={subject} setSubject={setSubject} />}
      windowContent={<TextArea value={message} onValueChange={setMessage} placeholder="message.." />}
      botBarContent={<SendBar onSend={onSend} onDelete={onDelete} />}
    />
  );
};

export default EmailWindow;
