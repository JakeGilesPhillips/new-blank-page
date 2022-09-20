/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from 'react';
import { TypeAnimation } from 'react-type-animation';
import { chatMessages } from '../../../variables/constants';

import ChatMessage from '../../atoms/chatMessage/chatMessage';

import styles from './chatBot.module.scss';

const ChatBot = () => {
  const [typing, setTyping] = useState<boolean>(true);
  const [sent, setSent] = useState<string[]>([]);

  const messageTimeout = useRef<NodeJS.Timer>();
  const typingTimeout = useRef<NodeJS.Timer>();

  useEffect(() => {
    messageTimeout.current = setTimeout(() => sendMessage(), 2000);
    return () => clearTimeout(messageTimeout.current);
  }, []);

  const sendMessage = () => {
    // Clear typing
    setTyping(false);

    // Don't trigger again if no more messages
    setSent((s) => chatMessages.filter((a, i) => i <= s.length));
    const time = Math.random() * 10000 + 5000;
    messageTimeout.current = setTimeout(() => sendMessage(), time);

    // Don't start typing if there wont be another
    if (sent.length === chatMessages.length) return;
    typingTimeout.current = setTimeout(() => setTyping(true), 1500);
  };

  const clearTimeouts = () => {
    clearTimeout(messageTimeout.current);
    clearTimeout(typingTimeout.current);
  };

  return (
    <div className={styles.chatBot}>
      {sent?.map((s, i) => (
        <ChatMessage key={i} message={s} />
      ))}
      {typing && (
        <ChatMessage
          component={
            <TypeAnimation
              sequence={['.', 300, '..', 300, '...', 300]}
              speed={99}
              cursor={false}
              repeat={Infinity}
              wrapper="span"
            />
          }
        />
      )}
    </div>
  );
};

export default ChatBot;
