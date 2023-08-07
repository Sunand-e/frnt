import { TabIndicator, TabList, TabTrigger, Tabs as ArkTabs, type TabsProps, TabContent, Editable, EditableArea, EditableInput, EditablePreview } from '@ark-ui/react'
import { useState } from 'react';
import classNames from '../../../../../utils/classNames';
import { Tabs } from '../../../Tabs';
import {Trash} from '@styled-icons/heroicons-outline/Trash'
import BlockContainer from '../../BlockContainer';
import useBlockEditor from '../../useBlockEditor';
import { createBlock, getIndexAndParent, useBlockStore } from '../../useBlockStore';

const TabItemTrigger = ({item, index}) => {
  
  const {debouncedUpdateBlock, deleteBlock} = useBlockEditor()
  const [headingText, setHeadingText] = useState(item.heading)
  const {parent} = getIndexAndParent(item.id)

  const onChangeHeading = (value) => {
    setHeadingText(value)
    debouncedUpdateBlock({
      ...item,
      heading: value
    })
  }

  const handleDelete = (e) => {
    e.preventDefault()
    deleteBlock(item)
  }

  return (
    <TabTrigger
      className={classNames(
        'data-[selected]:text-gray-900 text-gray-500 hover:text-gray-700',
        index === 0 ? 'rounded-l-lg' : '',
        'group/item-trigger relative min-w-0 flex-1 overflow-hidden bg-white text-center text-sm font-medium hover:bg-main/10 focus:z-10'
      )}
      value={item.id}
    >
      <Editable 
        value={headingText || ''}
        placeholder={`Tab ${index+1}`}
        autoResize={true}
        selectOnFocus={false}
        onChange={({value}) => onChangeHeading(value)}
      >
        {/* <EditableLabel>What is {item}?</EditableLabel> */}
        <EditableArea>
          <EditableInput className="w-full p-4"/>
          <EditablePreview className="w-full p-4"/>
        </EditableArea>
        { parent.children.length > 1 && (
          <div className={`absolute flex items-center h-full top-0 right-0 mr-2 p-2 hidden group-hover/item-trigger:flex`}>
            <Trash
              className={`w-5 cursor-pointer text-red-800`}
              onClick={handleDelete}
            />
          </div>
        )}
      </Editable>
    {/* <EditableLabel>What is {item}?</EditableLabel> */}
    </TabTrigger>
  )
}

const TabsBlockEdit = ({id}) => {

  const block = useBlockStore(state => state.computed.getBlock(id))

  return (
    <ArkTabs className={'bg-white rounded-lg shadow'} defaultValue="react" activationMode='manual'>
      <TabList className="flex divide-x divide-gray-200 rounded-lg shadow" aria-label="Tabs">
        { block.children.map((child, index) => <TabItemTrigger item={child} index={index} /> )}
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
