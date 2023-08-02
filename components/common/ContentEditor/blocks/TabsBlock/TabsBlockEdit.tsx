import { TabIndicator, TabList, TabTrigger, Tabs as ArkTabs, type TabsProps, TabContent, Editable, EditableArea, EditableInput, EditablePreview } from '@ark-ui/react'
import { Tabs } from '../../../Tabs';
import BlockContainer from '../../BlockContainer';
import { createBlock, useBlockStore } from '../../useBlockStore';


const TabsBlockEdit = ({id}) => {

  const block = useBlockStore(state => state.computed.getBlock(id))
  const updateBlock = useBlockStore(state => state.updateBlock)

  const addNewItem = () => {
    const newBlock = {
      ...block,
      children: [
        ...block.children,
        createBlock({ type: 'textAndImage' }),
      ]
    }
    updateBlock(newBlock)
  }

  return (
    <ArkTabs className={''} defaultValue="react">
      <TabList>
        { block.children.map((child, index) => (
          <TabTrigger value={child.id}>
            <Editable value={child.heading || ''} placeholder={`Tab ${index+1}`} onChange={({value}) => false}>
              {/* <EditableLabel>What is {item}?</EditableLabel> */}
              <EditableArea>
                <EditableInput className="w-full"/>
                <EditablePreview className="w-full"/>
              </EditableArea>
            </Editable>
          {/* <EditableLabel>What is {item}?</EditableLabel> */}
          </TabTrigger>
        ))}
        <div onClick={addNewItem}>
          Add new
        </div>
        <TabIndicator />
      </TabList>
      { block.children.map((child, index) => (
        <TabContent value={child.id}>
          <BlockContainer
            key={child.id}
            isColumn={true}
            id={child.id}
          />
        </TabContent>
      ))}
    </ArkTabs>
  )
}

export default TabsBlockEdit
