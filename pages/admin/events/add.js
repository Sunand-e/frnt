import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import usePageTitle from '../../../hooks/usePageTitle'

const AvailableCourses = () => {

  usePageTitle({ title: 'Add New Live Session' })

  return (
    <></>
  )
}

AvailableCourses.navState = {
topLevel: 'events',
secondary: 'add'
}

export default AvailableCourses