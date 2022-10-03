import { UpdateSection, UpdateSectionVariables } from "../../graphql/mutations/section/__generated__/UpdateSection";
import { UPDATE_SECTION } from "../../graphql/mutations/section/UPDATE_SECTION"
import { GET_SECTION, SectionFragment } from "../../graphql/queries/allQueries"
import { useMutation, useQuery } from "@apollo/client"
import cache from "../../graphql/cache";

function  useUpdateSection(id = null) {


  const [updateSectionMutation, updateSectionResponse] = useMutation<UpdateSection, UpdateSectionVariables>(
    UPDATE_SECTION
  );

  const updateSection = (values, cb = null) => {

    const sectionId = values.id || id
    
    const section = cache.readFragment({
      id: `ContentItem:${sectionId}`,
      fragment: SectionFragment,
      fragmentName: 'SectionFragment',
      // optimistic: true,
    });
    
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
    updateSection
  }
}

export default useUpdateSection