import styles from '../../styles/Home.module.css'
import Layout from '../../components/layout'
import { NextPageWithLayout } from '../_app';
import { useRouter } from 'next/router'
import { Container, Text, Breadcrumbs, Anchor, Stack } from '@mantine/core';
import useElement from '../../lib/useElement';

const Layer1Page: NextPageWithLayout = () => {
    const router = useRouter()
    const { element } = router.query
    const { data, error } = useElement(element as string)

    const items = [
        { title: 'Main', href: '/' },
        { title: element, href: '#' },
    ].map((item, index) => (
        <Anchor href={item.href} key={index}>
            {item.title}
        </Anchor>
    ));

    if (error) return <div>Failed to load element</div>
    if (!data) return <div>Loading...</div>
    return (
        <Layout>
            <main className={styles.main}>
                <Stack>
                    <Container
                        p="xl">
                        <Breadcrumbs>{items}</Breadcrumbs>
                    </Container>
                    <Container>
                        <Text weight={500}>
                            {data.country}
                        </Text>
                    </Container>
                    <Container>
                        <Text weight={500}>
                            {data.creator}
                        </Text>
                    </Container>
                </Stack>
            </main>
        </Layout>
    )
}



export default Layer1Page
