import { useRecoilValue } from 'recoil'
import LoadingIcon from '../public/assets/static/icons/loadingIcon.svg'
import { Feed, Conversations } from '../atoms'

function Loader(props: { children: any }) {
  const feed = useRecoilValue(Feed)
  const conversations = useRecoilValue(Conversations)

  return feed.length == 0 || conversations.length == 0 ? (
    <LoadingIcon
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        margin: '-25px 0 0 -25px',
        fill: '#c7c7c7',
      }}
    />
  ) : (
    { ...props.children }
  )
}

export default Loader
