import { useMutation } from "@apollo/client";
import { DELETE_GROUP } from "../../graphql/mutations/group/DELETE_GROUP";
import { DeleteGroup, DeleteGroupVariables } from "../../graphql/mutations/group/__generated__/DeleteGroup";

function useDeleteEvent() {

  const deleteEvent = (id) => {
    console.log('DELETE EVENT',id)
  }

      
  return {
    deleteEvent,
  }
}

export default useDeleteEvent