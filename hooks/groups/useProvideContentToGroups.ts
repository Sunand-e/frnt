import { useMutation } from "@apollo/client";
import { PROVIDE_CONTENT_TO_GROUPS } from "../../graphql/mutations/group/PROVIDE_CONTENT_TO_GROUPS";
function useProvideContentToGroups() {
  const [provideContentToGroupsMutation, provideContentToGroupsResponse] = useMutation(
    PROVIDE_CONTENT_TO_GROUPS,
    {
      update: (cache, { data: { provideContentToGroups } }) => {
        if (!provideContentToGroups) return;

        provideContentToGroups.groups.forEach(group => {
          cache.modify({
            id: cache.identify(group),
            fields: {
              provisionedContents(existingContents = { edges: [] }) {
                return {
                  ...existingContents,
                  edges: [...existingContents.edges, ...group.provisionedContents.edges],
                };
              },
            },
          });
        });
      },
    }
  );

  const provideContentToGroups = (values, cb = null) => {
    provideContentToGroupsMutation({
      variables: {
        ...values
      },
      onCompleted: cb,
    }).catch(err => {
      console.error("Error providing content to groups:", err);
    });
  };

  return {
    groups: provideContentToGroupsResponse?.data?.provideContentToGroups?.groups,
    provideContentToGroups,
  };
}

export default useProvideContentToGroups;
