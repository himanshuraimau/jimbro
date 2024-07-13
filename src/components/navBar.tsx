"use client";
import React from 'react';
import Link from 'next/link';
import { signOut } from 'next-auth/react';
import { usePathname } from 'next/navigation';

const NavBar = () => {
  const pathname = usePathname();
  const isDashboard = pathname === '/dashboard';

  const handleSignOut = () => {
    signOut({ callbackUrl: '/signin' });
  };

  return (
    <div>
      <div className='flex flex-row justify-between p-7 bg-black px-20'>
        <Link href='/'className='text-white text-2xl'>JIMBRO</Link>
        <div>
          {isDashboard ? (
            <button 
              className='border border-white p-2 rounded-md text-white'
              onClick={handleSignOut}
            >
              Sign Out
            </button>
          ) : (
            <>
              <Link href="/signup" className='border border-white p-2 rounded-md text-white' 
                style={{ marginRight: '2.8rem' }}>Sign Up</Link>
              <Link href="/signin" className='border border-white p-2 rounded-md text-white'>Sign In</Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default NavBar;