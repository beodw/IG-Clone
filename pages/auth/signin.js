import React, { useState } from 'react'
import {
  getProviders,
  signIn as signIntoAuthProvider,
  useSession,
} from 'next-auth/react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import GoogleSignInIcon from '../../public/assets/static/icons/google_sign_in_icon.svg'
import { signIn as testSignIn, signOut } from 'next-auth/react'

//client side render
function signIn({ providers }) {
  const session = useSession()
  const router = useRouter()
  var authenticated = session.status == 'authenticated'
  const [loginDetails, setLoginDetails] = useState({
    userName: 'admin',
    password: 'admin',
  })

  authenticated && router.push('/')
  if (providers == null) return <></>

  function onChange(e) {
    let { name, value } = e.target
    setLoginDetails({
      ...loginDetails,
      [name]: value,
    })
  }

  function login(e) {}

  return authenticated ? (
    <></>
  ) : (
    <div className="flex min-h-screen w-full flex-col items-center justify-center px-8">
      <div className="flex w-full flex-col items-center md:w-1/2">
        <Image
          priority
          objectFit="contain"
          src="/assets/igLogo.svg"
          width="168"
          height="48"
        />
        <h1 className="mb-4 hidden text-xs italic sm:block">
          This is a clone project and is not intended to compete with instagram
          in any way!
        </h1>
        <input
          value={loginDetails.userName}
          onChange={onChange}
          name="userName"
          placeholder="Username"
          className="mt-8 mb-2 w-full rounded-lg bg-grey p-2 outline-textGrey"
        />
        <input
          type={'password'}
          value={loginDetails.password}
          onChange={onChange}
          name="password"
          placeholder="Password"
          className="mb-4 w-full rounded-lg bg-grey p-2  outline-textGrey"
        />

        <button
          className="w-full rounded-md bg-teal p-4 font-bold text-white"
          onClick={() =>
            signIntoAuthProvider('usernameAndPasswordAuth', {
              userName: loginDetails.userName,
              password: loginDetails.password,
              callbackUrl: '/',
            })
          }
        >
          Log In
        </button>

        <div className="mt-4 flex w-full items-center justify-between ">
          <div className="h-[1px] grow bg-grey"></div>
          <div className="px-2">OR</div>
          <div className="h-[1px] grow bg-grey"></div>
        </div>

        {Object.values(providers)
          .filter((p) => p.name == 'Google')
          .map((provider) => (
            <div className="mt-2 flex items-center justify-center">
              <button
                className="flex items-center"
                onClick={() => {
                  signIntoAuthProvider(provider.id, { callbackUrl: '/' })
                }}
              >
                <GoogleSignInIcon />
                Sign In
              </button>
            </div>
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
