import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import { RecoilRoot } from 'recoil'
import Loader from './loader'

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <RecoilRoot>
        <Loader>
          <Component {...pageProps} />
        </Loader>
      </RecoilRoot>
    </SessionProvider>
  )
}

export default MyApp
