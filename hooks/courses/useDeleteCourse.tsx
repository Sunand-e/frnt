import { useMutation } from "@apollo/client";
import { DELETE_COURSE } from "../../graphql/mutations/course/DELETE_COURSE";
import { DeleteCourse, DeleteCourseVariables } from "../../graphql/mutations/course/__generated__/DeleteCourse";
import { CourseFragment } from "../../graphql/queries/allQueries";

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
        // We get a single item.
        const course = cache.readFragment({
          id: `ContentItem:${id}`,
          fragment: CourseFragment,
          fragmentName: 'CourseFragment',
        });
        // Then, we update it.
        if (course) {
          cache.writeFragment({
            id: `ContentItem:${id}`,
            fragment: CourseFragment,
            fragmentName: 'CourseFragment',
            data: {
              ...course,
              _deleted: true
            },
          });
        }
      }
    })
  }
      
  return {
    deleteCourse,
  }
}

export default useDeleteCourse