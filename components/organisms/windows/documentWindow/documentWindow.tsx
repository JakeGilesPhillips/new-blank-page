import { LoremIpsum } from 'lorem-ipsum';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

import Scrollable from '../../../molecules/scrollable/scrollable';
import Window, { WindowProps } from '../../../molecules/window/window';

import styles from './documentWindow.module.scss';

const DocumentWindow = (props: WindowProps) => {
  const { document } = props;

  const text = new LoremIpsum();
  const richText = documentToReactComponents(document);

  return (
    <Window
      {...props}
      windowContent={
        <Scrollable window={props}>
          {document != null ? (
            <div className={styles.documentWindowRichText}>{richText}</div>
          ) : (
            <span>{text.generateParagraphs(10)}</span>
          )}
        </Scrollable>
      }
    />
  );
};

export default DocumentWindow;
