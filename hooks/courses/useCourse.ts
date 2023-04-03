import { UpdateCourse, UpdateCourseVariables } from "../../graphql/mutations/course/__generated__/UpdateCourse";
import { UPDATE_COURSE } from "../../graphql/mutations/course/UPDATE_COURSE"
import { CourseFragment } from "../../graphql/queries/allQueries"
import { CourseFragment as CourseFragmentType } from '../../graphql/queries/__generated__/CourseFragment';
import { useMutation } from "@apollo/client"
import cache from "../../graphql/cache"

function useCourse(id) {

  const [updateCourseMutation, updateCourseResponse] = useMutation<UpdateCourse, UpdateCourseVariables>(
    UPDATE_COURSE
  );

  const updateCourse = async (variables) => {

    const cachedCourse = cache.readFragment<CourseFragmentType>({
      id:`ContentItem:${id}`,
      fragment: CourseFragment,
      fragmentName: 'CourseFragment',
    })
    
    await updateCourseMutation({
      variables: {
        id,
        ...variables
      },
      optimisticResponse: {
        updateCourse: {
          __typename: 'UpdateCoursePayload',
          course: {
            ...cachedCourse,
            ...variables,
            tags: {
              __typename: 'ContentItemTagConnection',
              edges: []
            }
          },
        }
      }
    }).catch(res => {
      // TODO: do something if there is an error!!
    })
  }
  
  const updateCourseContentBlocks = (contentBlocks) => {
    updateCourse({
      content: {
        blocks: contentBlocks 
      }
    })
  }

  return {
    updateCourse,
    updateCourseContentBlocks,
  }
}

export default useCourse