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

interface HomeProps {
  items: IItem[];
}

const Home = (props: HomeProps) => {
  const { items } = props;

  const [visited, setVisited] = useLocalStorage('visited', null);
  const [ready, setReady] = useState<boolean>(false);
  const showIntro = ready && !visited;

  useEffect(() => setReady(true), []);

  return (
    <Crt showIntro={showIntro}>
      <Head>
        <title>New Blank Page</title>
      </Head>

      <IconList items={items} />
      <Windows items={items} showIntro={showIntro} setVisited={setVisited} />
      <Footer items={items} />
    </Crt>
  );
};

export async function getStaticProps(params: any) {
  const items = await getItems();
  return { props: { items } };
}

export default observer(Home);
