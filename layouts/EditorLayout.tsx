import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from '../utils/router';
import CourseStructureEditor from '../components/courses/CourseStructureEditor/CourseStructureEditor';
import SidebarEditableItem from '../components/courses/CourseStructureEditor/SidebarEditableItem';
import Layout from './Layout';
import { motion } from 'framer-motion';
import BlockSelector from '../components/common/ContentEditor/BlockSelector';
import { Sidebar } from '../components/common/ContentEditor/Sidebar';

export default function EditorLayout( {page, navState} ) {
  /*
    Our useRouter is a modified version of nextJS's useRouter, as router.query is only available in SSR applications.
    See: https://stackoverflow.com/a/56695180/4274008, https://github.com/vercel/next.js/issues/4804
  */

  const layoutProps = {
    page,
    navState,
    // ...(course && {
      sidebarComponent: (
        <Sidebar />
      )
    // })
  }
  return (
    <Layout {...layoutProps} >
      {/*<div className="w-full h-[calc(100%-4.5rem)] mx-auto bg-white">*/}
      <div className="w-full mx-auto bg-white">
        <div className="lg:flex">
          <div id="content-wrapper" className="min-w-0 w-full flex-auto lg:static lg:max-h-full lg:overflow-visible flex h-full">
            <ToastContainer />
            <motion.div
              className="w-full flex justify-center h-[calc(100vh-120px)] overflow-auto"
              layoutScroll
            >
              <div className="min-w-0 w-full flex-auto">
                {page}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
