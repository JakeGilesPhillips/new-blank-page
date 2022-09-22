import { LoremIpsum } from 'lorem-ipsum';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

import Scrollable from '../../../molecules/scrollable/scrollable';
import Window, { WindowProps } from '../../../molecules/window/window';

import styles from './documentWindow.module.scss';
import { useMemo } from 'react';

const DocumentWindow = (props: WindowProps) => {
  const { document } = props;

  const text = new LoremIpsum();
  const richText = useMemo(() => {
    if (!document) return;
    return documentToReactComponents(document);
  }, [document]);

  return (
    <Window
      {...props}
      windowContent={
        <Scrollable window={props}>
          {richText != null ? (
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
