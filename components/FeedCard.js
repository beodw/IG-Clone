import React, { useState, useRef } from 'react'
import Image from 'next/image'
import HeartIcon from '../public/assets/static/icons/favorite_icon.svg'
import HeartIconFilled from '../public/assets/static/icons/favorite_icon_red.svg'
import MoreHorizontalIcon from '../public/assets/static/icons/moreHorizontal.svg'
import CommentIcon from '../public/assets/static/icons/commentIcon.svg'
import SendIcon from '../public/assets/static/icons/send_icon.svg'
import BookMarkIcon from '../public/assets/static/icons/bookmarkIcon.svg'
import SmileyFaceIcon from '../public/assets/static/icons/smileyFaceIcon.svg'
import CommentHeartIcon from '../public/assets/static/icons/comment_like_icon.svg'
import { fireStoreDB } from '../firebase'
import { doc, getDocFromServer, updateDoc } from 'firebase/firestore'
import { useSession } from 'next-auth/react'

function FeedCard(props) {
  const { data: session } = useSession()
  const [bookmarked, setBookmarked] = useState(false)
  const commentInputRef = useRef(null)
  const [addingComment, setAddingComment] = useState(false)
  const [commentInputFilled, setCommentInputFilled] = useState(false)

  const addComment = async (e, fake) => {
    e.preventDefault()
    if (commentInputRef.current.value.trim() == '') return
    setAddingComment(true)
    setCommentInputFilled(false)

    if (fake) {
      alert('This is dummy data. Please make a real post tto comment.')
      return setAddingComment(false)
    }
    try {
      let postRef = doc(fireStoreDB, 'posts', props.post.id)
      let post = await getDocFromServer(postRef)
      await updateDoc(postRef, {
        comments: [
          {
            uid: session.user.uid,
            username: session.user.username,
            text: commentInputRef.current.value,
          },
          ...post.data().comments,
        ],
      })
    } catch (e) {
      commentInputRef.current.value = ''
      setAddingComment(false)
      setCommentInputFilled(false)
      alert('Could not add comment.')
    }
    commentInputRef.current.value = ''
    setAddingComment(false)
  }
  const toggleLike = async () => {
    try {
      let postRef = doc(fireStoreDB, 'posts', props.post.id)
      let post = await getDocFromServer(postRef)
      if (props.post.hasOwnProperty('likes')) {
        if (props.post.likes.includes(session.user.uid)) {
          await updateDoc(postRef, {
            likes: post.data().likes.filter((uid) => uid != session.user.uid),
          })
        } else {
          await updateDoc(postRef, {
            likes: [session.user.uid, ...post.data().likes],
          })
        }
      }
    } catch (e) {
      alert('Could not like post')
    }
  }
  const toggleBookmark = () => {
    setBookmarked(!bookmarked)
  }
  return (
    <div className="mb-4 flex flex-col border-[1px] border-solid border-grey bg-white shadow">
      <div className="row mb-2 flex items-center justify-between p-4">
        <div className="ml-2 flex items-center justify-between">
          <div className="relative h-[35px] w-[35px] flex-col items-center justify-center overflow-clip rounded-full border-2 border-solid border-red object-contain p-[1.5px] hover:cursor-pointer">
            {props.post.profileImage ? (
              <Image
                className="rounded-full"
                src={props.post.profileImage}
                // placeholder={props.fake ? 'empty' : `blur`}
                // blurDataURL={props.fake ? '' : props.post.profileImage}
                width={124}
                height={124}
              />
            ) : (
              <></>
            )}
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
        {props.post.imageUrl ? (
          <Image
            src={props.post.imageUrl}
            // placeholder={props.fake ? 'empty' : `blur`}
            // blurDataURL={props.fake ? '' : props.post.imageUrl}
            layout="fill"
          />
        ) : (
          <></>
        )}
      </div>
      <div className="flex flex-col ">
        <div className="flex w-full justify-between p-4">
          <div className="flex">
            <div
              onClick={() =>
                props.post.fake
                  ? alert(
                      'This is a fake post for demo purpose only please upload a real post to like'
                    )
                  : toggleLike()
              }
              className="navBtn mr-4 hover:cursor-pointer"
            >
              {props.post.fake == false &&
              props.post.likes.includes(session.user.uid) ? (
                <HeartIconFilled className={'navBtn hover:cursor-pointer'} />
              ) : (
                <HeartIcon className={'navBtn '} />
              )}
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
          <span className="text-sm text-wordCount">{`View all ${props.post.comments.length} comments`}</span>
        </div>

        {props.post.comments.map((comment, i) =>
          i < 2 ? (
            <div className="mx-4 flex items-center justify-between  ">
              <span className="w-48 truncate text-sm hover:cursor-pointer">
                <span className="font-bold hover:underline">
                  {comment.username}
                </span>{' '}
                <span>{comment.text}</span>
              </span>
              <CommentHeartIcon className="navBtn fill-black hover:fill-textGrey" />
            </div>
          ) : (
            <></>
          )
        )}

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
                onChange={(e) => {
                  e.target.value.trim() != ''
                    ? setCommentInputFilled(true)
                    : setCommentInputFilled(false)
                }}
                ref={commentInputRef}
                className={' w-full border-none bg-white outline-0 '}
                placeholder="Add a comment..."
              />
            </div>
            <button
              disabled={addingComment}
              onClick={(e) => addComment(e, props.post.fake)}
              type="submit"
              className={`text-sm font-semibold ${
                addingComment || commentInputFilled
                  ? 'text-linkBlue'
                  : 'text-wordCount'
              } }`}
            >
              {addingComment ? 'Posting' : 'Post'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default FeedCard
