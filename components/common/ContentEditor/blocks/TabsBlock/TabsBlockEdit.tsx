import { TabIndicator, TabList, TabTrigger, Tabs as ArkTabs, type TabsProps, TabContent, Editable, EditableArea, EditableInput, EditablePreview } from '@ark-ui/react'
import { useState } from 'react';
import classNames from '../../../../../utils/classNames';
import {Trash} from '@styled-icons/heroicons-outline/Trash'
import BlockContainer from '../../BlockContainer';
import useBlockEditor from '../../useBlockEditor';
import { createBlock, deleteBlock, getIndexAndParent, useBlockStore } from '../../useBlockStore';
import Button from '../../../Button';

const TabItemTrigger = ({item, index, onDelete}) => {

  const {debouncedUpdateBlock} = useBlockEditor()
  const [headingText, setHeadingText] = useState(item.heading)
  const {parent} = getIndexAndParent(item.id)

  const onChangeHeading = (value) => {
    setHeadingText(value)
    debouncedUpdateBlock({
      ...item,
      heading: value
    })
  }

  return (
    <TabTrigger
      className={classNames(
        index === 0 ? '' : '',
        'font-font-medium text-xl',
        'data-[selected]:text-gray-900 text-gray-500 hover:text-gray-700 border-gray-200 border-x-white last:border-r-gray-200',
        'data-[selected]:bg-white border-t data-[selected]:border-b-0 border-l-0 bg-gray-200',
        'group/item-trigger relative min-w-0 flex-1 overflow-hidden text-center text-sm font-medium hover:bg-main/10 focus:z-10'
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
                onClick={() => onDelete(item, index)}
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
  const updateBlock = useBlockStore(state => state.updateBlock)
  const [value, setValue] = useState<string | null>(block.children[0]?.id)

  const addNewItem = () => {
    const newTab = createBlock({ 
      type: 'textAndImage',
      editorSettings: {
        defaultAlignment: 'center'
      }
    })
    setValue(newTab.id)
    const newBlock = {
      ...block,
      children: [
        ...block.children,
        newTab,
      ]
    }
    updateBlock(newBlock)
  }

  const handleDelete = (item) => {
    if(item.id === value) {
      let itemIndex = block.children.findIndex(c => c.id === item.id)
      const newIndex = itemIndex === 0 ? 1 : itemIndex-1
      setValue(block.children[newIndex].id)
    }
    deleteBlock(item)
  }

  return (
    <>
      <ArkTabs
        className={'bg-white shadow-lg border border-gray-200 border-t-0 mb-4'}
        value={value}
        onChange={(e) => setValue(e.value)}
        activationMode='manual'
      >
        <TabList className="flex divide-x" aria-label="Tabs">
          { block.children.map((child, index) => <TabItemTrigger onDelete={handleDelete} item={child} index={index} /> )}
          <TabIndicator />
        </TabList>
        { block.children.map((child, index) => (
          <TabContent
            value={child.id} 
            className='text-center dark:bg-gray-900 bg-white px-4'
          >
            <BlockContainer
              key={child.id}
              isColumn={true}
              id={child.id}
            />
          </TabContent>
        ))}
      </ArkTabs>
      <div className='flex justify-center'>
        <Button size='lg' className='' onClick={addNewItem}>
          Add new tab
        </Button>
      </div>

    </>
  )
}

export default TabsBlockEdit
