import { GET_SCORM_MODULES } from "../../graphql/queries/scormModules"
import { useQuery } from "@apollo/client"
import { GetScormModules } from "../../graphql/queries/__generated__/GetScormModules";

function useGetScormModules() {

    const { loading, error, data: { scormModules: scormModules } = {} } = useQuery<GetScormModules>(GET_SCORM_MODULES);

    return {
        scormModules,
        loading,
        error
    }
}

export default useGetScormModules
