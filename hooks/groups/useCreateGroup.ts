
import { GET_GROUPS, GET_GROUPS_DETAILED } from "../../graphql/queries/groups"
import { useMutation } from "@apollo/client"
import { CreateGroup, CreateGroupVariables } from "../../graphql/mutations/group/__generated__/CreateGroup";
import { CREATE_GROUP } from "../../graphql/mutations/group/CREATE_GROUP";
import { v4 as uuidv4 } from 'uuid';

function useCreateGroup() {

  const [createGroupMutation, createGroupResponse] = useMutation<CreateGroup, CreateGroupVariables>(
    CREATE_GROUP,
    {
      update(cache, { data: { createGroup } } ) {
        cache.updateQuery({
          query: GET_GROUPS,
        }, data => {
          if(data) {
            return {
              ...data,
              groups: {
                ...data.groups,
                edges: [{node: createGroup.group}, ...data.groups.edges]
              }            
            }
          }
        })

        cache.updateQuery({
          query: GET_GROUPS_DETAILED,
        }, data => {
          if(data) {
            return {
              ...data,
              groups: {
                ...data.groups,
                edges: [{node: createGroup.group}, ...data.groups.edges]
              }            
            }
          }
        })
      }
    }
  );

  const createGroup = (values, options={}) => {
    
    const tempId = uuidv4(); // generate a temporary ID

    createGroupMutation({
      variables: { ...values },
      optimisticResponse: {
        createGroup: {
          __typename: 'CreateGroupPayload',
          group: {
            __typename: 'Group',
            id: values.id ?? tempId,
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
      },
      onCompleted: (data) => {
        alert('Group created successfully!');
      },
      onError: (error) => {
        console.error('Error creating group:', error);
      },
      ...options
    }).catch(res => {
      // TODO: do something if there is an error!!
    })
  }

  return {
    createGroup
  }
}

export default useCreateGroup