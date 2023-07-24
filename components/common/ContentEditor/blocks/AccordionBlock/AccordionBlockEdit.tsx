import { Accordion } from '../../../Accordion';
import useBlockEditor from '../../useBlockEditor';
const AccordionBlockEdit = ({block}) => {

  const { updateBlock } = useBlockEditor()

  return (
    <Accordion />
  );
}

export default AccordionBlockEdit
