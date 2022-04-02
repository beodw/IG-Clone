import React from 'react'
import Image from 'next/image'
import { useSession } from 'next-auth/react'

function Suggestions() {
  var test = [...Array(5)]
  const session = useSession()
  const authenticated = session.status == 'authenticated'
  return (
    <div className="flex-col pt-[53px] pl-4">
      <div className="flex items-center justify-between">
        <div className="flex h-16 w-16 items-center justify-center overflow-clip rounded-full shadow hover:cursor-pointer">
          {session.status != 'authenticated' ? (
            <Image
              src="/assets/static/images/profileImage.png"
              objectFit="contain"
              width="80"
              height="80"
            />
          ) : (
            <Image
              src={authenticated && session.data.user.image}
              objectFit="contain"
              width="80"
              height="80"
            />
          )}
        </div>
        <div className="ml-4 grow flex-col items-start justify-start">
          <h4>{authenticated && session.data.user.username}</h4>
          <h4 className="text-textGrey">
            {authenticated && session.data.user.name}
          </h4>
        </div>
        <div>
          <button
            onClick={() => {
              /*Switch accounts func*/
            }}
            className="text-sm text-linkBlue hover:cursor-pointer"
          >
            Switch
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="mt-4 text-sm font-bold text-textGrey">
          Suggestions For You
        </div>
        <div
          className="text-sm hover:cursor-pointer"
          onClick={() => {
            alert('see all')
          }}
        >
          <h6>See All</h6>
        </div>
      </div>

      {test.map((_, i) => (
        <div
          key={`Suggestion${i}`}
          className="mt-2 flex items-center justify-between"
        >
          <div className="flex h-10 w-10 items-center justify-center overflow-clip rounded-full shadow hover:cursor-pointer">
            <Image
              src="/assets/static/images/profileImage.png"
              objectFit="contain"
              width="80"
              height="80"
            />
          </div>
          <div className="ml-4 grow flex-col items-start justify-start">
            <h4>Beod Wilson</h4>
            <h4 className="text-sm text-textGrey">Followed by tiny_pseed</h4>
          </div>
          <div>
            <button
              onClick={() => {
                /*Switch accounts func*/
              }}
              className="text-sm text-linkBlue hover:cursor-pointer"
            >
              Follow
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Suggestions
