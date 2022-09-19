import type { NextPage } from 'next';
import Head from 'next/head';

import { MenuItem } from '../variables/models';
import { IconType } from '../variables/enums';

import Window from '../components/molecules/window/window';
import Footer from '../components/organisms/footer/footer';
import IconList from '../components/organisms/iconList/iconList';
import BrowserWindow from '../components/organisms/windows/browserWindow/browserWindow';

import styles from '../styles/pages/Home.module.scss';
import { ReactNode, useRef, useState } from 'react';

const Home: NextPage = () => {
  const items: MenuItem[] = [
    { name: 'Home', icon: IconType.Home },
    { name: 'Work', icon: IconType.Folder },
    { name: 'About', icon: IconType.File },
    { name: 'Contact', icon: IconType.Mail },
  ];

  // Store windows
  const windows = useRef<JSX.Element[]>([]).current;

  return (
    <div className={styles.container}>
      <Head>
        <title>New Blank Page</title>
      </Head>

      <main className={styles.main}>
        <div className={styles.sections}>
          <IconList items={items} />
          <div className={styles.pages}>
            {/* <Window title="Work" /> */}
            <BrowserWindow title="Browser" url="https://www.premiercctvinstalls.co.uk/" />
          </div>
        </div>
      </main>

      <Footer items={items} />
    </div>
  );
};

export default Home;
