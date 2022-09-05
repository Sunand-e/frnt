import Link from 'next/link'
import Tippy from '@tippyjs/react';
import useLogout from '../../hooks/useLogout';
import useView from '../../hooks/useView';
import { GET_USER } from '../../graphql/queries/users';
import { GetUser } from '../../graphql/queries/__generated__/GetUser';
import { useQuery } from '@apollo/client';
import { gql } from '@apollo/client';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/solid';
import { Fragment } from 'react';
import classNames from '../../utils/classNames';
import {User} from '@styled-icons/fa-solid/User'

const Profile = () => {

  const USER_PROFILE = gql`
    query GetUserProfile {
      user {
        fullName
        profileImageUrl
        roles {
          name
        }
      }
    }
  `
  const { loading, error, data, refetch } = useQuery<GetUser>(USER_PROFILE);


  return (
    <>
    </>
  )
}

export default Profile
