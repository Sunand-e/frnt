import useGetCourses from "../../hooks/courses/useGetCourses"
import { useRouter } from "../../utils/router"
import ContentStatusTabs from "../common/ContentStatusTabs"

export default function CourseTabs({gridClasses=''}) {
  
  const router = useRouter()
  const { category } = router.query

  const { courses: courseConnection, loading } = useGetCourses({ pagination: true });

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
      const isSelectedCategory = (tag: any) => {
        return tag.tagType === 'category' && tag.label === category
      }
      return item.tags && item.tags.edges.some(({node}) => isSelectedCategory(node));   
    });
  }
  
  const options = {
    typeName: 'course',
    items: {
      getHref: (item: any) => `/course?id=${item.id}`,
    }
  }

  return (
    <>
      <ContentStatusTabs 
        fetchMore={null}
        connection={courseConnection}
        gridClasses={gridClasses} 
        options={options} 
        loading={loading} 
        content={filteredItems}
      />
    </>
  )
}
