import { useMemo, useState } from "react"
import CertificatesTable from "../certificates/CertificatesTable"
import Tabs from "./containers/Tabs"
import { contentTypes } from "./contentTypes"
import ItemCollection from "./items/ItemCollection"
import LoadingSpinner from "./LoadingSpinner"

export default function ContentStatusTabs({connection, content=[], options=null, gridClasses='', loading=false, fetchMore}) {

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
      countField: 'inProgressCount',
      contents: content?.filter(item => item.status === 'in_progress'),
      readMoreLabel: contentTypes[options.typeName]?.statusStrings?.['in_progress']?.readMoreLabel || 'Continue',
      noItemsText: contentTypes[options.typeName]?.statusStrings?.['in_progress']?.noItemsText || 'No contents are currently in progress'
    },
    {
      name: 'not_started',
      title: 'Not started',
      countField: 'notStartedCount',
      contents: content?.filter(item => !item.status || item.status === 'not_started'),
      readMoreLabel: contentTypes[options.typeName]?.statusStrings?.['in_progress']?.readMoreLabel || 'Start',
      noItemsText: contentTypes[options.typeName]?.statusStrings?.['in_progress']?.noItemsText || 'No new content found'
    },
    {
      name: 'completed',
      title: 'Completed',
      countField: 'completedCount',
      href: '#',
      contents: content?.filter(item => item.status === 'completed'),
      readMoreLabel: contentTypes[options.typeName]?.statusStrings?.['in_progress']?.readMoreLabel || 'View item',
      noItemsText: contentTypes[options.typeName]?.statusStrings?.['in_progress']?.noItemsText || 'You have not completed any items'
    },
  ]

  const [activeTab, setActiveTab] = useState('')

  const visibleContentPanels = contentPanels.filter(({name, contents}) => {
    return !(name === 'in_progress' && !connection?.inProgressCount)
  })
  
  const { 
    contents: filteredCourses, readMoreLabel, noItemsText 
  } = visibleContentPanels.find(tab => tab.name === activeTab) || visibleContentPanels[0]

  const tabs = [
    ...visibleContentPanels.map(({contents, ...panel}) => {

      return {
        ...panel,
        // count: contents?.length || 0,
        count: connection?.[panel.countField],
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
      <Tabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} className="mb-2" />
      { activeTab === 'certificates' ? (
        <CertificatesTable />
      ) : (
        <>
          { loading && <LoadingSpinner text={`Loading ${options?.typeName || 'item'}s...`}/> }
          { !!content?.length && (
            <>
              <ItemCollection
                items={filteredCourses || []}
                gridClasses={gridClasses}
                noItemsText={noItemsText}
                fetchMore={fetchMore}
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
          )}
        </>
      )}
    </>
  )
}
