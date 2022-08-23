import { useController } from "react-hook-form";
import Button from "../Button";
import useResourceSelect from "./useResourceSelect";

const ResourcReselect = ({control}) => {

  const { field: typeField } = useController({
    control,
    name: 'type'
  });

  const { handleTypeSelect } = useResourceSelect(control)
  return (
    <Button onClick={() => handleTypeSelect(typeField.value)}>
      {typeField.value.chooseLabel}
    </Button>
  )
}

export default ResourcReselect