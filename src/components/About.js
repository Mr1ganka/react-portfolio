import React from 'react'

function About() {
  return (
    <div name ="about" className='w-full h-screen bg-[#0a1927] text-white'>
      <div className="w-full h-full flex flex-col justify-center items-center">
        <div className='max-w-[1000px] w-full grid grid-cols-2 gap-8'>
            <div className='sm:text-right pb-8 pl-4'>
                <p className='text-4xl font-bold inline border-b-4 text-[#d1d1bd]'>
                    About
                </p>
            </div>
            </div>
            <div className='max-w-[1000px] w-full grid sm:grid-cols-2 gap-8 px-4'>    
              <div className='sm:text-right text-3xl font-bold text-[#E9DCC9]'>
                <p>
                  Hi. I'm Mriganka, nice to meet you. Please take a look around
                </p>
                </div>
                <div className='text-[#E2DFD2]'>
                  <p> 
                    I am passionate about creating software That improves the lives of people, and save their time.
                    I specialize in creating software for individuals, small-business, all the way to large enterprise corporations. 
                    What would you do if you had a software expert available at your fingertips?
                    </p>
                </div> 
                          
            </div>

            
        
      </div>
    </div>
  )
}

export default About
