import { makeObservable, observable } from 'mobx';
import { enableStaticRendering } from 'mobx-react-lite'

import TimeStore from './timeStore';
import WindowStore from './windowStore';

enableStaticRendering(typeof window === 'undefined');

export default class RootStore {
  timeStore: TimeStore;

  windowStore: WindowStore;

  constructor() {
    this.timeStore = new TimeStore(this);
    this.windowStore = new WindowStore(this);

    makeObservable(this, {
      timeStore: observable,
      windowStore: observable,
    });
  }
}