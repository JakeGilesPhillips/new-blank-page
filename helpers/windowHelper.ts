import { defaultLayout } from '../variables/constants';
import { IPosition, IWindow } from '../variables/models';

export const getWindowPosition = (windows: IWindow[], window: IWindow): IPosition => {
  const latest = windows[windows?.length - 1];
  if (latest) return { x: latest.layout.position.x - 30, y: latest.layout.position.y + 20 };
  return defaultLayout.position;
};
