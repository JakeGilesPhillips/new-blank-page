import { Document } from '@contentful/rich-text-types';
import { PopupType, Size, WindowType } from './enums';

export interface IPosition {
  x: number;
  y: number;
}
export interface ISize {
  width: string | number;
  height: string | number;
}

export interface IButtonProps {
  label?: string;
  size?: Size;
  onClick?: () => void;
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
  iconUrl?: string;
  layout: IWindowLayout;
  items?: IItem[];
  url?: string;
  document?: Document;
}

export interface IItem {
  name: string;
  order: number;
  iconUrl?: string;
  link?: string;
  window: IWindow;
}

export interface IPopupMessage {
  type: PopupType;
  message: string;
  button?: IButtonProps;
  background?: boolean;
}

export interface IContactForm {
  from: string;
  subject: string;
  message: string;
}
