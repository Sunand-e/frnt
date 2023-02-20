import { useMutation } from "@apollo/client";
import { DELETE_SCORM_MODULE } from "../../graphql/mutations/scormModule/DELETE_SCORM_MODULE";
import { DeleteScormModule, DeleteScormModuleVariables } from "../../graphql/mutations/scormModule/__generated__/DeleteScormModule";

function useDeleteScormModule() {

  const [deleteScormModuleMutation, deleteScormModuleResponse] = useMutation<DeleteScormModule, DeleteScormModuleVariables>(
    DELETE_SCORM_MODULE
  )

  const deleteScormModule = async (id) => {
    const response = await deleteScormModuleMutation({
      variables: { 
        id
      },
      
      update(cache, { data: { deleteScormModule } }) {
        if(deleteScormModule.success) {
          cache.modify({
            id: cache.identify({...deleteScormModule.scormModule}),
            fields: {
              _deleted(cachedValue) {
                return true
              },
            }
          });
        }
      }
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