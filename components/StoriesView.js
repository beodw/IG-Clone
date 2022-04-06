import React, { forwardRef, useImperativeHandle, useState } from 'react'
import Image from 'next/image'

const StoriesView = forwardRef((props, ref) => {
  const [height, setHeight] = useState(100)
  const [width, setWidth] = useState(100)
  useImperativeHandle(ref, () => ({
    width: 100,
    height: 100,
  }))
  return (
    <div
      className={`mx-4 ${
        props.onSide
          ? 'h-1/2 w-[150px]'
          : 'h-full min-h-full w-full min-w-[300px]'
      }  rounded-md shadow transition-all duration-[500ms]`}
    >
      <div className="relative flex h-full flex-col items-center justify-center shadow ">
        <div className="absolute top-0 left-0 h-full w-full rounded-md bg-gradient-to-r from-textGrey to-grey"></div>
        <div className="bg-teal px-2">
          <Image
            className="object-contain "
            priority
            src={props.story.imageUrl ?? console.log(props.story, props.index)}
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
