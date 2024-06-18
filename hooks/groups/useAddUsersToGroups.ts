
import { GET_GROUPS } from "../../graphql/queries/groups"
import { useMutation, useQuery } from "@apollo/client"
import { ADD_USERS_TO_GROUPS } from "../../graphql/mutations/group/ADD_USERS_TO_GROUPS";
import { AddUsersToGroups, AddUsersToGroupsVariables } from "../../graphql/mutations/group/__generated__/AddUsersToGroups";
import { AddUsersToGroupsMutation, AddUsersToGroupsMutationVariables } from "../../graphql/generated";
import { GET_USER } from "../../graphql/queries/userDetails";

function useAddUsersToGroups() {

  const [addUsersToGroupsMutation, addUsersToGroupsResponse] = useMutation<AddUsersToGroupsMutation, AddUsersToGroupsMutationVariables>(
    ADD_USERS_TO_GROUPS,
    {
      update: (cache, { data: { addUsersToGroups } }) => {
        // for each user, add the group to the user's groups
        // addUsersToGroups.users.forEach(user => {
        //   const { user: cachedUser } = cache.readQuery({ query: GET_USER, variables: { id: user.id } }) || {};
        //   if (cachedUser) {
        //     const newUser = JSON.parse(JSON.stringify(cachedUser));

        //     newUser.groups.edges = addUsersToGroups.users.find(u => u.id === user.id).groups.edges;
        //     cache.writeQuery({
        //       query: GET_USER,
        //       variables: { id: user.id },
        //       data: { user: newUser },
        //     });
      
        //     alert('added users to groups')
        //   }
        // });
 
      }
    }
  );


  const addUsersToGroups = (values, cb = null) => {
    // const updateUser = ({name=null, contentBlocks=null}) => {
  
      addUsersToGroupsMutation({
        variables: {
          ...values
        },
        refetchQueries: values.userIds.map(id => ({ query: GET_USER, variables: { id } })),
        onCompleted: cb
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