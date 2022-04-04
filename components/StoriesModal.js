import React, { useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import CloseIcon from '../public/assets/static/icons/close_icon.svg'
import Link from 'next/link'
import Image from 'next/image'
import StoriesView from './StoriesView'
import { StoriesAtom, LastSelectedStoryIndex } from '../atoms/atoms'
import { useRecoilState } from 'recoil'
import { useSpring, animated, easings } from 'react-spring'

function Modal(props) {
  const [stories, setStories] = useRecoilState(StoriesAtom)
  const [scrollDist, setScrollDist] = useState(0)
  const [lastSelectedStoryIndex, setLastSelectedStoryIndex] = useRecoilState(
    LastSelectedStoryIndex
  )

  return (
    <Dialog
      as="div"
      className="overflow-y-none fixed inset-0 z-10"
      onClose={props.close}
      open={true}
    >
      <div className="flex h-screen min-h-screen shrink-0 items-start justify-between overflow-auto bg-modalBlack  p-4 md:mt-0 ">
        <div className="flex flex-shrink-0 items-start justify-center">
          <Link href="/">
            <Image
              priority
              src="/assets/static/images/igLogoWhite.png"
              width={103}
              height={29}
              layout="intrinsic"
            />
          </Link>
        </div>
        <div className="flex h-full grow flex-col items-center justify-center overflow-clip py-2">
          <div className="mx-24 flex grow items-center overflow-clip bg-green px-24">
            <div className="absolute left-1/2 z-20 flex bg-transparent">
              <button
                className="min-w-48 mr-8  "
                onClick={() => {
                  setScrollDist((prevScrollDist, props) => {
                    return prevScrollDist - 100
                  })
                }}
              >
                <span className="text-white">{'<-'}</span>
              </button>
              <button
                className="min-w-48 ml-8  "
                onClick={() => {
                  // setStories((prevStories) => {
                  //   prevStories[lastSelectedStoryIndex].isCenter = false
                  //   [...prevStories.slice(0,lastSelectedStoryIndex - 1 ),
                  //     {...prevStories[lastSelectedStoryIndex],onSide: false, isCenter: false},
                  //     {...prevStories[lastSelectedStoryIndex],onSide: true, isCenter: false},
                  //     {...prevStories[lastSelectedStoryIndex],onSide: true, isCenter: true},
                  //   ...prevStories.slice(lastSelectedStoryIndex+2, prevStories.length)]
                  //   return prevStories
                  // })
                  // setScrollDist((prevScrollDist, props) => {
                  //   return prevScrollDist + 100
                  // })
                }}
              >
                <span className="text-white">{'->'}</span>
              </button>
            </div>
            {stories.map((story, i) => {
              if (story.isCenter) {
                const styles = useSpring({
                  immediate: false,
                  from: { x: 0, height: 200 },
                  to: {
                    x: scrollDist,
                    height: story.isCenter ? 600 : 100,
                  },
                  config: {
                    duration: 300,
                    easing: easings.easeInQuart,
                  },
                })

                return (
                  <animated.div
                    className="mx-4 flex h-full grow items-center bg-grey p-2 px-2"
                    style={styles}
                  >
                    <StoriesView
                      onSide={story.onSide}
                      isCenter={story.isCenter}
                      key={i}
                      index={i}
                      story={story}
                    />
                  </animated.div>
                )
              } else {
                return <></>
              }
            })}
          </div>
        </div>

        <div className="mt-2 pr-2">
          <CloseIcon
            className="hover:cursor-pointer"
            onClick={() => {
              setStories((stories) => {
                return [...stories].map((story) => {
                  return { ...story, isCenter: false, onSide: false }
                })
              })
              props.close(false)
            }}
          />
        </div>

        {props.children}
      </div>
    </Dialog>
  )
}

export default Modal
