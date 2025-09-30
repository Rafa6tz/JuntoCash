import React from 'react'
import { Link } from 'react-router-dom'
import {FaPlus} from 'react-icons/fa'
import { LuChartColumn, LuChartPie, LuLightbulb, LuUser} from 'react-icons/lu'

const Nav = () => {
  return (
    <nav className='absolute inset-x-0 bottom-0 h-26 bg-white border-t border-gray-200 flex justify-between items-center p-4 opacity-70'>
        <Link to="/" className='flex flex-col items-center justify-center gap-2 bg-blue-300 rounded-xl h-14 w-16'><LuChartColumn/><span className='text-xs'>Wallet</span></Link>
        <Link to="/graphs" className='flex flex-col items-center justify-center gap-2 bg-blue-300 rounded-xl h-14 w-16'><LuChartPie/><span className='text-xs'>Graph</span></Link>
        <Link to="/transaction">
        <div className='bg-primary absolute h-16 bottom-18 left-1/2 -translate-x-1/2 w-16 rounded-full flex items-center justify-center text-white shadow-lg shadow-primary/50'>
          <FaPlus size={28}/>
        </div></Link>
        <Link to="/goal" className='flex flex-col items-center justify-center gap-2 bg-blue-300 rounded-xl h-14 w-16'><LuLightbulb/><span className='text-xs'>Goal</span></Link>
        <Link to="/login" className='flex flex-col items-center justify-center gap-2 bg-accent rounded-xl h-14 w-16'><LuUser/><span className='text-xs'>User</span></Link>
    </nav>
  )
}

export default Nav