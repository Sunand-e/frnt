
import { GET_GROUPS } from "../../graphql/queries/groups"
// import { ContentFragment as ContentFragmentType } from '../graphql/queries/__generated__/ContentFragment';
import { useMutation } from "@apollo/client"
import { CreateGroup, CreateGroupVariables } from "../../graphql/mutations/group/__generated__/CreateGroup";
import { CREATE_GROUP } from "../../graphql/mutations/group/CREATE_GROUP";
import { GetGroups } from "../../graphql/queries/__generated__/GetGroups";
import { CREATE_EVENT } from "../../graphql/mutations/event/CREATE_EVENT";
import { GET_EVENTS } from "../../graphql/queries/events";
import { CreateEvent, CreateEventVariables } from "../../graphql/mutations/event/__generated__/CreateEvent";
import { GetEvents } from "../../graphql/queries/__generated__/GetEvents";


function useCreateEvent() {


  const [createEventMutation, createEventResponse] = useMutation<CreateEvent, CreateEventVariables>(
    CREATE_EVENT,
    {
      // refetchQueries: [GET_EVENTS],
      update(cache, { data: { createEvent } } ) {
        const cachedData = cache.readQuery<GetEvents>({
          query: GET_EVENTS
        })
        cache.writeQuery({
          query: GET_EVENTS,
          data: {
            ...cachedData,
            events: {
              ...cachedData.events,
              edges: [{node: createEvent.event}, ...cachedData.events.edges]
            }            
          }
        })
      }
    }
  );

  const createEvent = (values, cb = null) => {
    createEventMutation({
      variables: { 
        ...values
      },
      optimisticResponse: {
        createEvent: {
          __typename: 'CreateEventPayload',
          event: {
            __typename: 'Event',
            id: `tmp-${Math.floor(Math.random() * 10000)}`,
            _deleted: false,
            createdAt: 0,
            updatedAt: 0,
            settings: {},
            ...values
          },
        }
      },
      // onCompleted: cb
      // refetchQueries: [{ query: GET_EVENT }]
    }).catch(res => {
      // : do something if there is an error!!
    })
  }

  return {
    createEvent
  }
}

export default useCreateEvent