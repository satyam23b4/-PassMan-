import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-indigo-800 flex justify-between py-3 px-20 fixed top-0 w-full'>
        <div className='logo font-bold text-3xl text-white'>
          <span>&lt;</span>
          PassMan/
          <span>&gt;</span>
        </div>
          <div>
            <a href="https://github.com/satyam23b4"><img className='h-8 hover:cursor-pointer' src="/github.png" alt="github" /></a>
          </div>
    </nav>
  )
}

export default Navbar
