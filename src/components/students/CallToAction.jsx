import React from 'react'
import { assets } from '../../assets/assets'

const CallToAction = () => {
  return (
    <div className='flex flex-col items-center gap-4 mb-[100px]'>
      <h1 className='text-xl font-semibold md:text-[40px]'>Learn anything, anytime, anywhere</h1>
      <p className='text-gray-500 mb-5'>Incididunt sint fugiat pariatur cupidatat consectetur sit cillum anim id veniam aliqua proident excepteur commodo do ea.</p>
      <div className='flex gap-2 font-medium text-[17px]'>
        <button className='border px-8 py-3 rounded-md text-white bg-blue-500 text-center'>Get Started</button>
        <button>Learn more</button>
        <img src={assets.arrow_icon} alt="arrow-icon" />
      </div>
    </div>
  )
}

export default CallToAction
