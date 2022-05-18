import { useState } from "react"
import useGetUser from "../../hooks/users/useGetUser"
import { useRouter } from "../../utils/router"
import Tabs from "../common/containers/Tabs"
import ItemCollection from "../common/items/ItemCollection"

export default function CourseTabs() {

  const [activeTabIndex, setActiveTabIndex] = useState(0)

  const recentlyViewedOptions = { 
    // subHeading: 'Courses and workshops that were recently released',
    maxItems: 4,
    itemOptions: {
      // showType: true
    }
  }
  
  const { user: { courses: courseConnection } = {} } = useGetUser()

  const courses = courseConnection?.edges.map(edge => {
    const { node, ...edgeProps } = edge;
    return {
      ...edgeProps,
      ...node
    }
  })

  const coursePanels = [
    { name: 'In progress', courses: courses?.filter(course => course.status === 'In progress') },
    { name: 'Not started', courses: courses?.filter(course => !course.status ) },
    { name: 'Completed', href: '#', courses: courses?.filter(course => course.status === 'Completed') },
  ]

  let filteredCourses

  const tabs = coursePanels.map(({name, courses}, index) => {
    if(index === activeTabIndex) {
      filteredCourses = courses
    }
    return {
      name,
      count: courses?.length || 0,
      href: '#'
    }
  })

  return (
    !!courses?.length && (
      <>
      <Tabs tabs={tabs} activeTabIndex={activeTabIndex} setActiveTabIndex={setActiveTabIndex} className="mb-2" />
      <pre>
        {/* { JSON.stringify(courseConnection?.edges,null,2)} */}
        {/* { courseConnection?.edges.forEach(edge => JSON.stringify(edge,null,2)) }     */}
      </pre>
      <ItemCollection
        // viewAll={() => alert('a')} 
        items={filteredCourses || []}
        options={{
          ...recentlyViewedOptions,
          maxItems: 120,
        }}
      />
    </>
    )
  )
}