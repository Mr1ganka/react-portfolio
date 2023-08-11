import React from 'react'

const Contact = () => {
  return (
    <div name='contact' className="w-full h-screen bg-[#0a1927] text-[#E2DFD2] flex justify-center items-center p-4">
        
        <form className="flex flex-col max-w-[600px] w-full" method='POST' action='https://getform.io/f/dac9c238-a7f7-4036-a86f-a29b6b5698db'>
        
            <div className="pb-8">
                <p className='text-4xl inline border-b-4'>Contact Me.</p>
                <p className='text-1xl py-3'>Kindly contact me here, or shoot me a text.</p>
            </div>
            <input type="text" placeholder='Name' name='name' className='bg-[#ccd6f6] p-2 text-black'/>
           
            <input type="text" placeholder='Email' name='Email' className='my-4 bg-[#ccd6f6] p-2 text-black'/>

            <textarea type="text" placeholder='Description' name='description' className='bg-[#ccd6f6] p-2 text-black' rows="10"/>

            <button className='border-2 px-4 py-3 mx-auto my-8 hover:bg-[#E9DCC9] hover:text-black flex items-center'>Lets Colaborate!</button>
            
           
        </form>
      
    </div>
  )
}

export default Contact
