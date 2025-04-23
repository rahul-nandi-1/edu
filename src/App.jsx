import React from 'react'
import { Routes, Route, useMatch } from 'react-router-dom'
import Home from './pages/students/Home'
import CoursesList from './pages/students/CoursesList'
import CourseDetails from './pages/students/CourseDetails'
import MyEnrollments from './pages/students/MyEnrollments'
import Player from './pages/students/Player'
import Loading from './components/students/Loading'
import Educator from './pages/educators/Educator'
import DashBoard from './pages/educators/DashBoard'
import AddCourse from './pages/educators/AddCourse'
import MyCourses from './pages/educators/MyCourses'
import StudentEnrolled from './pages/educators/StudentEnrolled'
import Navbar from './components/students/Navbar'
import Footer from './components/students/Footer'

const App = () => {

  const isEducatorRoute = useMatch('/educator/*')

  return (
    <div className='min-h-screen bg-white'>
    {!isEducatorRoute && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/course-list' element={<CoursesList/>} />
        <Route path='/course-list/:input' element={<CoursesList/>} />
        <Route path='/course/:id' element={<CourseDetails/>} />
        <Route path='/my-enrollments' element={<MyEnrollments/>} />
        <Route path='/player/:courseId' element={<Player/>} />
        <Route path='/loading/:path' element={<Loading/>} />
        {/* educator-route */}
        <Route path='/educator' element={<Educator/>}>
          <Route path='educator' element={<DashBoard/>}/>
          <Route path='add-course' element={<AddCourse/>}/>
          <Route path='my-course' element={<MyCourses/>}/>
          <Route path='student-enrolled' element={<StudentEnrolled/>}/>
        </Route>
      </Routes>
    </div>
  )
}

export default App
