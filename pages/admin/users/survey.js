import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PageTitle from '../../../components/PageTitle';

const AdminUsersSurveys = () => {

  return (
    <PageTitle title="Surveys" />
  )
}

AdminUsersSurveys.navState = {
topLevel: 'users',
secondary: 'surveys'
}

export default AdminUsersSurveys