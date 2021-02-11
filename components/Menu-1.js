import Menu from './Menu'

import { useQuery, useMutation, gql } from '@apollo/client';

const LOGIN_QUERY = gql`
mutation LoginQuery {
  loginWithCookies(input: {password: "mo1929123!@#", login: "moadmin"}) {
    clientMutationId
    status
  }
}
`;
const LOGOUT_QUERY = gql`
mutation {
  logout(input: {clientMutationId: "anything unique"}){
      clientMutationId
      status
  }
}`;

export default function Menu1() {

  const [login, { loading, error, data } ] = useMutation(LOGIN_QUERY);
  const [logout, {} ] = useMutation(LOGOUT_QUERY);

  const items = [
    {
      title: 'Dashboard',
      link: '/'
    },
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