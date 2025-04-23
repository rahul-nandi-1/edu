import React, { useContext, useEffect, useState } from 'react'
import {AppContext} from '../../context/AppContext'
import SearchBar from '../../components/students/SearchBar'
import { useLocation, useParams } from 'react-router-dom'
import CourseCard from '../../components/students/CourseCard'
import { assets } from '../../assets/assets'
import Footer from '../../components/students/Footer'
import {motion} from 'framer-motion'


const CoursesList = () => {
  const {navigate, allCourses} = useContext(AppContext)
  const {input} = useParams(null)
  const [filteredCourse, setFilteredCourse] = useState([])
  useEffect(() => {
    const tempCourse = allCourses.slice()
    input ? setFilteredCourse(tempCourse.filter(course => course.courseTitle.toLowerCase().includes(input.toLowerCase()))) : setFilteredCourse(tempCourse)
  }, [input, allCourses])

  return (
    <>
      <div className='relative px-8 md:px-36 pt-20 text-left'>
        <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ duration: 0.3 }}
        variants={{
          visible: { opacity: 1, scale: 1 },
          hidden: { opacity: 0, scale: 0 }
        }}
         className='flex md:flex-row flex-col gap-6 items-start justify-between w-full'>
          <div>
            <h1 className='text-4xl font-semibold text-gray-600'>Couse List</h1>
            <p className='text-gray-500'><span onClick={() => navigate('/')} className='text-blue-500 cursor-pointer'>Home</span> / <span>Course List</span></p>
          </div>
          <SearchBar data={input} />
        </motion.div>
        {
          input && <div className='pt-5 w-fit'>
            <div className='border px-3 py-1 border-gray-300 text-gray-500 flex gap-2'>{input} <span onClick={() => {
              navigate('/course-list/')

              }} className='cursor-pointer'><img className='w-2 inline' src={assets.cross_icon} alt="cross_icon" /></span> </div>
          </div>
        }
        <div
        className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 my-16 gap-3 px-2 md:p-0'>
          {filteredCourse.map((course, index) => (<CourseCard className='' key={index} course={course} />))}
        </div>
      </div>
      <Footer/>
    </>
  )
}

export default CoursesList
