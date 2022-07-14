import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { Breadcrumbs, Anchor } from '@mantine/core';
import type { ReactElement } from 'react'
import Layout from '../components/layout'
import { NextPageWithLayout } from './_app';
import useUser from '../lib/useUser'
import { useRouter } from 'next/router'
import fetchJson from '../lib/fetchJson'


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

  return (
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
        <a href="https://nextjs.org/docs" className={styles.card}>
          <h2>Documentation &rarr;</h2>
          <p>Find in-depth information about Next.js features and API.</p>
        </a>

        <a href="https://nextjs.org/learn" className={styles.card}>
          <h2>Learn &rarr;</h2>
          <p>Learn about Next.js in an interactive course with quizzes!</p>
        </a>

        <a
          href="https://github.com/vercel/next.js/tree/canary/examples"
          className={styles.card}
        >
          <h2>Examples &rarr;</h2>
          <p>Discover and deploy boilerplate example Next.js projects.</p>
        </a>

        <a
          href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          className={styles.card}
        >
          <h2>Deploy &rarr;</h2>
          <p>
            Instantly deploy your Next.js site to a public URL with Vercel.
          </p>
        </a>
      </div>
    </main>
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
