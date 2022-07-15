import Head from 'next/head'
import Image from 'next/image'

import styles from '../styles/Layout.module.css'
import { MantineProvider } from '@mantine/core';


export default function Layout({ children }) {
  return (
    <>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          colorScheme: 'light',
        }}
      >
        <Head>
          <title>Next Template</title>
          <meta name="description" content="Next templates and experimentations" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className={styles.container}>
          {children}
        </div>

        <footer className={styles.footer}>
          <a
            href="https://mbcu.me"
            target="_blank"
            rel="noopener noreferrer"
          >
            mbcu.me
          </a>
        </footer>
      </MantineProvider>
    </>
  );
}