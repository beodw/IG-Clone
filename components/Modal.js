import React from 'react'
import { Dialog, Transition } from '@headlessui/react'
import CloseIcon from '../public/assets/static/icons/close_icon.svg'
import { useRecoilState } from 'recoil'
import { ModalAtom } from '../atoms/atoms'

function Modal(props) {
  return (
    <Transition.Root show={props.state} as={React.Fragment}>
      {/* {props.children} */}
      <Dialog
        as="div"
        className="overflow-y-none fixed inset-0 z-10"
        onClose={props.close}
      >
        <div className="sm:min-h0-screen sm-p-0 flex min-h-[800px] items-end justify-center bg-black bg-opacity-[0.85] px-4 pt-4 pb-20 text-center sm:block">
          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div>
              <div className="flex h-full w-full justify-end pr-2">
                <CloseIcon
                  className="hover:cursor-pointer"
                  onClick={() => {
                    props.close(false)
                  }}
                />
              </div>
              {props.children}
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default Modal
