import React, {
  forwardRef,
  useImperativeHandle,
  useState,
  useMemo,
} from 'react'
import Image from 'next/image'
import ColorThief from 'colorthief/dist/color-thief.mjs'
import { StoriesAtom, Feed } from '../atoms'
import { useRecoilValue } from 'recoil'
import PlayIcon from '../public/assets/static/icons/play_icon.svg'
import MuteIcon from '../public/assets/static/icons/mute_icon.svg'
import MoreHorizontal from '../public/assets/static/icons/more_horizontal.svg'

const StoriesView = forwardRef((props, ref) => {
  const getTimeElapsed = () => Math.floor(Math.random() * 11)
  const getRandIndex = () => Math.floor(Math.random() * 99)
  const randomTime = useMemo(getTimeElapsed, [])
  const randomIndex = useMemo(getRandIndex, [])

  const stories = useRecoilValue(StoriesAtom)
  const fakeFeed = useRecoilValue(Feed)
  const imageVal = useMemo(() => fakeFeed[randomIndex].imageUrl, [])
  const [height, setHeight] = useState(100)
  const [width, setWidth] = useState(100)

  const [loadingImage, setLoadingImage] = useState(true)
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
    setBgColor(color)
  }

  return (
    <div
      className={`mx-4 ${
        props.onSide
          ? 'h-1/2  w-[200px] min-w-[200px] rounded-lg'
          : 'h-full min-h-full w-[350px] min-w-[300px]'
      }  rounded-lg shadow transition-all duration-[400ms]`}
    >
      <div className="relative flex h-full flex-col items-center justify-center shadow ">
        {props.onSide && (
          <div className="absolute z-50 h-full w-full bg-white/[.35] hover:cursor-pointer">
            <div className="absolute top-1/2 left-1/2 z-30 flex -translate-x-1/2 -translate-y-1/2 transform flex-col items-center overflow-clip">
              <div className="h-14 w-14 rounded-full border-[1px] border-red p-[2px]">
                <Image
                  className="rounded-full"
                  src={stories[props.index].imageUrl}
                  layout="intrinsic"
                  width={50}
                  height={50}
                />
              </div>
              <div className="flex flex-col items-center justify-center">
                <h1 className="truncate text-sm text-white">
                  {stories[props.index].userName}
                </h1>
                <h2 className="text-sm font-light text-white">{randomTime}h</h2>
              </div>
            </div>
          </div>
        )}
        <div
          style={{
            backgroundImage: `linear-gradient(to top, rgba(${bgColor[0][0]},${bgColor[0][1]},${bgColor[0][2]},1), rgba(${bgColor[1][0]},${bgColor[1][1]},${bgColor[1][2]}, 1))`,
          }}
          className="absolute top-0 left-0 h-full w-full rounded-md px-2"
        ></div>
        {!props.onSide ? (
          <div className="relative w-full">
            <div className="flex justify-center">
              <div className="mx-[1px] h-[2px] w-11/12 rounded-lg bg-white"></div>
              {/* <div className="mx-[1px] h-[2px] w-24 rounded-lg bg-white"></div>
            <div className="mx-[1px] h-[2px] w-24 rounded-lg bg-white"></div> */}
            </div>
            <div className="mt-4 flex items-center justify-between px-4">
              <div className="flex items-center justify-between">
                <div className="relative flex h-10 w-10 items-center justify-center overflow-clip rounded-full hover:cursor-pointer">
                  <Image
                    className="rounded-full"
                    src={stories[props.index].imageUrl}
                    layout="fill"
                    objectFit="contain"
                  />
                </div>
                <div className="mx-4 flex justify-between">
                  <span className="mx-2 w-14 truncate text-xs font-semibold text-white hover:cursor-pointer">
                    {stories[props.index].userName}
                  </span>
                  <span className="text-xs font-thin text-black">
                    {randomTime == 0 ? randomTime + 1 : randomTime}h
                  </span>
                </div>
              </div>
              <div className="flex justify-around">
                <button className="mr-4 text-xs">
                  <PlayIcon className="h-4 w-4" />
                </button>
                <button className="mr-4 text-xs ">
                  <MuteIcon className="h-4 w-4" />
                </button>
                <button className="text-xs ">
                  <MoreHorizontal className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}
        <div
          className={`relative mx-4 ${
            props.onSide ? 'h-5/6 w-5/6' : 'h-5/6 w-5/6'
          } overflow-clip `}
        >
          <Image
            id={props.index}
            onLoadingComplete={() => getBG()}
            className={`mx-4 mt-4`}
            priority
            src={imageVal}
            layout="fill"
            objectFit="contain"
          />
        </div>
      </div>
    </div>
  )
})

export default StoriesView
