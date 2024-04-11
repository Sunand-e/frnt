
import { useMutation } from "@apollo/client";
import { PROVIDE_CONTENT_TO_GROUPS } from "../../graphql/mutations/group/PROVIDE_CONTENT_TO_GROUPS";
import { AddUsersToGroups, AddUsersToGroupsVariables } from "../../graphql/mutations/group/__generated__/AddUsersToGroups";

function useProvideContentToGroups() {

  const [provideContentToGroupsMutation, provideContentToGroupsResponse] = useMutation(
    PROVIDE_CONTENT_TO_GROUPS
  );

  const provideContentToGroups = (values, cb = null) => {
  
      provideContentToGroupsMutation({
        variables: {
          ...values
        },
        onCompleted: cb,
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