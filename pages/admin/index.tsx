import { useQuery } from '@apollo/client';
import { GraduationCap } from '@styled-icons/entypo/GraduationCap';
import { Users } from '@styled-icons/fa-solid/Users';
import { PeopleTeamToolbox } from "@styled-icons/fluentui-system-regular/PeopleTeamToolbox";
import { Library } from "@styled-icons/ionicons-solid/Library";
import { Group2 } from "@styled-icons/remix-fill/Group2";
import { useContext, useMemo } from 'react';
import AdminDashCard from '../../components/admin/dashboard/AdminDashCard';
import DashboardItem from '../../components/admin/dashboard/DashboardItem';
import QuickActions from '../../components/admin/dashboard/QuickActions';
import ButtonLink from '../../components/common/ButtonLink';
import WelcomeUserPanel from '../../components/dashboard/WelcomeUserPanel';
import { TenantContext } from '../../context/TenantContext';
import { GET_ADMIN_DASHBOARD_DATA } from '../../graphql/queries/misc';
import useHeaderButtons from '../../hooks/useHeaderButtons';
import usePageTitle from '../../hooks/usePageTitle';
import useGetCurrentUser from '../../hooks/users/useGetCurrentUser';
import useIsOrganisationLeader from '../../hooks/users/useIsOrganisationLeader';
import useUserHasCapability from '../../hooks/users/useUserHasCapability';
import DashboardLayout from '../../layouts/DashboardLayout';

const AdminDashboardPage = () => {
  
  const { data, error, loading } = useQuery(GET_ADMIN_DASHBOARD_DATA)

  usePageTitle({ title: 'Admin Dashboard' })

  const { user } = useGetCurrentUser()
  const { userHasCapability, determineCapabilityScope } = useUserHasCapability()
  
  useHeaderButtons([{
    id: 'userView',
    component: <ButtonLink href={'/'}>User View</ButtonLink>
  }])

  const tenant = useContext(TenantContext)

  const { isOrganisationLeader, organisation } = useIsOrganisationLeader()
  
  const cards = useMemo(() => {
    
    const showOrganisationEnrolmentLicences = isOrganisationLeader

    const showGroups = (
      !(tenant?.groups?.enabled === false) &&
      !showOrganisationEnrolmentLicences
    )

    return [
    {
      name: 'allCourses',
      label: 'Total courses',
      value: data?.courses.totalCount,
      IconComponent: GraduationCap,
      href: "admin/courses"
      // href: '#', icon: ScaleIcon,
    },
    {
      name: 'allUsers',
      label: 'Total users',
      value: data?.users.totalCount,
      IconComponent: Users,
      href: "admin/users"
    },
    ...(showGroups ? [{
      name: 'allGroups',
      label: 'Total groups',
      value: data?.groups.totalCount,
      IconComponent: Group2,
      href: "admin/users/groups"
    }] : []),
    ...(showOrganisationEnrolmentLicences ? [{
      name: 'enrolmentLicenses',
      label: 'Enrolment licenses used',
      value: (
        organisation.enrolments + ' / ' +
        organisation.enrolmentLicenseTotal
      ),
      IconComponent: PeopleTeamToolbox,
      href: "#"
    }] : []),
    ...(!(tenant?.resources?.enabled === false) ? [{
      name: 'allResources',
      label: 'Total resources',
      value: data?.resources.totalCount,
      IconComponent: Library,
      href: "admin/resources"
    }] : []),
  ]},[data, tenant, user])

  const statusStyles = {
    success: 'bg-green-100 text-green-800',
    processing: 'bg-yellow-100 text-yellow-800',
    failed: 'bg-gray-100 text-gray-800',
  }

  return (
    // <>
    //   <AdminDashTopBoxes boxes={topBoxes} />
    //   <GridLayout layout={gridLayout}>
    //     <Graph key="a" />
    //     <CalendarDay key="b" />
    //     <CalendarTime key="c" />
    //     <QuickActions key="d" />
    //   </GridLayout>
    // </>
      <main className="flex-1 pb-8">

        <WelcomeUserPanel />

        <div className="pt-4 mt-4 max-w-screen-2xl mx-auto px-8">
          <DashboardItem title="Overview">
            <div className="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {/* Card */}
              {cards.map((card, index) => <AdminDashCard card={card} key={index} />)}
            </div>
          </DashboardItem>

          <div className="grid grid-cols-12 gap-5 sm:grid-cols-1 lg:grid-cols-12">
            {/* <RecentActivity /> */}
            <div className="mt-8 col-span-12 lg:col-span-4 flex-none lg:block md:grid md:grid-cols-2 md:gap-4">
              <div className="w-full lg:w-full lg:ml-0 md:mr-4">
                <QuickActions key="d" />
              </div>
              {/* <DashboardItem className="mt-5 w-full lg:mt-5 lg:w-full md:mr-4 md:mt-0" title="Most active users">
                <div className="bg-white shadow mt-5 rounded-md p-4">
                  <div className="flow-root mt-6">
                    <ul role="list" className="-my-5 divide-y divide-gray-200">
                      {people.map((person) => (
                          <li key={person.handle} className="py-4">
                            <div className="flex items-center space-x-4">
                              <div className="shrink-0">
                                <img className="h-8 w-8 rounded-full" src={person.imageUrl} alt="" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 truncate">{person.name}</p>
                                <p className="text-sm text-gray-500 truncate">{'@' + person.handle}</p>
                              </div>
                              <div>
                                <a
                                    href="#"
                                    className="inline-flex items-center shadow-sm px-2.5 py-0.5 border border-gray-300 text-sm leading-5 font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50"
                                >
                                  View
                                </a>
                              </div>
                            </div>
                          </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-6">
                    <a
                        href="#"
                        className="w-full flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                    >
                      View all
                    </a>
                  </div>
                </div>
              </DashboardItem> */}
              {/* <div className="mt-5 bg-white shadow rounded-md  p-4 w-full lg:w-full lg:ml-0">
                <CalendarDay key="b" />
              </div> */}
            </div>
            </div>
        </div>
      </main>
  )
}

AdminDashboardPage.navState = {
  topLevel: 'dashboard',
}

AdminDashboardPage.getLayout = page => (
  <DashboardLayout
    navState={AdminDashboardPage.navState || {}}
    page={page}
  />
)

export default AdminDashboardPage
