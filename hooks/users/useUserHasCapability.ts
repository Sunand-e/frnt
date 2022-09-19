
import { useQuery } from "@apollo/client"
import { useCallback, useMemo } from "react";
import { GET_USER_CAPABILITIES } from "../../graphql/queries/users";
import useGetUser from "./useGetUser";


const getCapsFromRoleArr = (roles) => {
  return roles.reduce((array, role) => {
    return [...array, ...role.capabilities.map(cap=>cap.name)]
  },[])
}

function useUserHasCapability() {
  
  const { loading, error, data } = useQuery(GET_USER_CAPABILITIES)
  
  const userCapabilityArray = useMemo(() => {
    return data ? [
      ...getCapsFromRoleArr(data.user.roles),
      
      ...data.user.courses.edges.reduce((array, courseEdge) => {
        return [...array, ...getCapsFromRoleArr(courseEdge.roles)]
      }, []),

      ...data.user.groups.edges.reduce((array, groupEdge) => {
        return [...array, ...getCapsFromRoleArr(groupEdge.roles)]
      }, []),
    ] : []
  },[data])

  const userHasCapability = useCallback((capabilityValue) => {
    const capabilities = Array.isArray(capabilityValue) ? capabilityValue : [capabilityValue]
    if (
      data && (
        data.user.userType === 'SuperAdmin' ||
        capabilities.some(capability => userCapabilityArray.includes(capability))
      )
    ) {
      return true
    }
    return false

  },[data])

  return {
    userHasCapability,
    userCapabilityArray
  }
}

export default useUserHasCapability