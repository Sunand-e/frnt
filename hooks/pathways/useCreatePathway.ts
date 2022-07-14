import { useMutation } from "@apollo/client"
import { CREATE_PATHWAY } from "../../graphql/mutations/pathway/CREATE_PATHWAY";
import { CreatePathway, CreatePathwayVariables } from "../../graphql/mutations/pathway/__generated__/CreatePathway";

function useCreatePathway() {
  
  const [createPathwayMutation, createPathwayResponse] = useMutation<CreatePathway, CreatePathwayVariables>(
    CREATE_PATHWAY,
    {
      // update(cache, { data: { createPathway } } ) {
        
      //   const data = cache.readQuery<GetPathways>({
      //     query: GET_PATHWAYS
      //   })
      //   cache.writeQuery({
      //     query: GET_PATHWAYS,
      //     data: { 
      //       pathways: [createPathway.pathway, ...data.pathways]
      //     }
      //   })
      // }
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