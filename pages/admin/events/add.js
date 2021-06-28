import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PageTitle from '../../../components/PageTitle';

const AvailableCourses = () => {

  return (
    <PageTitle title="Add New Live Session" />
  )
}

AvailableCourses.navState = {
topLevel: 'events',
secondary: 'add'
}

export default AvailableCourses