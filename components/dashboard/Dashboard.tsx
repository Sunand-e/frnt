import { useQuery } from '@apollo/client';
import NoticeBox from '../../components/NoticeBox';
import TopicsList from '../../components/TopicsList';
import DashboardContentTabs from '../../components/dashboard/DashboardContentTabs';
import { headerButtonsVar, latestContentVar, libraryVar, viewVar } from '../../graphql/cache';
import LoadingSpinner from '../../components/LoadingSpinner';
import { GET_DASHBOARD } from '../../graphql/queries/GET_DASHBOARD';
import { useRouter } from 'next/router'
import ItemGrid from '../../components/common/items/ItemGrid';
import Button from '../../components/Button';
import CourseTabs from './CourseTabs';
import useGetCourses from '../../hooks/courses/useGetCourses';
import ImportElpCourses from './ImportElpCourses';
import ResumeRecentActivity from './ResumeRecentActivity';
import WelcomeUserPanel from './WelcomeUserPanel';
import EventListBlock from './EventsList';
import LatestNewsBlock from "./LatestNewsList";
import CalendarDay from "../Calendar/CalendarDay";

const Dashboard = () => {

  const { loading, error, data } = useQuery(GET_DASHBOARD);

  if (error) {
    return (
      <>
        <p>Error:</p>
        <pre>
          {JSON.stringify(error, undefined, 2)}
        </pre>
      </>
    )
  }

  const router = useRouter()

  const handleTopicClick = tag => e => {
    e.preventDefault()
    router.push(`/library?tag=${tag.label}`, undefined, { shallow: true })
    console.log( libraryVar() )
  }

  return (
    <div className="max-w-screen-2xl mx-auto px-4 py-8 lg:px-6 xl:px-8">
      <ResumeRecentActivity />
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 xl:col-span-8">
          <CourseTabs gridClasses={'grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3'} />

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <EventListBlock />
            <LatestNewsBlock />
          </div>

        </div>
        <div className="col-span-12 xl:col-span-4">
          <div className="mt-5 bg-white shadow rounded-md  p-4 w-full sm:w-2/3 md:w-1/2 xl:w-full lg:ml-0">
            <CalendarDay key="b" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
