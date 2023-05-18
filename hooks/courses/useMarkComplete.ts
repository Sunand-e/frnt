import { useCallback, useState } from "react"
import useUpdateUserContentStatus from "../users/useUpdateUserContentStatus"
import { useReactiveVar } from "@apollo/client"
import { markCompleteDisabledVar } from "../../graphql/cache"

const useMarkComplete = (id, courseId) => {
  
  const { updateUserContentStatus } = useUpdateUserContentStatus()

  const disabled = useReactiveVar(markCompleteDisabledVar)

  const markComplete = useCallback(() => {
    updateUserContentStatus({
      contentItemId: id,
      progress: 100,
      status: 'completed'
    }, courseId)
  }, [id, courseId])
  
  return {
    disabled,
    markComplete
  }
}

export default useMarkComplete