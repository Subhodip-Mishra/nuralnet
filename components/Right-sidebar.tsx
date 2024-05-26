
import Image from 'next/image'
import React from 'react'

const RightSidebar = () => {
    return (
        <div className='chat-message w-full ml-auto size-3.5/12 rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white border border-spacing-0  h-24'>
        <div className='chat-center  flex py-5 px-16  '>
                
          <div className='User'>
          <div className='avata flex bg-orange-600  ml-4  rounded-full items-center justify-center w-24 h-24 '>
          {/* <UserButton afterSignOutUrl="/" /> */}
          <div className='text-5xl'>
            S
          </div>
          {/* <ImageIcon size={90} /> */}
          </div>
            <div className='text-black font-bold text-3xl flex   text-md px-3 '>
              Suvodeep Mishra
            </div>
            <div className='mt-1 ml-2  text-lg size-min flex ' >
              <div className='text-gray-400 flex self-end lg:self-center items-center justify-center lg:justify-start mt-0 ml-1 h-7 '>
                subhodipmishra47@gmail.com
              </div>
            </div>
          </div>
        </div>
      </div>

    )
}

export default RightSidebar