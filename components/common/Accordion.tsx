import { Accordion as ArkAccordion, AccordionContent, AccordionItem, AccordionTrigger, Editable, EditableArea, EditableInput, EditablePreview } from '@ark-ui/react'
import ChevronDownIcon from '@heroicons/react/20/solid/ChevronDownIcon';
import { useState } from 'react';
import Editor from './inputs/Editor';
import styles from './Accordion.module.scss'

export const Accordion = () => {
  const items = ['React', 'Solid', 'Vue']
const [val, setVal] = useState('bbb')
  return (
    <ArkAccordion defaultValue="React" className={`${styles.accordion} divide-y border-green-300 flex flex-col w-full`}>
      {items.map((item, id) => (
        <AccordionItem key={id} value={item} className={styles.item}>
          {({ isOpen }) => (
            <>
              <AccordionTrigger 
                asChild
                className={`${styles.trigger} flex items-center rounded-lg cursor-pointer justify-between
                pb-2 w-full
                data-[state=closed]:pb-4
                `}
              >
                
                <button>
                <Editable value={val} onChange={({value}) => setVal(value)}>
                  {/* <EditableLabel>What is {item}?</EditableLabel> */}
                  <EditableArea>
                    <EditableInput />
                    <EditablePreview />
                  </EditableArea>
                </Editable>
                  <AccordionIcon isOpen={isOpen} />
                </button>
              </AccordionTrigger>
              <AccordionContent>
              <Editor
                onUpdate={null}
                content="Editable text using TipTap here"
              />
              </AccordionContent>
            </>
          )}
        </AccordionItem>
      ))}
    </ArkAccordion>
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
