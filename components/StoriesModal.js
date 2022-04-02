import React, { useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import CloseIcon from '../public/assets/static/icons/close_icon.svg'
import Link from 'next/link'
import Image from 'next/image'
import StoriesView from './StoriesView'

function Modal(props) {
  // const [modalState,setModalState] = useRecoilState(ModalAtom)
  const [test, setTest] = useState(false)
  return (
    <Dialog
      as="div"
      className="overflow-y-none fixed inset-0 z-10"
      onClose={props.close}
      open={true}
    >
      <div className="flex h-screen min-h-screen shrink-0 items-start justify-between overflow-auto bg-black bg-opacity-[0.90] p-4 md:mt-0 ">
        <div className="flex items-start justify-center">
          <Link href="/">
            <Image
              priority
              src="/assets/static/images/igLogoWhite.png"
              width={103}
              height={29}
              layout="intrinsic"
            />
          </Link>
        </div>
        <div
          onClick={() => {
            setTest((_, d) => {
              return !test
            })
          }}
          className="flex h-full grow flex-col justify-center bg-grey"
        >
          <StoriesView isCenter={false} key={1} index={1} />
          <StoriesView isCenter={true} key={2} index={2} />
        </div>

        <div className="mt-2 pr-2">
          <CloseIcon
            className="hover:cursor-pointer"
            onClick={() => {
              props.close(false)
            }}
          />
        </div>

        {props.children}
      </div>
    </Dialog>
  )
}

export default Modal
