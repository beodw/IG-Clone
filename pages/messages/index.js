import React, { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { AppBar, Messages } from '../../components'
import Head from 'next/head'

function index() {
  const session = useSession()
  const router = useRouter()
  const authenticated = session.status == 'authenticated'

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
          { text: 'Hey', byMe: false },
          { text: 'Whatsup', byMe: true },
          { text: "I'm good...and you?", byMe: false },
          { text: 'Hey', byMe: false },
          { text: 'Whatsup', byMe: true },
          { text: "I'm good...and you?", byMe: false },
          { text: 'Hey', byMe: false },
          { text: 'Whatsup', byMe: true },
          { text: "I'm good...and you?", byMe: false },
          { text: 'Hey', byMe: false },
          { text: 'Whatsup', byMe: true },
          { text: "I'm good...and you?", byMe: false },
          { text: 'Hey', byMe: false },
          { text: 'Whatsup', byMe: true },
          { text: "I'm good...and you?", byMe: false },
          { text: 'Hey', byMe: false },
          { text: 'Whatsup', byMe: true },
          { text: "I'm good...and you?", byMe: false },
          { text: 'Hey', byMe: false },
          { text: 'Whatsup', byMe: true },
          { text: "I'm good...and you?", byMe: false },
          { text: 'Hey', byMe: false },
          { text: 'Whatsup', byMe: true },
          { text: "I'm good...and you?", byMe: false },
          { text: 'Hey', byMe: false },
          { text: 'Whatsup', byMe: true },
          { text: "I'm good...and you?", byMe: false },
          { text: 'Hey', byMe: false },
          { text: 'Whatsup', byMe: true },
          { text: "I'm good...and you?", byMe: false },
        ]}
      />
    </>
  )
}

export default index
