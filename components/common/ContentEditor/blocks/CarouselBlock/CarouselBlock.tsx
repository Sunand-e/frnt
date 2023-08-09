
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
import BlockContainer from '../../BlockContainer'
import { useBlockStore } from '../../useBlockStore'
import classNames from '../../../../../utils/classNames'

const CarouselItem = ({item, index}) => {

  return (
    <CarouselSlide key={index} index={index} className="px-16 relative group/item-trigger">
      <BlockContainer
        key={item.id}
        isColumn={true}
        id={item.id}
      />
    </CarouselSlide>
  )
}

const CarouselBlock = ({id}) => {

  const block = useBlockStore(state => state.computed.getBlock(id))

  return (
    <ArkCarousel
      className={'relative max-w-full'}
      defaultValue={0}
    >
      <div className='grid gap-4 relative max-w-full'>
        <CarouselViewport className='relative max-w-full overflow-hidden'>
          <CarouselSlideGroup className='relative'>
            { block.children.map((child, index) => <CarouselItem item={child} index={index} key={child.id} /> )}
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
          {/* <CarouselIndicatorGroup className='flex absolute -bottom-5 left-1/2 z-30 space-x-3 -translate-x-1/2'> */}
          <CarouselIndicatorGroup className='flex justify-center z-30 space-x-3'>
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
        </CarouselViewport>
      </div>
    </ArkCarousel>
  )
}

export default CarouselBlock