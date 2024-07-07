"use client"
import React from 'react'

const NavBar = () => {
  return (
    <div>
         <div className='flex flex-row justify-between p-7 bg-black'>
                 <div className='text-white text-xl'>JIMBRO</div>
                <button className='border border-white p-2 rounded-md'>SignUp/SignIn</button>
         </div>
    </div>
  )
}

export default NavBar
