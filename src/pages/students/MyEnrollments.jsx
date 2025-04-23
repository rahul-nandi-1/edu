import React, { useContext, useState } from 'react'
import { AppContext } from '../../context/AppContext'
import { Line } from 'rc-progress'
import Footer from '../../components/students/Footer'
import {motion} from 'framer-motion'

const MyEnrollments = () => {

  const {enrolledCourses, calcualteCourseDuration, navigate, calculatePercentageCompleted} = useContext(AppContext)
  const [progressArray, setProgressArray] = useState([
    {lectureCompleted:4, totalLecture: 10},
    {lectureCompleted:3, totalLecture: 7},
    {lectureCompleted:8, totalLecture: 12},
    {lectureCompleted:7, totalLecture: 10},
    {lectureCompleted:8, totalLecture: 8},
    {lectureCompleted:3, totalLecture: 14},
    {lectureCompleted:4, totalLecture: 6},
    {lectureCompleted:11, totalLecture: 18},
  ])

  return (
    <>
      <div className='px-8 md:px-36 pt-10'>
      <h1 className='text-2xl font-semibold'>My Enrollments</h1>
      <table className='md:table-auto table-fixed w-full overflow-hidden border mt-10'>
        <thead className='text-gray-900 border-b border-gray-500/20 text-sm text-left max-sm:hidden'>
          <tr>
            <th className='px-4 py-3 font-semibold truncate'>Course</th>
            <th className='px-4 py-3 font-semibold truncate'>Duration</th>
            <th className='px-4 py-3 font-semibold truncate'>Completed</th>
            <th className='px-4 py-3 font-semibold truncate'>Status</th>
          </tr>
        </thead>
        <tbody className='text-gray-700'>
          {enrolledCourses.map((course, index) => (
            <motion.tr
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay:index/10 }}
            variants={{
              visible: { opacity: 1, scale: 1 },
              hidden: { opacity: 0, scale: 0 }
            }}
             key={index} className='border-b border-gray-500/20'>
              <td className='md:px-4 pl-2 md:pl-4 py-3 flex items-center space-x-3'>
                <img src={course.courseThumbnail} alt="course_thumbnail" className='w-14 sm:w-24 md:w-28'/>
                <div className='w-full'>
                  <p className='mb-1 max-sm:text-sm'>{course.courseTitle}</p>
                  <Line strokeWidth={2} percent={calculatePercentageCompleted(progressArray[index].totalLecture, progressArray[index].lectureCompleted)} className='bg-gray-300 rounded-full' />
                </div>
              </td>
              <td className='px-4 py-3 max-sm:hidden'>
                {calcualteCourseDuration(course)}
              </td>
              <td className='px-4 py-3 max-sm:hidden'>
                {progressArray[index] && `${progressArray[index].lectureCompleted}/${progressArray[index].totalLecture}`} <span>Lectures</span>
              </td>
              <td className='px-4 py-3 max-sm:text-right'>
                <button onClick={() => {navigate('/player/'+course._id)}} className='px-3 sm:px-5 py-1.5 sm:py-2 bg-blue-600 max-sm:text-xs text-white'>{progressArray[index] && progressArray[index].lectureCompleted == progressArray[index].totalLecture ? 'Completed' : 'On Going'}</button>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
    <Footer/>
    </>
    
  )
}

export default MyEnrollments
