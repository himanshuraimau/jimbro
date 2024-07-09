"use client"
import React from 'react';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

function Navdash() {
  const router = useRouter();

  const handleSignOut = () => {
    signOut({ callbackUrl: '/signin' });
  };

  return (
    <div>
      <div className='flex flex-row justify-between p-9 text-white mx-20'>
        <div className='text-white text-2xl'>JIMBRO</div>
        <button 
          className='border border-white p-2 rounded-md text-white'
          onClick={handleSignOut}
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}

export default Navdash;
