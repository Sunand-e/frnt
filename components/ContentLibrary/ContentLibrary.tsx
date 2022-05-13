import { useState, useEffect, useContext } from 'react'
import { useQuery, useReactiveVar } from '@apollo/client';
import { useRouter } from '../../utils/router';
import contentTypes from '../../contentTypes';
import ItemCollection from '../common/items/ItemCollection';
import SearchFilter from '../../components/SearchFilter';
import SearchResults from './SearchResults';
import LoadingSpinner from '../../components/LoadingSpinner';
import { GET_LIBRARY } from '../../graphql/queries/GET_LIBRARY';
import TopicsList from '../../components/TopicsList';
import { latestContentVar, contentTagsVar } from "../../graphql/cache";
import RecentlyReleased from '../dashboard/RecentlyReleased';
import { QueriesContext } from '../../context/QueriesContext';
import useGetLibraryItems from '../../hooks/libraryItems/useGetLibraryItems';

const ContentLibrary = () => {
  const recentlyViewedOptions = {
    // subHeading: 'libraryItems and workshops that were recently released',
    maxItems: 4,
    itemOptions: {
      showType: true
    }
  }

  const router = useRouter()
  const { filter } = router.query

  const { loading, error, libraryItems } = useGetLibraryItems()
  
  let filteredLibraryItems

  if(filter) {
    filteredLibraryItems = libraryItems.filter(item => item.contentType === filter)
  } else {
    filteredLibraryItems = libraryItems
  }

  return (
    <>
      { filteredLibraryItems?.length ? (
        <ItemCollection
          items={filteredLibraryItems}
          options={{
            ...recentlyViewedOptions,
            maxItems: 120,
          }}
        />) : <p>No resources available</p>
      }
    </>
  )
}

export default ContentLibrary