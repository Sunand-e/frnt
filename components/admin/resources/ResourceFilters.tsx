import Filters from '../../common/Filters';
import { resourceTypes } from '../../resources/resourceTypes';

export default function ResourceFilters() {
  
  return (
    <Filters types={resourceTypes} />
  )
}
