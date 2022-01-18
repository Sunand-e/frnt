import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import usePageTitle from '../../../hooks/usePageTitle';


const AdminUsersSurveys = () => {

  usePageTitle({ title: 'Surveys' })
  
  return (
    <></>
  )
}

AdminUsersSurveys.navState = {
topLevel: 'users',
secondary: 'surveys'
}

export default AdminUsersSurveys