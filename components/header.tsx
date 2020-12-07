import Link from 'next/link'
import React, { FunctionComponent } from 'react'

import { User } from '@simplish/types'

import { Icon } from './icon'

interface Props {
  user: User
}

export const Header: FunctionComponent<Props> = ({ user }) => (
  <header className="flex items-center justify-between border-b border-border-white dark:border-border-black">
    <div className="flex items-center mx-8">
      <img alt="Simplish" className="h-8 w-8" src="/img/simplish.svg" />
      <h1 className="font-medium ml-4">{user.name}</h1>
    </div>
    <Link href="/api/auth/sign-out">
      <a className="p-8">
        <Icon className="text-gray-500 h-4 w-4" icon="signOut" />
      </a>
    </Link>
  </header>
)
