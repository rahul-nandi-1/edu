import { createContext, useEffect, useState } from "react";
import { dummyCourses } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import humanizeDuration from "humanize-duration";

export const AppContext = createContext()

export const AppContextProvider = ({children}) => {
    
    const currency = import.meta.env.VITE_CURRENCY;
    const [allCourses, setAllCourses] = useState([])
    const [isEducator, setIsEducator] = useState(true)
    const [enrolledCourses, setEnrolledCourses] = useState([])
    const navigate = useNavigate()

    //what in the course
    const whatInCourse = ['Lifetime access with free updates', 'Step-by-step, hands-on project guidedance', 'Downloadable resourses abd source code', 'Quizzes to test your knoledge.', 'Certificate of completion.']

     //fetch all courses
     const fetchAllCourses = async() => {
        setAllCourses(dummyCourses)
     }

     useEffect(() => {
        fetchAllCourses()
        fetchUserEnrolledCourses()
     }, [])

     //function to calculate avg ratiing
     const calculateRating = (course) => {
        if(course.courseRatings.length == 0){
            return 0;
        }
        let totalRating = 0;
        course.courseRatings.forEach((rating) => {
            return totalRating += rating.rating
        })
        return totalRating/course.courseRatings.length
     }

     //function to calculate course chapter count
     const calculateChanpterTime = (chapter) => {
        let time = 0
        chapter.chapterContent.map((lecture) => time += lecture.lectureDuration)
        return humanizeDuration(time * 60 * 1000, {units:["h","m"]})
     }

     //function to calcualte the course duration
     const calcualteCourseDuration = (course) => {
        let time = 0
        course.courseContent.map((chapter) => chapter.chapterContent.map(
            (lecture) => time += lecture.lectureDuration
        ))
        return humanizeDuration(time * 60 * 1000, {units:["h","m"]})
     }
     //function to calcualte no of lecture in the course
     const calcualteNoOfLecture = (course) => {
        let totalLecture = 0
        course.courseContent.forEach((chapter) => {
            if(Array.isArray(chapter.chapterContent)){
                totalLecture += chapter.chapterContent.length
            }
        })
        return totalLecture
     }

     const calculatePrice = (mainPrice, discount) => {
        mainPrice = Number(mainPrice)
        discount = Number(discount)
        return (mainPrice - (mainPrice * discount / 100)).toFixed(2);
     }

     //fetch user's enrolled courses
     const fetchUserEnrolledCourses = async() => {
        setEnrolledCourses(dummyCourses)
     }

     //calculate %age of courseCompleted
     const calculatePercentageCompleted = (totalLecture, completedLecture) => {
        const percentage = ((completedLecture / totalLecture) * 100).toFixed(0)
        return percentage
     }



    const values = {
        currency,
        allCourses,
        navigate,
        calculateRating,
        isEducator,
        setIsEducator,
        calcualteCourseDuration,
        calcualteNoOfLecture,
        calculateChanpterTime,
        calculatePrice,
        whatInCourse,
        enrolledCourses,
        calculatePercentageCompleted
    }

    return <AppContext.Provider value={values} >
        {children}
    </AppContext.Provider>
}

