import { useFilePicker } from 'use-file-picker'
import NewPostPlaceholder from '../public/assets/static/icons/new_post_placeholder_icon.svg'
import BackArrow from '../public/assets/static/icons/back_arrow.svg'
import React, { useRef } from 'react'

function ImageEditor() {
  const imageRegion = useRef(null)
  const [openFileSelector, { filesContent, loading, errors }] = useFilePicker({
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

  const showGrid = () => {}
  return (
    <div className="mx-auto mt-10 flex h-[480px] w-[450px] grow flex-col overflow-scroll rounded-[15px] bg-white">
      {!filesContent.length ? (
        <div className="border-b-solid flex justify-center border-b-[0.1px] border-b-grey p-0">
          <span className="m-3 font-semibold">
            <h1>Create New Post</h1>
          </span>
        </div>
      ) : (
        <div className="border-b-solid mx-4 flex items-center justify-between border-b-[0.1px] border-b-grey p-0">
          <button>
            <BackArrow />
          </button>
          <span className="m-3 font-semibold">
            <h1>Crop</h1>
          </span>
          <button className="text-teal">{'Next'}</button>
        </div>
      )}
      <div
        id="postsModalBody"
        className="flex grow flex-col items-center justify-center"
      >
        {filesContent.length != 0 && !loading ? (
          <div
            className="relative w-full grow"
            ref={imageRegion}
            onClick={() => {
              showGrid()
            }}
          >
            <div className="z-2 absolute left-0 h-full w-full" id="grid">
              <div className="flex h-2/6 grow bg-transparent">
                <div className="h-full w-2/6"></div>
                <div className="imageGridBorderX h-full w-2/6"></div>
                <div className="h-full w-2/6 "></div>
              </div>
              <div className="flex h-2/6 grow border-grey bg-transparent">
                <div className="imageGridBorderY h-full w-2/6"></div>
                <div className="imageGridBorderX imageGridBorderY h-full w-2/6"></div>
                <div className="imageGridBorderY h-full w-2/6"></div>
              </div>
              <div className="flex h-2/6 grow bg-transparent">
                <div className="h-full w-2/6 "></div>
                <div className="imageGridBorderX h-full w-2/6"></div>
                <div className="h-full w-2/6"></div>
              </div>
            </div>

            <img
              className="h-[400px] w-full object-cover"
              alt={filesContent[0].name}
              src={filesContent[0].content}
            />
          </div>
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
    </div>
  )
}

export default ImageEditor
