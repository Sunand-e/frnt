
import { useQuery } from "@apollo/client"
import { useCallback, useMemo } from "react";
import useGetCurrentUser from "./useGetCurrentUser";


const getCapsFromRoleArr = (roles) => {
  return roles.reduce((array, role) => {
    return [...array, ...role.capabilities.map(cap=>cap.name)]
  },[])
}

function useUserHasCapability() {
  
  const { loading, error, user } = useGetCurrentUser()
  
  const userCapabilityArray = useMemo(() => {
    return user ? [
      ...getCapsFromRoleArr(user.roles),
      
      ...user.courses.edges.reduce((array, courseEdge) => {
        return [...array, ...getCapsFromRoleArr(courseEdge.roles)]
      }, []),

      ...user.groups.edges.reduce((array, groupEdge) => {
        return [...array, ...getCapsFromRoleArr(groupEdge.roles)]
      }, []),
    ] : []
  },[user])

  const userHasCapability = useCallback((capabilityValue) => {
    const capabilities = Array.isArray(capabilityValue) ? capabilityValue : [capabilityValue]
    if (
      user && (
        user.userType === 'SuperAdmin' ||
        capabilities.some(capability => userCapabilityArray.includes(capability))
      )
    ) {
      return true
    }
    return false

  },[user])

  return {
    userType: user?.userType,
    userHasCapability,
    userCapabilityArray
  }
}

export default useUserHasCapability