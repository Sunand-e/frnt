import { useMutation } from "@apollo/client"
// import { UnenrolUserFromContent, UnenrolUserFromContentVariables } from "../../graphql/mutations/contentItem/__generated__/UnenrolUserFromContent";
import { UNENROL_USER_FROM_CONTENT } from "../../graphql/mutations/contentItem/UNENROL_USER_FROM_CONTENT";

function useUnenrolUserFromContent() {
  
  const [unenrolUserFromContentMutation, unenrolUserFromContentResponse] = useMutation<UnenrolUserFromContent, UnenrolUserFromContentVariables>(
    UNENROL_USER_FROM_CONTENT
  );

  const unenrolUserFromContent = (values, cb = null) => {
  
      unenrolUserFromContentMutation({
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
      unenrolUserFromContent,
    }
}

export default useUnenrolUserFromContent