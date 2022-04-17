
import { GET_GROUPS } from "../../graphql/queries/groups"
// import { ContentFragment as ContentFragmentType } from '../graphql/queries/__generated__/ContentFragment';
import { useMutation } from "@apollo/client"
import { CreateGroup, CreateGroupVariables } from "../../graphql/mutations/group/__generated__/CreateGroup";
import { CREATE_GROUP } from "../../graphql/mutations/group/CREATE_GROUP";
import { GetGroups } from "../../graphql/queries/__generated__/GetGroups";


function useCreateEvent() {

  const createEvent = values => {
    console.log('CREATE EVENT',values)
  }

  return {
    createEvent
  }
}

export default useCreateEvent