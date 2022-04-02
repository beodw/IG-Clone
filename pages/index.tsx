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
import CloseIcon from '../public/assets/static/icons/close_icon.svg'
import NewPostPlaceholder from '../public/assets/static/icons/new_post_placeholder_icon.svg'

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
          <div className="mx-auto mt-10 flex h-[500px] w-[450px] grow flex-col rounded-[15px] bg-white">
            <div className="border-b-solid flex justify-center border-b-[1px] border-b-grey">
              <span className="m-3 font-semibold">
                <h1>Create New Post</h1>
              </span>
            </div>
            <div className="flex grow flex-col items-center justify-center">
              <NewPostPlaceholder />
              <h2 className="text-bold">Drag photos and videos here</h2>
              <div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault()
                  }}
                  className="mt-4 flex w-48 items-center justify-center rounded-lg bg-teal px-1 py-2 outline-none"
                >
                  <span className="text-sm text-white">
                    Select From{' '}
                    <span className="hidden md:inline-flex">Computer</span>{' '}
                    <span className="inline-flex md:hidden">Device</span>
                  </span>
                </button>
              </div>
            </div>
          </div>
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
