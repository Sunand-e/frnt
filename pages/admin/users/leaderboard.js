import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PageTitle from '../../../components/PageTitle';

const AdminUsersLeaderboard = () => {

  return (
    <PageTitle title="Leaderboard" />
  )
}

AdminUsersLeaderboard.navState = {
topLevel: 'users',
secondary: 'leaderboard'
}

export default AdminUsersLeaderboard