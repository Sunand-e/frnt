import { useMutation } from "@apollo/client";
import { ASSIGN_CONTENT_TO_GROUPS } from "../../graphql/mutations/group/ASSIGN_CONTENT_TO_GROUPS";

function useAssignContentToGroups() {
  const [assignContentToGroupsMutation, assignContentToGroupsResponse] = useMutation(
    ASSIGN_CONTENT_TO_GROUPS,
    {
      update: (cache, { data: { assignContentToGroups } }) => {
        if (!assignContentToGroups) return;

        assignContentToGroups.groups.forEach(group => {
          cache.modify({
            id: cache.identify(group),
            fields: {
              assignedContents(existingContents = { edges: [] }) {
                return {
                  ...existingContents,
                  edges: [...existingContents.edges, ...group.assignedContents.edges],
                };
              },
            },
          });
        });
      },
    }
  );

  const assignContentToGroups = (values, cb = null) => {
    assignContentToGroupsMutation({
      variables: {
        ...values
      },
      onCompleted: cb,
    }).catch(err => {
      console.error("Error assigning content to groups:", err);
    });
  };

  return {
    groups: assignContentToGroupsResponse?.data?.assignContentToGroups?.groups,
    assignContentToGroups,
  };
}

export default useAssignContentToGroups;
