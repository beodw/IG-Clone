import React from 'react'
import FeedCard from './FeedCard'
import { Feed } from '../atoms'
import { useRecoilValue } from 'recoil'

function FeedList(props) {
  const feed = useRecoilValue(Feed)
  return (
    <div className="flex flex-col">
      {feed.map((post, i) => (
        <FeedCard key={i} post={post} />
      ))}
      {/* {fakeFeed.map((post, i) => (
        <FeedCard key={i} post={post} fake />
      ))} */}
    </div>
  )
}

export default FeedList
