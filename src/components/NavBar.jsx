import React from 'react'

const NavBar = () => {
  return (
    <div className='fixed top-0 left-0 z-10 w-full bg-[#f8f8f8] p-3 border border-[#ccc]'>
      <div className='flex gap-3'>
          <span className='rounded-md cursor-pointer hover:bg-slate-100 p-2'>Snippets</span>
          <span className='rounded-md cursor-pointer hover:bg-slate-100 p-2'>Create Snippet</span>
      </div>
    </div>
  )
}

export default NavBar
