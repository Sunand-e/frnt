import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import usePageTitle from "../../hooks/usePageTitle";
import useGetCourses from "../../hooks/courses/useGetCourses"
import ItemCollection from "../../components/common/items/ItemCollection"
const Courses = () => {

  usePageTitle({ title: 'My Courses' })
  
  const {courses, loading, error } = useGetCourses();

  const options = {
    heading:'My courses'
  }
  return (
    <>
    { (!loading && !error) && <ItemCollection options={options} items={courses} /> }
    </>
  )
}

Courses.navState = {
  topLevel: 'courses',
  secondary: 'mycourses'
}

export default Courses
