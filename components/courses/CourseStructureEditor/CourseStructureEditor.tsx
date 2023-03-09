import { MultipleContainers } from "./MultipleContainers"
import { useMutation } from '@apollo/client';
import styles from '../../common/dnd-kit/Item/Item.module.scss'
import classNames from 'classnames'
import { useContext, useEffect, useMemo, useState } from "react"
import cache from "../../../graphql/cache"
import { ContentFragment, CourseFragment, SectionFragment } from "../../../graphql/queries/allQueries"
import { SectionFragment as SectionFragmentType } from '../../../graphql/queries/__generated__/SectionFragment';
import { UpdateCourse, UpdateCourseVariables } from '../../../graphql/mutations/course/__generated__/UpdateCourse';
import DeleteLessonModal from "../DeleteLessonModal"
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';

import AddSectionModal from "../AddSectionModal"
import DeleteSectionModal from "../DeleteSectionModal";
import NewSectionButton from "./NewSectionButton";
import { UPDATE_COURSE } from "../../../graphql/mutations/course/UPDATE_COURSE";
import { handleModal } from "../../../stores/modalStore";
import useUpdateSection from "../../../hooks/sections/useUpdateSection";
import { StructureProvider, useStructureContext } from "./CourseStructureStore";

import { isEqual } from "lodash";
import useGetUserCourse from "../../../hooks/users/useGetUserCourse";
import { useRouter } from "../../../utils/router";

const itemIdsBySectionId = (mainArray) => {
  const obj = {}
  for (const section of mainArray) {
    const sectionItemIds = section.children?.map(child => child.id)
    obj[section.id] = sectionItemIds;
  }
  return obj
}

const filterDeletedCourseItems = (course) => course && ({
  ...course,
  sections: course?.sections.filter(section => !section._deleted).map(section => {
    return ({
      ...section,
      children: section.children.filter(child => !child._deleted)
    })
  }) || []
})

const CourseStructureEditor = ({renderItem}) => {

  const router = useRouter()
  const { id } = router.query

  const { courseEdge } = useGetUserCourse(id)
  const course = courseEdge?.node

  // if(course) { 
  //   console.log('sectionchildren')
  //   console.log(course)
  //   console.log('scc')
  //   console.log(null)
  //   console.log('null')
  //   console.log(course.sections.map(section => section.children))
  //   console.log(course.sections.map(section => section.children.map(child => child.id)))
  // }

  const items = useMemo(() => {
    // alert('calculating items for the first time')
    return itemIdsBySectionId(
      filterDeletedCourseItems(course)?.sections || []
    )
  },[courseEdge])

  const sectionIds = useMemo(() => (
    filterDeletedCourseItems(course)?.sections?.map(section => section.id) || []
  ),[courseEdge])

  return (
    <StructureProvider
      items={items}
      sectionIds={sectionIds}
    >
      <CourseStructure renderItem={renderItem} />
    </StructureProvider>
  )
}

const CourseStructure = ({renderItem}) => {

  const router = useRouter()
  const { id: courseId } = router.query

  const clonedItems = useStructureContext((state) => state.clonedItems)
  const items = useStructureContext((state) => state.items)
  const sectionIds = useStructureContext((state) => state.sectionIds)
  const setItems = useStructureContext((state) => state.setItems)
  const setSectionIds = useStructureContext((state) => state.setSectionIds)

  const [updateCourse, courseData] = useMutation<UpdateCourse, UpdateCourseVariables>(UPDATE_COURSE)
  
  const { updateSection } = useUpdateSection()

  const handleReorderItems = (newItems) => {
    console.log('newItems')
    console.log(newItems)
    for(const sectionId in newItems) {
      if(!isEqual(newItems[sectionId], clonedItems[sectionId])) {
        updateSection({
          id: sectionId,
          childrenIds: newItems[sectionId]
        })
      }
    }
  }
  
  const handleReorderSections = (newSectionIds) => {
    setSectionIds(newSectionIds)

    const newSectionData = newSectionIds.map(id => {
      return cache.readFragment<SectionFragmentType>({
        id:`ContentItem:${id}`,
        fragment: SectionFragment,
        fragmentName: 'SectionFragment',
      })
    })
    
    const course = cache.readFragment<SectionFragmentType>({
      id:`ContentItem:${courseId}`,
      fragment: CourseFragment,
      fragmentName: 'CourseFragment',
    })

    updateCourse({
      variables: {
        id: course.id,
        childrenIds: newSectionIds
      },
      optimisticResponse: {
        updateCourse: {
          __typename: 'UpdateCoursePayload',
          course: {
            ...course,
            sections: newSectionData
          },
        }
      }
    }).catch(res => {
      // TODO: do something if there is an error!!
    })
  }

  const handleDeleteSection = (id) => {
    handleModal({
      title: `Delete section`,
      content: <DeleteSectionModal id={id} />
    })
  }

  const handleAddSection = () => {
    handleModal({
      title: `Section name:`,
      content: <AddSectionModal courseId={courseId} />
    })
  }

  return (
    <>
      <MultipleContainers 
        vertical
        renderItem={renderItem}
        modifiers={[restrictToVerticalAxis]}
        onRemoveContainer={handleDeleteSection}
        onDragContainerEnd={handleReorderSections}
        onDragItemEnd={handleReorderItems}
      />
      <NewSectionButton
        onClick={handleAddSection}
      />
      {/* {sectionIds} */}
      <pre>
      { JSON.stringify(items,null,2) }
      </pre>
    </>
  )
}

export default CourseStructureEditor
