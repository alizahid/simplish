import { Client } from 'faunadb'
import { sign, verify } from 'jsonwebtoken'
import { destroyCookie, parseCookies, setCookie } from 'nookies'

import { ContextRequest, ContextResponse, User } from '@simplish/types'

import { getUser } from './fauna'

const cookieOptions = {
  domain: process.env.URI,
  httpOnly: true,
  path: '/',
  sameSite: 'strict',
  secure: process.env.NODE_ENV === 'production'
}

export const getProfile = (
  context: ContextRequest,
  fauna: Client
): Promise<User> => {
  const { token } = parseCookies(context, cookieOptions)

  if (!token) {
    return null
  }

  const email = verify(token, process.env.TOKEN_SECRET)

  return getUser(fauna, email as string)
}

export const login = (context: ContextResponse, email: string): void => {
  const token = sign(email, process.env.TOKEN_SECRET)

  setCookie(context, 'token', token, cookieOptions)
}

export const logout = (context: ContextResponse): void => {
  destroyCookie(context, 'token', cookieOptions)
}
