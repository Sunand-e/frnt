import { currentContentItemVar, headerButtonsVar } from "../../graphql/cache";
import { useCallback, useEffect } from "react";
import { useReactiveVar } from "@apollo/client";
import { usePathwayStore } from "./usePathwayStore";
import Button from "../common/Button";
import { toast } from "react-toastify";
import { useRouter } from "../../utils/router";
import useGetPathway from "../../hooks/pathways/useGetPathway";
import useUpdatePathway from "../../hooks/pathways/useUpdatePathway";

export const useSavePathwayButton = () => {

  const router = useRouter()
  const { pid } = router.query
  const { pathway } = useGetPathway(pid)
  const { updatePathway } = useUpdatePathway(pid)

  const items = usePathwayStore(state => state.items)
  const isDirty = usePathwayStore(state => state.isDirty)
  const setIsDirty = usePathwayStore(state => state.setIsDirty)

  const saveChanges = useCallback(() => {
    updatePathway({childrenIds: items.map(item => item.id) })
    setIsDirty(false)
    toast('Changes saved.', {
      toastId: 'changesSaved',
      hideProgressBar: true,
      autoClose: 2500
    })
    
    // updatePathway({childrenIds: items.map(item => item.id) }).then(res => {
    //   setIsDirty(false)
    //   toast('Changes saved.', {
    //     toastId: 'changesSaved',
    //     hideProgressBar: true,
    //     autoClose: 2500
    //   })
    // })
  },[items, isDirty, updatePathway])
  
  useEffect(() => {
    headerButtonsVar(
      <>
        <Button disabled={!isDirty} onClick={saveChanges}>Save Changes</Button>
      </>
    )
  },[pid, saveChanges, isDirty])
}