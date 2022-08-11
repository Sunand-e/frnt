import { useState } from "react"
import useGetUser from "../../hooks/users/useGetUser"
import Tabs from "../common/containers/Tabs"
import ItemCollection from "../common/items/ItemCollection"

export default function CourseTabs({gridClasses=null}) {

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
  
  const coursePanels = [
    {
      name: 'In progress',
      courses: courses?.filter(course => course.status === 'in_progress'),
      readMoreLabel: 'Continue course',
      noItemsText: 'No courses are currently in progress'
    },
    {
      name: 'Not started',
      courses: courses?.filter(course => !course.status || course.status === 'not_started'),
      readMoreLabel: 'Start course',
      noItemsText: 'No courses found'
    },
    {
      name: 'Completed',
      href: '#',
      courses: courses?.filter(course => course.status === 'completed'),
      readMoreLabel: 'View course',
      noItemsText: 'You have not completed any courses'
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
// alert(JSON.stringify(currentPanel));
  return (
    <>
      <Tabs tabs={tabs} activeTabIndex={activeTabIndex} setActiveTabIndex={setActiveTabIndex} className="mb-2" />
      { !!courses?.length && (
        <>
          <ItemCollection
            items={filteredCourses || []}
            gridClasses={gridClasses}
            noItemsText={currentPanel.noItemsText}
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
