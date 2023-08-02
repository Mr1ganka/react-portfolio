import React, {useState} from 'react'
import logo_normal from "../assets/logo_normal.png"
import {FaBars,FaTimes, FaLinkedin, FaGithub} from 'react-icons/fa'
import { HiOutlineMail } from 'react-icons/hi';
import {BsFillPersonLinesFill} from 'react-icons/bs'

function Navbar() {
    const [nav, setNav] = useState(false);
    const handleClick = () => {
        setNav(!nav);
    };
  return (
    <div className='fixed w-full h-[80px] flex justify-between items-center px-4 bg-[#0a192f] text-gray-300'>
      <div>
        <img src={logo_normal} alt='logo' style={{ width:'50px' }}/>
      </div>

      {/* menu */}
        <ul className='hidden md:flex'>
            <li>Home</li>
            <li>About</li>
            <li>Skills</li>
            <li>Work</li>
            <li>Contact</li>
        </ul>

      

      {/* Hamburger menu Icon */}
      <div onClick={handleClick} className='md:hidden z-10'>
        {nav?<FaBars/>:<FaTimes/>}
      </div>

      {/* Mobile menu */} 
        <ul className={nav?'hidden':'absolute top-0 left-0 w-full h-screen bg-[#0a192f] flex flex-col justify-center items-center lg:hidden'}>
                    <li className='py-6 text-4xl'>Home</li>
                    <li className='py-6 text-4xl'>About</li>
                    <li className='py-6 text-4xl'>Skills</li>
                    <li className='py-6 text-4xl'>Work</li>
                    <li className='py-6 text-4xl'>Contact</li>
                </ul>

        {/* social Icons */}
        <div className="hidden lg:flex fixed flex-col top-[35%] left-0 ">
            <ul>
                <li className='w-[160px] h-[60px] flex justify-between ml-[-100px] hover:ml-[-10px] duration-300 bg-blue-500'>
                    <a className='flex justify-between items-center w-full text-gray-300' 
                        href="/">
                        LinkedIn <FaLinkedin size={30}/>
                    </a>
                </li>
                
                <li className='w-[160px] h-[60px] flex justify-between ml-[-100px] bg-[#262d34] hover:ml-[-10px] duration-300'>
                    <a  className='flex justify-between items-center w-full text-gray-300'
                        href='/'>
                        Github <FaGithub size={30}/>
                    </a>
                </li>

                <li className='w-[160px] h-[60px] flex justify-between ml-[-100px] bg-[#6fc2b0] hover:ml-[-10px] duration-300'>
                    <a className='flex justify-between items-center w-full text-gray-300'
                        href='/'>
                        Email <HiOutlineMail size={30}/>
                    </a>
                </li>

                <li className='w-[160px] h-[60px] flex justify-between ml-[-100px] bg-[#565f69] hover:ml-[-10px] duration-300'>
                    <a className='flex justify-between items-center w-full text-gray-300'
                        href="/">
                        Resume <BsFillPersonLinesFill size={30}/>
                    </a>
                </li>
            </ul>
        </div>
    </div>
  )
}

export default Navbar
