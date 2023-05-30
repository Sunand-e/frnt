import { useCallback, useState } from "react"
import useUpdateUserContentStatus from "../users/useUpdateUserContentStatus"
import { useReactiveVar } from "@apollo/client"
import { markCompleteDisabledVar } from "../../graphql/cache"

const useMarkComplete = (id) => {
  
  const { updateUserContentStatus } = useUpdateUserContentStatus()

  const disabled = useReactiveVar(markCompleteDisabledVar)

  const markComplete = useCallback(({progress = null}) => {
    updateUserContentStatus({
      contentItemId: id,
      status: 'completed',
      ...(progress && { progress } )
    })
  }, [id])
  
  return {
    disabled,
    markComplete
  }
}

export default useMarkComplete