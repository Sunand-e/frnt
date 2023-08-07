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
        'data-[selected]:text-gray-900 text-gray-500 hover:text-gray-700',
        index === 0 ? 'rounded-l-lg' : '',
        'group/item-trigger relative min-w-0 flex-1 overflow-hidden bg-white text-center text-sm font-medium hover:bg-main/10 focus:z-10'
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
    <ArkTabs className={'bg-white rounded-lg shadow'} defaultValue="react">
      <TabList className="flex divide-x divide-gray-200 rounded-lg shadow" aria-label="Tabs">
        { block.children.map((child, index) => <TabItemTrigger item={child} index={index} /> )}
        <TabIndicator />
      </TabList>
      { block.children.map((child, index) => (
        <TabContent value={child.id}>
          <Block block={child} />
        </TabContent>
      ))}
    </ArkTabs>
  )
}

export default TabsBlock
