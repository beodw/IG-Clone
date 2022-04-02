import React from 'react'
import FeedCard from './FeedCard'

function FeedList(props) {
  var test = [...Array(20)]
  return (
    <div className="flex flex-col scrollbar-hide">
      {test.map((_, i) => (
        <FeedCard key={i} />
      ))}
    </div>
  )
}

export default FeedList
