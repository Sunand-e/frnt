import { TabIndicator, TabList, TabTrigger, Tabs as ArkTabs, type TabsProps, TabContent, Editable, EditableArea, EditableInput, EditablePreview } from '@ark-ui/react'
import { useState } from 'react';
import classNames from '../../../../../utils/classNames';
import { Tabs } from '../../../Tabs';
import {Trash} from '@styled-icons/heroicons-outline/Trash'
import BlockContainer from '../../BlockContainer';
import useBlockEditor from '../../useBlockEditor';
import { createBlock, useBlockStore } from '../../useBlockStore';
import { Block } from '../../Block';

const TabItemTrigger = ({item, index}) => {

  return (
    <TabTrigger
      key={index}
      value={item.id}
      className={classNames(
        'font-font-medium text-xl',
        'data-[selected]:text-gray-900 text-gray-500 hover:text-gray-700 border-gray-200 border-x-white last:border-r-gray-200',
        'data-[selected]:bg-white border-t data-[selected]:border-b-0 border-l-0 bg-gray-200',
        'group/item-trigger relative min-w-0 flex-1 overflow-hidden text-center text-sm font-medium hover:bg-main/10 focus:z-10'
      )}
    >
      <div className="p-4 w-full">{item.heading || `Tab ${index+1}`}</div>
    {/* <EditableLabel>What is {item}?</EditableLabel> */}
    </TabTrigger>
  )
}

const TabsBlock = ({id}) => {

  const block = useBlockStore(state => state.computed.getBlock(id))

  return (
    <ArkTabs
      className={'bg-white shadow-lg border border-gray-200 border-t-0'}
      defaultValue={block.children?.[0]?.id}
    >
      <TabList className="flex divide-x" aria-label="Tabs">
        { block.children.map((child, index) => <TabItemTrigger item={child} index={index} /> )}
        {/* <TabIndicator /> */}
      </TabList>
      { block.children.map((child, index) => (
        <TabContent
          value={child.id} 
          className='text-center dark:bg-gray-900 bg-white px-4'
        >
          <Block block={child} />
        </TabContent>
      ))}
    </ArkTabs>
  )
}

export default TabsBlock
