import Menu from './Menu'

import { useQuery, useMutation, gql } from '@apollo/client';

export default function Menu1() {



  const items = [

    {
      title: 'My Account',
      link: '/my-account'
    },
    {
      title: 'Login',
      onClick: login
    },
    {
      title: 'Log Out',
      onClick: logout
    },
  ]
  return (
    <Menu items={items} className="space-x-5 flex justify-end w-full text-lg" />
  )
}