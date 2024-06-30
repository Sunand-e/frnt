
import { useMutation } from "@apollo/client";
import cache from "../../graphql/cache";
import { REMOVE_ASSIGNED_CONTENT_FROM_GROUPS } from "../../graphql/mutations/group/REMOVE_ASSIGNED_CONTENT_FROM_GROUPS";
import { REMOVE_PROVISIONED_CONTENT_FROM_GROUPS } from "../../graphql/mutations/group/REMOVE_PROVISIONED_CONTENT_FROM_GROUPS";
import { GET_GROUP } from "../../graphql/queries/groups";

function useRemoveAssignedContentFromGroups() {

  const [removeAssignedContentFromGroupsMutation, removeAssignedContentFromGroupsResponse] = useMutation(
    REMOVE_ASSIGNED_CONTENT_FROM_GROUPS
  );

  const removeAssignedContentFromGroups = (values, cb = null) => {

    
    // get all groups by values.groupIds and create a lookup from the group id to the group data:
    const cachedGroups = values.groupIds.map(groupId => {
      const cachedGroupData = cache.readQuery({ query: GET_GROUP, variables: { id: groupId }, optimistic: true});
      return cachedGroupData?.group;
    })
    
    removeAssignedContentFromGroupsMutation({
      variables: {
        ...values
      },
      update(cache, { data }) {

        const { groupIds, contentItemIds } = values;

        groupIds.forEach(groupId => {
          cache.updateQuery({
            query: GET_GROUP,
            variables: { id: groupId },
          }, data => {
            if(data && data.group) {
              // Filter out the content from the group's assignedContents connection
              const filteredContent = data.group.assignedContents.edges.filter(edge => {
                return !contentItemIds.includes(edge.node.id)
              });
              // Write the modified group data back to the cache
              return {
                ...data,
                group: {
                  ...data.group,
                  assignedContents: {
                    ...data.group.assignedContents,
                    edges: filteredContent,
                  },
                },
              }
            }
          })

          cache.gc()
        })
      },


      optimisticResponse: {
        removeAssignedContentFromGroups: {
          __typename: 'RemoveAssignedContentFromGroupsPayload',
          groups: cachedGroups
        },
      },
    
    }).catch(res => {
    })
  }

  return {
    groups: removeAssignedContentFromGroupsResponse?.data?.removeAssignedContentFromGroups?.groups,
    removeAssignedContentFromGroups,
  }
}

export default useRemoveAssignedContentFromGroups