
import { GET_GROUPS } from "../../graphql/queries/groups"
import { useMutation, useQuery } from "@apollo/client"
import { ADD_USERS_TO_GROUPS } from "../../graphql/mutations/group/ADD_USERS_TO_GROUPS";
import { AddUsersToGroups, AddUsersToGroupsVariables } from "../../graphql/mutations/group/__generated__/AddUsersToGroups";

function useAddUsersToGroups() {

  const [addUsersToGroupsMutation, addUsersToGroupsResponse] = useMutation<AddUsersToGroups, AddUsersToGroupsVariables>(
    ADD_USERS_TO_GROUPS
  );


  const addUsersToGroups = (values, cb = null) => {
    // const updateUser = ({name=null, contentBlocks=null}) => {
  
      addUsersToGroupsMutation({
        variables: {
          ...values
        },
        onCompleted: cb,
      }).catch(res => {
        // TODO: do something if there is an error!!
      })
    }
  
    return {
      groups: addUsersToGroupsResponse?.data?.addUsersToGroups?.groups,
      addUsersToGroups,
    }
}

export default useAddUsersToGroups