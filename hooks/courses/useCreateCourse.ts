import { useMutation } from "@apollo/client"
import { CREATE_COURSE } from "../../graphql/mutations/course/CREATE_COURSE";
import { GET_COURSES } from "../../graphql/queries/courses/courses";
import { GetCourses } from "../../graphql/queries/__generated__/GetCourses";
import { CreateCourse, CreateCourseVariables } from "../../graphql/mutations/course/__generated__/CreateCourse";
import { contentItemDefaults } from "../contentItems/contentItemDefaults";


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
            },
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
            ...contentItemDefaults,
            id: Math.floor(Math.random() * 10000) + '',
            title: values.title,
            order: 99999999999,
            ...values,
            tags: {
              edges: []
            },
          },
          message: ''
        }
      },
      onCompleted: cb
    })
  }

  return {
    createCourse
  }
}

export default useCreateCourse