
import { GET_GROUPS } from "../../graphql/queries/allQueries"
import { useMutation } from "@apollo/client"
import { CreateGroup, CreateGroupVariables } from "../../graphql/mutations/group/__generated__/CreateGroup";
import { CREATE_GROUP } from "../../graphql/mutations/group/CREATE_GROUP";
import { GetGroups } from "../../graphql/queries/__generated__/GetGroups";


function useCreateGroup() {

  const [createGroupMutation, createGroupResponse] = useMutation<CreateGroup, CreateGroupVariables>(
    CREATE_GROUP,
    {
      update(cache, { data: { createGroup } } ) {
        const data = cache.readQuery<GetGroups>({
          query: GET_GROUPS
        })
        cache.writeQuery({
          query: GET_GROUPS,
          data: { 
            groups: [createGroup.group, ...data.groups]
          }
        })
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
            users: [],
            enrolledCourses: [],
            assignedCourses: [],
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