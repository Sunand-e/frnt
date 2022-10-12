import { FunctionComponent, useContext } from 'react'
import { ModalContext } from '../../../../../context/modalContext';
import useBlockEditor from '../../useBlockEditor';
// @styled-icons/bootstrap/FilePdf
// @styled-icons/simple-icons/Microsoftexcel
// @styled-icons/boxicons-solid/FileDoc

const AccordionBlockEdit = ({block}) => {

  const { updateBlock } = useBlockEditor()

  return (
    <>
    Accordion Editor
      { JSON.stringify(block,null,2) }
    </>
  )
}

export default AccordionBlockEdit
