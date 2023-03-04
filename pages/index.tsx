import type { NextPage } from 'next'
import Head from 'next/head'
import { AppBar, HomePage } from '../components/'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'

import { ModalAtom, StoriesModalAtom } from '../atoms/atoms'
import Modal from '../components/Modal'
import StoriesModal from '../components/StoriesModal'
import SearchIcon from '../public/assets/static/icons/search_icon.svg'
import { ImageEditor } from '../components'

const Home: NextPage = () => {
  const session = useSession()
  const router = useRouter()
  const [modalState, setModalState] = useRecoilState(ModalAtom)
  const [storiesModalState, setStoriesModalState] =
    useRecoilState(StoriesModalAtom)
  const [userLoggedIn, setUserLoggedIn] = useState(
    session.status == 'authenticated'
  )

  useEffect(() => {
    if (!userLoggedIn) router.push('auth/signin')
    else setUserLoggedIn(true)
  }, [session.status])

  return userLoggedIn ? (
    <div className="relative flex h-screen flex-col overflow-clip">
      <Head>
        <title>Instagram Clone</title>
        <link rel="icon" href="/assets/static/images/favicon.png" />
      </Head>
      {modalState && (
        <Modal state={modalState} close={setModalState}>
          <ImageEditor />
        </Modal>
      )}
      {storiesModalState && (
        <StoriesModal
          state={storiesModalState}
          close={setStoriesModalState}
        ></StoriesModal>
      )}
      <AppBar />
      <HomePage />

      {/* <button className="absolute bottom-10 right-10 flex h-[60px] w-[60px] items-center justify-center rounded-full bg-grey bg-opacity-80 hover:opacity-60 md:hidden">
        <SearchIcon />
      </button> */}
    </div>
  ) : (
    <></>
  )
}

export default Home
