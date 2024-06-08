
import { useMutation } from "@apollo/client";
import { REMOVE_PROVISIONED_CONTENT_FROM_GROUPS } from "../../graphql/mutations/group/REMOVE_PROVISIONED_CONTENT_FROM_GROUPS";
import { AddUsersToGroups, AddUsersToGroupsVariables } from "../../graphql/mutations/group/__generated__/AddUsersToGroups";
import { GroupDetailsFragment } from "../../graphql/queries/groups";

function useRemoveProvisionedContentFromGroups() {

  const [removeProvisionedContentFromGroupsMutation, removeProvisionedContentFromGroupsResponse] = useMutation(
    REMOVE_PROVISIONED_CONTENT_FROM_GROUPS
  );

  const removeProvisionedContentFromGroups = (values, cb = null) => {
    removeProvisionedContentFromGroupsMutation({
      variables: {
        ...values
      },

      // values is an object with the following structure:
      // {
      //   contentItemIds: [ID!]!,
      //   groupIds: [ID!]!
      // }

      // Update cache after mutation using updateFragment in update function

      // the response is not helpful, we want to use the ids from values to update the cache

      // we can use the values to update the cache

      // for each group id in values.groupIds, we want to update the provisionedCourses 
      // field in the cache by removing the content ids contained in values.contentItemIds from the provisionedCourses field

      update(cache, { data }) {
        const { groupIds, contentItemIds } = values;
        groupIds.forEach(groupId => {
          const groupFragmentId = cache.identify({ __typename: 'Group', id: groupId });
          const group = cache.readFragment<GroupDetailsFragment>({ id: groupFragmentId, fragment: GroupDetailsFragment }, true);

          if (group) {
        const updatedProvisionedCourses = group.provisionedCourses.edges.filter(({ node }) => !contentItemIds.includes(node.id));
        const updatedGroup = {
          ...group,
          provisionedCourses: {
            ...group.provisionedCourses,
            edges: updatedProvisionedCourses,
          },
        };
        
        cache.writeFragment({
          id: groupFragmentId,
          fragment: GroupDetailsFragment,
          data: updatedGroup,
        });
          }
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