import { UpdateScormPackage, UpdateScormPackageVariables } from "../../graphql/mutations/scormPackage/__generated__/UpdateScormPackage";
import { UPDATE_SCORM_PACKAGE } from "../../graphql/mutations/scormPackage/UPDATE_SCORM_PACKAGE"
import { GET_SCORM_PACKAGE } from "../../graphql/queries/scormPackages"
import { useMutation, useQuery, useReactiveVar } from "@apollo/client"

function useUpdateScormPackage(id = null) {

    const { loading, error, data: {scormPackage} = {} } = useQuery(
        GET_SCORM_PACKAGE,
        {
            variables: {
                id
            }
        }
    );

    const [updateScormPackageMutation, updateScormPackageResponse] = useMutation<UpdateScormPackage, UpdateScormPackageVariables>(
        UPDATE_SCORM_PACKAGE
    );

    const updateScormPackage = (values, cb = null) => {
        // const updateScormPackage = ({name=null, contentBlocks=null}) => {
        const variables = {
            ...values
        }

        updateScormPackageMutation({
            variables: {
                id,
                ...variables
            },
            optimisticResponse: {
                updateScormPackage: {
                    __typename: 'UpdateScormPackagePayload',
                    scormPackage: {
                        ...scormPackage,
                        ...variables
                    },
                }
            },
            onCompleted: cb
        }).catch(res => {
            // : do something if there is an error!!
        })
    }

    return {
        scormPackage,
        loading,
        error,
        updateScormPackage
    }
}

export default useUpdateScormPackage
