import { useCallback, useEffect, useState } from "react";
import useGetLesson from "../../hooks/lessons/useGetLesson";
import { useRouter } from "../../utils/router";

const ProgressDebug = () => {

  const router = useRouter()
  const { id, cid: contentId } = router.query
  const { lesson } = useGetLesson(contentId)
  
  return (
    <div className="w-full flex flex-col">
    </div>
  )
}

export default ProgressDebug