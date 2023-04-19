import { headerButtonsVar } from "../../../graphql/cache";
import { useCallback, useEffect } from "react";
import { useReactiveVar } from "@apollo/client";
import { useBlockStore } from "./useBlockStore";
import Button from "../Button";
import { toast } from "react-toastify";
import useUpdateLesson from "../../../hooks/lessons/useUpdateLesson";
import { useRouter } from "../../../utils/router";

export const useSaveContentButton = () => {

  const router = useRouter()
  const { cid: id } = router.query

  const blocks = useBlockStore(state => state.blocks)
  const content = { blocks }

  const isDirty = useBlockStore(state => state.isDirty)
  const setIsDirty = useBlockStore(state => state.setIsDirty)

  const { updateLesson } = useUpdateLesson()

  const saveChanges = useCallback(() => {
    updateLesson({id})({content}).then(res => {
      setIsDirty(false)
      toast('Changes saved.', {
        toastId: 'changesSaved',
        hideProgressBar: true,
        autoClose: 2500
      })
    })
  },[content, isDirty, updateLesson])
  
  useEffect(() => {
    headerButtonsVar(
      <>
        <Button disabled={!isDirty} onClick={saveChanges}>Save Changes</Button>
      </>
    )
  },[id, saveChanges, isDirty])
}