
import { useMutation } from "@apollo/client";
import cache from "../../graphql/cache";
import { REMOVE_PROVISIONED_CONTENT_FROM_GROUPS } from "../../graphql/mutations/group/REMOVE_PROVISIONED_CONTENT_FROM_GROUPS";
import { GET_GROUP } from "../../graphql/queries/groups";

function useRemoveProvisionedContentFromGroups() {

  const [removeProvisionedContentFromGroupsMutation, removeProvisionedContentFromGroupsResponse] = useMutation(
    REMOVE_PROVISIONED_CONTENT_FROM_GROUPS
  );

  const removeProvisionedContentFromGroups = (values, cb = null) => {

    // get all groups by values.groupIds and create a lookup from the group id to the group data:
    const cachedGroups = values.groupIds.map(groupId => {
      const cachedGroupData = cache.readQuery({ query: GET_GROUP, variables: { id: groupId }, optimistic: true});
      return cachedGroupData.group;
    })
    
    removeProvisionedContentFromGroupsMutation({
      variables: {
        ...values
      },

      // for each group id in values.groupIds, we want to update the provisionedCourses 
      // field in the cache by removing the content ids contained in values.contentItemIds from the provisionedCourses field

      update(cache, { data }) {

        const { groupIds, contentItemIds } = values;

        groupIds.forEach(groupId => {
          cache.updateQuery({
            query: GET_GROUP,
            variables: { id: groupId },
          }, data => {
            if(data && data.group) {
              // Filter out the content from the group's provisionedContents connection
              const filteredContent = data.group.provisionedContents.edges.filter(edge => {
                return !contentItemIds.includes(edge.node.id)
              });
              // Write the modified group data back to the cache
              return {
                ...data,
                group: {
                  ...data.group,
                  provisionedContents: {
                    ...data.group.provisionedContents,
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
        removeProvisionedContentFromGroups: {
          __typename: "RemoveProvisionedContentFromGroupsPayload",
          groups: cachedGroups
        },
      },
    
    }).catch(res => {
    })
  }

  return {
    groups: removeProvisionedContentFromGroupsResponse?.data?.removeProvisionedContentFromGroups?.groups,
    removeProvisionedContentFromGroups,
  }
}

export default useRemoveProvisionedContentFromGroups