import { useRef, useEffect } from "react";
import { UpdateCourse, UpdateCourseVariables } from "../../graphql/mutations/course/__generated__/UpdateCourse";
import { UPDATE_COURSE } from "../../graphql/mutations/course/UPDATE_COURSE"
import { CourseFragment, GET_COURSE } from "../../graphql/queries/allQueries"
// import { ContentFragment as ContentFragmentType } from '../graphql/queries/__generated__/ContentFragment';
import { CourseFragment as CourseFragmentType } from '../../graphql/queries/__generated__/CourseFragment';
import { useMutation, useQuery, useReactiveVar } from "@apollo/client"
import cache, { currentContentItemVar } from "../../graphql/cache"


function useCourse(id) {

  const [updateCourseMutation, updateCourseResponse] = useMutation<UpdateCourse, UpdateCourseVariables>(
    UPDATE_COURSE
  );

  const updateCourse = ({title=null, contentBlocks=null}) => {

    const cachedCourse = cache.readFragment<CourseFragmentType>({
      id:`ContentItem:${id}`,
      fragment: CourseFragment,
      fragmentName: 'CourseFragment',
    })
    
    const variables = {
      ...(title && {title}),
      ...(contentBlocks && {content: {
        blocks: contentBlocks 
      }})
    }

    updateCourseMutation({
      variables: {
        id,
        ...variables
      },
      optimisticResponse: {
        updateCourse: {
          __typename: 'UpdateCoursePayload',
          course: {
            ...cachedCourse,
            ...variables
          },
        }
      }
    }).catch(res => {
      // TODO: do something if there is an error!!
    })
  }

  const updateCourseTitle = (title) => {
    updateCourse({
      title
    })
  }

  const updateCourseContent = (contentBlocks) => {
    updateCourse({
      contentBlocks
    })
  }
  
  const { loading, error, data: {course} = {} } = useQuery(
    GET_COURSE,
    {
      variables: {
        id
      }
    }
  );

  return {
    course,
    loading,
    error,
    updateCourseContent,
    updateCourseTitle
  }
}

export default useCourse