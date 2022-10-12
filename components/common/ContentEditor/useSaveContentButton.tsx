import { currentContentItemVar, headerButtonsVar } from "../../../graphql/cache";
import { useCallback, useEffect } from "react";
import { useReactiveVar } from "@apollo/client";
import { useBlockStore } from "./useBlockStore";
import Button from "../Button";
import { toast } from "react-toastify";

export const useSaveContentButton = () => {

  const currentContentItem = useReactiveVar(currentContentItemVar)
    
  const { id, updateFunction } = currentContentItem

  const blocks = useBlockStore(state => state.blocks)
  const isDirty = useBlockStore(state => state.isDirty)
  const setIsDirty = useBlockStore(state => state.setIsDirty)

  const saveChanges = useCallback(() => {
    updateFunction({content: { blocks }}).then(res => {
      setIsDirty(false)
      toast('Changes saved.', {
        toastId: 'changesSaved',
        hideProgressBar: true,
        autoClose: 2500
      })
    })
  },[blocks, isDirty, updateFunction])
  
  useEffect(() => {
    headerButtonsVar(
      <>
        <Button disabled={!isDirty} onClick={saveChanges}>Save Changes</Button>
      </>
    )
  },[id, saveChanges, isDirty])
}