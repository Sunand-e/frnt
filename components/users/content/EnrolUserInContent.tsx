import { useState } from "react"
import useEnrolUsersInContent from "../../../hooks/contentItems/useEnrolUsersInContent"
import useGetContent from "../../../hooks/contentItems/useGetContent"
import useGetGroupsDetailed from "../../../hooks/groups/useGetGroupsDetailed"
import useGetRoles from "../../../hooks/roles/useGetRoles"
import useGetCurrentUser from "../../../hooks/users/useGetCurrentUser"
import useGetUserContent from "../../../hooks/users/useGetUserContent"
import useUserHasCapability from "../../../hooks/users/useUserHasCapability"
import { closeModal } from "../../../stores/modalStore"
import Button from "../../common/Button"
import ContentSelectCategorised from "../../common/inputs/ContentSelectCategorised"

const EnrolUserInContent = ({user, typeName='course'}) => {

  const { content, loading: contentLoading } = useGetContent(typeName)
  const { user: currentUser } = useGetCurrentUser()
  const { userHasCapability } = useUserHasCapability()
  const shouldFetchGroupsContents = !userHasCapability('EnrolUsersInContent', 'tenant')
  const { groups, loading: groupsLoading } = useGetGroupsDetailed(shouldFetchGroupsContents)

  const {enrolUsersInContent} = useEnrolUsersInContent()
  const { content: assignedContent, loading: userContentLoading } = useGetUserContent(user.id, typeName)
  const userContentNodes = assignedContent?.edges.filter(edge => (
    !edge.node._deleted
     && (
      edge.groups.edges.some(edge => edge.roles.length) || 
      edge.roles.length
    )
  )).map(edge => edge.node)
  
  let availableContentNodes = []

  if (userHasCapability('EnrolUsersInContent', 'tenant')) {
    availableContentNodes = content?.edges.map(edge => edge.node) || []
  } else {  
    const userGroupIds = user.groups.edges.map(edge => edge.groupId)
    const currentUserGroupIds = currentUser.groups.edges.map(edge => edge.groupId)
    const commonGroupIds = userGroupIds.filter(groupId => currentUserGroupIds.includes(groupId))

    const commonGroupProvisionedContents = groups?.edges.flatMap(
      edge => commonGroupIds.includes(edge.node.id) ? edge.node.provisionedContents.edges : []
    ) || []

    const commonGroupProvisionedContentNodes = commonGroupProvisionedContents.map(edge => edge.node)
    const currentUserEnrolledContentNodes = content?.edges.map(edge => edge.node) || []
    
    availableContentNodes = [
      ...commonGroupProvisionedContentNodes.filter(node => node.itemType === typeName),
      ...currentUserEnrolledContentNodes
    ]
  }

  const availableContent = [
    ...availableContentNodes?.filter(content => 
      !userContentNodes?.some(userContent=>userContent.id === content.id)
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

  return (
    <>
      {
        userContentLoading || contentLoading || (shouldFetchGroupsContents && groupsLoading) ? (
          <div className="flex flex-col items-center">
            Loading available {typeName}s...
          </div>
        ) : (
          availableContent?.length ? (
            <div>
              <ContentSelectCategorised
                availableContent={availableContent}
                onChange={handleChange}
                typeName={typeName}
                menuTopMargin={selectedContentIds.length ? 60 : 0}
              />
              {/* <ContentMultiLevelSelect data={availableContentData} onChange={handleChange} /> */}
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
        )
      }
    </>
  )
}

export default EnrolUserInContent