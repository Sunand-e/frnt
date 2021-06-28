import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PageTitle from '../../components/PageTitle';

const AvailableCourses = () => {

  return (
    <PageTitle title="Available Courses" />
  )
}

AvailableCourses.navState = {
  topLevel: 'courses',
  secondary: 'available',
}

export default AvailableCourses