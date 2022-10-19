import Header from '../components/app/header/Header'
import NavContainer from '../components/app/navigation/NavContainer'
import TopNotificationBar from '../components/common/TopNotificationBar'
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from '../utils/router';
import Layout from './Layout';
import CourseStructureView from '../components/courses/CourseView/CourseStructureView';
import ButtonLink from '../components/common/ButtonLink';
import useGetUserContent from '../hooks/users/useGetUserContent';

export default function CourseLayout( {page, navState} ) {
  /*
    Our useRouter is a modified version of nextJS's useRouter, as router.query is only available in SSR applications.
    See: https://stackoverflow.com/a/56695180/4274008, https://github.com/vercel/next.js/issues/4804
  */

  const router = useRouter()
  const { pid, id } = router.query
  const { courses } = useGetUserContent(id)
  const course = courses?.edges[0]?.node

  return (
    <Layout 
      navState={navState}
      sidebarComponent={(
        <div className="sticky h-[100vh] w-[300px] bg-blue bg-opacity-10 flex flex-col">
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
      <div className="w-full h-[calc(100vh-4.5rem)] mx-auto bg-white">
        <div className="lg:flex h-full">
          <div id="content-wrapper" className="min-w-0 w-full flex-auto lg:static lg:max-h-full lg:overflow-visible flex h-full">
            <ToastContainer />

            <div className="w-full flex justify-center px-16">
              <div className="min-w-0 w-full flex-auto pt-4 pb-24 lg:pb-16">
                {page}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
