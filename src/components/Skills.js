import React from 'react'
import HTML from "../assets/html.png"
import CSS from "../assets/css.png"
import GIT from "../assets/github.png"
import JS from "../assets/javascript.png"
import REACT from "../assets/react.png"
import TAILWIND from "../assets/tailwind.png"
import NODE from "../assets/node.png"
import SPRING from "../assets/springboot.png"

const Skills = () => {
  return (
  <div name="skills" className='w-full h-screen bg-[#0a1927] text-[#E2DFD2]'>
    {/* container */}
      <div className='max-w-[1000px] mx-auto p-4 flex flex-col justify-center w-full h-full '>
        <div>
          <p className='text-4xl font-bold text-[#d1d1bd] inline border-b-4'>Skills</p>
          <p className='text-2xl text-[#544a4a] py-4'>Some of the technologies i've worked on </p>
        </div>

        <div className='w-full grid grid-cols-2 sm:grid-cols-4 text-center gap-4 py-8'>
          
        <div className="shadow-md hover:shadow-[#544a4a] hover:scale-110 duration-300">
            <img src={HTML} alt="CSS icon" className='w-20 mx-auto'/>
            <p className='my-4'>HTML</p>
          </div>

          <div className="shadow-md hover:shadow-[#544a4a] hover:scale-110 duration-300">
            <img src={CSS} alt="CSS icon" className='w-20 mx-auto'/>
            <p className='my-4'>CSS</p>
          </div>

          <div className="shadow-md hover:shadow-[#544a4a] hover:scale-110 duration-300">
            <img src={JS} alt="JS icon" className='w-20 mx-auto'/>
            <p className='my-4'>JAVA SCRIPT</p>
          </div>

          <div className="shadow-md hover:shadow-[#544a4a] hover:scale-110 duration-300">
            <img src={NODE} alt="node icon" className='w-20 mx-auto'/>
            <p className='my-4'>NODE</p>
          </div>

          <div className="shadow-md hover:shadow-[#544a4a] hover:scale-110 duration-300">
            <img src={TAILWIND} alt="tailwind icon" className='w-20 mx-auto'/>
            <p className='my-4'>TAILWIND</p>
          </div>

          <div className="shadow-md hover:shadow-[#544a4a] hover:scale-110 duration-300">
            <img src={REACT} alt="react icon" className='w-20 mx-auto'/>
            <p className='my-4'>REACT</p>
          </div>

          <div className="shadow-md hover:shadow-[#544a4a] hover:scale-110 duration-300">
            <img src={GIT} alt="git icon" className='w-20 mx-auto'/>
            <p className='my-4'>GIT</p>
          </div>

          <div className="shadow-md hover:shadow-[#544a4a] hover:scale-110 duration-500">
            <img src={SPRING} alt="spring icon" className='w-20 mx-auto'/>
            <p className='my-4'>SPRING</p>
          </div>
        
        </div>
      </div>
    </div>
  )
}

export default Skills
