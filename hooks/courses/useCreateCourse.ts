import { GET_COURSES } from "../../graphql/queries/allQueries"
import { useMutation } from "@apollo/client"
import { CREATE_COURSE } from "../../graphql/mutations/course/CREATE_COURSE";
import { GetCourses } from "../../graphql/queries/__generated__/GetCourses";
import { CreateCourse, CreateCourseVariables } from "../../graphql/mutations/course/__generated__/CreateCourse";


function useCreateCourse(cb) {
  
  const [createCourseMutation, createCourseResponse] = useMutation<CreateCourse, CreateCourseVariables>(
    CREATE_COURSE,
    {
      update(cache, { data: { createCourse } } ) {
        
        const cachedData = cache.readQuery<GetCourses>({
          query: GET_COURSES
        })
        cache.writeQuery({
          query: GET_COURSES,
          data: {
            ...cachedData,
            courses: {
              ...cachedData.courses,
              edges: [{node: createCourse.course}, ...cachedData.courses.edges]
            }
          }
        })
      }
    }
  );

  const createCourse = (values, cb = null) => {
    createCourseMutation({ 
      variables: values,
      optimisticResponse: {
        createCourse: {
          __typename: 'CreateCoursePayload',
          course: {
            __typename: 'ContentItem',
            id: Math.floor(Math.random() * 10000) + '',
            title: values.title,
            tags: [],
            mediaItem: null,
            createdAt: '',
            updatedAt: '',
            _deleted: false,
            ...values
          },
          message: ''
        }
      },
      onCompleted: cb
      // refetchQueries: [{ query: GET_COURSE }]
    })
  }

  return {
    createCourse
  }
}

export default useCreateCourse