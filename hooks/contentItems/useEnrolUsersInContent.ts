import { useMutation } from "@apollo/client"
import { EnrolUsersInContent, EnrolUsersInContentVariables } from "../../graphql/mutations/contentItem/__generated__/EnrolUsersInContent";
import { ENROL_USERS_IN_CONTENT } from "../../graphql/mutations/contentItem/ENROL_USERS_IN_CONTENT";
import { toast } from "react-toastify";

function useEnrolUsersInContent() {

  const [enrolUsersInContentMutation, { error }] = useMutation<EnrolUsersInContent, EnrolUsersInContentVariables>(
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
        toast.error(res.message, {
          toastId: 'enrolUsersInContentError',
          hideProgressBar: true,
          autoClose: 2500
        })
      })
    }
  
    return {
      enrolUsersInContent,
      error
    }
}

export default useEnrolUsersInContent