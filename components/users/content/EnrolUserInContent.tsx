import { useContext, useState } from "react"
import { ModalContext } from "../../../context/modalContext"
import useEnrolUsersInContent from "../../../hooks/contentItems/useEnrolUsersInContent"
import useGetRoles from "../../../hooks/roles/useGetRoles"
import Button from "../../common/Button"
import ContentSelectCategorised from "./ContentSelectCategorised"

const EnrolUserInContent = ({user, content, assignedContent, typeName='item'}) => {
  
  const {enrolUsersInContent} = useEnrolUsersInContent()
  
  const { closeModal } = useContext(ModalContext)

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
  
  const tags = availableContent.reduce((tagArr,course,index, array) => {
    return [
        ...tagArr,
        ...course.tags.filter(tag => !tagArr.some(t => t.id === tag.id))
    ]
  }, [])
  
  let uniqueContent = []
  const categorisedContentData = tags.map(tag => ({
    label: tag.label,
    options: availableContent.filter(course => {
      if(
        uniqueContent.some(c => c.id === course.id)
        || !course.tags.some(t => t.id === tag.id)
      ) {
        return false
      }
      uniqueContent.push(course)
      return true
    }).map(course => ({
      label: course.title,
      value: course.id,
    })),
  }))
  
  const availableContentData = [
    ...categorisedContentData,
    {
      label: 'Uncategorised',
      options: availableContent.filter(course => {
        return !uniqueContent.some(c => c.id === course.id) && !course.tags.length
      }).map(course => ({
        label: course.title,
        value: course.id,
      }))  
    }
  ]
  
  const {roles} = useGetRoles()

  const defaultRole = roles?.find(role => role.name === 'Learner')

  const [selectedCourseIds, setSelectedCourseIds] = useState([])

  const handleChange = (items, actionMeta) => {
    setSelectedCourseIds(items.map(item => item.value))
  }

  const handleEnrol = (e) => {
    enrolUsersInContent({
      userIds: [user.id],
      contentItemIds: selectedCourseIds,
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
            <ContentSelectCategorised data={availableContentData} onChange={handleChange} typeName={typeName} />
            {/* <CourseMultiLevelSelect data={availableContentData} onChange={handleChange} /> */}
            { !!selectedCourseIds.length && !!defaultRole?.id && (
              <Button onClick={handleEnrol}>{`Enrol ${user.fullName} into ${selectedCourseIds.length} ${typeName}s`}</Button>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center">
            No courses available for enrolment
            <Button onClick={closeModal}>OK</Button>
          </div>
        )
      }
    </>
  )
}

export default EnrolUserInContent