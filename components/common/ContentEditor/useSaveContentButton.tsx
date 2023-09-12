import Button from "../Button";
import { toast } from "react-toastify";
import useHeaderButtons from "../../../hooks/useHeaderButtons";
import { useState } from "react";

export const useSaveContentButton = ({typeName, isDirty, onSave}) => {
  const [isSaving, setIsSaving] = useState(false)
  const saveChanges = async () => {
    setIsSaving(true)
    await onSave()
    setIsSaving(false)
    toast(`Changes saved.`, {
      toastId: 'changesSaved',
      hideProgressBar: true,
      autoClose: 2500
    })
  }

  const buttonText = isSaving ? `Saving ${typeName}...` : `Save ${typeName}`
  useHeaderButtons({
    id: 'saveContent',
    order: 0,
    component: <Button disabled={isSaving || !isDirty} onClick={saveChanges}>{buttonText}</Button>
  })
}