import React from 'react'
import {HiArrowNarrowRight} from 'react-icons/hi'
import { Link } from 'react-scroll'


const Home = () => {
  return (
    <div name='home' className='w-full h-screen bg-[#0a1927]'>
      {/* container */}
      <div className="max-w-[1000px] mx-auto px-9 flex flex-col justify-center h-full">
        <p className='text-[#FFFFFF]'>Hi, my name is</p>
        <h1 className='text-4xl sm:text-7xl font-bold text-[#E9DCC9]'>Mriganka,</h1>
        <h2 className='text-4xl sm:text-5xl py-2 text-[#FFFFF0] underline'>I'm a full-stack Developer</h2>
        <p className='text-4xl sm:text-3xl text-[#E2DFD2] py-2 max-w-[650px]'> I design, develops, test, and maintain all kinds of software applications.</p>
          <div>
            <Link to="about" smooth={true} duration={500} className="max-w-[130px] text-[#FFFFF0] group border-2 px-3 py-3 my-2 flex items-center hover:bg-[#E9DCC9] hover:text-[#0a1927]">View More
              <HiArrowNarrowRight className='ml-2 group-hover:rotate-90 duration-200'/>
            </Link>
          </div>
      </div>
    </div>
  )
}

export default Home
