import React, {useState} from 'react'
import logo_normal from "../assets/logo_normal.png"
import {FaBars,FaTimes, FaLinkedin, FaGithub} from 'react-icons/fa'
// import { HiOutlineMail } from 'react-icons/hi';
import {BsFillPersonLinesFill} from 'react-icons/bs'
import { Link } from 'react-scroll'


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
            <li>
                <Link to="home" smooth={true} duration={500}>
                    Home
                </Link>
            </li>

            <li>
                <Link to="about" smooth={true} duration={500}>
                    About
                </Link>
            </li>

            <li>
                <Link to="skills" smooth={true} duration={500}>
                    skills
                </Link>
            </li>

            <li>
                <Link to="contact" smooth={true} duration={500}>
                    Contact
                </Link>
            </li>

        </ul>

      

      {/* Hamburger menu Icon */}
      <div onClick={handleClick} className='sm:hidden z-10'>
        {!nav?<FaTimes/>:<FaBars/>}
      </div>

      {/* Mobile menu */} 
        <ul className={nav?'hidden':'absolute top-0 left-0 w-full h-screen bg-[#0a192f] flex flex-col justify-center items-center lg:hidden'}>
                    <li className='py-6 text-4xl'>
                        <Link onClick={handleClick} to="home" smooth={true} duration={500}>
                            Home
                        </Link>
                    </li>
                    <li className='py-6 text-4xl'>
                        <Link onClick={handleClick} to="about" smooth={true} duration={500}>
                            About
                        </Link>
                    </li>
                    <li className='py-6 text-4xl'>
                        <Link onClick={handleClick} to="skills" smooth={true} duration={500}>
                            Skills
                        </Link>
                    </li>
                    <li onClick={handleClick} className='py-6 text-4xl'>
                        <Link to="contact" smooth={true} duration={500}>
                            Contact
                        </Link>
                    </li>
                </ul>

        {/* social Icons */}
        <div className="hidden lg:flex fixed flex-col top-[35%] left-0 ">
            <ul>
                <li className='w-[160px] h-[60px] flex justify-between ml-[-100px] hover:ml-[-10px] duration-300 bg-blue-500'>
                    <a className='flex justify-between items-center w-full text-gray-300' 
                        href="https://www.linkedin.com/in/mriganka-das-95936b21b/">
                        LinkedIn <FaLinkedin size={30}/>
                    </a>
                </li>
                
                <li className='w-[160px] h-[60px] flex justify-between ml-[-100px] bg-[#262d34] hover:ml-[-10px] duration-300'>
                    <a  className='flex justify-between items-center w-full text-gray-300'
                        href='https://github.com/Mr1ganka'>
                        Github <FaGithub size={30}/>
                    </a>
                </li>

                {/* <li className='w-[160px] h-[60px] flex justify-between ml-[-100px] bg-[#6fc2b0] hover:ml-[-10px] duration-300'>
                    <a className='flex justify-between items-center w-full text-gray-300'
                        href='"mailto:thisismrigs@gmail.com"'>
                        Email <HiOutlineMail size={30}/>
                    </a>
                </li> */}

                <li className='w-[160px] h-[60px] flex justify-between ml-[-100px] bg-[#565f69] hover:ml-[-10px] duration-300'>
                    <a className='flex justify-between items-center w-full text-gray-300'
                        href="https://drive.google.com/file/d/1nRJ7IBQ-whHv17K0_g7KQrbSvzvIbIJp/view?usp=drive_link">
                        Resume <BsFillPersonLinesFill size={30}/>
                    </a>
                </li>
            </ul>
        </div>
    </div>
  )
}

export default Navbar
