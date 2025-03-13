import { UpdateUser, UpdateUserVariables } from "../../graphql/mutations/user/__generated__/UpdateUser";
import { UPDATE_USER } from "../../graphql/mutations/user/UPDATE_USER"
import { GET_USER } from "../../graphql/queries/userDetails"
import { useMutation, useQuery } from "@apollo/client"

function useUpdateUser(id = null) {

  const { data: { user } = {} } = useQuery(
    GET_USER,
    {
      variables: {
        id
      },
      skip: !id
    }
  );

  const [updateUserMutation, { loading, error }] = useMutation<UpdateUser, UpdateUserVariables>(
    UPDATE_USER
  );

  const updateUser = (values: any, cb = null) => {
    const variables = {
      ...values
    }

    updateUserMutation({
      variables: {
        id,
        ...variables
      },
      optimisticResponse: {
        updateUser: {
          __typename: 'UpdateUserPayload',
          user: {
            ...user,
            ...variables
          },
        }
      },
      onCompleted: cb
    })
  }

  return {
    user,
    loading,
    error,
    updateUser,
  }
}

export default useUpdateUser