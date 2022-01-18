import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import usePageTitle from '../../../hooks/usePageTitle';

const AdminUsersLeaderboard = () => {

  usePageTitle({ title: 'Leaderboard' })

  return (
    <></>
  )
}

AdminUsersLeaderboard.navState = {
topLevel: 'users',
secondary: 'leaderboard'
}

export default AdminUsersLeaderboard