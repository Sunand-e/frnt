import { useQuery } from '@apollo/client';
import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import Table from '../common/tables/Table';
import { GET_USERS, UserFragment } from '../../graphql/queries/users';
import { GetUsers, GetUsers_users_edges_node } from '../../graphql/queries/__generated__/GetUsers';
import ItemWithImage from '../common/cells/ItemWithImage';
import {User} from '@styled-icons/fa-solid/User'
import UserActionsMenu from './UserActionsMenu';
import useSendInvite from '../../hooks/useSendInvite';
import { Check } from '@styled-icons/boxicons-regular/Check';
import { CheckCircle } from '@styled-icons/boxicons-regular/CheckCircle';
import { InfoCircle } from '@styled-icons/boxicons-regular/InfoCircle';
import dayjs from "dayjs"
import Tippy from '@tippyjs/react';
import useUserHasCapability from '../../hooks/users/useUserHasCapability';
import { TenantContext } from '../../context/TenantContext';
import { handleModal } from '../../stores/modalStore';
import EnrolUsersInContent from './content/EnrolUsersInContent';
import cache from '../../graphql/cache';
import useIsOrganisationLeader from '../../hooks/users/useIsOrganisationLeader';
var advancedFormat = require('dayjs/plugin/advancedFormat')
dayjs.extend(advancedFormat)

const UserStatusCell = ({
  iconComponent: IconComponent,
  iconClass,
  tooltip,
  text,
}) => (
  <Tippy
    content={tooltip}
    theme={'memberhub-white'}
    
  >
    <div className="flex space-x-2 items-center justify-center">
      <IconComponent className={`${iconClass} w-6 `} />
      <span>{text}</span>
    </div>
  </Tippy>
) 
const UsersTable = () => {

  const { loading, error, data: queryData } = useQuery<GetUsers>(GET_USERS);
  // Table data is memo-ised due to this:
  // https://github.com/tannerlinsley/react-table/issues/1994
  const tableData = useMemo<GetUsers_users_edges_node[]>(() => {
    return queryData?.users?.edges?.map(edge => edge.node).filter(node => !node._deleted) || []
  }, [queryData]);

  const { userHasCapability } = useUserHasCapability()
  const tenant = useContext(TenantContext)

  const { isOrganisationLeader } = useIsOrganisationLeader()

  const editUrl = '/admin/users/edit'

  const tableCols = useMemo(
    () => [
      {
        header: "User ",
        accessorFn: row => row.fullName,
        cell: ({ cell }) => (
          <ItemWithImage 
            title={cell.row.original.fullName}
            secondary={cell.row.original.email}
            href={cell.row.original.id && `${editUrl}?id=${cell.row.original.id}`}
            imageSrc={cell.row.original.profileImageUrl}
            icon={<User className="hidden w-auto h-full bg-grey-500 text-main-secondary text-opacity-50" />}
            placeholder={"/images/user-generic.png"}
          />
        )
      },
      ...(
        (
          !(tenant?.groups?.enabled === false) &&
          userHasCapability('SeeGroups', 'tenant')
        ) ? [
        {
          header: "Groups",
          accessorFn: (row: GetUsers_users_edges_node) => row.groups.edges.map(edge => edge.node.name).join(', '),
          cell: ({ cell }) => {
            return cell.getValue() || '-'
          }
        }
      ] : []),
      ...(
        (
          userHasCapability('SeeRoles') &&
          !isOrganisationLeader
        ) ? [
        {
          header: "Global Roles",
          id: 'roles',
          cell: ({ cell }) => {
            return cell.row.original.roles.filter(
              role => role.name !== 'User'
            ).map(role => role.name).join(', ') || '-'
          }
        }
      ] : []),
      {
        header: "Status",
        id: 'status',
        accessorFn: (row) => {
          if(!row.invitationSentAt) {
            return "uninvited"
          }
          if(row.invitationAcceptedAt) {
            return "active"
          }
          return "invited"
        },
        cell: ({ cell }) => {
          let props
          switch(cell.getValue()) {
            case 'uninvited': {
              let dateString = dayjs(cell.row.original.createdAt).format('Do MMMM YYYY [at] h:mm A')
              props = {
                iconComponent: InfoCircle,
                iconClass: 'fill-gray-500',
                tooltip: `Created: ${dateString}`,
                text: 'Not yet invited'
              }
              break;
            }
            case 'invited': {
              let dateString = dayjs(cell.row.original.invitationSentAt).format('Do MMMM YYYY [at] h:mm A')
              props = {
                iconComponent: InfoCircle,
                iconClass: 'fill-yellow-500',
                tooltip: `Invited: ${dateString}`,
                text: 'Invited'
              }
              break;
            }
            case 'active': {
              let dateString = dayjs(cell.row.original.currentSignInAt).format('Do MMMM YYYY [at] h:mm A')
              props = {
                iconComponent: CheckCircle,
                iconClass: 'fill-green-500',
                tooltip: `Last signed in: ${dateString}`,
                text: 'Active'
              }
              break;
            }
          }
          return <UserStatusCell {...props} />
        }
      },
      {
        width: 300,
        header: "Actions",
        accessorKey: "actions",
        cell: ({ cell }) => <UserActionsMenu user={cell.row.original} />
      }
    ],
    [tenant, isOrganisationLeader, userHasCapability]
  );

  const { sendInvite } = useSendInvite()

  const assignCourses = (ids) => {

    const users = ids.map(id => cache.readFragment({
      id: `User:${id}`,
      fragment: UserFragment,
    }));

    handleModal({
      title: 'Assign courses',
      content: <EnrolUsersInContent users={users} content={null} typeName='course' />
    });
  }

  const bulkActions = [
    {
      label: 'Send invitations to selected users',
      onClick: (ids: Array<string>) => ids.length && sendInvite(ids)
    },
    {
      label: 'Assign courses to users',
      onClick: (ids: Array<string>) => ids.length && assignCourses(ids)
    },

  
    // {
    //   label: <span className="text-red-500">Delete users</span>,
    //   onClick: (ids: Array<string>) => console.log('test'),
    // },
  ]

  const tableProps = {
    tableData, 
    tableCols, 
    bulkActions,
    typeName: 'user',
    filters: ['global']
  }

  return (
    <Table { ...tableProps } />
  );
}

export default UsersTable
