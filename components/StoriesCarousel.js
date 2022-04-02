import React from 'react'
import Image from 'next/image'

function StoriesCarousel(props) {
  return (
    <div className="static mb-4 flex w-full overflow-y-clip overflow-x-scroll bg-white py-8 pl-6 pr-8 shadow">
      {props.children == null ? (
        <>No Stories passed as props.</>
      ) : (
        props.children.map((item) => item)
      )}
    </div>
  )
}

export default StoriesCarousel
