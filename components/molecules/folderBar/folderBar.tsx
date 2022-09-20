import { useEffect, useState } from 'react';
import { Position, Size } from '../../../variables/enums';
import { IItem } from '../../../variables/models';
import Bar from '../../atoms/bar/bar';

import Button from '../../atoms/button/button';

interface FolderBarProps {
  items: IItem[];
}

const FolderBar = (props: FolderBarProps) => {
  const { items } = props;

  const count = `${items?.length} items`;
  const size = `${items.length * Math.floor(Math.random() * 1000)}kb`;

  return (
    <Bar>
      <Button enabled={false} label={count} size={Size.XL} border={Position.Right} />
      <Button enabled={false} label={size} size={Size.XL} border={Position.Left} />
    </Bar>
  );
};

export default FolderBar;
