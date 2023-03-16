import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from '../utils/router';
import CourseStructureEditor from '../components/courses/CourseStructureEditor/CourseStructureEditor';
import SidebarEditableItem from '../components/courses/CourseStructureEditor/SidebarEditableItem';
import Layout from './Layout';
import { motion } from 'framer-motion';
import CourseStructureEditorTest from '../components/courses/CourseStructureEditor/CourseStructureEditorTest';

export default function TestLayout( {page} ) {
  /*
    Our useRouter is a modified version of nextJS's useRouter, as router.query is only available in SSR applications.
    See: https://stackoverflow.com/a/56695180/4274008, https://github.com/vercel/next.js/issues/4804
  */

  const layoutProps = {
    page,
    // })
  }
  return (
    <Layout {...layoutProps} >
      {/*<div className="w-full h-[calc(100%-4.5rem)] mx-auto bg-white">*/}
      <div className="w-full mx-auto bg-white">
        <div className="lg:flex">
                {page}
        </div>
      </div>
    </Layout>
  )
}
