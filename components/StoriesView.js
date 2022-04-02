import React from 'react'

function StoriesView(props) {
  return (
    <div
      className={`h-[300px] ${
        props.isCenter ? 'w-[300px]' : `w-[${props.index}px]`
      } rounded-md bg-white shadow-lg`}
    ></div>
  )
}

export default StoriesView
