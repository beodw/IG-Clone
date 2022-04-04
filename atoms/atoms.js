import { atom } from 'recoil'

const ModalAtom = atom({
  key: 'isShown',
  default: false,
})

const StoriesModalAtom = atom({
  key: 'storiesIsShown',
  default: false,
})

const LastSelectedStoryIndex = atom({
  key: 'lastSelectedStoryIndex',
  default: null,
})

const StoriesAtom = atom({
  key: 'stories',
  default: [...Array(100)].map((_, i) => {
    return {
      userName: 'beod wilson',
      imageUrl: 'https://imageUrl.com/image',
      isCenter: false,
      onSide: false,
    }
  }),
})

export { StoriesAtom, StoriesModalAtom, ModalAtom, LastSelectedStoryIndex }
