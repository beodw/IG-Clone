import React from 'react'
import Image from 'next/image'
import { useSession } from 'next-auth/react'

function MessagedContact(props) {
  const session = useSession()
  const toggleSelect = () => {
    props.onClick[0]((prevState, prevProps) => {
      return props.index
    })
    props.onClick[1]((prevState, prevProps) => {
      return true
    })
  }

  return (
    <div
      onClick={() => {
        toggleSelect()
      }}
      className={`${
        props.index == props.selected && props.selected != null ? 'bg-grey' : ''
      } navBtn flex max-h-16 w-full items-center p-4 hover:cursor-pointer hover:bg-grey `}
    >
      <div className="relative mr-2 flex h-14 w-14 flex-shrink-0 items-center justify-center overflow-clip rounded-full">
        <Image
          src={
            session.status == 'authenticated'
              ? props.user.profileImage
              : '/assets/static/images/profileImage.png'
          }
          placeholder="blur"
          blurDataURL={props.user.profileImage}
          layout="fill"
          objectFit="contain"
        />
      </div>
      <div className="flex flex-col">
        <h6 className="w-18 truncate text-sm">{props.user.userName}</h6>
        <h6 className="w-64 truncate text-sm text-textGrey md:w-48">
          {props.user.messages[props.user.messages.length - 1].text}
        </h6>
      </div>
    </div>
  )
}

export default MessagedContact
