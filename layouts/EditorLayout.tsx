import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from '../utils/router';
import CourseStructureEditor from '../components/courses/CourseStructureEditor/CourseStructureEditor';
import SidebarEditableItem from '../components/courses/CourseStructureEditor/SidebarEditableItem';
import Layout from './Layout';
import { motion } from 'framer-motion';
import useGetUserCourse from '../hooks/users/useGetUserCourse';
import useGetCurrentUser from '../hooks/users/useGetCurrentUser';

export default function EditorLayout( {page, navState} ) {
  /*
    Our useRouter is a modified version of nextJS's useRouter, as router.query is only available in SSR applications.
    See: https://stackoverflow.com/a/56695180/4274008, https://github.com/vercel/next.js/issues/4804
  */

    const router = useRouter()
    const { id } = router.query
    const { courseEdge } = useGetUserCourse(id)
    const course = courseEdge?.node

  
  const courseStructureEditorProps = {
    renderItem: SidebarEditableItem
  }

  const layoutProps = {
    page,
    navState,
    ...(course && {
      sidebarComponent: (
        <div className="px-3 py-3">
          <CourseStructureEditor {...courseStructureEditorProps} course={course} />
        </div>
      )
    })
  }

  return (
    <Layout {...layoutProps} >
      {/*<div className="w-full h-[calc(100%-4.5rem)] mx-auto bg-white">*/}
      <div className="w-full mx-auto bg-white">
        <div className="lg:flex">
          <div id="content-wrapper" className="min-w-0 w-full flex-auto lg:static lg:max-h-full lg:overflow-visible flex h-full">
            <ToastContainer />
            <motion.div
              className="w-full flex justify-center px-16 h-[calc(100vh-120px)] overflow-auto"
              layoutScroll
            >
              <div className="min-w-0 w-full flex-auto pt-4 pb-24 lg:pb-16">
                {page}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
