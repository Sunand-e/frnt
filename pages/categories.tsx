import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import usePageTitle from "../hooks/usePageTitle";
import useGetCourses from "../hooks/courses/useGetCourses"
import CourseTabs from '../components/dashboard/CourseTabs';
import CategoriesGrid from '../components/tags/CategoriesGrid';
const Courses = () => {

  usePageTitle({ title: 'Categories' })
  
  const {courses, loading, error } = useGetCourses();

  const options = {
    heading:'Course Categories'
  }
  return (
    <>
    { (!loading && !error) && 
    <CategoriesGrid /> }
    </>
  )
}

Courses.navState = {
  topLevel: 'courses',
  secondary: 'mycourses'
}

export default Courses
