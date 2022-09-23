/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Crt from '../components/atoms/crt/crt';
import PopupMessage from '../components/molecules/popupMessage/popupMessage';
import ErrorPage from '../components/organisms/errorPage/errorPage';
import { useStore } from '../components/organisms/storeProvider/storeProvider';
import { PopupType, Size } from '../variables/enums';

const Error = ({ statusCode }: { statusCode: number }) => {
  const { uiStore } = useStore();
  const router = useRouter();

  useEffect(() => {
    const timeout = setTimeout(showError, 1000);
    return () => clearTimeout(timeout);
  }, [uiStore]);

  const showError = () => {
    uiStore.togglePopupMessage({
      type: PopupType.Error,
      message: '404 | Page not found',
      button: {
        label: 'go back',
        size: Size.L,
        onClick: () => router.back(),
      },
      background: false,
    });
  };

  return (
    <Crt noEffect>
      <PopupMessage />
      <ErrorPage />
    </Crt>
  );
};

export default Error;
