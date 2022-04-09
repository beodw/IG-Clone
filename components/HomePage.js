import React from 'react'
import StoriesCarousel from './StoriesCarousel'
import Story from './Story'
import Suggestions from './Suggestions'
import FeedList from './FeedList'
import { useRecoilValue } from 'recoil'
import { StoriesAtom } from '../atoms/atoms'
function HomePage() {
  const userStories = useRecoilValue(StoriesAtom)

  return (
    <main
      className={
        'mx-auto grid grid-cols-1 overflow-clip p-4 md:max-w-[920px] md:grid-cols-3 md:p-0  xl:max-w-6xl xl:grid-cols-3 '
      }
    >
      <section className="overflow-scroll md:col-span-2">
        {userStories == [] ? (
          <div></div>
        ) : (
          <StoriesCarousel>
            {userStories.map((userStory, i) => (
              <Story
                image={userStory.imageUrl}
                key={i}
                index={i}
                username={userStory.userName}
              />
            ))}
          </StoriesCarousel>
        )}

        <FeedList />
      </section>
      <section className="sticky top-0 hidden md:block">
        <Suggestions />
      </section>
    </main>
  )
}

export default HomePage
