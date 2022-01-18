import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import usePageTitle from '../../hooks/usePageTitle';

const AvailableCourses = () => {

  usePageTitle({ title: 'Available Courses' })

  return (
    <></>
  )
}

AvailableCourses.navState = {
  topLevel: 'courses',
  secondary: 'available',
}

export default AvailableCourses