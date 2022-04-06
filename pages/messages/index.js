import React, { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { AppBar, Messages } from '../../components'
import Head from 'next/head'

function index() {
  const session = useSession()
  const router = useRouter()

  useEffect(() => {
    if (session.status == 'unauthenticated') router.push('auth/signin')
  }, [session.status])
  return (
    <>
      <Head>
        <title>Instagram Clone</title>
        <link rel="icon" href="/assets/static/images/favicon.png" />
      </Head>
      <AppBar />
      <Messages
        messagesList={[
          ...[...Array(100)].map(() => {
            return (
              { text: 'Hey', byMe: false },
              { text: 'Whatsup', byMe: true },
              { text: "I'm good...and you?", byMe: false },
              { text: "I'm fine", byMe: true },
              { text: 'Cool', byMe: true }
            )
          }),
        ]}
      />
    </>
  )
}

export default index
