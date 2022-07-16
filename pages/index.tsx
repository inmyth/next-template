
import styles from '../styles/Home.module.css'
import type { ReactElement } from 'react'
import Layout from '../components/layout'
import { NextPageWithLayout } from './_app';
import useUser from '../lib/useUser'
import { useRouter } from 'next/router'
import fetchJson from '../lib/fetchJson'
import { Table, Breadcrumbs, Anchor, AppShell, Navbar, Header, Card, Paper } from '@mantine/core';

const Home: NextPageWithLayout = () => {

  const { mutateUser } = useUser({
    redirectTo: '/login',
  })

  // const { user, mutateUser } = useUser()
  const router = useRouter()

  const items = [
    { title: 'Main', href: '#' },
    { title: 'Graph', href: '#' },
  ].map((item, index) => (
    <Anchor href={item.href} key={index}>
      {item.title}
    </Anchor>
  ));


  const tableRows = [
    { position: 6, mass: 12.011, symbol: 'C', name: 'Carbon' },
    { position: 7, mass: 14.007, symbol: 'N', name: 'Nitrogen' },
    { position: 39, mass: 88.906, symbol: 'Y', name: 'Yttrium' },
    { position: 56, mass: 137.33, symbol: 'Ba', name: 'Barium' },
    { position: 58, mass: 140.12, symbol: 'Ce', name: 'Cerium' },
  ].map((element) => (
    <tr key={element.name}>
      <td>{element.position}</td>
      <td>{element.name}</td>
      <td>{element.symbol}</td>
      <td>{element.mass}</td>
    </tr>
  ));

  return (

    <AppShell
      padding="md"
      header={<Header height={60} p="xs">{/* Header content */}</Header>}
      styles={(theme) => ({
        main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] },
      })}
    >
      <main className={styles.main}>
        <Breadcrumbs separator="→">{items}</Breadcrumbs>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <p className={styles.description}>
          Get started by editing{' '}
          <code className={styles.code}>pages/index.tsx</code>
        </p>

        <a
          href="/api/logout"
          onClick={async (e) => {
            e.preventDefault()
            mutateUser(
              await fetchJson('/api/logout', { method: 'POST' }),
              false
            )
            router.push('/login')
          }}
        >
          Logout
        </a>


        <div className={styles.grid}>
          <Paper
            shadow="sm"
            p="xl">
            <Table>
              <thead>
                <tr>
                  <th>Element position</th>
                  <th>Element name</th>
                  <th>Symbol</th>
                  <th>Atomic mass</th>
                </tr>
              </thead>
              <tbody>{tableRows}</tbody>
            </Table>
          </Paper>
        </div>
      </main>
    </AppShell>
  )
}


Home.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      {page}
    </Layout>
  )
}
export default Home
