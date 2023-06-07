import { UpdateCourse, UpdateCourseVariables } from "../../graphql/mutations/course/__generated__/UpdateCourse";
import { UPDATE_COURSE } from "../../graphql/mutations/course/UPDATE_COURSE"
import { CourseFragment } from "../../graphql/queries/allQueries"
import { CourseFragment as CourseFragmentType } from '../../graphql/queries/__generated__/CourseFragment';
import { useMutation } from "@apollo/client"
import cache from "../../graphql/cache"
import useGetUserCourse from "../users/useGetUserCourse";

function useUpdateCourse(id) {

  const [updateCourseMutation, updateCourseResponse] = useMutation<UpdateCourse, UpdateCourseVariables>(
    UPDATE_COURSE
  );

  const { courseEdge } = useGetUserCourse(id)
  const cachedCourse = courseEdge?.node
  
  const updateCourse = async (variables) => {
    
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

export default useUpdateCourse