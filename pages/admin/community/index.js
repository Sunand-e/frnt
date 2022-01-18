import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import usePageTitle from '../../../hooks/usePageTitle';

const AdminCommunity = () => {

  usePageTitle({ title: 'Community' })
  
  return (
    <></>
  )
}

AdminCommunity.navState = {
topLevel: 'community',
secondary: 'community'
}

export default AdminCommunity