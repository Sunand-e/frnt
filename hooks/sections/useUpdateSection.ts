import { UpdateSection, UpdateSectionVariables } from "../../graphql/mutations/section/__generated__/UpdateSection";
import { UPDATE_SECTION } from "../../graphql/mutations/section/UPDATE_SECTION"
import { ContentFragment, GET_SECTION, SectionFragment } from "../../graphql/queries/allQueries"
import { useMutation, useQuery } from "@apollo/client"
import cache from "../../graphql/cache";

function  useUpdateSection(id = null) {


  const [updateSectionMutation, updateSectionResponse] = useMutation<UpdateSection, UpdateSectionVariables>(
    UPDATE_SECTION,
    {
      
    }
  );

  const updateSection = (values, cb = null) => {

    const sectionId = values.id || id
    
    const section = cache.readFragment({
      id: `ContentItem:${sectionId}`,
      fragment: SectionFragment,
      fragmentName: 'SectionFragment',
      optimistic: true,
    });

    let children
    
    if(values.childrenIds) {
      children = values.childrenIds.map(
        id => cache.readFragment({
          id: `ContentItem:${id}`,
          fragment: ContentFragment,
          fragmentName: 'ContentFragment',
          optimistic: true,
        })
      // ).filter(child => !!child)
      )
    }
    console.log('children')
    console.log(children)
    updateSectionMutation({
      variables: {
        id: sectionId,
        ...values
      },
      update(cache, response, request) {
        // console.log('section')
        // console.log(section)
        // console.log('response')
        // console.log(response)
        // console.log('request')
        // console.log(request)
      },
      optimisticResponse: {
        updateSection: {
          __typename: 'UpdateSectionPayload',
          section: {
            ...section,
            ...values,
            ...(children && { children })
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