import { GET_COURSES } from "../../graphql/queries/allQueries"
import { useMutation } from "@apollo/client"
import { CREATE_COURSE } from "../../graphql/mutations/course/CREATE_COURSE";
import { GetCourses } from "../../graphql/queries/__generated__/GetCourses";
import { CreateCourse, CreateCourseVariables } from "../../graphql/mutations/course/__generated__/CreateCourse";


function useCreateCourse() {
  
  const [createCourseMutation, createCourseResponse] = useMutation<CreateCourse, CreateCourseVariables>(
    CREATE_COURSE,
    {
      update(cache, { data: { createCourse } } ) {
        
        const data = cache.readQuery<GetCourses>({
          query: GET_COURSES
        })
        cache.writeQuery({
          query: GET_COURSES,
          data: { 
            courses: [createCourse.course, ...data.courses]
          }
        })
      }
    }
  );

  const createCourse = (values) => {
    createCourseMutation({ 
      variables: values,
      optimisticResponse: {
        createCourse: {
          __typename: 'CreateCoursePayload',
          course: {
            __typename: 'ContentItem',
            id: Math.floor(Math.random() * 10000) + '',
            title: values.title,
            createdAt: '',
            updatedAt: '',
            _deleted: false,
            ...values
          },
          message: ''
        }
      }
      // refetchQueries: [{ query: GET_COURSE }]
    })
  }

  return {
    createCourse
  }
}

export default useCreateCourse