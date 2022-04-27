import { atom } from 'recoil'
import { faker } from '@faker-js/faker'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import { fireStoreDB } from '../firebase'
import { io } from 'socket.io-client'

const subscribeToPosts = ({ setSelf }) =>
  onSnapshot(
    query(collection(fireStoreDB, 'posts'), orderBy('timeStamp', 'desc')),
    (snapshot) => {
      setSelf([...snapshot.docs.map((post) => post.data()), ...fakeFeed])
    }
  )

const fakeFeed = [...Array(100)].map((_, i) => {
  return {
    fake: true,
    id: faker.datatype.number(),
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
  default: fakeFeed,
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

const fakeStories = [...Array(100)].map((_, i) => {
  return {
    content: [],
    userName: faker.name.findName(),
    imageUrl: faker.image.avatar(),
    isCenter: false,
    onSide: false,
  }
})

const StoriesAtom = atom({
  key: 'stories',
  default: fakeStories,
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

const subscribeToMessagesMicroService = () => {
  // const socket = io('http://localhost:3000/api/ms')
  // socket.on('connect', () => alert('connected'))
}

const MessagingServices = atom({
  key: 'messagingServices',
  default: [],
  effects: [subscribeToMessagesMicroService],
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
