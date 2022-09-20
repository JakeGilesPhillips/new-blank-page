import type { AppProps } from 'next/app';
import { StoreProvider } from '../components/organisms/storeProvider/storeProvider';

import '../styles/globals.scss';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <StoreProvider {...pageProps}>
      <Component {...pageProps} />
    </StoreProvider>
  );
};

export default App;
