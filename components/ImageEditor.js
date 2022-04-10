import { useFilePicker } from 'use-file-picker'
import NewPostPlaceholder from '../public/assets/static/icons/new_post_placeholder_icon.svg'
import SmileyFace from '../public/assets/static/icons/smiley_face_caption.svg'
import BackArrow from '../public/assets/static/icons/back_arrow.svg'
import React, { useState, useRef, useEffect } from 'react'
import ImageGrid from './ImageGrid'
import { useRecoilState } from 'recoil'
import { ModalAtom } from '../atoms/atoms'
import { useSpring, animated, easings } from 'react-spring'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { fireStoreDB, firebaseStorage } from '../firebase'
import {
  addDoc,
  collection,
  serverTimestamp,
  updateDoc,
  doc,
} from 'firebase/firestore'
import { ref, getDownloadURL, uploadString } from 'firebase/storage'

function ImageEditor() {
  const [uploading, setUploading] = useState(false)
  const textAreaRef = useRef(null)
  const [charCount, setCharCount] = useState(0)
  const session = useSession()
  const [progress, setProgress] = useState(0)
  const [styles, animation] = useSpring(() => ({ opacity: 0.5 }))
  const [modalState, setModalState] = useRecoilState(ModalAtom)
  const [
    openFileSelector,
    { filesContent, loading, errors, plainFiles, clear },
  ] = useFilePicker({
    readAs: 'DataURL',
    accept: 'image/*',
    multiple: true,
    limitFilesConfig: { max: 1 },
    // minFileSize: 0.1, // in megabytes
    // maxFileSize: 50,
    // imageSizeRestrictions: {
    //   maxHeight: 900, // in pixels
    //   maxWidth: 1600,
    //   minHeight: 600,
    //   minWidth: 768,
    // },
  })

  const upload = async () => {
    if (uploading) return false
    setUploading(true)

    const docRef = await addDoc(collection(fireStoreDB, 'posts'), {
      userName: session.data.user.username,
      caption: textAreaRef.current.value,
      profileImage: session.data.user.image,
      timeStamp: serverTimestamp(),
      comments: [{ username: 'some user', text: 'I like this post' }],
    })
    const imageRef = ref(firebaseStorage, `posts/${docRef.id}/image`)

    await uploadString(imageRef, filesContent[0].content, 'data_url').then(
      async (snapshot) => {
        const downloadUrl = await getDownloadURL(imageRef)
        await updateDoc(doc(fireStoreDB, 'posts', `${docRef.id}`), {
          imageUrl: downloadUrl,
        })
      }
    )
    clear()
    setUploading(false)
    setModalState(false)
  }

  useEffect(() => {
    if (textAreaRef.current)
      textAreaRef.current.addEventListener('input', () => {
        let charCount = textAreaRef.current.value.length
        setCharCount(charCount)
      })
  }, [filesContent.length])

  return (
    <div
      // style={{ width: filesContent.length ? '800px' : '500px' }}
      className={`mx-auto mt-10 flex  ${
        filesContent.length
          ? 'h-[300px] w-[475px] sm:h-[380px] sm:w-[650px] md:h-[450px] md:w-[800px]'
          : 'h-[400px] w-full sm:w-1/2'
      } grow flex-col overflow-scroll rounded-[15px] bg-white `}
    >
      {!filesContent.length ? (
        <div className="border-b-solid flex justify-center border-b-[0.1px] border-b-grey p-0">
          <span className="m-3 font-semibold">
            <h1>Creat{uploading ? `ing` : `e`} New Post</h1>
          </span>
        </div>
      ) : (
        <div className="border-b-solid mx-4 flex items-center justify-between border-b-[0.1px] border-b-grey p-0">
          <button
            onClick={() => {
              setModalState(false)
            }}
          >
            <BackArrow />
          </button>
          <span className="m-3 text-lg font-semibold">{'Create New Post'}</span>
          <button
            className="text-teal"
            onClick={async () => {
              await upload()
            }}
          >
            {uploading ? <span className="text-lg">{'...'}</span> : 'Share'}
          </button>
        </div>
      )}
      <div
        className={`grid grow ${
          filesContent.length != 0 ? 'grid-cols-2' : 'grid-cols-1'
        }`}
      >
        <div
          id="postsModalBody"
          className="col-span-1 flex grow flex-col items-center justify-center"
        >
          {filesContent.length != 0 && !loading ? (
            <ImageGrid image={filesContent[0]} />
          ) : (
            <>
              <NewPostPlaceholder />
              <h2 className="text-bold">Drag photos and videos here</h2>
              <div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault()
                    openFileSelector()
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
            </>
          )}
        </div>
        {filesContent.length ? (
          <div className="cols-span-1 flex flex-col px-4 pt-4">
            <div className="flex items-center justify-start">
              <div className="relative mb-4 mr-4 h-12 w-12 overflow-clip rounded-full">
                <Image
                  src={session.data.user.image}
                  layout="fill"
                  objectFit="contain"
                />
              </div>
              <span>{session.data.user.username}</span>
            </div>
            <textarea
              ref={textAreaRef}
              className="grow resize-none border-none outline-none"
              placeholder="Write a caption..."
            ></textarea>
            <div className="flex justify-between pb-4">
              {/* <SmileyFace /> */}
              <span className="text-sm text-wordCount hover:text-black">
                {charCount}/2,200
              </span>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  )
}

export default ImageEditor
