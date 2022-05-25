import { useState } from "react"
import useGetUser from "../../hooks/users/useGetUser"
import { useRouter } from "../../utils/router"
import Tabs from "../common/containers/Tabs"
import ItemCollection from "../common/items/ItemCollection"

export default function CourseTabs() {

  const [activeTabIndex, setActiveTabIndex] = useState(0)

  const defaultOptions = { 
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
console.log('courses')
console.log(courses)
  const coursePanels = [
    {
      name: 'In progress',
      courses: courses?.filter(course => course.status === 'in_progress'),
      readMoreLabel: 'Continue course'
    },
    {
      name: 'Not started',
      courses: courses?.filter(course => !course.status || course.status === 'not_started'),
      readMoreLabel: 'Start course'
    },
    {
      name: 'Completed',
      href: '#',
      courses: courses?.filter(course => course.status === 'completed'),
      readMoreLabel: 'View course'
    },
  ]

  const currentPanel = coursePanels[activeTabIndex]
  const { courses: filteredCourses, readMoreLabel } = currentPanel

  const tabs = coursePanels.map(({name, courses}) => {
    return {
      name,
      count: courses?.length || 0,
      href: '#'
    }
  })

  return (
    <>
      <Tabs tabs={tabs} activeTabIndex={activeTabIndex} setActiveTabIndex={setActiveTabIndex} className="mb-2" />
      { !!courses?.length && (
        <>
          <ItemCollection
            items={filteredCourses || []}
            options={{
              ...defaultOptions,
              itemOptions: {
                ...defaultOptions.itemOptions,
                getReadMoreLabel: (item) => readMoreLabel
              },
              maxItems: 0,
            }}
          />
        </>
      ) }
    </>
  )
}