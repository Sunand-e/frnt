import PageTitle from '../../../../components/header/PageTitle';
import EditGroupForm from '../../../../components/admin/groups/EditGroupForm'
import { useRouter } from '../../../../utils/router'
import { useQuery } from '@apollo/client';
import { GET_GROUP } from '../../../../graphql/queries/allQueries';
import usePageTitle from '../../../../hooks/usePageTitle';
import useGetGroup from '../../../../hooks/groups/useGetGroup';

const AdminUsersGroupsEdit = () => {
  /*
    Our useRouter is a modified version of nextJS's useRouter, as router.query is only available in SSR applications.
    See: https://stackoverflow.com/a/56695180/4274008, https://github.com/vercel/next.js/issues/4804
  */
  const router = useRouter()

  const { id } = router.query

  const { group } = useGetGroup(id)

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