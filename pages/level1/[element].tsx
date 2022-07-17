import styles from '../../styles/Home.module.css'
import Layout from '../../components/layout'
import { NextPageWithLayout } from '../_app';
import { useRouter } from 'next/router'
import { Alert, Container, Text, Breadcrumbs, Anchor, Stack, Skeleton, Paper, Title, Space } from '@mantine/core';
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

    if (error) return (
        <Layout>
            <main className={styles.main}>
                <Stack>
                    <Container
                        p="xl">
                        <Breadcrumbs>{items}</Breadcrumbs>
                    </Container>
                    <Container>
                        <Paper shadow="xs" p="md" style={{ width: 400 }}>
                            <Alert title="Bummer!" color="red">
                                {error.message}
                            </Alert>
                        </Paper>
                    </Container>

                </Stack>
            </main>
        </Layout>
    )
    if (!data) return (
        <Layout>
            <main className={styles.main}>
                <Stack sx={(theme) => ({ backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0], height: 300, width: 400 })}>
                    <Container
                        p="xl">
                        <Breadcrumbs>{items}</Breadcrumbs>
                    </Container>
                    <Container>
                        <Skeleton height={50} circle mb="xl" />
                        <Skeleton height={8} radius="xl" />
                        <Skeleton height={8} mt={6} radius="xl" />
                        <Skeleton height={8} mt={6} width="70%" radius="xl" />
                    </Container>
                </Stack>
            </main>
        </Layout>
    )
    return (
        <Layout>
            <main className={styles.main}>
                <Stack sx={(theme) => ({ backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0], height: 300 })}>
                    <Container
                        p="xl">
                        <Breadcrumbs>{items}</Breadcrumbs>
                    </Container>
                    <Container>
                        <Paper shadow="xs" p="md" style={{ width: 400 }}>
                            <Container>
                                <Title order={6}>Country</Title>
                                <Text weight={500} >
                                    {data.country}
                                </Text>
                            </Container>
                            <Space h="md" />
                            <Container>
                                <Title order={6}>Creator</Title>
                                <Text weight={500}>
                                    {data.creator}
                                </Text>
                            </Container>
                        </Paper>
                    </Container>
                </Stack>
            </main>
        </Layout>
    )
}



export default Layer1Page
