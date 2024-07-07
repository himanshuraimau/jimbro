"use client"
import React from 'react'

const NavBar = () => {
  return (
    <div>
         <div className='flex flex-row justify-between p-7 bg-black px-20'>
                 <div className='text-white text-2xl' style={{ marginRight: '2.8rem' }}  >JIMBRO</div>
                <button className='border border-white p-2 rounded-md text-white' 
                style={{ marginRight: '2.8rem' }}>SignUp / SignIn</button>
         </div>
    </div>
  )
}

export default NavBar
