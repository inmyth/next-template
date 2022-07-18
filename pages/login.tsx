import { TextInput, Button, Group, Box } from '@mantine/core';
import { useForm } from '@mantine/form';
import styles from '../styles/Login.module.css'
import type { ReactElement } from 'react'
import Layout from '../components/layout'
import useUser from '../lib/useUser'
import React, { useState } from 'react'
import fetchJson, { FetchError } from '../lib/fetchJson'

function Login() {
    const form = useForm({
        initialValues: {
            email: '',
            password: '',
        },

        validate: {
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
        },
    });

    const { mutateUser } = useUser({
        redirectTo: '/',
        redirectIfFound: true,
    })

    const [errorMsg, setErrorMsg] = useState('')


    return (
        <main className={styles.main}>
            <Box sx={{ minWidth: 300 }} mx="auto">
                <form onSubmit=
                    {
                        async function handleSubmit(event) {
                            event.preventDefault()
                            const body = {
                                username: form.values.email,
                                password: form.values.password
                            }
                            try {
                                mutateUser(
                                    await fetchJson('/api/login', {
                                        method: 'POST',
                                        headers: { 'Content-Type': 'application/json' },
                                        body: JSON.stringify(body),
                                    })
                                )
                            } catch (error) {
                                if (error instanceof FetchError) {
                                    setErrorMsg(error.data.message)
                                } else {
                                    console.error('An unexpected error happened:', error)
                                }
                            }
                        }

                    }>
                    <TextInput
                        required
                        label="Email"
                        placeholder="your@email.com"
                        {...form.getInputProps('email')}
                    />

                    <TextInput
                        required
                        mt="md"
                        label="Password"
                        {...form.getInputProps('password')}
                    />

                    <Group position="right" mt="md">
                        <Button type="submit">Submit</Button>
                    </Group>
                </form>
            </Box>
        </main>
    );
}

Login.getLayout = function getLayout(page: ReactElement) {
    return (
        <Layout>
            {page}
        </Layout>
    )
}

export default Login