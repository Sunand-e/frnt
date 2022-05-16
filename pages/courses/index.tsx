import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import usePageTitle from "../../hooks/usePageTitle";
import useGetCourses from "../../hooks/courses/useGetCourses"
import ItemCollection from "../../components/common/items/ItemCollection"
import CourseTabs from '../../components/dashboard/CourseTabs';
const Courses = () => {

  usePageTitle({ title: 'My Courses' })
  
  const {courses, loading, error } = useGetCourses();

  return (
    <>
    { (!loading && !error) && 
    <CourseTabs /> }
    </>
  )
}

Courses.navState = {
  topLevel: 'courses',
  secondary: 'mycourses'
}

export default Courses
