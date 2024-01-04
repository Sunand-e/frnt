import { UpdateUser, UpdateUserVariables } from "../../graphql/mutations/user/__generated__/UpdateUser";
import { UPDATE_USER } from "../../graphql/mutations/user/UPDATE_USER"
import { GET_USER } from "../../graphql/queries/users"
import { useMutation, useQuery, useReactiveVar } from "@apollo/client"

function useUpdateUser(id = null) {

  const { loading, error, data: {user} = {} } = useQuery(
    GET_USER,
    {
      variables: {
        id
      },
      skip: !id
    }
  );

  const [updateUserMutation, updateUserResponse] = useMutation<UpdateUser, UpdateUserVariables>(
    UPDATE_USER
  );

  const updateUser = (values, cb = null) => {
  // const updateUser = ({name=null, contentBlocks=null}) => {

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
    }).catch(res => {
      // TODO: do something if there is an error!!
    })
  }

  return {
    user,
    loading,
    error,
    updateUser
  }
}

export default useUpdateUser