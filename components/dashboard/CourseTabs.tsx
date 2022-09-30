import { useState } from "react"
import useGetUser from "../../hooks/users/useGetUser"
import Tabs from "../common/containers/Tabs"
import ItemCollection from "../common/items/ItemCollection"
import LoadingSpinner from "../LoadingSpinner"

export default function CourseTabs({gridClasses=''}) {

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
      name: 'in_progress',
      title: 'In progress',
      courses: courses?.filter(course => course.status === 'in_progress'),
      readMoreLabel: 'Continue course',
      noItemsText: 'No courses are currently in progress'
    },
    {
      name: 'not_started',
      title: 'Not started',
      courses: courses?.filter(course => !course.status || course.status === 'not_started'),
      readMoreLabel: 'Start course',
      noItemsText: 'No courses found'
    },
    {
      name: 'completed',
      title: 'Completed',
      href: '#',
      courses: courses?.filter(course => course.status === 'completed'),
      readMoreLabel: 'View course',
      noItemsText: 'You have not completed any courses'
    },
  ]

  const [activeTab, setActiveTab] = useState('')

  const visibleCoursePanels = coursePanels.filter(({name, courses}) => {
    return !(name === 'in_progress' && !courses?.length)
  })
  
  const currentPanel = visibleCoursePanels.find(tab => tab.name === activeTab) || visibleCoursePanels[0]
  const { courses: filteredCourses, readMoreLabel } = currentPanel

  const tabs = visibleCoursePanels.map(({courses, ...panel}) => {
    return {
      ...panel,
      count: courses?.length || 0,
      href: '#'
    }
  })
// alert(JSON.stringify(currentPanel));
  return (
    <>
      <Tabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} className="mb-2" />
      
      { !courses && <LoadingSpinner text="Loading courses..."/> }

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
                getReadMoreLabel: (item) => readMoreLabel,
                getInfoContent: item => item.content?.description,
              },
              maxItems: 0,
            }}
          />
        </>
      ) }
    </>
  )
}
