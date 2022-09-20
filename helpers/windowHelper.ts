import { defaultLayout } from "../variables/constants";
import { IPosition, IWindow } from "../variables/models";

export const getWindowPosition = (windows: IWindow[], window: IWindow): IPosition => {
  const latest = windows[windows?.length - 1];

  const ofType = windows.filter((w) => w.type === window.type);
  const latestOfType = ofType[ofType.length - 1];

  if (latestOfType) return { x: latestOfType.layout.position.x + 30, y: latestOfType.layout.position.y + 30 };
  if (latest) return { x: latest.layout.position.x + 30, y: latest.layout.position.y + 30 };
  return defaultLayout.position
}