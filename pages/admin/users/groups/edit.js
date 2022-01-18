import PageTitle from '../../../../components/header/PageTitle';
import GroupEditForm from '../../../../components/admin/users/GroupEditForm'
import { useRouter } from '../../../../utils/router'
import { useQuery } from '@apollo/client';
import { GET_GROUP } from '../../../../graphql/queries/allQueries';

const AdminUsersGroupsEdit = () => {
  /*
    Our useRouter is a modified version of nextJS's useRouter, as router.query is only available in SSR applications.
    See: https://stackoverflow.com/a/56695180/4274008, https://github.com/vercel/next.js/issues/4804
  */
  const router = useRouter()

  const { id } = router.query

  const { loading, error, data: {group} = {} } = useQuery(
    GET_GROUP,
    {
      variables: {
        id
      }
    }
  );
  usePageTitle({ title: `Edit group: ${group?.name}` })
  return (
    <>
      { group && (
        <GroupEditForm group={group} />
      )}
    </>
  )
}

AdminUsersGroupsEdit.navState = {
topLevel: 'users',
secondary: 'groups'
}

export default AdminUsersGroupsEdit