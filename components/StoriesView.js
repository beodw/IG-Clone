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
      }  rounded-md border-[1px] border-solid border-teal shadow-lg transition-all duration-[500ms]`}
    >
      <div className="relative h-full bg-teal">
        <Image
          priority
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5I4suBGVr6peZ7RSksUC2-LGnCHgMe7aC4m0VB2xusVyN7eQSOPgMNkl9Yeq_3OjJPc8&usqp=CAU"
          layout="fill"
          objectFit="contain"
        />
      </div>
    </div>
  )
})

export default StoriesView
