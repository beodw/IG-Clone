import React from 'react'
import Image from 'next/image'
import { StoriesModalAtom } from '../atoms/atoms'
import { useRecoilState } from 'recoil'

function Story(props) {
  const [storiesModalState, setStoriesModalState] =
    useRecoilState(StoriesModalAtom)
  return (
    <div
      onClick={() => {
        setStoriesModalState(true)
      }}
      className="ml-2 flex flex-col items-center"
    >
      <div className="relative h-20 w-20 flex-col items-center justify-center overflow-clip rounded-full border-2 border-solid border-red p-[1.5px] hover:cursor-pointer">
        <Image
          priority
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5I4suBGVr6peZ7RSksUC2-LGnCHgMe7aC4m0VB2xusVyN7eQSOPgMNkl9Yeq_3OjJPc8&usqp=CAU"
          layout="fill"
        />
      </div>

      <div className="flex justify-center">
        <span className="w-14 truncate text-sm">MrCat</span>
      </div>
    </div>
  )
}

export default Story
