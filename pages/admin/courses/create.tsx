import usePageTitle from '../../../hooks/usePageTitle'
import { useRouter } from '../../../utils/router'
import Button from '../../../components/common/Button'
import { v4 as uuidv4 } from 'uuid';
import { useMutation } from '@apollo/client'
import { CREATE_COURSE } from '../../../graphql/mutations/course/CREATE_COURSE'
import LoadingSpinner from '../../../components/common/LoadingSpinner'
import CourseForm from '../../../components/courses/CourseForm'
import { GetCurrentUser } from '../../../graphql/queries/__generated__/GetCurrentUser'
import dayjs from 'dayjs'
import { closeModal, handleModal } from '../../../stores/modalStore'
import useHeaderButtons from '../../../hooks/useHeaderButtons'
import { Dot } from '../../../components/common/misc/Dot';
import { contentItemDefaults } from '../../../hooks/contentItems/contentItemDefaults';
import { CreateCourseMutation, CreateCourseMutationVariables } from '../../../graphql/generated';
import { userContentEdgeDefaults } from '../../../hooks/users/userContentEdgeDefaults';
import { GET_COURSES } from '../../../graphql/queries/courses/courses';
import useGetCurrentUser from '../../../hooks/users/useGetCurrentUser';

const AdminCourseSetup = () => {
  /*
    Our useRouter is a modified version of nextJS's useRouter, as router.query is only available in SSR applications.
    See: https://stackoverflow.com/a/56695180/4274008, https://github.com/vercel/next.js/issues/4804
  */
  const router = useRouter()

  const { user } = useGetCurrentUser()
  usePageTitle({ 
    title: "Set up a new course"
  })

  useHeaderButtons({
    id: 'courseList',
    component: <Button onClick={() => router.push('/admin/courses')}>Back to Courses</Button>
  })

  const [createCourse, newCourse] = useMutation<CreateCourseMutation, CreateCourseMutationVariables>(
    CREATE_COURSE,
    {
      // the update function updates the list of courses returned from the cached query.
      // This runs twice - once after the optimistic response, and again after the server response.
      update(cache, { data: { createCourse } } ) {
        const cachedData = cache.readQuery<GetCurrentUser>({
          query: GET_COURSES
        })

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
                  userId: user.id,
                  node: createCourse.course,

                },
                ...(cachedData?.courses.edges || [])
              ]
            }
          }
        })


        
        if(createCourse.course.id.indexOf('tmp-') !== 0) {          
          closeModal()
          router.push({
            pathname: `/admin/courses/edit`,
            query: {
              id: createCourse.course.id
            }
          })
        }
      },
    }
  );

  const onSubmit = (values) => {
    
    const { title, imageId, content, tags, ...settings } = values
    // setSubmitted(values);

    createCourse({
      variables: { 
        title,
        imageId,
        settings: {
          ...settings,
          frontPage: {
            enabled: true,
            ...settings.frontPage
          }
        },
        tags,
        content: {
          description: content
        },
        sections: [{
          title: "Section 1"
        }]
      },
      optimisticResponse: {
        createCourse: {
          __typename: 'CreateCoursePayload',
          course: {
            ...contentItemDefaults,
            id: `tmp-${Math.floor(Math.random() * 10000)}`,
            title: values.title,
            itemType: 'course',
            order: 9999999999,
            tags: contentItemDefaults.tags,
            groupsEnrolled: {
              edges: []
            },
            sections: [{
              ...contentItemDefaults,
              itemType: 'section',
              id: uuidv4(),
              title: 'Section 1',
              children: [],
              tags: contentItemDefaults.tags,
              order: 9999999999,
            }],
            users: null,
            settings: {
              frontPage: {
                enabled: true
              }
            }
          },
          message: ''
        }
      }
      // refetchQueries: [{ query: GET_COURSE }]
    }).catch(res => {
      // TODO: do something if there is an error!!
    })

    handleModal({
      content: <LoadingSpinner />
    })
  }

  return (
    <CourseForm 
      submitButtonText='Course Builder' 
      onSubmit={onSubmit}
      showDescription={true}
      autoFocus={true}
    />
  )
}

AdminCourseSetup.navState = {
  topLevel: 'courses',
  // secondary: 'courses'
}

export default AdminCourseSetup