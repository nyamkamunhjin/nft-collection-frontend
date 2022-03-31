import { FC } from 'react';
import { useUser } from '../context/user';

interface IProps {}

/**
 * @author
 * @function @Layout
 **/

export const Layout: FC<IProps> = ({ children }) => {
  const user = useUser();

  return (
    <div className="flex flex-col w-full h-full bg-gray-50">
      <nav className="flex  h-10 items-center px-2 py-6">
        <div className="ml-auto flex gap-2 items-center">
          <div className="rounded-full w-7 h-7 p-0.5 bg-purple-400 ring-2 ring-offset-1 ring-blue-500" />
          <span className="text-sm truncate">
            {user?.walletAddress || 'not connected'}
          </span>
        </div>
      </nav>
      {children}
      <footer className="flex justify-end px-4 py-1 gap-2 w-full">
        <a
          className="text-sm"
          target="_blank"
          href="https://twitter.com/_nyamkamunhjin_"
          rel="noreferrer"
        >
          @_nyamkamunhjin_
        </a>
        <a
          className="text-sm"
          target="_blank"
          href="https://twitter.com/_buildspace"
          rel="noreferrer"
        >
          @_buildspace
        </a>
      </footer>
    </div>
  );
};
