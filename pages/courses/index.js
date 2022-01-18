import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import usePageTitle from "../../hooks/usePageTitle";

const Courses = () => {

  usePageTitle({ title: 'My Courses' })
  
  const [course, setCourse] = useState('');

  return (
    <>
    </>
  )
}

Courses.navState = {
  topLevel: 'courses',
  secondary: 'mycourses'
}

export default Courses