
import { useMutation } from "@apollo/client";
import { REMOVE_PROVISIONED_CONTENT_FROM_GROUPS } from "../../graphql/mutations/group/REMOVE_PROVISIONED_CONTENT_FROM_GROUPS";

function useRemoveProvisionedContentFromGroups() {

  const [removeProvisionedContentFromGroupsMutation, removeProvisionedContentFromGroupsResponse] = useMutation(
    REMOVE_PROVISIONED_CONTENT_FROM_GROUPS
  );

  const removeProvisionedContentFromGroups = (values, cb = null) => {
    removeProvisionedContentFromGroupsMutation({
      variables: {
        ...values
      },

      // for each group id in values.groupIds, we want to update the provisionedCourses 
      // field in the cache by removing the content ids contained in values.contentItemIds from the provisionedCourses field

      update(cache, { data }) {
        const { groupIds, contentItemIds } = values;
        groupIds.forEach(groupId => {
          cache.modify({
            id: cache.identify({ __typename: 'Group', id: groupId }),
            fields: {
              provisionedCourses(existingProvisionedContents = {}) {
                const newProvisionedContents = {
                  ...existingProvisionedContents,
                  edges: existingProvisionedContents.edges.filter(({ node }) => !contentItemIds.includes(node.id)),
                };
                return newProvisionedContents;
              },
            },
          });
        });
      },

      optimisticResponse: {
        removeProvisionedContentFromGroups: {
          groups: values.groupIds.map(groupId => ({
            __typename: 'Group',
            id: groupId,
          })),
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