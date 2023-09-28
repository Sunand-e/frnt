import { useRouter } from '../../../utils/router'
import { useEffect } from 'react'
import useGetUserCourse from '../../../hooks/users/useGetUserCourse'
import LoadingSpinner from '../../common/LoadingSpinner'
import { Dot } from '../../common/misc/Dot';
import ModuleView from './ModuleView'
import useLazyFontLoad from '../../../hooks/useLazyFontLoad';
import CourseFrontPageView from '../CourseFrontPageView';
import classNames from '../../../utils/classNames';

const CourseItemView = () => {

  const router = useRouter()
  const { id, cid: contentId } = router.query
  const { courses } = useGetUserCourse(id)
  const course = courses?.edges[0]?.node

  useLazyFontLoad(course?.settings.fonts?.headings)
  useLazyFontLoad(course?.settings.fonts?.body)

  useEffect(() => {
    // If there is a course but no item provided, show the first item
    if(course && !contentId && !course.settings.frontPage?.enabled) {
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
    ...(course?.settings.fonts?.headings?.name && {
      "--course-headings-font": `'${course.settings.fonts?.headings?.name}'`,
    }),
    ...(course?.settings.fonts?.body?.name && {
      "--course-body-font": `'${course.settings.fonts?.body?.name}'`,
    })
  }

  return (
    course ? (
      <div
        id="course_view"
        style={courseFontCssVars as React.CSSProperties }
        className={classNames(
          'bg-main-lightness-99 h-full overflow-y-scroll',
          'fixed overflow-y-auto overflow-x-hidden h-[calc(100vh-108px)]',
          'lg:ml-[260px] left-0 lg:left-16 right-0'
        )}
      >
        { course.settings.frontPage?.enabled && !contentId && (
          <CourseFrontPageView />
        )}
        { contentId && (
          <ModuleView />
        )}
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