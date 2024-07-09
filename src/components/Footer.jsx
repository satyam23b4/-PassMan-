import React from 'react'

const Footer = () => {
    return (
        <footer className='flex justify-center text-center text-white bg-black fixed bottom-0 w-full py-2'>
            <div className='logo font-bold text-md text-white'>
                <span>&lt;</span>
                PassMan/
                <span>&gt; | </span>
            </div>
            <div className='ml-1 font-extralight'>All rights reserved</div>
        </footer>
    )
}

export default Footer
