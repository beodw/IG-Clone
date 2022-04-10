import React from 'react'
import { Dialog, Transition } from '@headlessui/react'
import CloseIcon from '../public/assets/static/icons/close_icon.svg'

function Modal(props) {
  return (
    <Transition.Root show={props.state} as={React.Fragment}>
      {/* {props.children} */}
      <Dialog
        as="div"
        className="overflow-y-none fixed inset-0 z-10"
        onClose={props.close}
      >
        <div className="flex min-h-[800px] items-start justify-center bg-black bg-opacity-[0.85] px-4 pt-4 pb-20 text-center sm:block sm:min-h-screen sm:p-0 md:items-end">
          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="w-full pt-4 pr-4">
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
