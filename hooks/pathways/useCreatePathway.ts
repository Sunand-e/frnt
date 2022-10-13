import { useMutation } from "@apollo/client"
import { CREATE_PATHWAY } from "../../graphql/mutations/pathway/CREATE_PATHWAY";
import { CreatePathway, CreatePathwayVariables } from "../../graphql/mutations/pathway/__generated__/CreatePathway";
import { GET_PATHWAYS } from "../../graphql/queries/allQueries";
import { GetPathways } from "../../graphql/queries/__generated__/GetPathways";

function useCreatePathway() {
  
  const [createPathwayMutation, createPathwayResponse] = useMutation<CreatePathway, CreatePathwayVariables>(
    CREATE_PATHWAY,
    {
      update(cache, { data: { createPathway } } ) {
        const cachedData = cache.readQuery<GetPathways>({
          query: GET_PATHWAYS
        })
        cache.writeQuery({
          query: GET_PATHWAYS,
          data: {
            ...cachedData,
            pathways: {
              ...cachedData.pathways,
              edges: [{node: createPathway.pathway}, ...cachedData.pathways.edges]
            }            
          }
        })
      },
    }
  );

  const createPathway = (values, cb=null) => {
    createPathwayMutation({ 
      variables: values,
      optimisticResponse: {
        createPathway: {
          __typename: 'CreatePathwayPayload',
          pathway: {
            __typename: 'ContentItem',
            id: Math.floor(Math.random() * 10000) + '',
            title: values.title,
            createdAt: '',
            updatedAt: '',
            _deleted: false,
            ...values
          },
          message: ''
        }
      },
      onCompleted: cb
      // refetchQueries: [{ query: GET_PATHWAY }]
    })
  }

  return {
    createPathway
  }
}

export default useCreatePathway