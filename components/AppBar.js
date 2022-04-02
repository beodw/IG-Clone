import React from 'react'
import Image from 'next/image'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import { useEffect } from 'react'

import FavoriteIcon from '../public/assets/static/icons/favorite_icon.svg'
import HomeIcon from '../public/assets/static/icons/home_icon_filled.svg'
import SendIcon from '../public/assets/static/icons/send_icon.svg'
import PlusIcon from '../public/assets/static/icons/plus_icon.svg'
import SearchIcon from '../public/assets/static/icons/search_icon.svg'
import CompassIcon from '../public/assets/static/icons/compass_icon.svg'

import { ModalAtom } from '../atoms/atoms'
import { useRecoilState } from 'recoil'

function AppBar() {
  const session = useSession()
  const [modalState, setModalState] = useRecoilState(ModalAtom)

  return (
    <div className="z-2 sticky top-0 flex h-16 w-full items-center justify-between bg-white px-2 shadow md:px-[105px]">
      <Link href="/">
        <div className="relative mr-4 h-full w-28  shrink-0 hover:cursor-pointer sm:block md:block">
          <Image
            priority
            objectFit="contain"
            src="/assets/igLogo.svg"
            layout="fill"
          />
        </div>

        {/* <div className=" xs:block relative mb-2 mr-2 h-12 w-12 shrink-0 sm:hidden md:mb-0 md:hidden lg:hidden">
        <Image
          objectFit="contain"
          src="/assets/static/images/favicon.png"
          layout="fill"
        />
      </div> */}
      </Link>

      <div
        className={
          'hidden w-48 items-center overflow-clip rounded-lg border border-solid border-greyBorder bg-grey p-1 focus-within:border-grey md:flex'
        }
      >
        <div className={'sm:mr-3'}>
          <SearchIcon alt="search icon" width="18" height="18" />
        </div>
        <div className={'grow'}>
          <input
            className={'mr-8 rounded-md border-none bg-grey outline-0'}
            placeholder={'Search'}
            type="text"
            name="search"
            id="search"
          />
        </div>
      </div>

      <div className="flex items-center">
        <Link href="/">
          <div className="navBtn xs:hidden mr-2 rounded-full p-2 hover:bg-grey ">
            <HomeIcon width="24" height="24" />
          </div>
        </Link>
        <div className="navBtn xs:w-5 mr-2 rounded-full p-2 hover:bg-grey">
          {/* <SendIcon width="24" height="24" /> */}
          <Link href="/messages">
            <SendIcon width="24" height="24" />
          </Link>
          {/* <div className="relative  flex h-3 w-3 animate-pulse items-center justify-center overflow-clip rounded-full bg-red text-xs"></div> */}
        </div>
        <div
          onClick={() => {
            setModalState((prevState, prevProps) => {
              return !prevState
            })
          }}
          className="navBtn mr-2 rounded-full p-2 hover:bg-grey"
        >
          <PlusIcon width="24" height="24" />
        </div>
        <div className="navBtn mr-2 rounded-full p-2 hover:bg-grey">
          <FavoriteIcon width="24" height="24" />
        </div>
        <div className="navBtn mr-2 rounded-full p-2 hover:bg-grey">
          <CompassIcon width="24" height="24" />
        </div>

        <div
          onClick={() => {
            signOut()
          }}
          className="navBtn relative mr-2 h-6 w-6 overflow-clip rounded-full p-2 hover:bg-grey"
        >
          {session.status == 'authenticated' ? (
            <Image
              src={session.data.user.image}
              layout="fill"
              objectFit="contain"
            />
          ) : (
            <Image
              priority
              src="/assets/static/images/profileImage.png"
              layout="fill"
              objectFit="contain"
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default AppBar
