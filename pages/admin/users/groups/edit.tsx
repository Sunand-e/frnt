import EditGroupForm from '../../../../components/groups/EditGroupForm'
import { useRouter } from '../../../../utils/router'
import usePageTitle from '../../../../hooks/usePageTitle';
import useGetGroup from '../../../../hooks/groups/useGetGroup';
import {ArrowBack} from "@styled-icons/boxicons-regular/ArrowBack";
import useHeaderButtons from "../../../../hooks/useHeaderButtons";

const BackButton = () => (
  <>
    <span className='hidden lg:block'>Back to groups list</span>
    <span className='block lg:hidden'><ArrowBack  width="20" /></span>
  </>
)

const AdminUsersGroupsEdit = () => {
  /*
    Our useRouter is a modified version of nextJS's useRouter, as router.query is only available in SSR applications.
    See: https://stackoverflow.com/a/56695180/4274008, https://github.com/vercel/next.js/issues/4804
  */
  const router = useRouter()

  const { id } = router.query

  const { group } = useGetGroup(id)

  useHeaderButtons([
    [<BackButton />, '/admin/users/groups']
  ])

  usePageTitle({ title: `Edit group: ${group?.name}` })
  return (
    <>
      { group && (
        <EditGroupForm group={group} />
      )}
    </>
  )
}

AdminUsersGroupsEdit.navState = {
topLevel: 'users',
secondary: 'groups'
}

export default AdminUsersGroupsEdit
