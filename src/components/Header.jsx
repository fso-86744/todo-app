import React from 'react'
import {BsCheckSquareFill} from 'react-icons/bs'
 
function Header() {
  return (
    <div className='text-sky-500  flex justify-center text-4xl'>
      <BsCheckSquareFill className='hidden sm:inline mr-3 mt-2 '/> <h2 className='font-bold  underline decoration-4'>My Todo-s</h2>
    </div>
  )

}

export default Header
