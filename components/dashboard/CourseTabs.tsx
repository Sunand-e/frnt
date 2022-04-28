import { useState } from "react"
import useGetCourses from "../../hooks/courses/useGetCourses"
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
  const { courses } = useGetCourses()
    
  const tabs = [
    { name: 'In Progress', href: '#', count: '3' },
    { name: 'Not started', href: '#', count: '2' },
    { name: 'Completed', href: '#', count: '1' },
  ]

  return (
    !!courses?.length && (
      <>
      <Tabs tabs={tabs} activeTabIndex={activeTabIndex} setActiveTabIndex={setActiveTabIndex} className="mb-2" />
      <ItemCollection
        // viewAll={() => alert('a')} 
        items={courses}
        options={{
          ...recentlyViewedOptions,
          maxItems: 120,
        }}
      />
    </>
    )
  )
}