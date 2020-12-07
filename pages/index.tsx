import { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import React, { useState } from 'react'

import { Spinner } from '@simplish/components'

const Home: NextPage = () => {
  const [loading, setLoading] = useState(false)

  return (
    <>
      <Head>
        <title>Simplish: Dead simple todo lists</title>
      </Head>

      <main className="flex items-center justify-center p-8">
        <header className="flex flex-col lg:flex-row items-center text-center lg:text-left">
          <img alt="Simplish" className="w-16" src="/img/simplish.svg" />
          <div className="mt-4 lg:mt-0 lg:ml-4">
            <h1 className="text-3xl font-semibold lowercase">Simplish</h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Dead simple todo lists
            </p>
          </div>
        </header>

        <section className="mt-16">
          <Link href="/api/auth/sign-in?provider=github">
            <a
              className="flex items-center bg-gray-900 hover:bg-gray-800 px-4 py-3 rounded-full"
              onClick={() => setLoading(true)}>
              <span className="text-white font-medium">Sign in</span>
              {loading ? (
                <Spinner className="ml-2" color="bg-white" />
              ) : (
                <img className="h-6 w-6 ml-2" src="/img/ui/github.svg" />
              )}
            </a>
          </Link>
        </section>
      </main>
    </>
  )
}

export default Home
