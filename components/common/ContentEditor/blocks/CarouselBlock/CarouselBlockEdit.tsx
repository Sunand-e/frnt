import { Carousel } from '../../../Carousel';
import useBlockEditor from '../../useBlockEditor';
import { useBlockStore } from '../../useBlockStore';
const CarouselBlockEdit = ({block}) => {

  const { updateBlock } = useBlockStore()

  return (
    <Carousel />
  );
}

export default CarouselBlockEdit
