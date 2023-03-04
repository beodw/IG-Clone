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
  if (providers == null) return <></>

  function onChange(e) {
    let { name, value } = e.target
    alert(name)
  }

  return authenticated ? (
    <></>
  ) : (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="flex w-1/2 flex-col items-center justify-center">
        <div className="relative -mt-24 h-48 w-48 shrink-0  text-center">
          <Image
            priority
            objectFit="contain"
            src="/assets/igLogo.svg"
            layout="fill"
          />
        </div>
        <h1 className="mb-4 text-xs italic">
          This is a clone project and is not intended to compete with instagram
          in any way!
        </h1>
        <input
          onChange={onChange}
          name="username"
          placeholder="Username"
          value={'admin'}
          className="mb-2 h-[36px] w-1/2 rounded-lg border-[0.5px] border-grey bg-grey p-4 outline-[0.5px] outline-textGrey"
        />
        <input
          onChange={onChange}
          name="password"
          placeholder="Password"
          value={'admin'}
          className="mb-4 h-[36px] w-1/2 rounded-lg border-[0.5px] border-grey bg-grey p-4 outline-[0.5px] outline-textGrey"
        />
        <button
          className="w-1/2 rounded-md bg-teal p-4 font-bold text-white"
          onClick={() => {}}
        >
          Log In
        </button>
        <div className="flex"></div>
        OR
        {Object.values(providers).map((provider) => (
          <button
            className="w-1/2 rounded-md bg-teal p-4 font-bold text-white"
            onClick={() => {
              signIntoAuthProvider(provider.id, { callbackUrl: '/' })
            }}
          >
            Sign In with {provider.name}
          </button>
        ))}
      </div>
    </div>
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
