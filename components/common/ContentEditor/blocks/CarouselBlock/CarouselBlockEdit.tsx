import { Carousel } from '../../../Carousel';
import useBlockEditor from '../../useBlockEditor';
const CarouselBlockEdit = ({block}) => {

  const { updateBlock } = useBlockEditor()

  return (
    <Carousel />
  );
}

export default CarouselBlockEdit
