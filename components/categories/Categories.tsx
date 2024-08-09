import useGetTags from '../../hooks/tags/useGetTags';
import { useRouter } from '../../utils/router';
import LoadingSpinner from '../common/LoadingSpinner';
import CategoriesCollection from './CategoriesCollection';
import CategoryFilters from './CategoryFilters';
import CategoryOrSearch from './CategoryOrSearch';

const Categories = () => {
  
  const router = useRouter()
  const { category, search } = router.query
  
  const { tags, loading } = useGetTags()
  
  return (
    <div className="flex flex-col items-stretch grow">
      { !!tags && <CategoryFilters /> }
      { loading ? (
        <LoadingSpinner text={'Loading categories'} />
      ) : (
        category || search ? <CategoryOrSearch /> : <CategoriesCollection />
      )}
    </div>
  )
}

export default Categories
