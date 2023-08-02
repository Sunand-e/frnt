
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
import Button from '../../../Button'
import BlockContainer from '../../BlockContainer'
import { createBlock, useBlockStore } from '../../useBlockStore'

// import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'

const CarouselBlockEdit = ({id}) => {

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
    <ArkCarousel className={'relative max-w-full'}>
      <div className='grid gap-4 relative max-w-full'>
        <CarouselViewport className='relative max-w-full overflow-hidden'>
          <CarouselSlideGroup className='relative'>
            {block.children.map((child, index) => (
              <CarouselSlide key={index} index={index} className="">
                <BlockContainer
                  key={child.id}
                  isColumn={true}
                  id={child.id}
                />
              </CarouselSlide>
            ))}
          </CarouselSlideGroup>
          <CarouselControl>
            <CarouselPrevSlideTrigger asChild>
              <button type="button" className="flex absolute top-0 left-0 z-30 justify-center items-center px-4 h-full cursor-pointer group focus:outline-none" data-carousel-prev>
                <span className="inline-flex justify-center items-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-main/30 dark:bg-gray-800/30 group-hover:bg-main dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                  <svg className="w-5 h-5 text-white sm:w-6 sm:h-6 dark:text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>
                  <span className="hidden">Previous</span>
                </span>
              </button>
            </CarouselPrevSlideTrigger>
            <CarouselNextSlideTrigger asChild>
              <button type="button" className="flex absolute top-0 right-0 z-30 justify-center items-center px-4 h-full cursor-pointer group focus:outline-none" data-carousel-prev>
                <span className="inline-flex justify-center items-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-main/30 dark:bg-gray-800/30 group-hover:bg-main dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                  <svg className="w-5 h-5 text-white sm:w-6 sm:h-6 dark:text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
                  <span className="hidden">Previous</span>
                </span>
              </button>
            </CarouselNextSlideTrigger>
          </CarouselControl>
          <CarouselIndicatorGroup className='flex absolute bottom-5 left-1/2 z-30 space-x-3 -translate-x-1/2'>
            {block.children.map((child, index) => (
              <CarouselIndicator key={index} index={index}>
                <span>Goto {index + 1}</span>
              </CarouselIndicator>
            ))}
          </CarouselIndicatorGroup>
        </CarouselViewport>  
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