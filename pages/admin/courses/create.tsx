import usePageTitle from '../../../hooks/usePageTitle'
import { useRouter } from '../../../utils/router'
import Button from '../../../components/common/Button'
import { v4 as uuidv4 } from 'uuid';
import { CreateCourse, CreateCourseVariables } from '../../../graphql/mutations/course/__generated__/CreateCourse';
import { useMutation } from '@apollo/client'
import { CREATE_COURSE } from '../../../graphql/mutations/course/CREATE_COURSE'
import LoadingSpinner from '../../../components/common/LoadingSpinner'
import CourseForm from '../../../components/courses/CourseForm'
import { GET_CURRENT_USER } from '../../../graphql/queries/users'
import { GetCurrentUser } from '../../../graphql/queries/__generated__/GetCurrentUser'
import dayjs from 'dayjs'
import { closeModal, handleModal } from '../../../stores/modalStore'
import useHeaderButtons from '../../../hooks/useHeaderButtons'

const AdminCourseSetup = () => {
  /*
    Our useRouter is a modified version of nextJS's useRouter, as router.query is only available in SSR applications.
    See: https://stackoverflow.com/a/56695180/4274008, https://github.com/vercel/next.js/issues/4804
  */
  const router = useRouter()

  usePageTitle({ 
    title: "Set up a new course"
  })

  useHeaderButtons({
    id: 'courseList',
    component: <Button onClick={() => router.push('/admin/courses')}>Back to Courses</Button>
  })

  const [createCourse, newCourse] = useMutation<CreateCourse, CreateCourseVariables>(
    CREATE_COURSE,
    {
      // the update function updates the list of courses returned from the cached query.
      // This runs twice - once after the optimistic response, and again after the server response.
      update(cache, { data: { createCourse } } ) {
        const cachedData = cache.readQuery<GetCurrentUser>({
          query: GET_CURRENT_USER
        })
        console.log('cachedData')
        console.log(cachedData)

        cache.writeQuery({
          query: GET_CURRENT_USER,
          data: {
            ...cachedData,
            courses: {
              ...cachedData?.courses,
              edges: [
                {
                  userId: cachedData.user.id,
                  groups: {
                    edges: []
                  },
                  roles: [],
                  node: createCourse.course,
                  completed: null,
                  visits: 0,
                  score: 0,
                  updatedAt: dayjs().toISOString,
                  createdAt: dayjs().toISOString,
                  lastVisited: null,
                  firstVisited: null,
                  status: 'not_started'

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
        settings,
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
            __typename: 'ContentItem',
            id: `tmp-${Math.floor(Math.random() * 10000)}`,
            title: values.title,
            createdAt: '',
            updatedAt: '',
            content: {},
            contentType: null,
            itemType: 'course',
            image: null,
            icon: null,
            prerequisites: null,
            tags: [],
            shared: false,
            mediaItem: null,
            order: 9999999999,
            groupsEnrolled: {
              edges: []
            },
            sections: [{
              __typename: 'ContentItem',
              itemType: 'section',
              id: uuidv4(),
              title: 'Section 1',
              createdAt: '',
              updatedAt: '',
              content: {},
              contentType: null,
              image: null,
              shared: false,
              mediaItem: null,
              icon: null,
              prerequisites: null,
              _deleted: false,
              children: [],
              users: null,
              settings: {},
              tags: [],
              order: 9999999999,
            }],
            users: null,
            settings: {},
            _deleted: false,
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
    // <div className='h-full w-full max-w-screen-lg mx-auto'>
    <>
      <CourseForm 
        submitButtonText='Course Builder' 
        onSubmit={onSubmit}
        autoFocus={true}
      />
    </>
  )
}

AdminCourseSetup.navState = {
  topLevel: 'courses',
  // secondary: 'courses'
}

export default AdminCourseSetup