import React from 'react'
import FeedCard from './FeedCard'
import { useRecoilValue } from 'recoil'
import { Feed } from '../atoms/atoms'

function FeedList(props) {
  const feed = useRecoilValue(Feed)

  return (
    <div className="flex flex-col scrollbar-hide">
      {feed.map((post, i) => (
        <FeedCard key={i} post={post} />
      ))}
    </div>
  )
}

export default FeedList
