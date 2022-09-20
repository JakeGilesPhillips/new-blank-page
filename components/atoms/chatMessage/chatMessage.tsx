/* eslint-disable @next/next/no-img-element */
import styles from './chatMessage.module.scss';

interface ChatMessageProps {
  message?: string;
  component?: JSX.Element;
}

const ChatMessage = (props: ChatMessageProps) => {
  const { message, component } = props;

  return (
    <div className={styles.chatMessage}>
      <img src={'/icons/face.png'} width={50} height={50} alt="chat face" />
      <span className={styles.chatMessageText}>{message ?? component}</span>
    </div>
  );
};

export default ChatMessage;
