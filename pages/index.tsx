
import styles from '../styles/Home.module.css'
import type { ReactElement } from 'react'
import Layout from '../components/layout'
import { NextPageWithLayout } from './_app';
import useUser from '../lib/useUser'
import { useRouter } from 'next/router'
import fetchJson from '../lib/fetchJson'
import { Container, Table, Breadcrumbs, Anchor, AppShell, Navbar, Header, Card, Paper, Stack } from '@mantine/core';
import Link from 'next/link'

const Home: NextPageWithLayout = () => {
  const router = useRouter()
  const items = [
    { title: 'Main', href: '#' }
  ].map((item, index) => (
    <Anchor href={item.href} key={index}>
      {item.title}
    </Anchor>
  ));


  const tableRows = [
    { position: 6, mass: 12.011, symbol: 'C', name: 'Carbon', status: "ok" },
    { position: 7, mass: 14.007, symbol: 'N', name: 'Nitrogen', status: "na" },
    { position: 39, mass: 88.906, symbol: 'Y', name: 'Yttrium', status: "na" },
    { position: 56, mass: 137.33, symbol: 'Ba', name: 'Barium', status: "na" },
    { position: 58, mass: 140.12, symbol: 'Ce', name: 'Cerium', status: "na" },
  ].map((element) => (
    <tr key={element.name}>
      <td>{element.position}</td>
      <td>
        <Link
          href={{
            pathname: '/level1/[element]',
            query: { element: element.name },
          }}
        >
          <a>{element.name}</a>
        </Link>

      </td>
      <td>{element.symbol}</td>
      <td>{element.mass}</td>
      <td>{element.status}</td>
    </tr>


  ));

  return (
    <Layout>
      <main className={styles.main}>
        <Stack>
          <Container
            p="xl">
            <Breadcrumbs separator="→">{items}</Breadcrumbs>
          </Container>

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
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>{tableRows}</tbody>
              </Table>
            </Paper>
          </div>
        </Stack>

      </main>
    </Layout>
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
