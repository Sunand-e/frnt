import { useCallback, useContext } from "react";
import { TenantContext } from "../../context/TenantContext";

function useTenantFeaturesEnabled() {
  
  const tenant = useContext(TenantContext)
  
  const tenantFeaturesEnabled = useCallback((features: string | string[]) => {
    if (!tenant) {
      return false;
    }
    
    if (!Array.isArray(features)) {
      features = [features];
    }

    for(let featurePath of features) {
      const featureKeys = featurePath.split('.');
      const featureEnabled = featureKeys.reduce((obj, key) => obj && obj[key], tenant).enabled;
      if(!featureEnabled) {
        return false;
      }
    }
    return true;
  },[tenant]);

  return {
    tenantFeaturesEnabled
  }
}

export default useTenantFeaturesEnabled