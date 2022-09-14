import { useMutation } from "@apollo/client";
import { DELETE_SCORM_MODULE } from "../../graphql/mutations/scormModule/DELETE_SCORM_MODULE";
import { DeleteScormModule, DeleteScormModuleVariables } from "../../graphql/mutations/scormModule/__generated__/DeleteScormModule";
import { GET_SCORM_MODULES } from "../../graphql/queries/scormModules";

function useDeleteScormModule() {

  const [deleteScormModuleMutation, deleteScormModuleResponse] = useMutation<DeleteScormModule, DeleteScormModuleVariables>(
    DELETE_SCORM_MODULE,
    {
      refetchQueries: [GET_SCORM_MODULES]
    }
  )

  const deleteScormModule = async (id) => {
    const response = await deleteScormModuleMutation({
      variables: { 
        id
      },
      optimisticResponse: {
        deleteScormModule: {
          __typename: 'DeleteScormModulePayload',
          scormModule: {
            __typename: 'ScormModule',
            id,
            _deleted: true,
          },
          message: ''
        },
      },

    })
    if (!response.data) {
      throw new Error(`HTTP error: ${response.errors}`);
    }
    return response.data;
  }

      
  return {
    deleteScormModule,
    deleteScormModuleResponse
  }
}

export default useDeleteScormModule
