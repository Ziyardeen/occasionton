import React,{useState} from 'react'
import { FaBars, FaTimes } from 'react-icons/fa';




const Header = () => {

  const [isOpen, setIsOpen] =useState(false)


  const toggleMenu = ()=>{
    setIsOpen(!isOpen)
    
  }
    return (
      <header className=" text-white p-4 -image bg-cover bg-primary">

        <div className="container mx-auto flex justify-between items-center ">
          <h1 className="text-2xl font-bold" aria-label="Community Events Logo">Occasionton</h1>
          <button className='md:hidden' onClick={toggleMenu}>{isOpen?<FaTimes/>:<FaBars/>}</button>


          <nav className={` hidden md:flex` }>
            <ul className={`flex space-x-4`}>
              <li><a href="#features" className="hover:underline">Features</a></li>
              <li><a href="#how-it-works" className="hover:underline">How It Works</a></li>
              <li><a href="#signup" className="hover:underline">Sign Up</a></li>
              <li><a href="#login" className="hover:underline">Login</a></li>
              <li><a href="#contact" className="hover:underline">Contact Us</a></li>
            </ul>
          </nav>
        </div>

        <nav className={`${isOpen?'flex justify-center':'hidden'} md:hidden` }>
            <ul className={`flex flex-col justify-center items-center`}>
              <li><a href="#features" className="hover:underline">Features</a></li>
              <li><a href="#how-it-works" className="hover:underline">How It Works</a></li>
              <li><a href="#signup" className="hover:underline">Sign Up</a></li>
              <li><a href="#login" className="hover:underline">Login</a></li>
              <li><a href="#contact" className="hover:underline">Contact Us</a></li>
            </ul>
          </nav>
      </header>
    );
  };

export default Header