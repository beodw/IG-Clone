import React from 'react'
import {
  getProviders,
  signIn as signIntoAuthProvider,
  useSession,
} from 'next-auth/react'
import Image from 'next/image'
import { useRouter } from 'next/router'

//client side render
function signIn({ providers }) {
  const session = useSession()
  const router = useRouter()
  var authenticated = session.status == 'authenticated'

  authenticated && router.push('/')

  return authenticated ? (
    <></>
  ) : (
    <>
      {Object.values(providers).map((provider) => (
        <div
          key={provider.name}
          className="flex min-h-screen flex-col items-center justify-center"
        >
          <div className="relative -mt-24 h-48 w-48 shrink-0  text-center">
            <Image
              priority
              objectFit="contain"
              src="/assets/igLogo.svg"
              layout="fill"
            />
          </div>
          <h1 className="mb-4 text-xs italic">
            This is a clone project and is not intended to compete with
            instagram in any way!
          </h1>
          <button
            className="rounded-md bg-teal p-4 font-bold text-white"
            onClick={() => {
              signIntoAuthProvider(provider.id, { callbackUrl: '/' })
            }}
          >
            Sign In with {provider.name}
          </button>
        </div>
      ))}
    </>
  )
}

//serverside render
export async function getServerSideProps() {
  const providers = await getProviders()

  return {
    props: {
      providers,
    },
  }
}

export default signIn
