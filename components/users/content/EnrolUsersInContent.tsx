import { useState } from "react"
import useEnrolUsersInContent from "../../../hooks/contentItems/useEnrolUsersInContent"
import useGetCourses from "../../../hooks/courses/useGetCourses"
import useGetGroups from "../../../hooks/groups/useGetGroups"
import useGetRoles from "../../../hooks/roles/useGetRoles"
import { closeModal } from "../../../stores/modalStore"
import Button from "../../common/Button"
import ContentSelectCategorised from "../../common/inputs/ContentSelectCategorised"
import useUserHasCapability from "../../../hooks/users/useUserHasCapability"

const EnrolUsersInContent = ({users=[], content: availableContent, assignedContent=null, typeName='item'}) => {
  
  const { enrolUsersInContent, error: enrolError  } = useEnrolUsersInContent()
  const { userHasCapability } = useUserHasCapability()

  const { courses } = useGetCourses()
  const { groups } = useGetGroups()

  let contentEdges = availableContent?.edges || null

  if(!contentEdges) {
    if(userHasCapability('EnrolUsersInContent', 'tenant')) {
      contentEdges = courses?.edges || []
    } else if(userHasCapability('EnrolUsersInContent')) {
      contentEdges = groups?.edges.flatMap(edge => edge.node.provisionedCourses.edges) || []
    } else {
      contentEdges = []
    }
  }

  const contentNodes = contentEdges?.map(edge => edge.node)

  const userContentNodes = assignedContent?.edges.filter(edge => (
    !edge.node._deleted
     && (
      edge.groups.edges.some(edge => edge.roles.length) || 
      edge.roles.length
    )
  )).map(edge => edge.node)

  const availableAssignableContent = contentNodes?.filter(content => 
    !userContentNodes?.some(userContent=>userContent.id === content.id)
  ) || []
  
  const {roles} = useGetRoles()

  const defaultRole = roles?.find(role => role.name === 'Learner')

  const [selectedContentIds, setSelectedContentIds] = useState([])

  const handleChange = (items, actionMeta) => {
    setSelectedContentIds(items.map(item => item.value))
  }

  const handleEnrol = (e) => {
    enrolUsersInContent({
      userIds: users.map(u => u.id),
      contentItemIds: selectedContentIds,
      roleId: defaultRole?.id
    }, () => {
      closeModal()
    })
  }
  
  const assignButtonTextSuffix = users.length > 1 ? `${users.length} users` : `${users[0].fullName}`;
  
  return (
    <>
      {
        availableAssignableContent?.length ? (
          <div>
            <ContentSelectCategorised
              availableContent={availableAssignableContent}
              onChange={handleChange}
              typeName={typeName}
              menuTopMargin={selectedContentIds.length ? 60 : 0}
            />
            {/* <CourseMultiLevelSelect data={availableContentData} onChange={handleChange} /> */}
            { !!selectedContentIds.length && !!defaultRole?.id && (
              // <Button onClick={handleEnrol}>{`Enrol ${user.fullName} into ${selectedContentIds.length} ${typeName}s`}</Button>
              <Button onClick={handleEnrol}>{`Assign ${selectedContentIds.length} ${typeName}s to ${assignButtonTextSuffix}`}</Button>
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

export default EnrolUsersInContent