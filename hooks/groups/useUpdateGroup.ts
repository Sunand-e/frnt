import { UpdateGroup, UpdateGroupVariables } from "../../graphql/mutations/group/__generated__/UpdateGroup";
import { UPDATE_GROUP } from "../../graphql/mutations/group/UPDATE_GROUP"
import { GET_GROUP } from "../../graphql/queries/groups"
import { gql, useMutation, useQuery } from "@apollo/client"
import { GetGroup } from "../../graphql/queries/__generated__/GetGroup";

function useUpdateGroup(id = null) {

  const { loading, error, data  } = useQuery<GetGroup>(
    GET_GROUP,
    {
      variables: { id },
      skip: !id
    }
  );

  const [updateGroupMutation, updateGroupResponse] = useMutation<UpdateGroup, UpdateGroupVariables>(
    UPDATE_GROUP, {
      update(cache, { data: { updateGroup: { group } } } ) {
        const newUserIds = group.users.edges.map(edge => edge.node.id) // userIds
        const oldUserIds = data?.group.users.edges.map(edge => edge.node.id) || []// userIds
        const addedUserIds = newUserIds.filter(x => !oldUserIds.includes(x));
        const removedUserIds = oldUserIds.filter(x => !newUserIds.includes(x));

        for(id of addedUserIds) {
          updateUserGroupFragment(cache, id, group)
        }
        
        for(id of removedUserIds) {
          updateUserGroupFragment(cache, id, group, true)
        }
      }
    }
  );

  const updateUserGroupFragment = (cache, id, group, remove=false) => {

    const user = cache.updateFragment({ // options object
      id: `User:${id}`, // The value of the to-do item's unique identifier
      fragment: gql`
        fragment UserGroups on User {
          groups {
            edges {
              groupId
              userId
              node {
                id
              }
            }
            totalCount
          }
        }
      `,
    }, (data) => {
      const groups = {
        ...data?.groups,
        edges: remove ? removeUserGroupEdge(data, group) : addUserGroupEdge(data, group),
        totalCount: data?.groups.totalCount + remove ? -1 : 1
      }
      return ({
        groups
      })
    });

    return user;
  }

  const removeUserGroupEdge = (data, group) => {
    return data?.groups.edges.filter(userGroupEdge => {
      return userGroupEdge.node.id !== group.id
    })
  }

  const addUserGroupEdge = (data, group) => [
    ...data.groups.edges, 
    ...(!data.group?.edges.some(edge => edge.node.id === group.id) && [
      {
        __typename: 'UserGroupEdge',
        roles: [],
        node: {
          name: group.name, 
          __typename: 'Group', 
          id: group.id
        }
      }
    ])
  ]

  const updateGroup = (values) => {
    const variables = {
      ...values,
      enrolmentLicenseTotal: parseInt(values.enrolmentLicenseTotal) || 0,
      enrolments: parseInt(values.enrolments) || 0,
    }
    updateGroupMutation({
      variables: {
        id,
        
        ...variables
      },
      optimisticResponse: {
        updateGroup: {
          __typename: 'UpdateGroupPayload',
          group: {
            ...data.group,
            ...variables,
            users: {
              ...data.group.users,
              edges: variables.userIds.map(id => {
                return { node: { id, __typename: 'User'} }
              })
            }
          },
        }
      }
    }).catch(res => {
      // TODO: do something if there is an error!!
    })
  }

  return {
    group: data?.group,
    loading,
    error,
    updateGroup
  }
}

export default useUpdateGroup