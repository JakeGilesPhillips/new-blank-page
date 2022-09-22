import { makeObservable, observable } from 'mobx';
import { enableStaticRendering } from 'mobx-react-lite';

import UIStore from './uiStore';
import TimeStore from './timeStore';
import WindowStore from './windowStore';

export default class RootStore {
  uiStore: UIStore;

  timeStore: TimeStore;

  windowStore: WindowStore;

  constructor() {
    this.uiStore = new UIStore(this);
    this.timeStore = new TimeStore(this);
    this.windowStore = new WindowStore(this);

    makeObservable(this, {
      uiStore: observable,
      timeStore: observable,
      windowStore: observable,
    });
  }
}
