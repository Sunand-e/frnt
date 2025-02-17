import useGetResources from '../../hooks/resources/useGetResources';
import { resourceTypes } from '../resources/resourceTypes';
import ResourceActionsMenu from './ResourceActionsMenu';
import { contentTypes } from '../common/contentTypes';
import ContentTable from '../common/tables/ContentTable';
import { GetResources } from '../../graphql/queries/__generated__/GetResources';
import { useQuery } from "@apollo/client";
import { GET_RESOURCES } from '../../graphql/queries/allQueries';
import { useViewStore } from '../../hooks/useViewStore';
import { useEffect } from 'react';

const ResourcesTable = () => {
  const { resources, loading, error, loadMore, hasMore } = useGetResources();
  const type = contentTypes['course']
  const scrollableRef = useViewStore((state) => state.mainScrollableRef);

   useEffect(() => {
      if (!scrollableRef.current) {
        return;
      }
      const handleScroll = () => {
        if (
          scrollableRef.current.scrollTop + scrollableRef.current.clientHeight >=
          scrollableRef.current.scrollHeight - 10
        ) {
          loadMore();
        }
      };

      scrollableRef.current.addEventListener("scroll", handleScroll, { passive: true });



      return () => {
        scrollableRef.current?.removeEventListener("scroll", handleScroll);
      };
    }, [scrollableRef, loadMore, hasMore]);

    return (
      <ContentTable content={resources} type={type} loading={loading} error={error} ActionsMenuComponent={ResourceActionsMenu} />
    )
}

export default ResourcesTable
