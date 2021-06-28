import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PageTitle from '../../components/PageTitle';

const Courses = () => {

  
  const [course, setCourse] = useState('');

  return (
    <>
    <PageTitle title="My Courses" />
    </>
  )
}

Courses.navState = {
  topLevel: 'courses',
  secondary: 'mycourses'
}

export default Courses