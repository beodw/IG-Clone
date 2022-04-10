import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import DownardArrow from '../public/assets/static/icons/downward_arrow.svg'
import NewMessageIcon from '../public/assets/static/icons/new_message_icon.svg'
import InfoIcon from '../public/assets/static/icons/info_icon.svg'
import SmileyFace from '../public/assets/static/icons/smileyFaceIcon.svg'
import GalleryIcon from '../public/assets/static/icons/gallery_icon.svg'
import FavoritesIcon from '../public/assets/static/icons/favorite_icon.svg'
import MessagedContact from './MessagedContact'
import { Conversations } from '../atoms'
import { useRecoilValue } from 'recoil'

function Messages(props) {
  const session = useSession()
  const authenticated = session.status == 'authenticated'
  const [composing, setComposing] = useState(false)
  const conversations = useRecoilValue(Conversations)
  const [selectedChat, setSelectedChat] = useState(null)

  const toggleCompose = () => {
    setComposing((prevState, prevProps) => {
      return !composing
    })
  }

  return (
    <div className="flex h-[575px] w-full justify-center">
      <div className="mx-4 mt-4 grid grow grid-cols-1 rounded-sm border-[1px] border-solid border-grey md:mx-8 md:max-w-4xl md:grid-cols-5 xl:max-w-6xl xl:grid-cols-4">
        <div className="col border-r-solid flex flex-col justify-start border-r-[1px] border-r-grey md:col-span-2 xl:col-span-2">
          <div className="border-b-solid flex border-b-[1px] border-b-grey py-6">
            <div className="mr-4 flex grow items-center justify-center hover:cursor-pointer">
              <span className="text-md font-semibold">
                {authenticated && session.data.user.username}
              </span>
              <DownardArrow className="ml-2 rotate-180" />
            </div>
            <div className="mr-4 flex items-center justify-end">
              <div
                onClick={() => {
                  toggleCompose()
                }}
              >
                <NewMessageIcon className="navBtn" />
              </div>
            </div>
          </div>
          <div className="h-[480px] overflow-auto">
            {conversations.map((user, i) => (
              <MessagedContact
                key={i}
                index={i}
                user={user}
                onClick={[setSelectedChat, setComposing]}
                selected={selectedChat}
              />
            ))}
          </div>
        </div>
        <div className="hidden md:col-span-3  md:flex md:flex-col xl:col-span-2">
          {!composing && (
            <div className="hidden grow md:flex md:flex-col md:items-center md:justify-center">
              <div className="relative h-24 w-24 ">
                <Image
                  src="/assets/static/images/send_message_image.png"
                  layout="fill"
                  objectFit="contain"
                />
              </div>
              <h1 className="m-2 text-lg font-semibold">Your Messages</h1>
              <h1 className="m-1 text-sm font-semibold text-textGrey">
                Send private photos and messages to a friend or group.
              </h1>
              <button
                onClick={() => {
                  toggleCompose()
                }}
                className="mt-2 flex w-32 items-center justify-center rounded-lg bg-teal px-1 py-2"
              >
                <span className="text-sm text-white">Send Message</span>
              </button>
            </div>
          )}
          {composing && (
            <div className="flex h-full w-full flex-col">
              <div className="flex grow flex-col justify-start">
                <div className=" border-b-solid flex max-h-[75px] w-full grow items-center justify-between border-b-[1px] border-b-grey px-4 pt-6 pb-[18px]">
                  <div className="flex items-center hover:cursor-pointer">
                    <div className="relative mr-2 flex h-8 w-8 items-center justify-center overflow-clip rounded-full object-contain">
                      {!authenticated ? (
                        <Image
                          src="/assets/static/images/profileImage.png"
                          layout="fill"
                          objectFit="contain"
                        />
                      ) : (
                        <Image
                          src={conversations[selectedChat].profileImage}
                          layout="fill"
                          objectFit="contain"
                        />
                      )}
                    </div>
                    <span className="text-md w-max-prose  font-semibold">
                      {authenticated && conversations[selectedChat].userName}
                    </span>
                  </div>
                  <div className="flex ">
                    <InfoIcon className="hover:cursor-pointer" />
                  </div>
                </div>
                <div className=" flex max-h-[405px] flex-col overflow-auto">
                  {conversations &&
                    conversations[0].messages.map((message, i) => {
                      return (
                        <div
                          key={i}
                          className={`mx-[20px] mt-4 flex ${
                            message.byMe ? 'justify-end' : 'justify-start'
                          }`}
                        >
                          <p
                            className={`rounded-[25px] p-4 font-sans text-sm ${
                              message.byMe ? 'bg-grey' : 'bg-teal text-white'
                            }`}
                          >
                            {message.text}
                          </p>
                        </div>
                      )
                    })}
                </div>
              </div>
              <div className=" flex items-center justify-center p-4">
                <div className="flex h-[46px] w-full justify-between rounded-[30px] border-[1px] border-solid border-grey py-2 px-4">
                  <div className="relative h-12 w-12">
                    <SmileyFace className="hover:cursor-pointer" />
                  </div>
                  <div className="max-h-[18px] grow">
                    <input
                      className="w-full border-none font-sans text-sm outline-none"
                      placeholder="Message..."
                    />
                  </div>
                  <div className="flex justify-between">
                    <span className="mr-2">
                      <GalleryIcon className="hover:cursor-pointer" />
                    </span>
                    <span>
                      <FavoritesIcon className="hover:cursor-pointer" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Messages
