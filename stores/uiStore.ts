import { makeObservable, action, observable } from 'mobx';
import { IPopupMessage } from '../variables/models';
import RootStore from './rootStore';

export default class UIStore {
  private rootStore: RootStore;

  popupMessage?: IPopupMessage = undefined;

  menuOpen: boolean = false;

  showStartUp: boolean = true;
  
  showShutDown: boolean = false;

  startupState: number = 0;


  constructor(store: RootStore) {
    this.rootStore = store;

    makeObservable(this, {
      popupMessage: observable,
      menuOpen: observable,
      showStartUp: observable,
      showShutDown: observable,
      startupState: observable,
      togglePopupMessage: action,
      toggleMenu: action,
      toggleStartup: action,
      toggleShutDown: action,
      changeStartupState: action,
      logout: action,
      shutdown: action,
      turnon: action,
    });
  }

  togglePopupMessage = (message?: IPopupMessage) => {
    if (!message) this.popupMessage = undefined;
    else this.popupMessage = message;
  }

  toggleMenu = (open?: boolean) => {
    if (open != null) this.menuOpen = open;
    else this.menuOpen = !this.menuOpen;
  }

  toggleStartup = (show?: boolean) => {
    if (show != null) this.showStartUp = show;
    else this.showStartUp = !this.showStartUp;
  }

  toggleShutDown = (show?: boolean) => {
    if (show != null) this.showShutDown = show;
    else this.showShutDown = !this.showShutDown;
  }

  changeStartupState = (state: number) => {
    this.startupState = state;
  }

  logout = () => {
    localStorage.removeItem('visited');
    this.changeStartupState(1);
    this.toggleStartup(true);
    this.toggleMenu(false);
    this.togglePopupMessage();
  };
  
  shutdown = () => {
    this.togglePopupMessage();
    this.toggleShutDown(true);
    this.toggleMenu(false);
    setTimeout(this.turnon, 4000);
  }

  turnon = () => {
    this.toggleShutDown(false);
    this.toggleStartup(true);
    this.changeStartupState(0);
  }
}