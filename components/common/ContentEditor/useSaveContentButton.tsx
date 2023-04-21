import { headerButtonsVar } from "../../../graphql/cache";
import { useEffect } from "react";
import Button from "../Button";
import { toast } from "react-toastify";

export const useSaveContentButton = ({buttonText, isDirty, onSave}) => {

  const saveChanges = async () => {
    await onSave()
    toast(`Changes saved.`, {
      toastId: 'changesSaved',
      hideProgressBar: true,
      autoClose: 2500
    })
  }

  useEffect(() => {
    headerButtonsVar(
      <>
        <Button disabled={!isDirty} onClick={saveChanges}>{buttonText}</Button>
      </>
    )
  },[saveChanges, isDirty])
}