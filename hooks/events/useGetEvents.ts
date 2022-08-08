import { GET_LIBRARY_ITEMS } from "../../graphql/queries/allQueries"
import { useQuery } from "@apollo/client"
import { GetEvents } from "../../graphql/queries/__generated__/GetEvents";
import { GET_EVENTS } from "../../graphql/queries/events";

function useGetEvents() {

  const {loading, error, data: { events: events} = {} } = useQuery<GetEvents>(
    GET_EVENTS
  );

  return {
    events,
    loading,
    error
  }
}

export default useGetEvents