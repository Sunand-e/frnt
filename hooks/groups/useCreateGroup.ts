
import { GET_GROUPS, GET_GROUPS_DETAILED } from "../../graphql/queries/groups"
import { useMutation } from "@apollo/client"
import { CreateGroup, CreateGroupVariables } from "../../graphql/mutations/group/__generated__/CreateGroup";
import { CREATE_GROUP } from "../../graphql/mutations/group/CREATE_GROUP";
import { GetGroups } from "../../graphql/queries/__generated__/GetGroups";


function useCreateGroup() {

  const [createGroupMutation, createGroupResponse] = useMutation<CreateGroup, CreateGroupVariables>(
    CREATE_GROUP,
    {
      update(cache, { data: { createGroup } } ) {
        cache.updateQuery({
          query: GET_GROUPS,
        }, data => ({
            ...data,
            groups: {
              ...data.groups,
              edges: [{node: createGroup.group}, ...data.groups.edges]
            }            
          })
        )

        cache.updateQuery({
          query: GET_GROUPS_DETAILED,
        }, data => ({
            ...data,
            groups: {
              ...data.groups,
              edges: [{node: createGroup.group}, ...data.groups.edges]
            }            
          })
        )
      }
    }
  );

  const createGroup = values => {
    createGroupMutation({ 
      variables: { ...values },
      optimisticResponse: {
        createGroup: {
          __typename: 'CreateGroupPayload',
          group: {
            __typename: 'Group',
            id: Math.floor(Math.random() * 10000) + '',
            _deleted: false,
            image: null,
            users: {
              totalCount: 0,
              edges: []
            },
            enrolledCourses: [],
            assignedCourses: [],
            assignedResources: [],
            assignedPathways: [],
            createdAt: 0,
            updatedAt: 0,
            ...values
          }

        }
      }
      // refetchQueries: [{ query: GET_GROUPS }]
    }).catch(res => {
      // TODO: do something if there is an error!!
    })
  }

  return {
    createGroup
  }
}

export default useCreateGroup