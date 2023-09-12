import { useMutation } from "@apollo/client";
import { DELETE_SCORM_PACKAGE } from "../../graphql/mutations/scormPackage/DELETE_SCORM_PACKAGE";

function useDeleteScormPackage() {

  const [deleteScormPackageMutation, deleteScormPackageResponse] = useMutation(
    DELETE_SCORM_PACKAGE
  )

  const deleteScormPackage = async (id) => {
    const response = await deleteScormPackageMutation({
      variables: { 
        id
      },
      
      update(cache, { data: { deleteScormPackage } }) {
        if(deleteScormPackage.success) {
          cache.modify({
            id: cache.identify({...deleteScormPackage.scormPackage}),
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
    deleteScormPackage,
    deleteScormPackageResponse
  }
}

export default useDeleteScormPackage