import type { NextPage } from 'next'
import Head from 'next/head'
import { AppBar, HomePage } from '../components/'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useRecoilState } from 'recoil'

import { ModalAtom, StoriesModalAtom } from '../atoms/atoms'
import Modal from '../components/Modal'
import StoriesModal from '../components/StoriesModal'

import { useFilePicker } from 'use-file-picker'
import { ImageEditor } from '../components'

const Home: NextPage = () => {
  const session = useSession()
  const router = useRouter()
  const [modalState, setModalState] = useRecoilState(ModalAtom)
  const [storiesModalState, setStoriesModalState] =
    useRecoilState(StoriesModalAtom)

  useEffect(() => {
    if (session.status == 'unauthenticated') router.push('auth/signin')
  }, [session.status])

  return (
    <div className="flex h-screen flex-col overflow-clip">
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
    </div>
  )
}

export default Home
