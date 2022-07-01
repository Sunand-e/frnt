import Filters from '../../common/Filters';
import { libraryItemTypes } from '../../library/libraryItemTypes';

export default function LibraryFilters() {
  
  return (
    <Filters types={libraryItemTypes} />
  )
}
