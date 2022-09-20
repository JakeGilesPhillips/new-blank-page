import { makeObservable, action, observable, computed, runInAction } from 'mobx';
import RootStore from './rootStore';

export default class TimeStore {
  private rootStore: RootStore;

  private timer: any = undefined;

  time: Date = new Date();

  constructor(store: RootStore) {
    this.rootStore = store;

    makeObservable(this, {
      time: observable,
      timeString: computed,
      start: action,
      stop: action,
      hydrate: action,
    });
  }

  get timeString() {
    const pad = (n: any) => (n < 10 ? `0${n}` : n)
    const format = (t: any) =>
      `${pad(t.getUTCHours())}:${pad(t.getUTCMinutes())}:${pad(
        t.getUTCSeconds()
      )}`
    return format(new Date(this.time))
  }

  start = () => {
    this.timer = setInterval(() => {
      runInAction(() => this.time = new Date())
    }, 900);
  }

  stop = () => {
    clearInterval(this.timer);
  }

  hydrate = (data: any) => {
    if (!data) return
    this.time = data.time !== null ? data.time : Date.now();
  }
}