// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { faker } from '@faker-js/faker'

type payLoad = Array<object>

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

export default function handler(
  req: any,
  res: NextApiResponse<payLoad>
) {
  if ( !('start' in req.headers) || !('end' in req.headers) ){ res.status(400); return}
  let start = parseInt(req.headers.start)
  let end = parseInt(req.headers.end)
  var response: payLoad = fakeFeed.slice(start,end)
  res.status(200).json(response)
}
