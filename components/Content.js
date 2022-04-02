import { HomePage } from '../components/'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

import React from 'react'

function Content(props) {
  const session = useSession()
  const router = useRouter()
  const authenticated = session.status == 'authenticated' ? true : false
  authenticated ?? router.push('auth/signin')

  return <div>Content</div>
}

export default Content
