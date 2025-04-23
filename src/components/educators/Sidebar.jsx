import React, { useContext } from 'react'
import { assets } from '../../assets/assets'
import { AppContext } from '../../context/AppContext';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {

  const {isEducator} = useContext(AppContext)

  const menuItems = [
    {name: 'Dashboard', path: '/educator', icon:assets.home_icon},
    {name: 'Add Course', path: '/educator/add-course', icon:assets.add_icon},
    {name: 'My Course', path: '/educator/my-course', icon:assets.my_course_icon},
    {name: 'Student Enrolled', path: '/educator/student-enrolled', icon:assets.person_tick_icon},
  ];

  return isEducator && (
    <div className='md:w-64 w-16 border-r min-h-screen text-base border-gray-500 py-2 flex flex-col gap-5 pt-5 pl-5'>
      {menuItems.map((item, index) => (
        <NavLink key={index} to={item.path} end={item.path === '/educator'} className={({isActive}) =>`flex space-x-5 hover:scale-105 transition-all duration-100 ${isActive ? 'bg-indigo-500 border-r-[6px] text-white pl-2 rounded-md0':''}`} >
          <img src={item.icon} alt="logo" className='w-6 h-6' />
          <p className='md:block hidden text-center'>{item.name}</p>
        </NavLink>
      ))}
    </div>
  )
}

export default Sidebar
