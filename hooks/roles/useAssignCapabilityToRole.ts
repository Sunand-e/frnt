import { useMutation } from "@apollo/client"
import { AssignCapabilityToRole, AssignCapabilityToRoleVariables } from "../../graphql/mutations/role/__generated__/AssignCapabilityToRole";
import { ASSIGN_CAPABILITY_TO_ROLE } from "../../graphql/mutations/role/ASSIGN_CAPABILITY_TO_ROLE";


function useAssignCapabilityToRole() {

  const [assignCapabilityToRoleMutation, assignCapabilityToRoleResponse] = useMutation<AssignCapabilityToRole, AssignCapabilityToRoleVariables>(
    ASSIGN_CAPABILITY_TO_ROLE
  );

  const assignCapabilityToRole = (values, cb = null) => {
    assignCapabilityToRoleMutation({
      variables: { 
        ...values
      },
      onCompleted: cb
      // refetchQueries: [{ query: GET_ROLE }]
    }).catch(res => {
      // TODO: do something if there is an error!!
    })
  }

  return {
    assignCapabilityToRole,
    message: assignCapabilityToRoleResponse?.data?.assignCapabilityToRole.message
  }
}

export default useAssignCapabilityToRole