import { useMutation } from "@apollo/client"
import { EnrolUsersInContent, EnrolUsersInContentVariables } from "../../graphql/mutations/contentItem/__generated__/EnrolUsersInContent";
import { ENROL_USERS_IN_CONTENT } from "../../graphql/mutations/contentItem/ENROL_USERS_IN_CONTENT";

function useEnrolUsersInContent() {

  const [enrolUsersInContentMutation, enrolUsersInContentResponse] = useMutation<EnrolUsersInContent, EnrolUsersInContentVariables>(
    ENROL_USERS_IN_CONTENT
  );


  const enrolUsersInContent = (values, cb = null) => {
    // const updateUser = ({name=null, contentBlocks=null}) => {
  
      enrolUsersInContentMutation({
        variables: {
          ...values
        },
        refetchQueries: ['GetUser'],
        onCompleted: cb
      }).catch(res => {
        // TODO: do something if there is an error!!
      })
    }
  
    return {
      enrolUsersInContent,
    }
}

export default useEnrolUsersInContent