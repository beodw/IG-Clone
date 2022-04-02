import React from 'react'
import StoriesCarousel from './StoriesCarousel'
import Story from './Story'
import Suggestions from './Suggestions'
import FeedList from './FeedList'
import { useRecoilState } from 'recoil'
import { StoriesAtom } from '../atoms/atoms'
function HomePage() {
  var [test] = useRecoilState(StoriesAtom).values()

  return (
    <main
      className={
        'mx-auto grid grid-cols-1 overflow-clip p-4 md:max-w-4xl md:grid-cols-3 md:p-0  xl:max-w-6xl xl:grid-cols-3 '
      }
    >
      <section className="overflow-scroll md:col-span-2">
        <StoriesCarousel>
          {test.map((_, i) => (
            <Story key={i} />
          ))}
        </StoriesCarousel>

        <FeedList />
      </section>
      <section className="sticky top-0 hidden md:block">
        <Suggestions />
      </section>
    </main>
  )
}

export default HomePage
