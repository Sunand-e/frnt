import { useMutation } from "@apollo/client";
import { DUPLICATE_COURSE } from "../../graphql/mutations/course/DUPLICATE_COURSE";
import { DuplicateCourse, DuplicateCourseVariables } from "../../graphql/mutations/course/__generated__/DuplicateCourse";
import { ContentFragment } from "../../graphql/queries/allQueries";
import cache from "../../graphql/cache"
import { GetCurrentUser } from "../../graphql/queries/__generated__/GetCurrentUser";
import { userContentEdgeDefaults } from "../users/userContentEdgeDefaults";
import { GET_COURSES } from "../../graphql/queries/courses/courses";
import { GET_CURRENT_USER } from "../../graphql/queries/users";

function useDuplicateCourse() {

  const [duplicateCourseMutation, duplicateCourseResponse] = useMutation<DuplicateCourse, DuplicateCourseVariables>(DUPLICATE_COURSE)

  const duplicateCourse = (id) => {

    const course = cache.readFragment({
      id: `ContentItem:${id}`,
      fragment: ContentFragment,
      fragmentName: 'ContentFragment',
    });
    
    const userData = cache.readQuery({
      query: GET_CURRENT_USER      
    });
    
    duplicateCourseMutation({
      variables: { 
        id
      },
      optimisticResponse: {
        duplicateCourse: {
          __typename: 'DuplicateContentItemPayload',
          contentItem: {
            ...course,
            id: `clone-${id}`,
            title: course.title + ' - Copy',
            sections: [],
            _isOptimistic: true
          }
        },
      },

      update(cache, { data: { duplicateCourse } }) {

        const cachedData = cache.readQuery<GetCurrentUser>({
          query: GET_COURSES
        })

        cache.modify({
          fields: {
            courses(cachedCourses, details) {
              return {
                ...cachedCourses,
                totalCount: cachedCourses.totalCount + 1
              }
            },
          },
          /* broadcast: false // Include this to prevent automatic query refresh */
        });
        
        cache.writeQuery({
          query: GET_COURSES,
          data: {
            ...cachedData,
            courses: {
              ...cachedData?.courses,
              totalCount: cachedData?.courses.totalCount + 1,
              edges: [
                {
                  ...userContentEdgeDefaults,
                  userId: userData.user.id,
                  node: {
                    ...course,
                    ...duplicateCourse.contentItem,
                    groupsAssigned: {
                      edges: []
                    },
                    sections: []
                  },

                },
                ...(cachedData?.courses.edges || [])
              ]
            }
          }
        })
  
      }
  
    })
  }
      
  return {
    duplicateCourse,
  }
}

export default useDuplicateCourse