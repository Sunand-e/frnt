import { UpdateSection, UpdateSectionVariables } from "../../graphql/mutations/section/__generated__/UpdateSection";
import { UPDATE_SECTION } from "../../graphql/mutations/section/UPDATE_SECTION"
import { GET_SECTION } from "../../graphql/queries/allQueries"
import { useMutation, useQuery } from "@apollo/client"

function  useUpdateSection(id = null) {

  const { loading, error, data: {section} = {} } = useQuery(
    GET_SECTION,
    {
      variables: {
        id
      }
    }
  );

  const [updateSectionMutation, updateSectionResponse] = useMutation<UpdateSection, UpdateSectionVariables>(
    UPDATE_SECTION
  );

  const updateSection = (values, cb = null) => {
  // const updateSection = ({name=null, contentBlocks=null}) => {

    const variables = {
      ...values
    }

    updateSectionMutation({
      variables: {
        id,
        ...variables
      },
      optimisticResponse: {
        updateSection: {
          __typename: 'UpdateSectionPayload',
          section: {
            ...section,
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
    section,
    loading,
    error,
    updateSection
  }
}

export default useUpdateSection