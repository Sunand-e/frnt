
import {
  Carousel as ArkCarousel,
  CarouselControl,
  CarouselIndicator,
  CarouselIndicatorGroup,
  CarouselNextSlideTrigger,
  CarouselPrevSlideTrigger,
  CarouselSlide,
  CarouselSlideGroup,
  CarouselViewport,
} from '@ark-ui/react'
import { useState } from 'react'
import Button from '../../../Button'
import BlockContainer from '../../BlockContainer'
import { createBlock, deleteBlock, getIndexAndParent, handleDeleteBlock, useBlockStore } from '../../useBlockStore'
import {Trash} from '@styled-icons/heroicons-outline/Trash'
import Tippy from '@tippyjs/react'
import classNames from '../../../../../utils/classNames'

// import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'

const CarouselTrashButton = ({onDelete}) => {
  
  const tippyProps = {
    interactive: true,
    className: `text-white px-4 py-2 z-50`,
    theme: 'memberhub-block-menu light',
    arrow: true,
  }
  return (
    <Tippy
      { ...tippyProps }
      content={(
        <p className={`whitespace-nowrap`}>Remove item</p>
      )}
    >
      <Trash
        className={`w-5 cursor-pointer text-red-800`}
        onClick={onDelete}
      />
    </Tippy>
  )
}

const CarouselItemEdit = ({item, index, onDelete}) => {

  const {parent} = getIndexAndParent(item.id)
  const blockRefs = useBlockStore(state => state.blockRefs)
  
  return (
    <CarouselSlide
      key={index}
      index={index}
      className="px-20 relative group/item-trigger flex flex-col justify-center"
      ref={el => {
        if(el) {
          blockRefs.set(item.id, el)
        } else {
          blockRefs.delete(item.id)
        }
      }}
    >
      <div className='bg-white shadow-lg border border-gray-200 relative mb-4 px-4'>
      <BlockContainer
        key={item.id}
        isColumn={true}
        id={item.id}
      />
      { parent.children.length > 1 && (
        <div className={`absolute flex items-center top-0 right-0 m-3 p-2  group-hover/item-trigger:flex`}>
          <CarouselTrashButton item={item} onDelete={() => onDelete(item)} />
        </div>
      )}
      </div>
    </CarouselSlide>
  )
}


const CarouselBlockEdit = ({id}) => {

  const block = useBlockStore(state => state.computed.getBlock(id))
  const updateBlock = useBlockStore(state => state.updateBlock)
  // const [value, setValue] = useState<string | null>(block.children[0]?.id)

  const [currentIndex, setCurrentIndex] = useState(0)

  const handleSlideChange = (details) => {
    setCurrentIndex(details.index)
  }

  const addNewItem = () => {
    const newTab = createBlock({ type: 'textAndImage' })
    setCurrentIndex(block.children.length)
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
    
    const goToPreviousExistingItem = () => {
      if(item.id === block.children[currentIndex].id) {
        let itemIndex = block.children.findIndex(c => c.id === item.id)
        // const newIndex = itemIndex === 0 ? 1 : itemIndex-1
        const newIndex = itemIndex === block.children.length - 1 ? itemIndex-1 : itemIndex
        setCurrentIndex(newIndex)
      }
    }
    handleDeleteBlock(item, 'Carousel item', goToPreviousExistingItem)
  }

  return (
    <ArkCarousel
      className={'relative max-w-full'}
      index={currentIndex}
      onSlideChange={handleSlideChange}
    >
      <div className='grid gap-4 relative max-w-full'>
        <CarouselViewport className='relative max-w-full overflow-x-hidden'>
          <CarouselSlideGroup className='relative'>
            { block.children.map((child, index) => <CarouselItemEdit onDelete={handleDelete} item={child} key={index} index={index} /> )}
          </CarouselSlideGroup>
          <CarouselControl>
            <CarouselPrevSlideTrigger asChild>
              <button type="button" className="flex absolute -top-2 left-0 justify-center items-center px-4 h-full cursor-pointer group focus:outline-none" data-carousel-prev>
                <span className="inline-flex justify-center items-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-main/30 dark:bg-gray-800/30 group-hover:bg-main dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                  <svg className="w-5 h-5 text-white sm:w-6 sm:h-6 dark:text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>
                  <span className="hidden">Previous</span>
                </span>
              </button>
            </CarouselPrevSlideTrigger>
            <CarouselNextSlideTrigger asChild>
              <button type="button" className="flex absolute -top-2 right-0 justify-center items-center px-4 h-full cursor-pointer group focus:outline-none" data-carousel-prev>
                <span className="inline-flex justify-center items-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-main/30 dark:bg-gray-800/30 group-hover:bg-main dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                  <svg className="w-5 h-5 text-white sm:w-6 sm:h-6 dark:text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
                  <span className="hidden">Previous</span>
                </span>
              </button>
            </CarouselNextSlideTrigger>
          </CarouselControl>

        </CarouselViewport>  
                  {/* <CarouselIndicatorGroup className='flex absolute -bottom-5 left-1/2 z-30 space-x-3 -translate-x-1/2'> */}
                  <CarouselIndicatorGroup className='flex justify-center z-30 mb-4 space-x-3'>
            {block.children.map((child, index) => (
              <CarouselIndicator 
                aria-label={`Goto ${index + 1}`}
                className={classNames(
                  'bg-main/50 w-3 h-3 rounded-full border-2 box-content border-white',
                  'hover:border-main',
                  'data-[current]:border-main data-[current]:bg-main'
                )}
                key={index}
                index={index}
              />              
            ))}
          </CarouselIndicatorGroup>
        <div className='flex justify-center'>
          <Button size='lg' className='' onClick={addNewItem}>
            Add carousel item
          </Button>
        </div>
      </div>
    </ArkCarousel>
  )
}

export default CarouselBlockEdit