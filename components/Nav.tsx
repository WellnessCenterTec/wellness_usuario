
import { toggleModalEjemplo } from '@/redux/slices/modalSlice'
import React from 'react'
import { useDispatch } from 'react-redux'
import { useState } from "react"
import{AiOutlineMenu, AiOutlineClose} from "react-icons/ai";



interface Props{
  children:React.ReactNode
}

const Nav = ({children}:Props) =>{
  const dispatch = useDispatch()

  const [menuIcon, setIcon] = useState (false)

  const handleSmallerScreensNavigation = () => 
  {
    setIcon (!menuIcon);
  }

    return(
      <>
      <nav  style={{backgroundColor: "#F3F3F3" }} className="sticky top-0  bg-white border-black-200 dark:bg-black-900 dark:border-black-700" >

        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a href="/#" className="flex items-center">
              <img src="https://javier.rodriguez.org.mx/itesm/borregos/borrego-blue.svg" className="h-12 mr-3" alt="Flowbite Logo" />
              <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-black">Athletics</span>
          </a>
          <div className="hidden w-full md:block md:w-auto" id="navbar-dropdown">
            <ul style={{backgroundColor: "#F3F3F3" }} className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-white-100 rounded-lg bg-white-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-white-800 md:dark:bg-white-900 dark:border-white-700">
    
              <li>
                <a href="/#" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-dark md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Inicio</a>
              </li>
             
              <li>
                <a href="#" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-dark md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Gimnasio</a>
              </li>
              <li>
                <a href="#" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-dark md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Reservaciones</a>
              </li>
              <li>
                <a href="#" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-dark md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Estadisiticas</a>
              </li>
              <li>
                <a href="#" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-dark md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">ID digital</a>
              </li>
            </ul>
          </div>


        {/* Smaller screens - navigation skills */}
        {/* onClick change the icon*/}
        <div onClick={handleSmallerScreensNavigation} className="flex md:hidden">
          { menuIcon ?
            ( <AiOutlineClose size={25} className = "text-[#FFFFF]"  />)
            :
            ( <AiOutlineMenu size={25} className = "text-[#FFFFF]"  />)

          }
        </div>

        {/* Smaller screens - Navbar*/}  
        
        <div className= { menuIcon ?
            "md:hidden absolute top-[80px] right-0 bottom-0 left-0 flex justify-center items-center w-full h-screen bg-slate-800 text-white ease-in duration-300"
            :
            "md:hidden absolute top-[80px] right-0 left-[-100%] flex justify-center items-center w-full h-screen bg-slate-800 text-white ease-in duration-300"
          }>

          {/* Smaller screens - Links*/} 

          <div className="w-full">
            <ul className="font-bold text-2xl">
      
              <li onClick={handleSmallerScreensNavigation} className="py-10 px-4 hover:text-[#CEFF00] cursor-pointer">
              <a href="/#" className="text-white">Inicio</a>
              </li>
              <li onClick={handleSmallerScreensNavigation} className="py-10 px-4 hover:text-[#CEFF00] cursor-pointer">
              <a href="/#" className="text-white">Gimnasio</a>
              </li>
              <li onClick={handleSmallerScreensNavigation} className="py-10 px-4 hover:text-[#CEFF00] cursor-pointer">
              <a href="/#" className="text-white">Reservaciones</a>
              </li>
              <li onClick={handleSmallerScreensNavigation} className="py-10 px-4 hover:text-[#CEFF00] cursor-pointer">
              <a href="/#" className="text-white">Estadisticas</a>
              </li>
              <li onClick={handleSmallerScreensNavigation} className="py-10 px-4 hover:text-[#CEFF00] cursor-pointer">
              <a href="/#" className="text-white">ID digital</a>
              </li>

            </ul>

          </div>

        </div>        

        </div>
      </nav> 

      {children}
      </>
    )
}

export default Nav