import { useState, useEffect, useContext, useMemo } from 'react'
import { useRouter } from '../../utils/router';
import SearchResults from './SearchResults';
import LoadingSpinner from '../common/LoadingSpinner';
import CategoryFilters from './CategoryFilters';
import CategoriesCollection from './CategoriesCollection';
import { Dot } from '../common/misc/Dot';
import useGetCurrentUser from '../../hooks/users/useGetCurrentUser';
import useGetTags from '../../hooks/tags/useGetTags';
import Category from './Category';

const Categories = () => {
  
  const router = useRouter()
  const { category } = router.query
  
  const { tags, loading } = useGetTags()
  
  return (
    <div className="flex flex-col items-stretch grow">
      { !!tags && <CategoryFilters /> }
      { loading ? (
        <LoadingSpinner text={(
          <>
            Loading categories
            <Dot>.</Dot>
            <Dot>.</Dot>
            <Dot>.</Dot>
          </>
        )} />
      ) : (
        category ? <Category /> : <CategoriesCollection />
      )}
    </div>
  )
}

export default Categories
