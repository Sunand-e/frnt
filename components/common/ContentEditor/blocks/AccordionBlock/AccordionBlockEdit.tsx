import { Accordion as ArkAccordion, AccordionContent, AccordionItem, AccordionTrigger, Editable, EditableArea, EditableInput, EditablePreview } from '@ark-ui/react'
import ChevronDownIcon from '@heroicons/react/20/solid/ChevronDownIcon';
import {Trash} from '@styled-icons/heroicons-outline/Trash'
import { createBlock, getIndexAndParent, useBlockStore } from '../../useBlockStore';
import styles from '../../../Accordion.module.scss';
import { v4 as uuidv4 } from 'uuid';
import BlockContainer from '../../BlockContainer';
import useBlockEditor from '../../useBlockEditor';
import Button from '../../../Button';
import { useState } from 'react';
import classNames from '../../../../../utils/classNames';

const AccordionItemEdit = ({item, index}) => {

  const {debouncedUpdateBlock, deleteBlock} = useBlockEditor()
  const [headingText, setHeadingText] = useState(item.heading)

  const { parent } = getIndexAndParent(item.id)

  const onChangeHeading = (value) => {
    setHeadingText(value)
    debouncedUpdateBlock({
      ...item,
      heading: value
    })
  }

  return (
    <AccordionItem key={item.id} value={item.id} className={classNames(
      styles.item
    )}>
      {({ isOpen }) => {
        return (
          <div className={classNames(
            isOpen && 'border-l-main border-l-4'
          )}>
            <AccordionTrigger 
              asChild
              className={classNames(
                styles.trigger,
                // 'rounded-md',
                'group/item-trigger',
                'flex items-center justify-between w-full',
                'p-5 px-8 font-medium text-left text-gray-700',
                'dark:text-gray-400 hover:bg-main/10 dark:hover:bg-gray-800',
        )}
            >
              <button>
                <Editable 
                  onClick={(e) => e.stopPropagation()}
                  onKeyUp={(e) => e.preventDefault()}
                  value={headingText || ''}
                  placeholder={`Panel ${index+1}`}
                  onChange={({value}) => onChangeHeading(value)}
                  autoResize={true}
                  className={'text-xl'}
                  selectOnFocus={false}
                >
                  {/* <EditableLabel>What is {item}?</EditableLabel> */}
                  <EditableArea>
                    <EditableInput className="w-full"/>
                    <EditablePreview className="w-full"/>
                  </EditableArea>
                </Editable>
                <div className="flex space-x-2 items-center">
                  { parent.children.length > 1 && (
                    <Trash
                      className={`w-5 cursor-pointer !hidden group-hover/item-trigger:!block text-red-800`}
                      onClick={() => deleteBlock(item)}
                    />
                  )}
                  <AccordionIcon isOpen={isOpen} />
                </div>
              </button>
            </AccordionTrigger>
            <AccordionContent className='px-4'>
              <BlockContainer
                key={item.id}
                isColumn={true}
                id={item.id}
              />
            </AccordionContent>
          </div>
        )
      }}
    </AccordionItem>
  )
}


const AccordionBlockEdit = ({id}) => {

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
    <>
    <ArkAccordion 
    collapsible={true}
    defaultValue={block.children[0].id}
    className={`${styles.accordion} divide-y shadow-lg mb-4 flex flex-col w-full bg-white border border-gray-200`}>
      {block.children.map((child, index) => (
        <AccordionItemEdit key={child.id} item={child} index={index} />
      ))}
    </ArkAccordion>
    <div className='flex justify-center'>
      <Button size='lg' className='' onClick={addNewItem}>
        Add accordion panel
      </Button>
    </div>
    </>
  )
}

const AccordionIcon = (props: { isOpen: boolean }) => {
  const iconStyles = {
    transform: props.isOpen ? 'rotate(-180deg)' : undefined,
    transition: 'transform 0.2s',
    transformOrigin: 'center',
  }
  return <ChevronDownIcon className='w-8' style={iconStyles} />
}

export default AccordionBlockEdit