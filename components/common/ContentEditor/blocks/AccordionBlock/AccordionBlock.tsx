import { Accordion as ArkAccordion, AccordionContent, AccordionItem, AccordionTrigger, Editable, EditableArea, EditableInput, EditablePreview } from '@ark-ui/react'
import ChevronDownIcon from '@heroicons/react/20/solid/ChevronDownIcon';
import { createBlock, useBlockStore } from '../../useBlockStore';
import styles from '../../../Accordion.module.scss';
import { Block } from '../../Block';
import classNames from '../../../../../utils/classNames';

const AccordionItemView = ({item, index}) => {

  return (
    <AccordionItem key={item.id} value={item.id} className={styles.item}>
      {({ isOpen }) => {
        return (
          <div className={classNames(
            isOpen && 'border-l-main border-l-4'
          )}>
            <AccordionTrigger 
              asChild
              className={classNames(
                styles.trigger,
                'group/item-trigger',
                'flex items-center justify-between w-full',
                'p-5 px-8 font-medium text-left text-gray-700',
                'dark:text-gray-400 hover:bg-main/10 dark:hover:bg-gray-800',
              )}
            >
              <button>
                <span className="w-full text-xl">{item.heading || `Panel ${index+1}`}</span>
                <AccordionIcon isOpen={isOpen} />
              </button>
            </AccordionTrigger>
            <AccordionContent className='px-4'>
              <Block block={item} />
            </AccordionContent>
          </div>
        )
      }}
    </AccordionItem>
  )
}


const AccordionBlock = ({id}) => {

  const block = useBlockStore(state => state.computed.getBlock(id))

  return (
    <>
    <ArkAccordion 
    collapsible={true}
    className={classNames(
      styles.accordion,
      'divide-y shadow-lg flex flex-col w-full bg-white border border-gray-200'
    )}>
      {block.children.map((child, index) => (
        <AccordionItemView key={child.id} item={child} index={index} />
      ))}
    </ArkAccordion>
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

export default AccordionBlock