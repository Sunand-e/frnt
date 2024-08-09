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
  const { courses, modules } = useGetUserCourse(id)
  const courseEdge = courses?.edges[0]
  const course = courseEdge?.node
  
  const moduleEdge = modules?.edges.find(edge => (
    edge.node.id === contentId
  ))

  useLazyFontLoad(course?.settings.fonts?.headings)
  useLazyFontLoad(course?.settings.fonts?.body)
  
  useEffect(() => {
    // If there is a course but no item provided, show the first item or the last visited item
    if(course && !contentId) {
  
      if(courseEdge?.properties.lastVisitedLesson) {
        router.push({query: {
          ...router.query,
          cid: courseEdge?.properties.lastVisitedLesson
        }})
      } else if(!course.settings.frontPage?.enabled) {
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
          'bg-main-lightness-99 h-full',
          moduleEdge?.node.contentType === 'scorm_assessment' ? 'overflow-y-hidden' : 'overflow-y-auto',
          'fixed overflow-x-hidden h-[calc(100vh-108px)]',
          'lg:ml-[256px] left-0 lg:left-16 right-0'
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
      <LoadingSpinner className='mt-12' text="Loading course module" />
    )
  )
}
export default CourseItemView