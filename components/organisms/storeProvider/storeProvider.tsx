import React from 'react';
import RootStore from '../../../stores/rootStore';

const store = new RootStore();
const StoreContext = React.createContext(store);

export const StoreProvider = ({ children }: { children: JSX.Element }) => (
  <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
);

export { store };
export const useStore = () => React.useContext(StoreContext);
