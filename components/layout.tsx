import Head from 'next/head'
import Image from 'next/image'
import { HeaderResponsive } from './header-responsive'

import styles from '../styles/Layout.module.css'
import { MantineProvider, AppShell, Header } from '@mantine/core';

const headerLinks = [
  { link: "/", label: "Home" },
]

interface LayoutProps {
  children: React.ReactNode;
}


export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          colorScheme: 'light',
        }}
      >
        <AppShell
          padding="md"
          header={
            <HeaderResponsive links={headerLinks} />
          }
          styles={(theme) => ({
            main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] },
          })}
        >
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
        </AppShell>
      </MantineProvider>
    </>
  );
}