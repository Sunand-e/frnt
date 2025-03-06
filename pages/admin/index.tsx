import { useQuery } from '@apollo/client';
import { GraduationCap } from '@styled-icons/entypo/GraduationCap';
import { Users } from '@styled-icons/fa-solid/Users';
import { Library } from "@styled-icons/ionicons-solid/Library";
import { Group2 } from "@styled-icons/remix-fill/Group2";
import { useContext, useMemo } from 'react';
import AdminDashCard from '../../components/admin/dashboard/AdminDashCard';
import DashboardItem from '../../components/admin/dashboard/DashboardItem';
import ButtonLink from '../../components/common/ButtonLink';
import WelcomeUserPanel from '../../components/dashboard/WelcomeUserPanel';
import { TenantContext } from '../../context/TenantContext';
import { GET_ADMIN_DASHBOARD_DATA } from '../../graphql/queries/misc';
import useHeaderButtons from '../../hooks/useHeaderButtons';
import usePageTitle from '../../hooks/usePageTitle';
import useGetCurrentUser from '../../hooks/users/useGetCurrentUser';
import useIsOrganisationLeader from '../../hooks/users/useIsOrganisationLeader';
import useTenantFeaturesEnabled from '../../hooks/users/useTenantFeaturesEnabled';
import DashboardLayout from '../../layouts/DashboardLayout';
import { CoinStack } from "@styled-icons/boxicons-solid/CoinStack";

const AdminDashboardPage = () => {

  const { data, error, loading } = useQuery(GET_ADMIN_DASHBOARD_DATA)

  usePageTitle({ title: 'Admin Dashboard' })

  const { user } = useGetCurrentUser()
  const { tenantFeaturesEnabled } = useTenantFeaturesEnabled()

  useHeaderButtons([{
    id: 'userView',
    component: <ButtonLink href={'/'}>User View</ButtonLink>
  }])

  const tenant = useContext(TenantContext)

  const { isOrganisationLeader, organisation } = useIsOrganisationLeader()

  const cards = useMemo(() => {

    const showOrganisationCredits = isOrganisationLeader

    const showGroups = (
      tenantFeaturesEnabled(['groups']) &&
      !showOrganisationCredits
    )

    return [
      {
        name: 'allUsers',
        label: 'Total users',
        value: data?.users.totalCount,
        IconComponent: Users,
        href: "admin/users"
      },
      {
        name: 'allCourses',
        label: 'Total courses',
        value: data?.courses.totalCount,
        IconComponent: GraduationCap,
        href: "admin/courses"
      },
      ...(showGroups ? [{
        name: 'allGroups',
        label: 'Total groups',
        value: data?.groups.totalCount,
        IconComponent: Group2,
        href: "admin/users/groups"
      }] : []),
      ...(tenantFeaturesEnabled(['resources']) ? [{
        name: 'allResources',
        label: 'Total resources',
        value: data?.resources.totalCount,
        IconComponent: Library,
        href: "admin/resources"
      }] : []),
      ...(showOrganisationCredits ? [{
        name: 'credits',
        label: 'Credits remaining',
        value: (
          <>
            {organisation.creditTotal - organisation.creditsUsed}&nbsp;
            <span className='text-lg'>{`(used: `}<span className='font-bold'>{organisation.creditsUsed}</span>{`)`}</span>
          </>
        ),
        IconComponent: CoinStack,
      }] : []),
    ]
  }, [data, tenant, user])

  return (
    <main className="flex-1 pb-8">

      <WelcomeUserPanel />
      <div className="pt-4 mt-4 max-w-screen-2xl mx-auto px-8">
        <DashboardItem title="Overview">
          <div className="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {cards.map((card, index) => <AdminDashCard card={card} key={index} />)}
          </div>
        </DashboardItem>
      </div>
    </main>
  )
}

AdminDashboardPage.navState = {
  topLevel: 'dashboard',
}

AdminDashboardPage.getLayout = (page: any) => (
  <DashboardLayout
    navState={AdminDashboardPage.navState || {}}
    page={page}
  />
)

export default AdminDashboardPage
