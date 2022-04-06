import React from 'react'
import Image from 'next/image'
import {
  StoriesModalAtom,
  StoriesAtom,
  LastSelectedStoryIndex,
} from '../atoms/atoms'
import { useRecoilState, useSetRecoilState } from 'recoil'

function Story(props) {
  const [storiesModalState, setStoriesModalState] =
    useRecoilState(StoriesModalAtom)
  const setStories = useSetRecoilState(StoriesAtom)
  const [lastSelectedStoryIndex, setLastSelectedStoryIndex] = useRecoilState(
    LastSelectedStoryIndex
  )
  return (
    <div
      onClick={() => {
        setLastSelectedStoryIndex(() => props.index)
        setStories((prevStories) => {
          return prevStories.length - props.index > 1 && props.index > 0
            ? [
                ...prevStories.slice(0, props.index - 1),
                {
                  ...prevStories[props.index - 1],
                  isCenter: true,
                  onSide: true,
                },
                { ...prevStories[props.index], isCenter: true, onSide: false },
                {
                  ...prevStories[props.index + 1],
                  isCenter: true,
                  onSide: true,
                },
                ...prevStories.slice(props.index + 2, prevStories.length),
              ]
            : props.index == 0
            ? [
                { ...prevStories[props.index], isCenter: true, onSide: false },
                {
                  ...prevStories[props.index + 1],
                  isCenter: true,
                  onSide: true,
                },
                {
                  ...prevStories[props.index + 2],
                  isCenter: true,
                  onSide: true,
                },
                ...prevStories.slice(props.index + 3, prevStories.length),
              ]
            : [
                ...prevStories.slice(0, props.index - 2),
                {
                  ...prevStories[props.index - 2],
                  isCenter: true,
                  onSide: true,
                },
                {
                  ...prevStories[props.index - 1],
                  isCenter: true,
                  onSide: true,
                },
                { ...prevStories[props.index], isCenter: true, onSide: false },
              ]
        })
        setStoriesModalState(true)
      }}
      className="ml-2 flex flex-col items-center"
    >
      <div className="relative h-20 w-20 flex-col items-center justify-center overflow-clip rounded-full border-2 border-solid border-red object-contain p-[1.5px] hover:cursor-pointer">
        <Image
          className="rounded-full"
          src={props.image}
          width={124}
          height={124}
        />
      </div>

      <div className="flex w-full justify-center ">
        <span className=" w-14 truncate text-center text-xs">
          {props.username}
        </span>
      </div>
    </div>
  )
}

export default Story
