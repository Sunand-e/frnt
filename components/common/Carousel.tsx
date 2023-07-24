
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
import Button from './Button'
// import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'

export const Carousel = () => {
  const images = [
    'https://tinyurl.com/5b6ka8jd',
    'https://tinyurl.com/7rmccdn5',
    'https://tinyurl.com/59jxz9uu',
    'https://tinyurl.com/6jurv23t',
    'https://tinyurl.com/yp4rfum7',
  ]
  return (
    <ArkCarousel className={''}>
      <div className='grid gap-4'>
        <CarouselViewport>
          <CarouselSlideGroup>
            {images.map((image, index) => (
              <CarouselSlide key={index} index={index}>
                <img
                  src={image}
                  alt={`Slide Image ${index}`}
                  style={{ height: '300px', width: '100%', objectFit: 'cover' }}
                />
              </CarouselSlide>
            ))}
          </CarouselSlideGroup>
          <CarouselControl>
            <CarouselPrevSlideTrigger asChild>
              <Button> prev </Button>
            </CarouselPrevSlideTrigger>
            <CarouselNextSlideTrigger asChild>
              <Button> next </Button>
            </CarouselNextSlideTrigger>
          </CarouselControl>
          <CarouselIndicatorGroup>
            {images.map((_, index) => (
              <CarouselIndicator key={index} index={index}>
                <span>Goto {index + 1}</span>
              </CarouselIndicator>
            ))}
          </CarouselIndicatorGroup>
        </CarouselViewport>
      </div>
    </ArkCarousel>
  )
}
