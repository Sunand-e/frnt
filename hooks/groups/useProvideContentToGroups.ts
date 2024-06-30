
import { useMutation } from "@apollo/client";
import { update } from "cypress/types/lodash";
import cache from "../../graphql/cache";
import { PROVIDE_CONTENT_TO_GROUPS } from "../../graphql/mutations/group/PROVIDE_CONTENT_TO_GROUPS";
import { AddUsersToGroups, AddUsersToGroupsVariables } from "../../graphql/mutations/group/__generated__/AddUsersToGroups";
import { GET_GROUP } from "../../graphql/queries/groups";

function useProvideContentToGroups() {

  const [provideContentToGroupsMutation, provideContentToGroupsResponse] = useMutation(
    PROVIDE_CONTENT_TO_GROUPS,
  );

  const provideContentToGroups = (values, cb = null) => {
    
    const existingCachedGroups = values.groupIds.map(groupId => {
      const cachedGroupData = cache.readQuery({ query: GET_GROUP, variables: { id: groupId } });
      return cachedGroupData.group;
    });

    const updatedGroups = existingCachedGroups.map(group => {
      const newContentItemEdges = values.contentItemIds.map(contentItemId => ({
        __typename: 'GroupProvisionedContentEdge',
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
        provisionedContents: {
          ...group.provisionedContents,
          edges: [
            ...group.provisionedContents.edges,
            ...newContentItemEdges,
          ]
        }
      }
    })

    provideContentToGroupsMutation({
      variables: {
        ...values
      },
      onCompleted: cb,
      optimisticResponse: {
        provideContentToGroups: {
          __typename: 'ProvideContentToGroupsPayload',
          groups: updatedGroups,
        }
      }
    }).catch(res => {
      // TODO: do something if there is an error!!
    })
  }

  return {
    groups: provideContentToGroupsResponse?.data?.provideContentToGroups?.groups,
    provideContentToGroups,
  }
}

export default useProvideContentToGroups