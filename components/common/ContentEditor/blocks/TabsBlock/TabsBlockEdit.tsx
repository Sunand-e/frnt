import { Tabs } from '../../../Tabs';
import useBlockEditor from '../../useBlockEditor';
import { useBlockStore } from '../../useBlockStore';
const TabsBlockEdit = ({block}) => {

  const { updateBlock } = useBlockStore()

  return (
    <Tabs />
  );
}

export default TabsBlockEdit
