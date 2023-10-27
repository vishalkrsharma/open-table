'use client';

import Link from 'next/link';
import AuthModal from './AuthModal';
import { useContext } from 'react';
import { AuthenticationContext } from '@/contexts/AuthContext';
import useAuth from '@/hooks/useAuth';
const NavBar = () => {
  const { data, loading } = useContext(AuthenticationContext);
  const { signOut } = useAuth();

  return (
    <nav className='bg-white p-2 flex justify-between'>
      <Link
        href='/'
        className='font-bold text-gray-700 text-2xl'
      >
        OpenTable
      </Link>
      <div>
        <div className='flex'>
          {loading ? null : data ? (
            <button
              className='bg-blue-400 text-white border p-1 px-4 rounded mr-3'
              onClick={signOut}
            >
              Sign out
            </button>
          ) : (
            <>
              <AuthModal isSignin={true} />
              <AuthModal isSignin={false} />
            </>
          )}
          {/* <AuthModal isSignin={true} />
          <AuthModal isSignin={false} /> */}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
