import useGetCurrentUser from "../../hooks/users/useGetCurrentUser"
import ContentStatusTabs from "../common/ContentStatusTabs"

export default function PathwayTabs({gridClasses=''}) {
  
  const { user: { pathways: pathwayConnection } = {} } = useGetCurrentUser()

  const pathways = pathwayConnection?.edges.map(edge => {
    const { node, ...edgeProps } = edge;
    return {
      ...edgeProps,
      ...node
    }
  })
  
  const options = {
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
    <ContentStatusTabs gridClasses={gridClasses} options={options} content={pathways} />
  )
}
