import { useCallback, useContext } from "react";
import { TenantContext } from "../../context/TenantContext";

function useTenantFeaturesEnabled() {
  
  const tenant = useContext(TenantContext)

  const tenantFeauresEnabled = useCallback((featureArray) => {
    for(let feature of featureArray) {
      if(!tenant || !tenant?.[feature]?.enabled) {
        return false
      }
    }
    return true
  },[tenant])

  return {
    tenantFeauresEnabled
  }
}

export default useTenantFeaturesEnabled