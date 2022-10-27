import type { NextPage } from 'next';
import NextLink from 'next/link';
import Head from 'next/head';
import { useSession, signIn, signOut } from 'next-auth/react';
import Navbar from '../components/nav';

const SearchPage: NextPage = () => {
  const { data: session } = useSession();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Navbar pageName="Search" />
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center flex-1 w-full px-20 text-center">
        <h1 className="text-6xl font-bold">
          Welcome to{' '}
          <NextLink href="https://nextjs.org">
            <a className="text-red-600">Next.js!</a>
          </NextLink>
        </h1>

        <p className="mt-3 text-2xl">
          Curso full-stack de
          <code className="p-3 font-mono text-lg bg-gray-100 rounded-md">
            Next.js
          </code>
        </p>

        <div>
          {session ? (
            <div>
              Signed in as {session.user.email} <br />
              <button onClick={() => signOut()}>Sign out</button>
            </div>
          ) : (
            <div>
              Not signed in <br />
              <button onClick={() => signIn()}>Sign in</button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default SearchPage;
