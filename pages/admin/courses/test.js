import { useState } from 'react'
import CourseCreateForm from '../../../components/admin/courses/CourseCreateForm';
import PageTitle from '../../../components/PageTitle';
import BlockWithTitle from '../../../components/BlockWithTitle';
import { headerButtonsVar } from '../../../graphql/cache';
import Builder from '../../../components/admin/CourseBuilder/Builder';
import AdminSidebar from "../../../components/admin/CourseBuilder/AdminSidebar";
import SaveButton from "../../../components/admin/CourseBuilder/SaveButton";
import EditorLayout from '../../../components/layouts/EditorLayout'
import CourseStructureEditor from '../../../components/CourseStructureEditor/CourseStructureEditor'
import { useMutation } from '@apollo/client';
import { CreateCourse, CreateCourseVariables } from '../../../graphql/mutations/__generated__/CreateCourse';
import { CREATE_COURSE } from '../../../graphql/mutations/allMutations';
import { GET_COURSES } from '../../../graphql/queries/allQueries';
import { GetCourses, GetCourses_courses } from '../../../graphql/queries/__generated__/GetCourses';

const AdminCoursesTest = () => {

  const [courseCreated, setCourseCreated] = useState(false)

        const data = cache.readQuery<GetCourses>({
          query: GET_COURSES
        })
        console.log('data')
        console.log(data)

        cache.writeQuery({
          query: GET_COURSES,
          data: { 
            courses: [createCourse.course, ...data?.courses]
          }
        })
      }
    }
  );

  if(!courseCreated) {
    const title = 'New Course!'
    createCourse({ 
      variables: { title, content: {} },
      // the optimistic response is stored in the cache immediately, and updated when the 
      optimisticResponse: {
        createCourse: {
          __typename: 'CreateCoursePayload',
          course: {
            __typename: 'ContentItem',
            id: Math.floor(Math.random() * 10000) + '',
            title,
            createdAt: '',
            updatedAt: '',
            content: {},
            _deleted: false,
          },
          message: ''

        }
      }
      // refetchQueries: [{ query: GET_COURSE }]
    }).catch(res => {
      console.log('res')
      console.log(res)
      // TODO: do something if there is an error!!
    })
    setCourseCreated(true)
  }

  const data = {
    course: {
      name: 'aaa',
      title: 'bbb',
      content: {},
      sections: []
    }
  }
  return (
    <>
      <PageTitle title="Add new course" />
      <CourseStructureEditor />
      <div className="flex p-2">

        <AdminSidebar>

          <SaveButton onClick={() => handleSaveClick()} />

        </AdminSidebar>
      </div>
      
    </>
  )
}

AdminCoursesTest.navState = {
topLevel: 'courses',
secondary: 'courses'
}

AdminCoursesTest.getLayout = page => {
  return <EditorLayout
    navState={AdminCoursesTest.navState}
    page={page}
  />
}

export default AdminCoursesTest