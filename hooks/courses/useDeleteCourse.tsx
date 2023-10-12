import { useMutation } from "@apollo/client";
import { DELETE_COURSE } from "../../graphql/mutations/course/DELETE_COURSE";
import { DeleteCourse, DeleteCourseVariables } from "../../graphql/mutations/course/__generated__/DeleteCourse";

function useDeleteCourse() {

  const [deleteCourseMutation, deleteCourseResponse] = useMutation<DeleteCourse, DeleteCourseVariables>(DELETE_COURSE)

  const deleteCourse = (id) => {
    deleteCourseMutation({
      variables: { 
        id
      },
      optimisticResponse: {
        deleteCourse: {
          __typename: 'DeleteContentItemPayload',
          contentItem: {
            id,
            __typename: 'ContentItem',
            _deleted: true,
          },
          message: ''
        },
      },

      update(cache, { data: deleteCourse }) {
        cache.modify({
          id: `ContentItem:${id}`,
          fields: {
            _deleted(cachedValue) {
              return true
            },
          },
          /* broadcast: false // Include this to prevent automatic query refresh */
        });
        cache.modify({
          fields: {
            courses(cachedValue) {
              return {
                ...cachedValue,
                totalCount: cachedValue.totalCount - 1
              }
            },
          },
          /* broadcast: false // Include this to prevent automatic query refresh */
        });
      }
    })
  }
      
  return {
    deleteCourse,
  }
}

export default useDeleteCourse