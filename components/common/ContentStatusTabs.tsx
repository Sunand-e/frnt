import { useState } from "react"
import CertificatesTable from "../certificates/CertificatesTable"
import Tabs from "./containers/Tabs"
import { contentTypes } from "./contentTypes"
import ItemCollection from "./items/ItemCollection"
import LoadingSpinner from "./LoadingSpinner"

export default function ContentStatusTabs({connection, content=[], options=null, gridClasses='', loading=false}) {
 
  const defaultOptions = {
    maxItems: 4,
    itemOptions: {
    }
  }

  const contentPanels = [
    {
      name: 'in_progress',
      title: 'In progress',
      countField: 'inProgressCount',
      count: connection?.inProgressCount || 0,
      contents: content?.filter(item => item.status === 'in_progress'),
      readMoreLabel: contentTypes[options.typeName]?.statusStrings?.['in_progress']?.readMoreLabel || 'Continue',
      noItemsText: contentTypes[options.typeName]?.statusStrings?.['in_progress']?.noItemsText || 'No contents are currently in progress'
    },
    {
      name: 'not_started',
      title: 'Not started',
      countField: 'notStartedCount',
      count: connection?.notStartedCount || 0,
      contents: content?.filter(item => !item.status || item.status === 'not_started'),
      readMoreLabel: contentTypes[options.typeName]?.statusStrings?.['not_started']?.readMoreLabel || 'Start',
      noItemsText: contentTypes[options.typeName]?.statusStrings?.['not_started']?.noItemsText || 'No new content found'
    },
    {
      name: 'completed',
      title: 'Completed',
      countField: 'completedCount',
      count: connection?.completedCount || 0,
      href: '#',
      contents: content?.filter(item => item.status === 'completed'),
      readMoreLabel: contentTypes[options.typeName]?.statusStrings?.['completed']?.readMoreLabel || 'View item',
      noItemsText: contentTypes[options.typeName]?.statusStrings?.['completed']?.noItemsText || 'You have not completed any items'
    },
  ]

  const visibleContentPanels = contentPanels.filter(({name, count}) => {
    return !(name === 'in_progress' && !count)
  })
  
  const [activeTab, setActiveTab] = useState(visibleContentPanels.find(({name}) => name === 'in_progress') ? 'in_progress' : 'not_started')

  const { 
    contents: filteredCourses, readMoreLabel, noItemsText
  } = visibleContentPanels.find(tab => tab.name === activeTab) || visibleContentPanels[0]

  const tabs = [
    ...visibleContentPanels.map(({contents, ...panel}) => {

      return {
        ...panel,
        count: panel.count || 0,
        href: '#'
      }
    }),
    ... options?.typeName === 'course' ? [{
      href: '#',
      name: 'certificates',
      title: 'Certificates'
    }] : []
  ]

  return (
    <>
      <Tabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
      { activeTab === 'certificates' ? (
        <CertificatesTable />
      ) : (
        <>
          { loading && <LoadingSpinner text={`Loading ${options?.typeName || 'item'}s`}/> }
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
                    getReadMoreLabel: () => readMoreLabel,
                  },
                  maxItems: 0,
                }}
              />
            </>
          )}
        </>
      )}
    </>
  )
}
