import Head from 'next/head';
import { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';

import { IItem } from '../variables/models';
import { getItems } from '../contentful/setup';
import useLocalStorage from '../hooks/useLocalStorage';

import Crt from '../components/atoms/crt/crt';
import Footer from '../components/organisms/footer/footer';
import Windows from '../components/organisms/windows/windows';
import IconList from '../components/organisms/iconList/iconList';
import { useStore } from '../components/organisms/storeProvider/storeProvider';
import PopupMessage from '../components/molecules/popupMessage/popupMessage';

interface HomeProps {
  items: IItem[];
}

const Home = (props: HomeProps) => {
  const { uiStore } = useStore();
  const { items } = props;

  const [visited, setVisited] = useLocalStorage('visited', null);

  useEffect(() => {
    uiStore.toggleStartup(!visited);
  }, [visited, uiStore]);

  return (
    <Crt>
      <Head>
        <title>New Blank Page</title>
      </Head>

      <PopupMessage />
      <IconList items={items} />
      <Windows items={items} setVisited={setVisited} />
      <Footer items={items} />
    </Crt>
  );
};

export async function getStaticProps(params: any) {
  const items = await getItems();
  return { props: { items } };
}

export default observer(Home);
