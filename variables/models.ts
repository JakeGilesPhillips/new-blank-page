import { Document } from '@contentful/rich-text-types';
import { WindowType } from './enums';

export interface IPosition {
  x: number;
  y: number;
}
export interface ISize {
  width: string | number;
  height: string | number;
}

export interface IWindowLayout {
  size: ISize;
  position: IPosition;
  minimised: boolean;
  scroll: number;
  zIndex: number;
}

export interface IWindow {
  id?: number;
  title: string;
  type: WindowType;
  layout: IWindowLayout;
  items?: IItem[];
  url?: string;
  document: Document;
}

export interface IItem {
  name: string;
  order: number;
  iconUrl?: string;
  window: IWindow;
}
