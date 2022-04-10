import React, { useEffect, useState } from 'react'
import FeedCard from './FeedCard'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import { fireStoreDB } from '../firebase'
import { faker } from '@faker-js/faker'

function FeedList(props) {
  const [fakeFeed, setFakeFeed] = useState([])

  const [feed, setFeed] = useState([])

  useEffect(() => {
    let unsubscribe = onSnapshot(
      query(collection(fireStoreDB, 'posts'), orderBy('timeStamp', 'desc')),
      (snapshot) => {
        setFeed(snapshot.docs.map((post) => post.data()))

        setFakeFeed(
          [...Array(100 - feed.length)].map((_, i) => {
            //fill out up to 100 posts for demo.
            return {
              caption: faker.random.word(),
              isBookmarked: false,
              likes: 0,
              comments: [],
              userName: faker.name.findName(),
              profileImage: faker.image.avatar(),
              imageUrl:
                i % 2
                  ? faker.image.food(640, 640, true)
                  : faker.image.city(640, 640, true),
            }
          })
        )
      }
    )

    const unmount = () => {
      unsubscribe()
      setFakeFeed([])
    }

    return unmount
  }, [fireStoreDB])

  return (
    <div className="flex flex-col">
      {feed.map((post, i) => (
        <FeedCard key={i} post={post} />
      ))}
      {fakeFeed.map((post, i) => (
        <FeedCard key={i} post={post} fake />
      ))}
    </div>
  )
}

export default FeedList
