import { useRef, useEffect } from "react";
import { UpdateCourse, UpdateCourseVariables } from "../graphql/mutations/course/__generated__/UpdateCourse";
import { UPDATE_COURSE } from "../graphql/mutations/course/UPDATE_COURSE"
import { CourseFragment, GET_COURSE } from "../graphql/queries/allQueries"
// import { ContentFragment as ContentFragmentType } from '../graphql/queries/__generated__/ContentFragment';
import { CourseFragment as CourseFragmentType } from '../graphql/queries/__generated__/CourseFragment';
import { useMutation, useQuery, useReactiveVar } from "@apollo/client"
import cache, { currentContentItemVar } from "../graphql/cache"


function useCourse(id) {

  const [updateCourse, updatedCourse] = useMutation<UpdateCourse, UpdateCourseVariables>(
    UPDATE_COURSE
  );

  const saveCourse = ({title=null, contentBlocks=null}) => {

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

    updateCourse({
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

  const saveCourseTitle = (title) => {
    saveCourse({
      title
    })
  }

  const saveCourseContent = (contentBlocks) => {
    saveCourse({
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
    saveCourseContent,
    saveCourseTitle
  }
}

export default useCourse