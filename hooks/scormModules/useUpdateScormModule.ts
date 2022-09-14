import { UpdateScormModule, UpdateScormModuleVariables } from "../../graphql/mutations/scormModule/__generated__/UpdateScormModule";
import { UPDATE_SCORM_MODULE } from "../../graphql/mutations/scormModule/UPDATE_SCORM_MODULE"
import { GET_SCORM_MODULE } from "../../graphql/queries/scormModules"
import { useMutation, useQuery, useReactiveVar } from "@apollo/client"

function useUpdateScormModule(id = null) {

    const { loading, error, data: {scormModule} = {} } = useQuery(
        GET_SCORM_MODULE,
        {
            variables: {
                id
            }
        }
    );

    const [updateScormModuleMutation, updateScormModuleResponse] = useMutation<UpdateScormModule, UpdateScormModuleVariables>(
        UPDATE_SCORM_MODULE
    );

    const updateScormModule = (values, cb = null) => {
        // const updateScormModule = ({name=null, contentBlocks=null}) => {
        const variables = {
            ...values
        }

        updateScormModuleMutation({
            variables: {
                id,
                ...variables
            },
            optimisticResponse: {
                updateScormModule: {
                    __typename: 'UpdateScormModulePayload',
                    scormModule: {
                        ...scormModule,
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
        scormModule,
        loading,
        error,
        updateScormModule
    }
}

export default useUpdateScormModule
