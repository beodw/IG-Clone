import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import HeartIcon from '../public/assets/static/icons/favorite_icon.svg'
import MoreHorizontalIcon from '../public/assets/static/icons/moreHorizontal.svg'
import CommentIcon from '../public/assets/static/icons/commentIcon.svg'
import SendIcon from '../public/assets/static/icons/send_icon.svg'
import BookMarkIcon from '../public/assets/static/icons/bookmarkIcon.svg'
import SmileyFaceIcon from '../public/assets/static/icons/smileyFaceIcon.svg'
import CommentHeartIcon from '../public/assets/static/icons/comment_like_icon.svg'

function FeedCard(props) {
  const [bookmarked, setBookmarked] = useState(false)
  const toggleLike = () => {
    alert('liked')
  }
  const toggleBookmark = () => {
    setBookmarked(!bookmarked)
  }

  // useEffect(()=>{
  //   if(!props.post.profileImage) props.post.profileImage = '/assets/images/profileImage.png'
  // }, [props.post])

  return (
    <div className="mb-4 flex flex-col border-[1px] border-solid border-grey bg-white shadow">
      <div className="row mb-2 flex items-center justify-between p-4">
        <div className="ml-2 flex items-center justify-between">
          <div className="relative h-[35px] w-[35px] flex-col items-center justify-center overflow-clip rounded-full border-2 border-solid border-red object-contain p-[1.5px] hover:cursor-pointer">
            <Image
              className="rounded-full"
              src={props.post.profileImage ?? '/assets/images/profileImage.png'}
              // placeholder={props.fake ? 'empty' : `blur`}
              // blurDataURL={props.fake ? '' : props.post.profileImage}
              width={124}
              height={124}
            />
          </div>
          <p className="ml-2 w-[100px] max-w-prose truncate text-sm font-bold hover:cursor-pointer">
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
          src={props.post.imageUrl ?? '/assets/images/profileImage.png'}
          // placeholder={props.fake ? 'empty' : `blur`}
          // blurDataURL={props.fake ? '' : props.post.imageUrl}
          layout="fill"
        />
      </div>
      <div className="flex flex-col ">
        <div className="flex w-full justify-between p-4">
          <div className="flex">
            <div
              onClick={() => toggleLike()}
              className="navBtn mr-4 hover:cursor-pointer"
            >
              <HeartIcon />
            </div>
            <div className="navBtn mr-4 hover:cursor-pointer">
              <CommentIcon />
            </div>
            <div className="navBtn mr-4 hover:cursor-pointer">
              <SendIcon />
            </div>
          </div>
          <div
            onClick={() => toggleBookmark()}
            className="navBtn hover:cursor-pointer"
          >
            <BookMarkIcon
              className={`${
                bookmarked ? 'fill-black' : 'fill-white hover:stroke-grey'
              } stroke-black stroke-2 `}
            />
          </div>
        </div>
        <div className="mx-4 flex items-center justify-start ">
          <span className="mr-2 text-sm font-bold hover:underline">
            {props.post.userName}
          </span>
          <span className="text-md">{props.post.caption}</span>
        </div>
        <div className="mx-4 flex items-center justify-start hover:cursor-pointer ">
          <span className="text-sm text-wordCount">{`View all 31,000 comments`}</span>
        </div>
        <div className="mx-4 flex items-center justify-between  ">
          <span className="w-48 truncate text-sm hover:cursor-pointer">
            <span className="font-bold hover:underline">{'beodwilson'}</span>{' '}
            <span>{`this is awesome`}</span>
          </span>
          <CommentHeartIcon className="navBtn fill-black hover:fill-textGrey" />
        </div>

        <div className="flex justify-start pl-4 pt-2">
          <span className="text-xs font-thin text-wordCount hover:cursor-pointer">
            2 days ago
          </span>
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
