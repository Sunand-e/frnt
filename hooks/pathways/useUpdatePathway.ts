import { UpdatePathway, UpdatePathwayVariables } from "../../graphql/mutations/pathway/__generated__/UpdatePathway";
import { UPDATE_PATHWAY } from "../../graphql/mutations/pathway/UPDATE_PATHWAY"
import { PathwayFragment, GET_PATHWAY } from "../../graphql/queries/allQueries"
import { PathwayFragment as PathwayFragmentType } from '../../graphql/queries/__generated__/PathwayFragment';
import { useMutation, useQuery } from "@apollo/client"
import cache from "../../graphql/cache"


function useUpdatePathway(id) {

  const [updatePathwayMutation, updatePathwayResponse] = useMutation<UpdatePathway, UpdatePathwayVariables>(
    UPDATE_PATHWAY
  );

  const updatePathway = (variables) => {

    const cachedPathway = cache.readFragment<PathwayFragmentType>({
      id:`ContentItem:${id}`,
      fragment: PathwayFragment,
      fragmentName: 'PathwayFragment',
    })
    
    updatePathwayMutation({
      variables: {
        id,
        ...variables
      },
      optimisticResponse: {
        updatePathway: {
          __typename: 'UpdatePathwayPayload',
          pathway: {
            ...cachedPathway,
            ...variables
          },
        }
      }
    }).catch(res => {
      // TODO: do something if there is an error!!
    })
  }
  
  const updatePathwayContentBlocks = (contentBlocks) => {
    updatePathway({
      content: {
        blocks: contentBlocks 
      }
    })
  }
  
  const { loading, error, data: {pathway} = {} } = useQuery(
    GET_PATHWAY,
    {
      variables: {
        id
      }
    }
  );

  return {
    pathway,
    loading,
    error,
    updatePathway,
    updatePathwayContentBlocks,
  }
}

export default useUpdatePathway