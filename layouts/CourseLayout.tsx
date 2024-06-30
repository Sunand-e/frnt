import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from '../utils/router';
import Layout from './Layout';
import CourseStructureView from '../components/courses/CourseView/CourseStructureView';
import ButtonLink from '../components/common/ButtonLink';
import useGetUserCourse from '../hooks/users/useGetUserCourse';
import CourseSidebarHeader from '../components/courses/CourseSidebarHeader';

export default function CourseLayout( {page, navState} ) {
  /*
    Our useRouter is a modified version of nextJS's useRouter, as router.query is only available in SSR applications.
    See: https://stackoverflow.com/a/56695180/4274008, https://github.com/vercel/next.js/issues/4804
  */

  const router = useRouter()
  const { pid, id } = router.query
  const { courses } = useGetUserCourse(id)
  const course = courses?.edges[0]?.node

  return (
    <Layout 
      navState={navState}
      sidebarComponent={(
        <div className="sticky h-[100vh] w-full bg-main bg-opacity-10 flex flex-col">
          <CourseSidebarHeader />
          <CourseStructureView />
          { pid && course && (
            <ButtonLink className="mx-4" href={{
              pathname: `/pathway`,
              query: { pid }
            }}>
              Return to pathway
            </ButtonLink>
          )}
        </div>
      )}
    >
      <div className="w-full mx-auto bg-white">
        <div className="lg:flex">
          <div id="content-wrapper" className="min-w-0 w-full flex-auto lg:static lg:max-h-full lg:overflow-visible flex h-full">
            <ToastContainer style={{ zIndex: 999999 }} />

            <div className="w-full flex justify-center h-[calc(100vh-108px)] overflow-auto">
              <div className="min-w-0 w-full flex-auto">
                {page}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
