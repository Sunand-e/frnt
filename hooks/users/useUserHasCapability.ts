import { useCallback, useMemo } from "react";
import useGetCurrentUser from "./useGetCurrentUser";

const getCapsFromRoleArr = (roles) => {
  return roles.reduce((array, role) => {
    return [...array, ...role.capabilities.map(cap=>cap.name)]
  },[])
}

function useUserHasCapability() {
  
  const { loading, error, user, courses } = useGetCurrentUser()
  
  const tenantLevelCapabilityArray = useMemo(() => {
    return !!user?.roles ? [...getCapsFromRoleArr(user.roles)] : []
  },[user])

  const groupCapabilities = useMemo(() => {
    // return an object with group ids as keys and capabilities from role arrays as values
    return user?.groups?.edges.reduce((obj, groupEdge) => {
      return {
        ...obj,
        [groupEdge.groupId]: getCapsFromRoleArr(groupEdge.roles)
      }
    }, {}) || {}
  },[user])

  // ...(courses?.edges && [...courses.edges.reduce((array, courseEdge) => {
  //   return [...array, ...getCapsFromRoleArr(courseEdge.roles)]
  // }, [])]),

  const userHasCapability = useCallback((capabilityValue, context=null, contextId=null) => {
    if (Boolean(user)) {
      if(user.userType === 'SuperAdmin') {
        return true
      }

      const capabilities = Array.isArray(capabilityValue) ? capabilityValue : [capabilityValue]

      let capabilityArray = tenantLevelCapabilityArray

      // If the context is group, push the group capabilities to the existing capabilityArray, where group id is contextId
      // If the context is not tenant or group, add capabilities from all group roles to capabilityArray.
      // if the context is tenant just return the capabilityArray as is
      
      if(context === 'group' && groupCapabilities[contextId]) {
        capabilityArray = [...capabilityArray, ...groupCapabilities[contextId]]
      } else if(context !== 'tenant') {
        for(const key in groupCapabilities) {
          capabilityArray = [...capabilityArray, ...groupCapabilities[key]]
        }
      }

      if(capabilities.some(capability => capabilityArray.includes(capability))) {
        return true
      }
    }
    return false

  },[user, groupCapabilities, tenantLevelCapabilityArray])

  const determineCapabilityScope = useCallback(capability => {
    return {
      tenant: tenantLevelCapabilityArray.includes(capability),
      group: Object.keys(groupCapabilities).filter(groupId => groupCapabilities[groupId].includes(capability))
    }
  },[user, groupCapabilities, tenantLevelCapabilityArray])

  return {
    userType: user?.userType,
    userHasCapability,
    determineCapabilityScope,
    tenantLevelCapabilityArray
  }
}

export default useUserHasCapability