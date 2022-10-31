import { useCallback, useState } from 'react';
import type { NextPage } from 'next';
import NextLink from 'next/link';
import Head from 'next/head';
import { useSession, signIn, signOut } from 'next-auth/react';
import Navbar from '../../components/nav';
import api from '../../utils/api';
import Link from 'next/link';

interface TeacherType {
  _id: string;
  name: string;
  email: string;
  cellphone: string;
  teacher: boolean;
  coins: number;
  courses: Array<string>;
  available_hours: Record<string, number[]>;
  available_locations: Array<string>;
  reviews: Record<string, unknown>[];
  appointments: {
    date: string;
  }[];
}

const SearchPage: NextPage = () => {
  const { data: session } = useSession();
  const [textInput, setTextInput] = useState<string>('');
  const [data, setData] = useState<TeacherType[]>([]);

  const handleSearch = useCallback(async () => {
    api(`/api/search/${textInput}`).then((response) => {
      const teachers: TeacherType[] = response.data;
      setData(teachers);
    });
  }, [textInput, setData]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Navbar pageName="Search" name="Navbar" />
      <div className="flex flex-col w-full p-2">
        <div className="flex justify-between w-full overflow-hidden border-2 border-blue-500 rounded-lg">
          <input
            type="text"
            name=""
            id=""
            value={textInput}
            className="w-full px-4"
            placeholder="Buscar cursos"
            onChange={(e) => setTextInput(e.target.value)}
          />
          <button
            type="submit"
            className="px-4 py-2 text-white bg-blue-500 rounded-lg"
            onClick={handleSearch}
          >
            Buscar
          </button>
        </div>
        <ul>
          {data.length !== 0 &&
            data.map((teacher) => (
              <li className="text-2xl" key={teacher._id}>
                <Link href={`/search/${teacher._id}`}>
                  <a>{teacher.name}</a>
                </Link>
              </li>
            ))}
        </ul>
      </div>
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
