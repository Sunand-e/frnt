import { useEffect, useState } from "react"
import { useLazyQuery } from "@apollo/client";
import { GET_COURSES } from "../../../graphql/queries/courses/courses";
import useProvideContentToGroups from "../../../hooks/groups/useProvideContentToGroups"
import useGetRoles from "../../../hooks/roles/useGetRoles"
import { closeModal } from "../../../stores/modalStore"
import Button from "../../common/Button"
import ContentSelectCategorised from "../../common/inputs/ContentSelectCategorised"
import LoadingSpinner from "../../common/LoadingSpinner"
import { GET_RESOURCES } from "../../../graphql/queries/allQueries";

const ProvideContentToGroup = ({group, provisionedContent, contentTypeName='item'}) => {
  
  const [getContent, { loading: contentLoadingStatus, data: content }] = useLazyQuery(
    contentTypeName === 'course' ? GET_COURSES : GET_RESOURCES
  );

  // Call the getContent function when the component mounts
  useEffect(() => {
    getContent();
  }, []);

  const {provideContentToGroups} = useProvideContentToGroups()

  const contentNodes = content?.edges.map(edge => edge.node)

  const organisationContentNodes = provisionedContent?.edges.filter(edge => (
    !edge.node._deleted
  )).map(edge => edge.node)

  const availableContent = contentNodes?.filter(content => 
    !organisationContentNodes?.some(organisationContent=>organisationContent.id === content.id)
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

  if (contentLoadingStatus) {
    return <LoadingSpinner size='sm' />
  }

  return (
    <>
      {
        availableContent?.length ? (
          <div>
            <ContentSelectCategorised
              availableContent={availableContent}
              onChange={handleChange}
              typeName={contentTypeName}
              menuTopMargin={selectedContentIds.length ? 60 : 0}
            />
            {/* <CourseMultiLevelSelect data={availableContentData} onChange={handleChange} /> */}
            { !!selectedContentIds.length && !!defaultRole?.id && (
              <Button onClick={handleProvide}>{`Provide ${selectedContentIds.length} ${contentTypeName}s to ${group.name}`}</Button>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center">
            No {contentTypeName}s available for provisioning
            <Button onClick={closeModal}>OK</Button>
          </div>
        )
      }
    </>
  )
}

export default ProvideContentToGroup