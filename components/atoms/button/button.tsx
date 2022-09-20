import { CSSProperties, useMemo, useState } from 'react';
import { Position, Size } from '../../../variables/enums';

import styles from './button.module.scss';

interface ButtonProps {
  label?: string;
  size?: Size;
  bold?: boolean;
  enabled?: boolean;
  active?: boolean;
  border?: Position;
  pattern?: 'stripes' | 'dots';
  onClick?: () => void;
}

const Button = (props: ButtonProps) => {
  const {
    label = '',
    size = Size.S,
    bold,
    enabled = true,
    active = true,
    border,
    pattern,
    onClick = () => null,
  } = props;

  const [click] = useState(typeof Audio !== 'undefined' && new Audio('/sounds/click.mp3'));

  const width: string = useMemo(() => {
    switch (size) {
      case Size.XS:
        return `25px`;
      case Size.S:
        return `50px`;
      case Size.M:
        return `75px`;
      case Size.L:
        return `150px`;
    }
    return `200px`;
  }, [size]);

  const _pattern: CSSProperties = useMemo(() => {
    switch (pattern) {
      case 'stripes':
        return {
          backgroundImage: `repeating-linear-gradient(-45deg, #333 0, #333 0.8px, transparent 0, transparent 50%)`,
          backgroundSize: `7px 7px`,
        };
      case 'dots':
        return {
          backgroundImage: `radial-gradient(#444 1px, transparent 0.5px)`,
          backgroundSize: `calc(5 * 1px) calc(5 * 1px)`,
        };
    }
    return {};
  }, [pattern]);

  const _border: CSSProperties = useMemo(() => {
    switch (border) {
      case Position.Top:
        return { borderTopStyle: 'solid' };
      case Position.Bottom:
        return { borderBottomStyle: 'solid' };
      case Position.Left:
        return { borderLeftStyle: 'solid' };
      case Position.Right:
        return { borderRightStyle: 'solid' };
    }
    return {};
  }, [border]);

  const onButtonClick = () => {
    if (!enabled) return;
    click && click.play();
    onClick && onClick();
  };

  return (
    <div
      className={`${styles.button} .${border}`}
      style={{ width, ..._pattern, ..._border, opacity: active ? 1 : 0.5 }}
      onClick={onButtonClick}
    >
      <span style={{ fontWeight: bold ? 'bold' : 'normal', textTransform: bold ? 'uppercase' : 'lowercase' }}>
        {label}
      </span>
    </div>
  );
};

export default Button;
