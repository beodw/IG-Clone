import { atom } from 'recoil'

const ModalAtom = atom({
  key: 'isShown',
  default: false,
})

const StoriesModalAtom = atom({
  key: 'storiesIsShown',
  default: false,
})

const StoriesAtom = atom({
  key: 'stories',
  default: [
    { userName: 'beod wilson', imageUrl: 'https://imageUrl.com/image' },
  ],
})

export { StoriesAtom, StoriesModalAtom, ModalAtom }
