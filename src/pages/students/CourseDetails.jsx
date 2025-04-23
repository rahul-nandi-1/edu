import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from '../../context/AppContext'
import Loading from '../../components/students/Loading'
import { assets } from '../../assets/assets'
import humanizeDuration from 'humanize-duration'
import { GoClock } from "react-icons/go";
import { GiBookmarklet } from "react-icons/gi";
import { GoDotFill } from "react-icons/go";
import Footer from '../../components/students/Footer'
import YouTube from 'react-youtube'

const CourseDetails = () => {
  const {id} = useParams()
  const  [courseData, setCourseData] = useState(null)
  const  [openSection, setOpenSection] = useState({})
  const [playerData, setPlayerData] = useState(null)
  const {allCourses, calculateRating, calcualteCourseDuration, calcualteNoOfLecture, calculateChanpterTime, calculatePrice, currency, whatInCourse} = useContext(AppContext)

  const fetchCourseData = async() => {
    const findCourse = allCourses.find(course => course._id == id)
    setCourseData(findCourse)
  }

  useEffect(() => {
    fetchCourseData()
    console.log(courseData)
  },[courseData])

  const toggleSection = (index) => {
    setOpenSection((prev) => {
      return {...prev, [index]: !prev[index]}
    });
  }


  return courseData ? (
    <>
      <div className='flex md:flex-row flex-col-reverse gap-10 relative items-start justify-between text-left'>
        <div className='w-full bg-gradient-to-b from-cyan-100/30 flex flex-col-reverse lg:flex-row md:justify-between px-5 py-10 md:px-20 md:py-20 gap-10'  >
        {/* left-column */}
        <div className='max-w-xl text-gray-500'>
          <h1 className='font-semibold text-gray-800 text-[26px] md:text-[36px]'>{courseData.courseTitle}</h1>
          <p className='pt-4 md:text-base text-sm' dangerouslySetInnerHTML={{__html:courseData.courseDescription.slice(0,200)}}></p>

            <div className='flex items-center space-x-2 pt-3 pb-1 text-sm'>
              <p>{calculateRating(courseData)}</p>
                <div className='flex'>
                  {[...Array(5)].map((el, index) => (
                    <img key={index} className='w-3.5 h-3.5'src={index < Math.floor(calculateRating(courseData)) ? assets.star : assets.star_blank} alt="star-image" />
                  ))}
                </div>
              <p className='text-blue-500'>{'('} {courseData.courseRatings.length}{courseData.courseRatings.length > 1 ? ' reatings':' rating)'}</p>
              <p className='text-gray-500'>{courseData.enrolledStudents.length}{courseData.enrolledStudents.length > 1 ? ' students':' student'}</p>
            </div>
            <p>Course by <span className='text-blue-500 underline cursor-pointer'>Arijit Barik</span></p>
            <div className='pt-8 text-gray-800'>
             <h2 className='font-semibold text-xl'>Course Structure</h2>
             <div className='pt-5'>
             {
              courseData.courseContent.map((chapter, index) => (
                <div className='border border-gray-300 bg-white mb-2 rounded ' key={index}>
                  <div onClick={() => toggleSection(index)} className='flex items-center justify-between px-4 py-2 cursor-pointer select-none'>
                    <div className='flex items-center gap-2'>
                      <img className={`${openSection[index]?'-rotate-90':'' } transition-all duration-300`} src={assets.down_arrow_icon} alt="down arrow" />
                      <p className='font-medium md:text-base text-sm'>{chapter.chapterTitle}</p>
                    </div>
                    <p className='hidden sm:block text-sm md:text-[14px]'>{chapter.chapterContent.length} lectures - {calculateChanpterTime(chapter)}</p>
                  </div>
                  <div className={`overflow-hidden transition-all duration-300 ${openSection[index] ? 'max-h-fit': 'max-h-0'} `}>
                    <ul className='list-disc md:pl-10 pl-4 pr-4 py-2 text-gray-600 border-t border-gray-300'>
                      {chapter.chapterContent.map((lecture, index) => (
                        <li key={index} className='flex items-start gap-2 py-1'>
                        <img className='w-4 h-4 mt-1' src={assets.play_icon} alt=" play_icon" />
                        <div className='flex items-center justify-between w-full text-gray-800 text-xs md:text-[14px]'>
                          <p>{lecture.lectureTitle}</p>
                          <div className='flex gap-2'>
                            {lecture.isPreviewFree && <p onClick={() => setPlayerData({
                              videoId:lecture.lectureUrl.split('/').pop()
                            })} className='text-blue-500 cursor-pointer'>Preview</p>}
                            <p>{humanizeDuration(lecture.lectureDuration*60*1000, {units:['h','m']})}</p>
                          </div>
                        </div>
                        </li>                      
                        ))}
                    </ul>
                  </div>
                </div>
              ))
             }
             </div>
            </div>
            <div className='py-20 text-sm md:text-2xl'>
              <h3 className='text-xl font-semibold text-gray-800'>Course Description</h3>
              <p className='pt-3 rich-text' dangerouslySetInnerHTML={{__html:courseData.courseDescription}}></p>
            </div>
        </div>
        {/* right-column  */}
        <div className='border h-fit pb-4 rounded-md shadow-blue-700 shadow-xl max-w-[400px]'>
            {playerData ? 
              <YouTube videoId={playerData.videoId} opts={{playerVars: {autoplay:1}}} iframeClassName='w-full aspect-video' />
              :<img className='w-[400px] rounded-t-md' src={courseData.courseThumbnail} alt="course thumbnail" />
              }
             <div className='pt-5'>
              <div className='flex gap-2 pl-5'>
              <img className='w-3.5' src={assets.time_left_clock_icon} alt="" />
                <p className='text-red-500'><span className='font-medium'>5 days left</span> with this price</p>
              </div>
              <div className='flex gap-4 pl-5 items-center mt-2'>
                <p className='font-semibold text-4xl'>{currency}{calculatePrice(courseData.coursePrice, courseData.discount)}</p>
                <p className='text-lg line-through text-gray-500'>{currency}{courseData.coursePrice}</p>
                <p className='text-lg text-gray-500'>{courseData.discount}{'% off'}</p>
              </div>
              <div className='flex gap-3 pl-5 items-center text-gray-500 mt-2'>
                <div className='flex items-center gap-1'>
                  <img src={assets.star} alt="star_image" />
                  <p>{calculateRating(courseData)}</p>
                </div>
                <div className='h-[17px] border border-gray-400'></div>
                <div className='flex items-center gap-1'>
                  <GoClock/>
                  <p>{calcualteCourseDuration(courseData)}</p>
                </div>
                <div className='h-[17px] border border-gray-400'></div>
                <div className='flex items-center gap-1'>
                  <GiBookmarklet />
                  <p>{calcualteNoOfLecture(courseData)}{calcualteNoOfLecture(courseData)>1?' lessons':' lesson'}</p>
                </div>
              </div>
              <div className='w-[92%] mx-auto h-10 flex justify-center items-center font-medium text-lg bg-blue-500 text-gray-100 rounded mt-5 cursor-pointer hover:scale-95 transition-all duration-300'>
                Enroll Now
              </div>
              <div className='pl-5 mt-8'>
                <h2 className='text-gray-800 text-xl font-medium my-3'>What's in the course?</h2>
                <ul className='flex flex-col text-gray-600 gap-2 text-sm'>
                  {whatInCourse.map((item, index) => (
                    <li className='flex items-center' key={index}>{<GoDotFill />}{item}</li>
                  ))}
                </ul>
              </div>
             </div>
        </div>
        </div>
      </div>
      <Footer/>
    </>
    
  ) : <Loading/>
}

export default CourseDetails
