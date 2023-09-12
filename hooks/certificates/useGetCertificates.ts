import { useQuery } from "@apollo/client";
import { GET_CERTIFICATES } from "../../graphql/queries/certificates";

function useGetCertificates() {
  const { loading, error, data: {certificates} = {} } = useQuery(
    GET_CERTIFICATES,
  );
  return { certificates, loading, error }
}

export default useGetCertificates