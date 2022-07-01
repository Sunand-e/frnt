
import Filters from '../common/Filters';
import { libraryItemTypes } from '../library/libraryItemTypes';

export default function ContentLibraryFilters() {
  
  return (
    <Filters types={libraryItemTypes} />
  )
}
