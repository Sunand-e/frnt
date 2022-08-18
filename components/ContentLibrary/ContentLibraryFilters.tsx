
import Filters from '../common/Filters';
import { resourceTypes } from '../resources/resourceTypes';

export default function ContentLibraryFilters() {
  
  return (
    <Filters types={resourceTypes} />
  )
}
