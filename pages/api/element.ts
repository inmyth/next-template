import { withIronSessionApiRoute } from 'iron-session/next'
import { sessionOptions } from '../../lib/session'
import { NextApiRequest, NextApiResponse } from 'next'

export type Element = {
  creator: string
  country: string
}
export default async function elementHandler(req: NextApiRequest, res: NextApiResponse) {
    const params =  new URLSearchParams({
      name: req.query.element as string 
    })

    const options = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
    };
    try {
      const {creator, country} = await fetch("https://z8w0w.mocklab.io/element/?" + params , options).then(response => response.json())    
      const element = {creator: creator, country: country} as Element
      res.status(200).send(element)
    } catch (error) {
      res.status(500).json({ message: (error as Error).message })
    }
  }