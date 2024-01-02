import useGetPathways from "../../hooks/pathways/useGetPathways";
import useGetUserPathways from "../../hooks/users/useGetUserPathways";
import ContentStatusTabs from "../common/ContentStatusTabs"

export default function PathwayTabs({gridClasses=''}) {
  
  const { pathways: pathwayConnection, loading } = useGetPathways()

  const pathways = pathwayConnection?.edges.map(edge => {
    const { node, ...edgeProps } = edge;
    return {
      ...edgeProps,
      ...node
    }
  }).sort((a,b) => b.order - a.order) || []
  
  const options = {
    typeName: 'pathway',
    tabs: {
      in_progress: {
        readMoreLabel: 'Continue pathway',
        noItemsText: 'No pathways are currently in progress'
      },
      not_started: {
        readMoreLabel: 'Start pathway',
        noItemsText: 'No pathways found'
      },
      completed: {
        readMoreLabel: 'Review pathway',
        noItemsText: 'You have not completed any pathways'
      }
    },
    items: {
      getHref: item => `/pathway?pid=${item.id}`,
    }
  }
  return (
    <ContentStatusTabs
      connection={pathwayConnection}
      gridClasses={gridClasses} 
      options={options} 
      loading={loading}
      content={pathways}
    />
  )
}
