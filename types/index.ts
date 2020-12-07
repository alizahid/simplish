import { Request, Response } from 'express'
import { NextApiRequest, NextApiResponse, NextPageContext } from 'next'

// auth

export type ContextRequest =
  | Pick<NextPageContext, 'req'>
  | {
      req: NextApiRequest
    }
  | {
      req: Request
    }

export type ContextResponse =
  | Pick<NextPageContext, 'res'>
  | {
      res: NextApiResponse
    }
  | {
      res: Response
    }

// fauna

export type FaunaDocument = {
  ref: {
    id: string
  }
  data: Record<string, never>
}

export type FaunaCollection = {
  data: FaunaDocument[]
}

// models

export type User = {
  id: string
  name: string
  email: string
}

export type List = {
  id: string
  name: string
  order: number
  user: string
}

export type ListItem = {
  id: string
  user: string
  list: string
  content: string
  completed: boolean
  order: number
}
