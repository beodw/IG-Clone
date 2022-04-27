import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react'
import Image from 'next/image'
import ColorThief from 'colorthief/dist/color-thief.mjs'

const StoriesView = forwardRef((props, ref) => {
  const [height, setHeight] = useState(100)
  const [width, setWidth] = useState(100)
  useImperativeHandle(ref, () => ({
    width: 100,
    height: 100,
  }))
  const [bgColor, setBgColor] = useState([
    [0, 0, 0],
    [0, 0, 0],
  ])
  const ct = new ColorThief()

  const getBG = () => {
    const img = document.getElementById(props.index)
    const color = ct.getPalette(img, 2, 150)
    console.log(color)
    setBgColor(color)
  }

  return (
    <div
      className={`mx-4 ${
        props.onSide
          ? 'h-1/2 w-[200px] min-w-[200px]'
          : 'h-full min-h-full w-[350px] min-w-[300px]'
      }  rounded-md shadow transition-all duration-[400ms]`}
    >
      <div className="relative flex h-full flex-col items-center justify-center shadow ">
        <div
          style={{
            backgroundImage: `linear-gradient(to top, rgba(${bgColor[0][0]},${bgColor[0][1]},${bgColor[0][2]},1), rgba(${bgColor[1][0]},${bgColor[1][1]},${bgColor[1][2]}, 1))`,
          }}
          className="absolute top-0 left-0 h-full w-full rounded-md px-2"
        ></div>
        <div className="relative w-full">
          <div className="flex justify-center">
            <div className="mx-[1px] h-[2px] w-24 rounded-lg bg-white"></div>
            <div className="mx-[1px] h-[2px] w-24 rounded-lg bg-white"></div>
            <div className="mx-[1px] h-[2px] w-24 rounded-lg bg-white"></div>
          </div>
          <div className="mt-4 flex items-center justify-between px-4">
            <div className="flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center overflow-clip rounded-full hover:cursor-pointer">
                user image
              </div>
              <div className="mx-4 flex justify-between">
                <span className="mx-2 w-14 truncate text-xs font-semibold text-white hover:cursor-pointer">
                  username
                </span>
                <span className="text-xs font-thin text-black">12h</span>
              </div>
            </div>
            <div className="flex justify-around">
              <button className="mr-4 text-xs">pi</button>
              <button className="mr-4 text-xs ">mi</button>
              <button className="text-xs ">mh</button>
            </div>
          </div>
        </div>
        <div className="relative mx-4 h-5/6 w-5/6">
          <Image
            id={props.index}
            onLoadingComplete={() => getBG()}
            className="mx-4"
            priority
            src={props.story.imageUrl}
            // src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5I4suBGVr6peZ7RSksUC2-LGnCHgMe7aC4m0VB2xusVyN7eQSOPgMNkl9Yeq_3OjJPc8&usqp=CAU"
            layout="fill"
            objectFit="contain"
          />
        </div>
      </div>
    </div>
  )
})

export default StoriesView
