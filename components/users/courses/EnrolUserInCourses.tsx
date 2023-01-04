import { useContext, useState } from "react"
import { ModalContext } from "../../../context/modalContext"
import useEnrolUsersInContent from "../../../hooks/contentItems/useEnrolUsersInContent"
import useGetCourses from "../../../hooks/courses/useGetCourses"
import useGetRoles from "../../../hooks/roles/useGetRoles"
import useGetUserCourses from "../../../hooks/users/useGetUserCourses"
import Button from "../../common/Button"
import CourseMultiLevelSelect from "../../courses/inputs/CourseMultiLevelSelect"
import CourseSelectCategorised from "../../courses/inputs/CourseSelectCategorised"
import LoadingSpinner from "../../common/LoadingSpinner"
import useGetCurrentUser from "../../../hooks/users/useGetCurrentUser"

const EnrolUserInCourses = ({user}) => {

  const { courses } = useGetCurrentUser()
  const { courses: userCourses, loading, error } = useGetUserCourses(user.id)
  
  const {enrolUsersInContent} = useEnrolUsersInContent()
  const { closeModal } = useContext(ModalContext)

  const courseNodes = courses?.edges.map(edge => edge.node)

  const userCourseNodes = userCourses?.edges.filter(edge => (
    !edge.node._deleted
     && (
      edge.groups.edges.some(edge => edge.roles.length) || 
      edge.roles.length
    )
  )).map(edge => edge.node)

  const availableCourses = courseNodes?.filter(course => 
    !userCourseNodes?.some(userCourse=>userCourse.id === course.id)
  ) || []
  
  const tags = availableCourses.reduce((tagArr,course,index, array) => {
    return [
        ...tagArr,
        ...course.tags.filter(tag => !tagArr.some(t => t.id === tag.id))
    ]
  }, [])
  
  let uniqueCourses = []

  const availableCoursesData = tags.map(tag => ({
    label: tag.label,
    options: availableCourses.filter(course => {
      if(!uniqueCourses.some(c => c.id === course.id)) {
        uniqueCourses.push(course)
        return course.tags.some(t => t.id === tag.id)
      }
      else {
        return false;
      }
    }).map(course => ({
      label: course.title,
      value: course.id,
    })),
  }))

  const {roles} = useGetRoles()

  const defaultRole = roles?.find(role => role.name === 'Learner')
  // const availableCoursesData = tags.map(tag => {
  //   return {
  //     label: tag.label,
  //     value: tag.id,
  //     children: availableCourses.filter(course => {
  //       if(!uniqueCourses.some(c => c.id === course.id)) {
  //         uniqueCourses.push(course)
  //         return course.tags.some(t => t.id === tag.id)
  //       }
  //       else {
  //         return false;
  //       }
  //     }).map(course => ({
  //       label: course.title,
  //       value: course.id,
  //     }))
  //   }
  // }).filter(category => category.children.length)

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
      { !user || loading ? (
        <LoadingSpinner />
      ) : (
        availableCourses?.length ? (
          <div>
            <CourseSelectCategorised data={availableCoursesData} onChange={handleChange} />
            {/* <CourseMultiLevelSelect data={availableCoursesData} onChange={handleChange} /> */}
            { !!selectedCourseIds.length && !!defaultRole?.id && (
              <Button onClick={handleEnrol}>{`Enrol ${user.fullName} into ${selectedCourseIds.length} courses`}</Button>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center">
            No courses available for enrolment
            <Button onClick={closeModal}>OK</Button>
          </div>
        )
      )}
    </>
  )
}

export default EnrolUserInCourses