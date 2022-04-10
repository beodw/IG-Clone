import React, { useEffect, useReducer, useRef, useCallback } from 'react'
import AspectRatioIcon from '../public/assets/static/icons/aspect_ratio_icon.svg'
import MagnifierIcon from '../public/assets/static/icons/magnifier_icon.svg'
import MultiplePostsIcon from '../public/assets/static/icons/multiple_post_icon.svg'

function ImageGrid(props) {
  const initialValues = {
    mouseDown: false,
    mouseXPos: 0,
    mouseYPos: 0,
  }
  const imageGridRef = useRef(null)
  const imageRef = useRef(null)
  const trackMouse = (e) => {
    let [xPos, yPos] = [
      imageRef.current.style.left.replace('px', ''),
      imageRef.current.style.top,
    ]
    let xDiff = e.x - parseInt(xPos)

    // imageRef.current.style.left = `${String(xDiff + e.x)}px`

    // console.log(e.x, xPos)
    // imageRef.current.style.top = `${String(e.y)}px`
  }
  const [imageGridState, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case 'showGrid':
        // imageGridRef.current.addEventListener('mousemove', trackMouse)
        // return { ...state, mouseDown: true }
        break
      case 'hideGrid':
        // imageGridRef.current.removeEventListener('mousemove', trackMouse)
        // return { ...state, mouseDown: false }
        break
      default:
        return state
    }
  }, initialValues)

  const test = useCallback(() => {
    // imageGridRef.current.addEventListener('mousedown', () =>
    //   dispatch({ type: 'showGrid' })
    // )
    // imageGridRef.current.addEventListener('mouseup', () =>
    //   dispatch({ type: 'hideGrid' })
    // )
  })

  useEffect(() => {
    test()
  }, [test])
  return (
    <div
      className={`relative w-full grow overflow-clip hover:${
        imageGridState.mouseDown ? 'cursor-grabbing' : 'cursor-grab'
      }`}
      ref={imageGridRef}
    >
      {imageGridState.mouseDown ? (
        <div className="absolute left-0 z-20 h-full w-full">
          <div className="flex h-2/6 grow bg-transparent">
            <div className="h-full w-2/6"></div>
            <div className="imageGridBorderX h-full w-2/6"></div>
            <div className="h-full w-2/6 "></div>
          </div>
          <div className="flex h-2/6 grow border-grey bg-transparent">
            <div className="imageGridBorderY h-full w-2/6"></div>
            <div className="imageGridBorderX imageGridBorderY h-full w-2/6"></div>
            <div className="imageGridBorderY h-full w-2/6"></div>
          </div>
          <div className="flex h-2/6 grow bg-transparent">
            <div className="h-full w-2/6 "></div>
            <div className="imageGridBorderX h-full w-2/6"></div>
            <div className="h-full w-2/6"></div>
          </div>
        </div>
      ) : (
        <></>
      )}

      {/* <button className="absolute bottom-4 left-4 z-30 rounded-full bg-black p-2 hover:opacity-40">
        <AspectRatioIcon />
      </button>

      <button className="absolute left-[60px] bottom-4 z-30 rounded-full bg-black p-2 hover:opacity-40">
        <MagnifierIcon />
      </button>

      <button className="absolute right-[10px] bottom-4 z-30 rounded-full bg-black p-2 hover:opacity-40">
        <MultiplePostsIcon />
      </button> */}
      <img
        ref={imageRef}
        style={{ left: '0px', top: '0px' }}
        className="absolute z-0 w-full object-cover"
        alt={props.image.name}
        src={props.image.content}
      />
    </div>
  )
}

export default ImageGrid
