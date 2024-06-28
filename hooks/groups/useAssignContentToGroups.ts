
import { useMutation } from "@apollo/client";
import { update } from "cypress/types/lodash";
import cache from "../../graphql/cache";
import { ASSIGN_CONTENT_TO_GROUPS } from "../../graphql/mutations/group/ASSIGN_CONTENT_TO_GROUPS";
import { AddUsersToGroups, AddUsersToGroupsVariables } from "../../graphql/mutations/group/__generated__/AddUsersToGroups";
import { GET_GROUP } from "../../graphql/queries/groups";

function useAssignContentToGroups() {

  const [assignContentToGroupsMutation, assignContentToGroupsResponse] = useMutation(
    ASSIGN_CONTENT_TO_GROUPS,
  );

  const assignContentToGroups = (values, cb = null) => {

    const existingCachedGroups = values.groupIds.map(groupId => {

      const cachedGroupData = cache.readQuery({ query: GET_GROUP, variables: { id: groupId } });
      return cachedGroupData.group;
    });

    const updatedGroups = existingCachedGroups.map(group => {
      
      const newContentItemEdges = values.contentItemIds.map(contentItemId => ({
        __typename: 'GroupEnrolledContentEdge',
        groupId: group.id,
        contentItemId,
        createdAt: new Date().toISOString(),
        node: {
          __typename: 'ContentItem',
          id: contentItemId,
        },
      }));
      
      return {
        ...group,
        assignedContents: {
          ...group.assignedContents,
          edges: [
            ...group.assignedContents.edges,
            ...newContentItemEdges,
          ]
        }
      }
    })
    
    assignContentToGroupsMutation({
      variables: {
        ...values
      },
      onCompleted: cb,
      optimisticResponse: {
        assignContentToGroups: {
          __typename: 'AssignContentToGroupsPayload',
          groups: updatedGroups,
        }
      }
    }).catch(res => {
      // TODO: do something if there is an error!!
    })
  }

  return {
    groups: assignContentToGroupsResponse?.data?.assignContentToGroups?.groups,
    assignContentToGroups,
  }
}

export default useAssignContentToGroups