import React from 'react'

export default function SideBar() {
  return (
    <div className='bg-gradient-to-r from-violet-200 to-pink-200 w-[300px] bg-slate-300 h-screen flex flex-col justify-between py-3 px-3'>

      <div >
        <h1 className='text-2xl font-bold pb-4 text-center'>BLOG-GPT</h1>
        <button className='bg-green-600 text-white rounded-md w-full py-1'>New Post</button>
        <p className='py-3 text-center'>Toke Available</p>
        <p>List of posts</p>
      </div>
      <div>
      <hr className='border'></hr>
        <p>user</p>
        <p>Logout</p>
      </div>
    </div>
  )
}
