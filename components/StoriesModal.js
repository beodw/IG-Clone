import React, { useState } from 'react'
import { Dialog } from '@headlessui/react'
import CloseIcon from '../public/assets/static/icons/close_icon.svg'
import ArrowIcon from '../public/assets/static/icons/downward_arrow.svg'
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

  const styles = useSpring({
    immediate: false,
    from: { x: 0, height: 100 },
    to: {
      x: 0,
      height: 600,
    },
    config: {
      duration: 300,
      easing: easings.easeInQuart,
    },
  })

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
          <div className="mx-24 flex grow items-center justify-center overflow-clip px-24">
            <div className="absolute z-20 flex">
              <button
                className="min-w-48 mr-48 h-6 w-6 rounded-full bg-StoryButton hover:bg-grey focus:outline-none "
                onClick={() => {
                  setScrollDist((prevScrollDist, props) => {
                    return prevScrollDist + 100
                  })
                  if (
                    lastSelectedStoryIndex > 1 &&
                    lastSelectedStoryIndex < stories.length - 1
                  ) {
                    setStories([
                      ...stories.slice(0, lastSelectedStoryIndex - 2),
                      {
                        ...stories[lastSelectedStoryIndex - 2],
                        onSide: true,
                        isCenter: true,
                      },
                      {
                        ...stories[lastSelectedStoryIndex - 1],
                        onSide: false,
                        isCenter: true,
                      },
                      {
                        ...stories[lastSelectedStoryIndex],
                        onSide: true,
                        isCenter: true,
                      },
                      {
                        ...stories[lastSelectedStoryIndex + 1],
                        onSide: false,
                        isCenter: false,
                      },

                      ...stories.slice(
                        lastSelectedStoryIndex + 2,
                        stories.length
                      ),
                    ])
                    setLastSelectedStoryIndex(() => lastSelectedStoryIndex - 1)
                  } else if (lastSelectedStoryIndex == 1) {
                    setStories([
                      {
                        ...stories[0],
                        onSide: false,
                        isCenter: true,
                      },
                      {
                        ...stories[1],
                        onSide: true,
                        isCenter: true,
                      },
                      {
                        ...stories[2],
                        onSide: true,
                        isCenter: true,
                      },

                      ...stories.slice(3, stories.length),
                    ])
                    setScrollDist(0)
                    setLastSelectedStoryIndex(() => lastSelectedStoryIndex - 1)
                  } else {
                    setScrollDist(0)
                  }
                }}
              >
                <div className="flex items-center justify-center pr-[2px] text-white">
                  <ArrowIcon className="-rotate-90 fill-black" />
                </div>
              </button>
              <button
                className="min-w-8 min-h-8 ml-48 h-6 w-6 rounded-full bg-StoryButton hover:bg-grey focus:outline-none"
                onClick={() => {
                  setScrollDist((prevScrollDist, props) => {
                    return prevScrollDist - 100
                  })
                  if (
                    lastSelectedStoryIndex > 0 &&
                    lastSelectedStoryIndex < stories.length - 1
                  ) {
                    setStories([
                      ...stories.slice(0, lastSelectedStoryIndex - 1),
                      {
                        ...stories[lastSelectedStoryIndex - 1],
                        onSide: false,
                        isCenter: false,
                      },
                      {
                        ...stories[lastSelectedStoryIndex],
                        onSide: true,
                        isCenter: true,
                      },
                      {
                        ...stories[lastSelectedStoryIndex + 1],
                        onSide: false,
                        isCenter: true,
                      },
                      {
                        ...stories[lastSelectedStoryIndex + 2],
                        onSide: true,
                        isCenter: true,
                      },
                      ...stories.slice(
                        lastSelectedStoryIndex + 3,
                        stories.length
                      ),
                    ])
                    setLastSelectedStoryIndex(() => lastSelectedStoryIndex + 1)
                  } else if (lastSelectedStoryIndex == 0) {
                    setStories([
                      {
                        ...stories[lastSelectedStoryIndex],
                        onSide: true,
                        isCenter: true,
                      },
                      {
                        ...stories[lastSelectedStoryIndex + 1],
                        onSide: false,
                        isCenter: true,
                      },
                      {
                        ...stories[lastSelectedStoryIndex + 2],
                        onSide: true,
                        isCenter: true,
                      },

                      ...stories.slice(
                        lastSelectedStoryIndex + 3,
                        stories.length
                      ),
                    ])
                    setLastSelectedStoryIndex(() => lastSelectedStoryIndex + 1)
                  } else {
                    setScrollDist(0)
                  }
                }}
              >
                <div className="flex items-center justify-center pl-[2px] text-white">
                  <ArrowIcon className="rotate-90 fill-black" />
                </div>
              </button>
            </div>
            {stories.map((story, i) => {
              if (story.isCenter) {
                return (
                  <animated.div
                    className="mx-4 flex h-full grow items-center  p-2 px-2"
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
