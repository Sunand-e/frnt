import { useRouter } from '../../../utils/router'
import { useEffect } from 'react'
import useGetUserCourse from '../../../hooks/users/useGetUserCourse'
import LoadingSpinner from '../../common/LoadingSpinner'
import { Dot } from '../../common/misc/Dot';
import ModuleView from './ModuleView'
import useLazyFontLoad from '../../../hooks/useLazyFontLoad';

const CourseItemView = () => {

  const router = useRouter()
  const { id, cid: contentId } = router.query
  const { courses } = useGetUserCourse(id)
  const course = courses?.edges[0]?.node

  useLazyFontLoad(course?.settings.fonts?.headings?.name)
  useLazyFontLoad(course?.settings.fonts?.body?.name)

  useEffect(() => {
    // If there is a course but no item provided, show the first item
    if(course && !contentId) {
      const firstItemInCourse = course.sections?.find(
        (section) => section.children?.length
      )?.children[0]
      
      if(firstItemInCourse) {
        router.push({query: {
          ...router.query,
          cid: firstItemInCourse.id
        }})
      }
    }
  },[id, course?.id])

  const courseFontCssVars = {
    ...(course.settings.fonts?.headings?.name && {
      "--course-headings-font": `'${course.settings.fonts?.headings?.name}'`,
    }),
    ...(course.settings.fonts?.body?.name && {
      "--course-body-font": `'${course.settings.fonts?.body?.name}'`,
    })
  }

  return (
    course ? (
      <div
        id="course_view"
        style={courseFontCssVars as React.CSSProperties }
      >
        <ModuleView />
      </div>
    ) : (
      <LoadingSpinner text={(
        <>
          Loading course module
          <Dot>.</Dot>
          <Dot>.</Dot>
          <Dot>.</Dot>
        </>
      )} />
    )
  )
}
export default CourseItemView