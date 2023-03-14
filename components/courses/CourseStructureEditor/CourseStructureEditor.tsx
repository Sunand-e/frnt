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
import { isEqual } from "lodash";
import useGetUserCourse from "../../../hooks/users/useGetUserCourse";
import { useRouter } from "../../../utils/router";

import { StructureItems } from "./MultipleContainers";

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

  const [isReordering, setIsReordering] = useState(false)

  const router = useRouter()
  const { id } = router.query

  const { courseEdge } = useGetUserCourse(id)
  const course = courseEdge?.node

  // const items = itemIdsBySectionId(
  //   filterDeletedCourseItems(course)?.sections || []
  // )
  const [items, setItems] = useState({})

  
  useEffect(() => {
    const updatedCacheItems = itemIdsBySectionId(
      filterDeletedCourseItems(course)?.sections || []
    )
    setItems(updatedCacheItems)
  
  },[course])
  //   const updatedCacheItems = itemIdsBySectionId(
  //     filterDeletedCourseItems(course)?.sections || []
  //   )
  //   if(isEqual(items, updatedCacheItems)) {
  //     console.log('theyre the same')
  //   } else {
  //     console.log('different')
  //     console.log('items')
  //     console.log(items)
  //     console.log('updatedCacheItems')
  //     console.log(updatedCacheItems)
  //     setItems(updatedCacheItems)
  //   }

  


  const [updateCourse, courseData] = useMutation<UpdateCourse, UpdateCourseVariables>(UPDATE_COURSE)
  
  const { updateSection } = useUpdateSection()

  const handleReorderItems = (newItems: StructureItems, oldItems: StructureItems) => {

    for(const sectionId in newItems) {
      if(!isEqual(newItems[sectionId], oldItems[sectionId])) {
        updateSection({
          id: sectionId,
          childrenIds: newItems[sectionId]
        })
      }
    }
  }
  
  const handleReorderSections = (newSectionIds) => {
    // setSectionIds(newSectionIds)

    const newSectionData = newSectionIds.map(id => {
      return cache.readFragment<SectionFragmentType>({
        id:`ContentItem:${id}`,
        fragment: SectionFragment,
        fragmentName: 'SectionFragment',
      })
    })
    
    const course = cache.readFragment<SectionFragmentType>({
      id:`ContentItem:${id}`,
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
      content: <AddSectionModal courseId={id} />
    })
  }
  return (
    <>
    { course && (
    <div>
      <MultipleContainers 
        vertical
        items={items}
        renderItem={renderItem}
        modifiers={[restrictToVerticalAxis]}
        onRemoveContainer={handleDeleteSection}
        onAddContainer={handleAddSection}
        onItemReorder={handleReorderItems}
        onContainerReorder={handleReorderSections}
      />
      <NewSectionButton
        onClick={handleAddSection}
      />
    </div>
    )}
    </>
  )
}

CourseStructureEditor.whyDidYouRender = true

export default CourseStructureEditor
