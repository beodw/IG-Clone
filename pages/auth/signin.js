import React, { useState } from 'react'
import {
  getProviders,
  signIn as signIntoAuthProvider,
  useSession,
} from 'next-auth/react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import GoogleSignInIcon from '../../public/assets/static/icons/google_sign_in_icon.svg'

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
          value={loginDetails.userName}
          onChange={onChange}
          name="userName"
          placeholder="Username"
          className="mb-2 h-[36px] w-1/2 rounded-lg border-[0.5px] border-grey bg-grey p-4 outline-[0.5px] outline-textGrey"
        />
        <input
          type={'password'}
          value={loginDetails.password}
          onChange={onChange}
          name="password"
          placeholder="Password"
          className="mb-4 h-[36px] w-1/2 rounded-lg border-[0.5px] border-grey bg-grey p-4 outline-[0.5px] outline-textGrey"
        />
        <button
          className="w-1/2 rounded-md bg-teal p-4 font-bold text-white"
          onClick={login}
        >
          Log In
        </button>
        <div className="mt-4 flex w-1/2 items-center justify-between">
          <div className="h-[1px] grow bg-grey"></div>
          <div className="px-2">OR</div>
          <div className="h-[1px] grow bg-grey"></div>
        </div>

        {Object.values(providers).map((provider) => (
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
