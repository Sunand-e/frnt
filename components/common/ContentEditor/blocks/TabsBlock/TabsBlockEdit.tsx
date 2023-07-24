import { Tabs } from '../../../Tabs';
import useBlockEditor from '../../useBlockEditor';
const TabsBlockEdit = ({block}) => {

  const { updateBlock } = useBlockEditor()

  return (
    <Tabs />
  );
}

export default TabsBlockEdit
