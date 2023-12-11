import { useState } from "react"
import useEnrolUsersInContent from "../../../hooks/contentItems/useEnrolUsersInContent"
import useGetRoles from "../../../hooks/roles/useGetRoles"
import { closeModal } from "../../../stores/modalStore"
import Button from "../../common/Button"
import ContentSelectCategorised from "../../common/inputs/ContentSelectCategorised"

const EnrolUserInContent = ({user, content, assignedContent, typeName='item'}) => {
  
  const {enrolUsersInContent} = useEnrolUsersInContent()

  const courseNodes = content?.edges.map(edge => edge.node)

  const userCourseNodes = assignedContent?.edges.filter(edge => (
    !edge.node._deleted
     && (
      edge.groups.edges.some(edge => edge.roles.length) || 
      edge.roles.length
    )
  )).map(edge => edge.node)

  const availableContent = courseNodes?.filter(course => 
    !userCourseNodes?.some(userCourse=>userCourse.id === course.id)
  ) || []
  
  const {roles} = useGetRoles()

  const defaultRole = roles?.find(role => role.name === 'Learner')

  const [selectedContentIds, setSelectedContentIds] = useState([])

  const handleChange = (items, actionMeta) => {
    setSelectedContentIds(items.map(item => item.value))
  }

  const handleEnrol = (e) => {
    enrolUsersInContent({
      userIds: [user.id],
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
              <Button onClick={handleEnrol}>{`Enrol ${user.fullName} into ${selectedContentIds.length} ${typeName}s`}</Button>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center">
            No {typeName}s available for enrolment
            <Button onClick={closeModal}>OK</Button>
          </div>
        )
      }
    </>
  )
}

export default EnrolUserInContent