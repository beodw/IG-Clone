import { atom } from 'recoil'
import { faker } from '@faker-js/faker'

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
      content: [],
      userName: faker.name.findName(),
      imageUrl: faker.image.avatar(),
      isCenter: false,
      onSide: false,
    }
  }),
})

const Feed = atom({
  key: 'feed',
  default: [...Array(100)].map((_, i) => {
    return {
      isBookmarked: false,
      likes: 0,
      comments: [],
      userName: faker.name.findName(),
      profileImage: faker.image.avatar(),
      imageUrl: faker.image.city(),
    }
  }),
})

const SuggestionsList = atom({
  key: 'suggestions',
  default: [...Array(5)].map((_, i) => {
    return {
      userName: faker.name.findName(),
      profileImage: faker.image.avatar(),
    }
  }),
})

export {
  StoriesAtom,
  StoriesModalAtom,
  ModalAtom,
  LastSelectedStoryIndex,
  Feed,
  SuggestionsList,
}
