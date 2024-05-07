import { useState } from "react"
import useEnrolUsersInContent from "../../../hooks/contentItems/useEnrolUsersInContent"
import useGetCourses from "../../../hooks/courses/useGetCourses"
import useGetGroups from "../../../hooks/groups/useGetGroups"
import useGetRoles from "../../../hooks/roles/useGetRoles"
import useGetCurrentUser from "../../../hooks/users/useGetCurrentUser"
import useGetUserCourses from "../../../hooks/users/useGetUserCourses"
import { closeModal } from "../../../stores/modalStore"
import Button from "../../common/Button"
import ContentSelectCategorised from "../../common/inputs/ContentSelectCategorised"

const EnrolUserInContent = ({user, typeName='item'}) => {

  const { courses } = useGetCourses()
  const { groups } = useGetGroups()
  const { user: currentUser } = useGetCurrentUser()
  const {enrolUsersInContent} = useEnrolUsersInContent()
  const { courses: assignedContent } = useGetUserCourses(user.id)
  
  const userCourseNodes = assignedContent?.edges.filter(edge => (
    !edge.node._deleted
     && (
      edge.groups.edges.some(edge => edge.roles.length) || 
      edge.roles.length
    )
  )).map(edge => edge.node)

  const userGroupIds = user.groups.edges.map(edge => edge.groupId)
  const currentUserGroupIds = currentUser.groups.edges.map(edge => edge.groupId)
  const commonGroupIds = userGroupIds.filter(groupId => currentUserGroupIds.includes(groupId))

  const commonGroupProvisionedCourses = groups?.edges.flatMap(
    edge => commonGroupIds.includes(edge.node.id) ? edge.node.provisionedCourses.edges : []
  ) || []

  const commonGroupProvisionedCourseNodes = commonGroupProvisionedCourses.map(edge => edge.node)
  const currentUserEnrolledCourseNodes = courses?.edges.map(edge => edge.node) || []

  console.log('commonGroupProvisionedCourseNodes')
  console.log(commonGroupProvisionedCourseNodes)
  
  const availableCourseNodes = [
    ...commonGroupProvisionedCourseNodes,
    ...currentUserEnrolledCourseNodes
  ]

  console.log('availableCourseNodes')
  console.log(availableCourseNodes)

  const availableContent = [
    ...availableCourseNodes?.filter(course => 
      !userCourseNodes?.some(userCourse=>userCourse.id === course.id)
    ) || [],
  ]
  
  const {roles} = useGetRoles()

  const defaultRole = roles?.find(role => role.name === 'Learner')

  const [selectedContentIds, setSelectedContentIds] = useState([])

  const handleChange = (items) => {
    setSelectedContentIds(items.map(item => item.value))
  }

  const handleEnrol = (e) => {
    enrolUsersInContent({
      userIds: user.id,
      contentItemIds: selectedContentIds,
      roleId: defaultRole?.id
    }, () => {
      closeModal()
    })
  }
  console.log('availableContent')
  console.log(availableContent)
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
            No {typeName}s available to assign
            <Button onClick={closeModal}>OK</Button>
          </div>
        )
      }
    </>
  )
}

export default EnrolUserInContent