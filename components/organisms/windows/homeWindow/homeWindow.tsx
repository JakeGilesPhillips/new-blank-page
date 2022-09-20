import ChatBot from '../../../molecules/chatBot/chatBot';
import Scrollable from '../../../molecules/scrollable/scrollable';
import Window, { WindowProps } from '../../../molecules/window/window';

const HomeWindow = (props: WindowProps) => {
  return (
    <Window
      {...props}
      windowContent={
        <Scrollable window={props}>
          <ChatBot />
        </Scrollable>
      }
    />
  );
};

export default HomeWindow;
