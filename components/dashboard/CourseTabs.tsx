import useGetCurrentUser from "../../hooks/users/useGetCurrentUser"
import { useRouter } from "../../utils/router"
import ContentStatusTabs from "../common/ContentStatusTabs"

export default function CourseTabs({gridClasses=''}) {
  
  const router = useRouter()
  const { search, category, type } = router.query

  const { courses: courseConnection, tags, loading, error } = useGetCurrentUser()

  const courses = courseConnection?.edges.map(edge => {
    const { node, ...edgeProps } = edge;
    return {
      ...edgeProps,
      ...node
    }
  }).sort((a,b) => b.order - a.order) || []

  let filteredItems = courses
  if(category) {
    filteredItems = filteredItems.filter(item => {
      const isSelectedCategory = tag => {
        return tag.tagType === 'category' && tag.label === category
      }
      return item.tags && item.tags.edges.some(({node}) => isSelectedCategory(node));   
    });
  }
  
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
        content={filteredItems}
      />
    </>
  )
}
