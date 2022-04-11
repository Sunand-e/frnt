import { useMutation } from "@apollo/client"
import { GetRoles } from "../../graphql/queries/__generated__/GetRoles";
import { CreateRole, CreateRoleVariables } from "../../graphql/mutations/role/__generated__/CreateRole";
import { useEffect, useState } from "react";
import { CREATE_ROLE } from "../../graphql/mutations/role/CREATE_ROLE";
import { GET_ROLES } from "../../graphql/queries/roles";


function useCreateRole() {

  const [createRoleMutation, createRoleResponse] = useMutation<CreateRole, CreateRoleVariables>(
    CREATE_ROLE,
    {
      refetchQueries: [GET_ROLES],
    }
  );

  const createRole = (values, cb = null) => {
    createRoleMutation({
      variables: { 
        ...values
      },
      optimisticResponse: {
        createRole: {
          __typename: 'CreateRolePayload',
          role: {
            __typename: 'Role',
            id: `tmp-${Math.floor(Math.random() * 10000)}`,
            capabilities: [],
            ...values
          },
          message: ''
        }
      },
      onCompleted: cb
      // refetchQueries: [{ query: GET_ROLE }]
    }).catch(res => {
      // TODO: do something if there is an error!!
    })
  }

  return {
    // role: createRoleResponse?.data?.createRole?.role,
    createRole
  }
}

export default useCreateRole