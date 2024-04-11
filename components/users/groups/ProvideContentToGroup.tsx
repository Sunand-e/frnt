import { useState } from "react"
import useProvideContentToGroups from "../../../hooks/groups/useProvideContentToGroups"
import useGetRoles from "../../../hooks/roles/useGetRoles"
import { closeModal } from "../../../stores/modalStore"
import Button from "../../common/Button"
import ContentSelectCategorised from "../../common/inputs/ContentSelectCategorised"

const ProvideContentToGroup = ({group, content, provisionedContent, typeName='item'}) => {
  
  const {provideContentToGroups} = useProvideContentToGroups()

  const courseNodes = content?.edges.map(edge => edge.node)

  const organisationCourseNodes = provisionedContent?.edges.filter(edge => (
    !edge.node._deleted
  )).map(edge => edge.node)

  const availableContent = courseNodes?.filter(course => 
    !organisationCourseNodes?.some(organisationCourse=>organisationCourse.id === course.id)
  ) || []
  
  const {roles} = useGetRoles()

  const defaultRole = roles?.find(role => role.name === 'Member')

  const [selectedContentIds, setSelectedContentIds] = useState([])

  const handleChange = (items, actionMeta) => {
    setSelectedContentIds(items.map(item => item.value))
  }

  const handleProvide = (e) => {
    provideContentToGroups({
      groupIds: [group.id],
      contentItemIds: selectedContentIds,
      roleId: defaultRole?.id
    }, () => {
      closeModal()
    })
  }
  
  return (
    <>
      {
        availableContent?.length ? (
          <div>
            <ContentSelectCategorised
              availableContent={availableContent}
              onChange={handleChange}
              typeName={typeName}
              menuTopMargin={selectedContentIds.length ? 60 : 0}
            />
            {/* <CourseMultiLevelSelect data={availableContentData} onChange={handleChange} /> */}
            { !!selectedContentIds.length && !!defaultRole?.id && (
              <Button onClick={handleProvide}>{`Provide ${selectedContentIds.length} ${typeName}s to ${group.name}`}</Button>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center">
            No {typeName}s available for provisioning
            <Button onClick={closeModal}>OK</Button>
          </div>
        )
      }
    </>
  )
}

export default ProvideContentToGroup