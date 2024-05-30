import { useLazyQuery, useMutation } from "@apollo/client"
import { EnrolUsersInContent, EnrolUsersInContentVariables } from "../../graphql/mutations/contentItem/__generated__/EnrolUsersInContent";
import { ENROL_USERS_IN_CONTENT } from "../../graphql/mutations/contentItem/ENROL_USERS_IN_CONTENT";
import { toast } from "react-toastify";
import useIsOrganisationLeader from "../users/useIsOrganisationLeader";
import useGetGroup from "../groups/useGetGroup";
import { GET_GROUP } from "../../graphql/queries/groups";


function useEnrolUsersInContent() {

  
  const { isOrganisationLeader, organisation } = useIsOrganisationLeader()

  const [getGroup, { loading: loadingGroup, error: groupError, data }] = useLazyQuery(
    GET_GROUP,
    {
      variables: { id: organisation.id },
      fetchPolicy: "network-only" // ensures the query is not loaded from the cache
    }
  );
  
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
        onCompleted: (data) => {
          const { alreadyAssignedCount, licensesUsedCount } = data.enrolUsersInContent.details
          let details = []
          if(licensesUsedCount > 0) {
            details.push(`Enrolment licenses used: ${licensesUsedCount}`)
          }
          if(alreadyAssignedCount > 0) {
            // details.push(`${alreadyAssignedCount} assignments weren't made as the users are already assigned to the content`)
            details.push(`If a user is already assigned to the content, they won't be assigned again.`)
          }

          let SuccessMessage = () => <>
            <p>{data.enrolUsersInContent.status}</p>
            {details.length > 0 && <ul className="text-sm list-disc pl-5">
              {details.map((detail, index) => <li key={index}>{detail}</li>)}
            </ul>}
          </>
          
          toast.success(<SuccessMessage />, {
            toastId: 'enrolUsersInContentSuccess',
            hideProgressBar: true,
            autoClose: 3500
          })
          getGroup()
          cb()
        }
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