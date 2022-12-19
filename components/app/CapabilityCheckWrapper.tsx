import { useRouter } from "next/router"
import { useEffect } from "react"
import useUserHasCapability from "../../hooks/users/useUserHasCapability"

const CapabilityCheckWrapper = ({capabilities, children}) => {

  const router = useRouter()
  const { userHasCapability, userCapabilityArray } = useUserHasCapability()
  const ready = !!userCapabilityArray.length

  useEffect(() => {
    if(ready && capabilities) {
      if(!userHasCapability(capabilities)) {
        router.push('/')
      }
    }
  },[capabilities, ready])
  
  return children
}

export default CapabilityCheckWrapper