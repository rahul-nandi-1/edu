import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { assets } from '../../assets/assets'
import { AppContext } from '../../context/AppContext'
import {motion} from 'framer-motion'

const CourseCard = ({course}) => {

  const {currency, calculateRating} = useContext(AppContext)

  return (
    <Link to={'/course/'+course._id} onClick={() => scrollTo(0,0)}>
      <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false }}
      transition={{ duration: 0.3 }}
      variants={{
        visible: { opacity: 1, scale: 1 },
        hidden: { opacity: 0, scale: 0 }
      }}
      className='border border-gray-500/30 pb-6 overflow-hidden rounded-lg'
      >
      <img className='w-full' src={course.courseThumbnail} alt="course-image" />
      <div className='p-3 text-left'>
        <h3 className='text-balance font-semibold'>{course.courseTitle}</h3>
        <p className='text-gray-500'>{course.educator.name}</p>
        <div className='flex items-center space-x-2'>
          <p>{calculateRating(course)}</p>
          <div className='flex'>
            {[...Array(5)].map((el, index) => (
              <img key={index} className='w-3.5 h-3.5'src={index < Math.floor(calculateRating(course)) ? assets.star : assets.star_blank} alt="star-image" />
            ))}
          </div>
          <p className='text-gray-500'>{course.courseRatings.length}</p>
        </div>
        <p className='text-base font-semibold text-gray-700'> {currency}  {(course.coursePrice - ((course.discount * course.coursePrice) / 100)).toFixed(2)}</p>
      </div>
      </motion.div>
    </Link>
  )
}

export default CourseCard
