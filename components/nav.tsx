import { NextPage } from 'next';
import { SERVER_PROPS_ID } from 'next/dist/shared/lib/constants';
import Link from 'next/link';

const Navbar: NextPage = (props) => {
  return (
    <div className="flex flex-col items-center justify-center w-full">
      <h1 className="p-2 font-bold">{!props.email ? props.name : `${props.name} | ${props.email}`} <sup>{props.coins}</sup></h1>

      <div className="flex justify-between w-full px-8 py-2 bg-blue-500">
        <h2 className="font-bold text-white">{props.pageName}</h2>
        <ul className="flex gap-2">
          <li>
            <Link href="/">
              <a className="text-white">Home</a>
            </Link>
          </li>
          <li>
            <Link href="/profile">
              <a className="text-white">Profile</a>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
