import { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import React from 'react'

interface Props {
  code: number
}

const NotFound: NextPage<Props> = () => (
  <>
    <Head>
      <title>Not found / Simplish</title>
    </Head>

    <main className="flex items-center justify-center transform rotate-180">
      <img alt="Simplish" className="w-20" src="/img/simplish.svg" />
      <h1 className="text-2xl font-semibold my-4">Not found</h1>
      <Link href="/">
        <a>Home</a>
      </Link>
    </main>
  </>
)

export default NotFound
