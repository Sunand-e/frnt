import useGetCurrentUser from "../../hooks/users/useGetCurrentUser"
import ContentStatusTabs from "../common/ContentStatusTabs"

export default function CourseTabs({gridClasses=''}) {
  
  const { courses: courseConnection, loading, error } = useGetCurrentUser()

  const courses = courseConnection?.edges.map(edge => {
    const { node, ...edgeProps } = edge;
    return {
      ...edgeProps,
      ...node
    }
  }).sort((a,b) => b.order - a.order) || []
  
  const options = {
    typeName: 'course',
    tabs: {
      in_progress: {
        readMoreLabel: 'Continue course',
        noItemsText: 'No courses are currently in progress'
      },
      not_started: {
        readMoreLabel: 'Start course',
        noItemsText: 'No courses found'
      },
      completed: {
        readMoreLabel: 'Review course',
        noItemsText: 'You have not completed any courses'
      }
    },
    items: {
      getHref: item => `/course?id=${item.id}`,
    }
  }


  return (
    <>
      <ContentStatusTabs 
        gridClasses={gridClasses} 
        options={options} 
        loading={loading} 
        content={courses}
      />
    </>
  )
}
