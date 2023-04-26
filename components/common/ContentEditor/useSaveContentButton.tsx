import Button from "../Button";
import { toast } from "react-toastify";
import useHeaderButtons from "../../../hooks/useHeaderButtons";

export const useSaveContentButton = ({buttonText, isDirty, onSave}) => {

  const saveChanges = async () => {
    await onSave()
    toast(`Changes saved.`, {
      toastId: 'changesSaved',
      hideProgressBar: true,
      autoClose: 2500
    })
  }

  useHeaderButtons({
    id: 'saveContent',
    component: <Button disabled={!isDirty} onClick={saveChanges}>{buttonText}</Button>
  })
  // },[saveChanges, isDirty])
}