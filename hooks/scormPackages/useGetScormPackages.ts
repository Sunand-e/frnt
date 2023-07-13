import { GET_SCORM_PACKAGES } from "../../graphql/queries/scormPackages"
import { useQuery } from "@apollo/client"
import { GetScormPackagesQuery } from "../../graphql/generated";

function useGetScormPackages() {

    const { loading, error, data: { scormPackages: scormPackages } = {} } = useQuery<GetScormPackagesQuery>(GET_SCORM_PACKAGES);

    return {
        scormPackages,
        loading,
        error
    }
}

export default useGetScormPackages
