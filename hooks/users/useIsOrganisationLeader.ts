import useGetCurrentUser from "./useGetCurrentUser";
import useTenantFeaturesEnabled from "./useTenantFeaturesEnabled";
import useUserHasCapability from "./useUserHasCapability";

function useIsOrganisationLeader() {

  const { user } = useGetCurrentUser()
  const { tenantFeaturesEnabled } =  useTenantFeaturesEnabled()
  const { isSuperAdmin, userHasCapability } = useUserHasCapability()
  const organisationWithEnrolUsersInContentCapability = (
    user?.groups?.edges.find(edge => {
      return (
        edge.node.isOrganisation && 
        userHasCapability('EnrolUsersInContent', 'group', edge.groupId)
      )
    })?.node
  )

  const isOrganisationLeader = Boolean(
    !isSuperAdmin &&
    tenantFeaturesEnabled(['organisations']) &&
    !userHasCapability('EnrolUsersInContent', 'tenant') &&
    organisationWithEnrolUsersInContentCapability
  )
  
  return {
    isOrganisationLeader,
    organisation: organisationWithEnrolUsersInContentCapability
  }
}

export default useIsOrganisationLeader