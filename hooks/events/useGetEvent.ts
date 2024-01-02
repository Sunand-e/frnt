
import { useQuery } from "@apollo/client"
import { GET_EVENT } from "../../graphql/queries/events";

function useGetEvent(id) {

  const { loading, error, data: {event} = {} } = useQuery(
    GET_EVENT,
    {
      variables: { id },
      skip: !id
    }
  );

  return { event, loading, error }
}

export default useGetEvent