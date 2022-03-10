import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import usePageTitle from '../../../hooks/usePageTitle';

const AdminUsersRoles = () => {
  
  usePageTitle({ title: 'Title' })
  
  const arr = [1,2,3]

  const waitFor = delay => new Promise(resolve => setTimeout(resolve, delay*1000)).then(res => {
    console.log(`i waited for ${delay*1000}s!`)
  });

  const prom = arr.map(num => waitFor(num))

  Promise.all(prom).then(() => console.log('DONE'))

  return (
    <>
    </>
  )
}

AdminUsersRoles.navState = {
topLevel: 'users',
secondary: 'roles'
}

export default AdminUsersRoles