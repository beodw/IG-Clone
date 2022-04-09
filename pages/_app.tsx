import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import { RecoilRoot } from 'recoil'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import LoadingIcon from '../public/assets/static/icons/loadingIcon.svg'

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const [loadingAppContent, setLoadingAppContent] = useState(true)
  const router = useRouter()
  useEffect(() => {
    // if (session.status == 'unauthenticated') router.push('auth/signin')
    setTimeout(() => setLoadingAppContent(false), 2000)
  }, [])

  return loadingAppContent ? (
    <LoadingIcon
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        margin: '-25px 0 0 -25px',
        fill: '#c7c7c7',
      }}
    />
  ) : (
    <SessionProvider session={session}>
      <RecoilRoot>
        <Component {...pageProps} />
      </RecoilRoot>
    </SessionProvider>
  )
}

export default MyApp
