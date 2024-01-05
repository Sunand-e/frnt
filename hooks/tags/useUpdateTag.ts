import { UpdateTag, UpdateTagVariables } from "../../graphql/mutations/tag/__generated__/UpdateTag";
import { UPDATE_TAG } from "../../graphql/mutations/tag/UPDATE_TAG"
import { GET_TAG } from "../../graphql/queries/tags"
import { useMutation, useQuery, useReactiveVar } from "@apollo/client"

function useUpdateTag(id = null) {

    const { loading, error, data: {tag} = {} } = useQuery(
    GET_TAG,
    {
      variables: {
        id
      },
      skip: !id
    }
  );

  const [updateTagMutation, updateTagResponse] = useMutation<UpdateTag, UpdateTagVariables>(
    UPDATE_TAG
  );

  const updateTag = (values) => {
  // const updateTag = ({name=null, contentBlocks=null}) => {
    console.log('values')
    console.log(values)
    const variables = {
      ...values
    }

    updateTagMutation({
      variables: {
        id,
        ...variables
      },
      optimisticResponse: {
        updateTag: {
          __typename: 'UpdateTagPayload',
          tag: {
            ...tag,
            ...variables
          },
        }
      }
    }).catch(res => {
      // TODO: do something if there is an error!!
    })
  }

  return {
    tag,
    loading,
    error,
    updateTag
  }
}

export default useUpdateTag