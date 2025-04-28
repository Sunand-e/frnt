// import { useEffect, useState } from "react"
// import { useLazyQuery } from "@apollo/client";
// import { GET_COURSES } from "../../graphql/queries/courses/courses";
// import useProvideContentToGroups from "../../hooks/groups/useProvideContentToGroups"
// import useGetRoles from "../../hooks/roles/useGetRoles"
// import { closeModal } from "../../stores/modalStore"
// import Button from "../common/Button"
// import ContentSelectCategorised from "../common/inputs/ContentSelectCategorised"
// import LoadingSpinner from "../common/LoadingSpinner"
// import useAssignContentToGroups from "../../hooks/groups/useAssignContentToGroups";
// import { contentTypes } from "../common/contentTypes";

// const AssociateContentWithGroup = ({group, groupType='group', associationType='assigned', contentType='course'}) => {
  
//   const type = contentTypes[contentType]

//   const [getContent, { loading: contentLoadingStatus, data: content }] = useLazyQuery(type.gqlGetQuery);

//   // Call the getContent function when the component mounts
//   useEffect(() => {
//     getContent();
//   }, []);

//   const {provideContentToGroups} = useProvideContentToGroups()
//   const {assignContentToGroups} = useAssignContentToGroups()

//   const contentNodes = content?.[type.pluralKey]?.edges.map(edge => edge.node)

//   let existingAssociatedContentConnection
//   let associateContentWithGroup
//   let actionName

//   if(associationType === 'assigned') {
//     existingAssociatedContentConnection = group.assignedContents
//     associateContentWithGroup = assignContentToGroups
//     actionName = 'assign'
//   } else if(associationType === 'provided') {
//     existingAssociatedContentConnection = group.provisionedContents
//     associateContentWithGroup = provideContentToGroups
//     actionName = 'provide'
//   }

//   const actionNameCapitalised = actionName.charAt(0).toUpperCase() + actionName.slice(1)
  
//   const existingAssociatedContentNodes = existingAssociatedContentConnection?.edges.filter(edge => (
//     !edge.node._deleted
//   )).map(edge => edge.node)

//   const availableContent = contentNodes?.filter(content => 
//     !existingAssociatedContentNodes?.some(existingContentNode=>existingContentNode.id === content.id)
//   ) || []
  
//   const {roles} = useGetRoles()

//   const defaultRole = roles?.find(role => role.name === 'Member')

//   const [selectedContentIds, setSelectedContentIds] = useState([])

//   const handleChange = (items, actionMeta) => {
//     setSelectedContentIds(items.map(item => item.value))
//   }

//   const handleSubmit = (e) => {
//     associateContentWithGroup({
//       groupIds: [group.id],
//       contentItemIds: selectedContentIds,
//     }
//     // , () => {
//     //   closeModal()
//     )
//     closeModal()
//   }

//   if (contentLoadingStatus) {
//     return <LoadingSpinner size='sm' />
//   }

//   return (
//     <>
//       {
//         availableContent?.length ? (
//           <div>
//             <ContentSelectCategorised
//               availableContent={availableContent}
//               onChange={handleChange}
//               typeName={contentType}
//               menuTopMargin={selectedContentIds.length ? 60 : 0}
//             />
//             {/* <CourseMultiLevelSelect data={availableContentData} onChange={handleChange} /> */}
//             { !!selectedContentIds.length && !!defaultRole?.id && (
//               <Button onClick={handleSubmit}>{`${actionNameCapitalised} ${selectedContentIds.length} ${contentType}s to ${group.name}`}</Button>
//             )}
//           </div>
//         ) : (
//           <div className="flex flex-col items-center">
//             No {contentType}s available to {actionName} to {group.name}
//             <Button onClick={closeModal}>OK</Button>
//           </div>
//         )
//       }
//     </>
//   )
// }

// export default AssociateContentWithGroup;
