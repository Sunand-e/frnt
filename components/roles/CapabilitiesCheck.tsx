import { useQuery } from "@apollo/client";
import { GET_CAPABILITIES } from "../../graphql/queries/capabilities"
import CapabilityEntry from "./CapabilityEntry";

const CapabilitiesCheck = () => {

  const {data, loading, error} = useQuery(
    GET_CAPABILITIES
  )

  return (
    <>
      { data?.capabilities && (
        data.capabilities.map((cap,index) => (
          <CapabilityEntry key={index} cap={cap} />
        ))
      )}
    </>
  );
}

export default CapabilitiesCheck