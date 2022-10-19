import { useMemo, useState } from "react"
import Tabs from "./containers/Tabs"
import ItemCollection from "./items/ItemCollection"
import LoadingSpinner from "./LoadingSpinner"

export default function ContentStatusTabs({content=[], options=null, gridClasses='', loading=false}) {

  const defaultOptions = { 
    // subHeading: 'Courses and workshops that were recently released',
    maxItems: 4,
    itemOptions: {
      // showType: true
    }
  }
  
  const contentPanels = [
    {
      name: 'in_progress',
      title: 'In progress',
      contents: content?.filter(item => item.status === 'in_progress'),
      readMoreLabel: options?.tabs?.in_progress?.readMoreLabel || 'Continue',
      noItemsText: options?.tabs?.in_progress?.noItemsText || 'No contents are currently in progress'
    },
    {
      name: 'not_started',
      title: 'Not started',
      contents: content?.filter(item => !item.status || item.status === 'not_started'),
      readMoreLabel: options?.tabs?.not_started?.readMoreLabel || 'Start',
      noItemsText: options?.tabs?.not_started?.noItemsText || 'No new content found'
    },
    {
      name: 'completed',
      title: 'Completed',
      href: '#',
      contents: content?.filter(item => item.status === 'completed'),
      readMoreLabel: options?.tabs?.completed?.readMoreLabel || 'View item',
      noItemsText: options?.tabs?.completed?.noItemsText || 'You have not completed any items'
    },
  ]

  const [activeTab, setActiveTab] = useState('')

  const visibleContentPanels = contentPanels.filter(({name, contents}) => {
    return !(name === 'in_progress' && !contents?.length)
  })
  
  const { 
    contents: filteredCourses, readMoreLabel, noItemsText 
  } = visibleContentPanels.find(tab => tab.name === activeTab) || visibleContentPanels[0]

  const tabs = visibleContentPanels.map(({contents, ...panel}) => {
    return {
      ...panel,
      count: contents?.length || 0,
      href: '#'
    }
  })
// alert(JSON.stringify(currentPanel));
  return (
    <>
      <Tabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} className="mb-2" />
      
      { loading && <LoadingSpinner text={`Loading ${options?.typeName || 'item'}s...`}/> }

      { !!content?.length && (
        <>
          <ItemCollection
            items={filteredCourses || []}
            gridClasses={gridClasses}
            noItemsText={noItemsText}

            options={{
              ...defaultOptions,
              itemOptions: {
                ...defaultOptions.itemOptions,
                ...options?.items,
                getReadMoreLabel: (item) => readMoreLabel,
                // getInfoContent: item => item.content?.description,
              },
              maxItems: 0,
            }}
          />
        </>
      ) }
    </>
  )
}
