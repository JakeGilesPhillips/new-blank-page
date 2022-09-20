import { makeObservable, observable, action } from 'mobx';
import { getWindowPosition } from '../helpers/windowHelper';
import { IItem, IPosition, ISize, IWindow } from '../variables/models';
import RootStore from './rootStore';

export default class WindowStore {
  private rootStore: RootStore;

  private maxWindows: number = 5;

  items: IItem[] = [];

  windows: IWindow[] = [];
  
  constructor(store: RootStore) {
    this.rootStore = store;

    makeObservable(this, {
      windows: observable,
      openWindow: action,
      bringWindowToTop: action,
      updateWindowPosition: action,
      updateWindowSize: action,
      updateWindowScroll: action,
      toggleWindow: action,
      closeWindow: action,
    });
  }

  private findWindowById = (id: number): IWindow | undefined => {
    return this.windows.find((w) => w.id === id);
  }

  private findWindowByName = (name: string): IWindow | undefined => {
    return this.windows.find((w) => w.title === name);
  }
 
  private getHighestId = (): number => {
    if (this.windows.length > 0) return Math.max(...this.windows.map((w) => w.id ?? 0));
    return 0;
  }

  private getHighestZIndex = (): number => {
    if (this.windows.length > 0) return Math.max(...this.windows.map((w) => w.layout.zIndex));
    return 0;
  }

  openWindow = (window: IWindow) => {    
    // If window is already open bring to top
    const existing = this.findWindowByName(window.title); 
    if (existing && existing.id != null) return this.bringWindowToTop(existing.id);
    
    // Open new window above latest one
    const id = this.getHighestId() + 1;
    const zIndex = this.getHighestZIndex() + 1;
    const position = getWindowPosition(this.windows, window);
    this.windows = this.windows.concat({ ...window, id, layout: { ...window.layout, position, zIndex } });
  
    // Clear the oldest window if going past max
    if (this.windows.length > this.maxWindows) this.windows.shift();
  }

  bringWindowToTop = (id: number) => {
    const window = this.findWindowById(id);
    const zIndex = this.getHighestZIndex() + 1;
    if (window) window.layout.zIndex = zIndex;
  }

  updateWindowPosition = (id: number, position: IPosition) => {
    const window = this.findWindowById(id);
    if (window) window.layout.position = position;
  }

  updateWindowSize = (id: number, size: ISize) => {
    const window = this.findWindowById(id);
    if (window) window.layout.size = size;
  }

  updateWindowScroll = (id: number, scroll: number) => {
    const window = this.findWindowById(id);
    if (window) window.layout.scroll = scroll;
  }

  toggleWindow = (id: number, minimised?: boolean) => {
    const window = this.findWindowById(id);
    if (window) window.layout.minimised = minimised ?? !window.layout.minimised;
    this.bringWindowToTop(id);
  }

  closeWindow = (id: number) => {
    this.windows = this.windows.filter((w) => w.id !== id);
  }
}