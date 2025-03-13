import EditGroupForm from '../../../../components/groups/EditGroupForm'
import usePageTitle from '../../../../hooks/usePageTitle';
import {ChevronRight} from "@styled-icons/boxicons-regular/ChevronRight";
import useHeaderButtons from "../../../../hooks/useHeaderButtons";
import useGetGroup from '../../../../hooks/groups/useGetGroup';
import { useRouter } from '../../../../utils/router';
import ButtonBack from '../../../../components/common/ButtonBack';
import { ReactNode } from 'react';
import Link from 'next/link';
import LoadingSpinner from '../../../../components/common/LoadingSpinner';

const AdminUsersGroupsEdit = () => {

  useHeaderButtons({
    id: "backToGroups",
    component: <ButtonBack text="Back to group list" action="/admin/users/groups" />
  });

  const router = useRouter()
  const { id } = router.query
  const { group } = useGetGroup(id)
  
  let pageTitle: ReactNode = 'Groups'

  if(group) {
    pageTitle = (
      <span className='flex items-center space-x-2'>
        <Link href="/admin/users/groups">
          <span>Groups</span>
        </Link>
        <ChevronRight size={20} />
        <span>{group.name}</span>
      </span>
    )
  }

  usePageTitle({ title: `${group?.name} | Group`, header: pageTitle })

  if(!group) return (
    <LoadingSpinner
      text='Loading group'
    />
  )



  return <EditGroupForm />
}

AdminUsersGroupsEdit.capabilities = ['UpdateGroup']
AdminUsersGroupsEdit.navState = {
  topLevel: 'users',
  secondary: 'groups'
}

export default AdminUsersGroupsEdit
