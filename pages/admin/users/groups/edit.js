import PageTitle from '../../../../components/PageTitle';
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

  if(group) {
    return (
      <>
        <PageTitle title={`Edit Group: ${group?.name}`} />
        <GroupEditForm group={group} />
      </>
    )
  } else {
    return (
      <PageTitle title={`Edit Group`} />
    )
  }
}

AdminUsersGroupsEdit.navState = {
topLevel: 'users',
secondary: 'groups'
}

export default AdminUsersGroupsEdit