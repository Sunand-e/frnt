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
    <>
      <WelcomeUserPanel />
      <ResumeRecentActivity />
      <CourseTabs />

      <div className="flex space-x-8 mb-8">
        <div className="flex-1">
          <h3 className="text-xl text-main-secondary text-semibold">Upcoming events</h3>
          { data ? 
            <ItemGrid
            items = {
              data.events?.slice(0,3) || []
            }
            options={{display: 'list'}}
            />
            :
            <LoadingSpinner />
          }
        </div>

        {/* 'Latest News' list */}
        <div className="flex-1">
          <h3 className="text-xl text-main-secondary text-semibold">Latest News</h3>
          { data ? 
            <ItemGrid
              items = {data.posts?.slice(0,3) || []}
              options={{display: 'list'}}
            />
            :
            <LoadingSpinner />
          }
        </div>
      </div>

      <TopicsList onTopicClick={handleTopicClick} />
      
      {/* Dashboard Content Tabs include 'Recently viewed' and 'continiue wathcing' sections */}
      <DashboardContentTabs />
    </>
  )
}

export default Dashboard
