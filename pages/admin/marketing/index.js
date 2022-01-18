import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import usePageTitle from '../../../hooks/usePageTitle'

const AdminMarketing = () => {

  usePageTitle({ title: 'Title' })

  return (
    <></>
  )
}

AdminMarketing.navState = {
topLevel: 'marketing',
secondary: 'overview'
}

export default AdminMarketing