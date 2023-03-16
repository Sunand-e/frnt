import { MultipleContainers } from "./MultipleContainers"
import { useMutation } from '@apollo/client';
import { useEffect, useState } from "react"
import cache from "../../../graphql/cache"
import { CourseFragment, SectionFragment } from "../../../graphql/queries/allQueries"
import { SectionFragment as SectionFragmentType } from '../../../graphql/queries/__generated__/SectionFragment';
import { UpdateCourse, UpdateCourseVariables } from '../../../graphql/mutations/course/__generated__/UpdateCourse';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import AddSectionModal from "../AddSectionModal"
import DeleteSectionModal from "../DeleteSectionModal";
import NewSectionButton from "./NewSectionButton";
import { UPDATE_COURSE } from "../../../graphql/mutations/course/UPDATE_COURSE";
import { handleModal } from "../../../stores/modalStore";
import useUpdateSection from "../../../hooks/sections/useUpdateSection";
import isEqual from "lodash/isEqual";
import useGetUserCourse from "../../../hooks/users/useGetUserCourse";
import { useRouter } from "../../../utils/router";
import { StructureItems } from "./MultipleContainers";
import { UniqueIdentifier } from "@dnd-kit/core";
import { filterDeletedCourseItems, getItemStructureFromSections } from "./utilities";

const CourseStructureEditor = ({renderItem}) => {

  const router = useRouter()
  const { id } = router.query

  const { courseEdge } = useGetUserCourse(id)
  const course = courseEdge?.node

  const [items, setItems] = useState<StructureItems>()
  const [updateCourse, courseData] = useMutation<UpdateCourse, UpdateCourseVariables>(UPDATE_COURSE)
  const { updateSection } = useUpdateSection()

  useEffect(() => {
    if(course) {
      const updatedCacheItems = getItemStructureFromSections(
        filterDeletedCourseItems(course).sections
      )
      setItems(updatedCacheItems)
    }
  },[course])

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
  
  const handleReorderSections = (newSectionIds: UniqueIdentifier[]) => {
    const newSectionData = newSectionIds.map(id => {
      return cache.readFragment<SectionFragmentType>({
        id:`ContentItem:${id}`,
        fragment: SectionFragment,
        fragmentName: 'SectionFragment',
      }, true)
    })
    
    const course = cache.readFragment<SectionFragmentType>({
      id:`ContentItem:${id}`,
      fragment: CourseFragment,
      fragmentName: 'CourseFragment',
    },true)

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

  const handleDeleteSection = (id: UniqueIdentifier) => {
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

export default CourseStructureEditor