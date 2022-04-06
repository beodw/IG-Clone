import React from 'react'
import Image from 'next/image'
import HeartIcon from '../public/assets/static/icons/favorite_icon.svg'
import MoreHorizontalIcon from '../public/assets/static/icons/moreHorizontal.svg'
import CommentIcon from '../public/assets/static/icons/commentIcon.svg'
import SendIcon from '../public/assets/static/icons/send_icon.svg'
import BookMarkIcon from '../public/assets/static/icons/bookmarkIcon.svg'
import SmileyFaceIcon from '../public/assets/static/icons/smileyFaceIcon.svg'

function FeedCard(props) {
  return (
    <div className="mb-4 flex flex-col border-[1px] border-solid border-grey bg-white shadow">
      <div className="row mb-2 flex items-center justify-between p-4">
        <div className="ml-2 flex items-center justify-between">
          <div className="relative h-[35px] w-[35px] flex-col items-center justify-center overflow-clip rounded-full border-2 border-solid border-red object-contain p-[1.5px] hover:cursor-pointer">
            <Image
              className="rounded-full"
              // src="https://wallpaperaccess.com/full/82965.jpg"
              src={props.post.profileImage}
              width={124}
              height={124}
            />
          </div>
          <p className="ml-2 w-[100px] max-w-prose truncate text-sm font-bold">
            {props.post.userName}
          </p>
        </div>
        <div className="hover:cursor-pointer">
          <MoreHorizontalIcon />
        </div>
      </div>
      <div className="relative flex h-[711.11px] w-[400] items-center justify-center object-contain">
        {/* h-[711.11px] w-[400] = 16:9 aspect ratio*/}
        <Image
          // src="https://wallpaperaccess.com/full/6526432.jpg"
          src={props.post.imageUrl}
          // placeholder="blur"
          // blurDataURL={props.post.imageUrl}
          layout="fill"
        />
      </div>
      <div className="flex flex-col ">
        <div className="flex w-full justify-between p-4">
          <div className="flex">
            <div className="navBtn mr-4 hover:cursor-pointer">
              <HeartIcon />
            </div>
            <div className="navBtn mr-4 hover:cursor-pointer">
              <CommentIcon />
            </div>
            <div className="navBtn mr-4 hover:cursor-pointer">
              <SendIcon />
            </div>
          </div>
          <div className="navBtn hover:cursor-pointer">
            <BookMarkIcon />
          </div>
        </div>
        <div className="mt-4 flex justify-center border-t-[1.0px] border-solid border-grey p-4">
          <div className="navBtn mr-4">
            <SmileyFaceIcon />
          </div>
          <form className="flex grow">
            <div className="grow">
              <input
                className={' w-full border-none bg-white outline-0 '}
                placeholder="Add a comment..."
              />
            </div>
            <button
              type="button"
              className="text-sm font-semibold text-linkBlue"
            >
              Post
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default FeedCard
