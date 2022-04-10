import { atom } from 'recoil'
import { faker } from '@faker-js/faker'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import { fireStoreDB } from '../firebase'

const subscribeToPosts = ({ node, setSelf }) =>
  onSnapshot(
    query(collection(fireStoreDB, 'posts'), orderBy('timeStamp', 'desc')),
    (snapshot) => {
      let feed = snapshot.docs.map((post) => post.data())
      setSelf([...feed, ...genFakeFeed({ offset: feed.length })])
    }
  )

const genFakeFeed = ({ offset }) =>
  [...Array(100 - offset)].map((_, i) => {
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

const Feed = atom({
  key: 'feed',
  default: [],
  effects: [subscribeToPosts],
})

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

const SuggestionsList = atom({
  key: 'suggestions',
  default: [...Array(5)].map((_, i) => {
    return {
      userName: faker.name.findName(),
      profileImage: faker.image.avatar(),
      followedBy: faker.name.findName(),
    }
  }),
})

const Conversations = atom({
  key: 'conversations',
  default: [...Array(30)].map(() => {
    return {
      userName: faker.name.findName(),
      profileImage: faker.image.avatar(),
      messages: [
        { text: 'Hey', byMe: false },
        { text: 'Whatsup', byMe: true },
        { text: "I'm good...and you?", byMe: false },
        { text: "I'm fine", byMe: true },
        { text: 'Cool', byMe: true },
        { text: 'Hey', byMe: false },
        { text: 'Whatsup', byMe: true },
        { text: "I'm good...and you?", byMe: false },
        { text: "I'm fine", byMe: true },
        { text: "I'm good", byMe: true },
      ],
    }
  }),
})

export {
  StoriesAtom,
  StoriesModalAtom,
  ModalAtom,
  LastSelectedStoryIndex,
  SuggestionsList,
  Conversations,
  Feed,
}
