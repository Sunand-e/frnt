import { useContext, useState } from 'react'
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
import { CreateCourse, CreateCourseVariables } from '../../../graphql/mutations/course/__generated__/CreateCourse';
import { CreateSection, CreateSectionVariables } from '../../../graphql/mutations/section/__generated__/CreateSection';
import { CREATE_COURSE } from "../../../graphql/mutations/course/CREATE_COURSE";
import { CREATE_SECTION } from "../../../graphql/mutations/section/CREATE_SECTION";
import { GET_COURSES } from '../../../graphql/queries/allQueries';
import { GetCourses, GetCourses_courses } from '../../../graphql/queries/__generated__/GetCourses';
import { v4 as uuidv4 } from 'uuid';
import Modal from '../../../components/Modal';
import { CheckIcon } from '@heroicons/react/solid';
import { Dialog } from '@headlessui/react';
import { ModalContext, ModalProvider } from '../../../context/modalContext';

const AdminCoursesAdd = () => {
  
  const [courseCreated, setCourseCreated] = useState(false)

  const [createSection, newSection] = useMutation<CreateSection, CreateSectionVariables>(
    CREATE_SECTION,
    {
      // the update function updates the cache 
      update(cache, { data: { createSection } } ) {

        // const data = cache.readQuery<GetCourses>({
        //   query: GET_SECTIONS
        // })

        // cache.writeQuery({
        //   query: GET_SECTIONS,
        //   data: { 
        //     courses: data ? [createCourse.course, ...data.courses] : [createCourse.course]
        //   }
        // })
      }
    }
  );


  const [createCourse, newCourse] = useMutation<CreateCourse, CreateCourseVariables>(
    CREATE_COURSE,
    {
      // the update function updates the cache 
      update(cache, { data: { createCourse } } ) {

        const data = cache.readQuery<GetCourses>({
          query: GET_COURSES
        })

        cache.writeQuery({
          query: GET_COURSES,
          data: { 
            courses: data ? [createCourse.course, ...data.courses] : [createCourse.course]
          }
        })
      },
      onCompleted({createCourse}) {
        const tempCourseId = `tmp_${uuidv4()}`
        const {title, id} = createCourse.course
        const sectionTitle = `${title} ${id}`
        console.log('createCourse.course')
        console.log(createCourse.course)
        createSection({
          variables: { title: sectionTitle, content: {} },
          // the optimistic response is stored in the cache immediately, 
          // and updated when the actual response is received
          optimisticResponse: {
            createSection: {
              __typename: 'CreateSectionPayload',
              section: {
                __typename: 'ContentItem',
                id: tempCourseId,
                title: 'Section 1',
                createdAt: '',
                updatedAt: '',
                content: {},
                contentType: null,
                image: null,
                icon: null,
                prerequisites: null,
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
      }
    }
  );

  // if(!courseCreated) {
  //   const title = 'Untitled Course'
  //   const tempCourseId = `tmp_${uuidv4()}`
  //   createCourse({
  //     variables: { title, content: {} },
  //     // the optimistic response is stored in the cache immediately, 
  //     // and updated when the actual response is received
  //     optimisticResponse: {
  //       createCourse: {
  //         __typename: 'CreateCoursePayload',
  //         course: {
  //           __typename: 'ContentItem',
  //           id: tempCourseId,
  //           title,
  //           createdAt: '',
  //           updatedAt: '',
  //           content: {},
  //           contentType: null,
  //           itemType: 'course',
  //           image: null,
  //           icon: null,
  //           prerequisites: null,
  //           tags: [],
  //           _deleted: false,
  //         },
  //         message: ''
  //       }
  //     }
  //     // refetchQueries: [{ query: GET_COURSE }]
  //   }).catch(res => {
  //     console.log('res')
  //     console.log(res)
  //     // TODO: do something if there is an error!!
  //   })
  //   // setCourseCreated(true)
  // }

  return (
    <>
      <PageTitle title="Add new course" />
{/*}
      </Modal>
        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
          <CheckIcon className="h-6 w-6 text-green-600" aria-hidden="true" />
        </div>
        <div className="mt-3 text-center sm:mt-5">
          <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
            Payment successful
          </Dialog.Title>
          <div className="mt-2">
            <p className="text-sm text-gray-500">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur amet labore.
            </p>
          </div>
        </div>
      </Modal>
      
      {/* <div className="flex p-2">
      <AdminSidebar>
      <SaveButton onClick={() => handleSaveClick()} />
      </AdminSidebar>
    </div> */}      
    </>
  )
}

AdminCoursesAdd.navState = {
topLevel: 'courses',
secondary: 'courses'
}

AdminCoursesAdd.getLayout = page => {
  return <EditorLayout
    navState={AdminCoursesAdd.navState}
    page={page}
  />
}

export default AdminCoursesAdd