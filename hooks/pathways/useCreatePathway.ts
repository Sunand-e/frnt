import { useMutation } from "@apollo/client"
import { CREATE_PATHWAY } from "../../graphql/mutations/pathway/CREATE_PATHWAY";
import { CreatePathway, CreatePathwayVariables } from "../../graphql/mutations/pathway/__generated__/CreatePathway";
import { GET_PATHWAYS } from "../../graphql/queries/allQueries";
import { contentItemDefaults } from "../contentItems/contentItemDefaults";
import useGetCurrentUser from "../users/useGetCurrentUser";
import { userContentEdgeDefaults } from "../users/userContentEdgeDefaults";

function useCreatePathway() {

  const { user } = useGetCurrentUser()

  const [createPathwayMutation, createPathwayResponse] = useMutation<CreatePathway, CreatePathwayVariables>(
    CREATE_PATHWAY,
    {
      update(cache, { data: { createPathway } }) {
        cache.updateQuery({ query: GET_PATHWAYS }, (data) => {

          const newEdge = {
            ...userContentEdgeDefaults,
            userId: user.id,
            node: {
              ...contentItemDefaults,
              ...createPathway.pathway,
              children: []
            }
          }

          const newData = {
            pathways: {
              ...data.pathways,
              totalCount: data.pathways.totalCount + 1,
              edges: [newEdge, ...data.pathways.edges]
            }
          }
          return newData
        }
        )
      }
    }
  );

  const createPathway = (values, cb = null) => {
    createPathwayMutation({
      variables: values,
      optimisticResponse: {
        createPathway: {
          __typename: 'CreatePathwayPayload',
          pathway: {
            // ...contentItemDefaults,
            ...userContentEdgeDefaults.node,
            itemType: 'pathway',
            children: [],
            id: Math.floor(Math.random() * 10000) + '',
            tags: {
              __typename: "ContentItemTagConnection",
              edges: []
            },
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