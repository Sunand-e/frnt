import usePageTitle from '../../hooks/usePageTitle';
import {GraduationCap} from '@styled-icons/entypo/GraduationCap';
import {Users} from '@styled-icons/fa-solid/Users';
import CalendarDay from '../../components/common/Calendar/CalendarDay';
import QuickActions from '../../components/admin/dashboard/QuickActions';
import DashboardItem from '../../components/admin/dashboard/DashboardItem';
import DashboardLayout from '../../layouts/DashboardLayout';
import AdminDashCard from '../../components/admin/dashboard/AdminDashCard';
import WelcomeUserPanel from '../../components/dashboard/WelcomeUserPanel';
import { useQuery } from '@apollo/client';
import { useEffect, useMemo } from 'react';
import { GET_ADMIN_DASHBOARD_DATA } from '../../graphql/queries/misc';
import { headerButtonsVar } from '../../graphql/cache';
import Button from '../../components/common/Button';
import ButtonLink from '../../components/common/ButtonLink';

const AdminDashboardPage = () => {
  
  const { data, error, loading } = useQuery(GET_ADMIN_DASHBOARD_DATA)

  usePageTitle({ title: 'Admin Dashboard' })

  useEffect(() => {
    headerButtonsVar(
      <>
        {/* <Button onClick={handleLogoutClick}>Log out</Button> */}
        <ButtonLink href={'/'}>User View</ButtonLink>
      </>
    )
  },[])
  
  const cards = useMemo(() => ([
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
    {
      name: 'allGroups',
      label: 'Total groups',
      value: data?.groups.totalCount,
      IconComponent: GraduationCap,
      href: "admin/users/groups"
    },
    {
      name: 'allResources',
      label: 'Total resources',
      value: data?.resources.totalCount,
      IconComponent: Users,
      href: "admin/resources"
    },
  ]),[data])

  const statusStyles = {
    success: 'bg-green-100 text-green-800',
    processing: 'bg-yellow-100 text-yellow-800',
    failed: 'bg-gray-100 text-gray-800',
  }

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

  console.log('cards')
  console.log(cards)

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

          <DashboardItem className="mt-8 col-span-12 lg:col-span-8" title="Recent activity">

            {/* Activity list (smallest breakpoint only) */}
            <div className="shadow sm:hidden col-span-12 lg:col-span-8">
              <ul role="list" className="mt-2 divide-y divide-gray-200 overflow-hidden shadow sm:hidden">
                {/* {transactions?.map((transaction) => (
                  <li key={transaction.id}>
                    <a href={transaction.href} className="block px-4 py-4 bg-white hover:bg-gray-50">
                        <span className="flex items-center space-x-4">
                          <span className="flex-1 flex space-x-2 truncate">
                            <BanknotesIcon className="shrink-0 h-5 w-5 text-gray-400" aria-hidden="true" />
                            <span className="flex flex-col text-gray-500 text-sm truncate">
                              <span className="truncate">{transaction.name}</span>
                              <span>
                                <span className="text-gray-900 font-medium">{transaction.amount}</span>{' '}
                                {transaction.currency}
                              </span>
                              <time dateTime={transaction.datetime}>{transaction.date}</time>
                            </span>
                          </span>
                          <ChevronRightIcon className="shrink-0 h-5 w-5 text-gray-400" aria-hidden="true" />
                        </span>
                    </a>
                  </li>
                ))} */}
              </ul>

              <nav
                  className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200"
                  aria-label="Pagination"
              >
                <div className="flex-1 flex justify-between">
                  <a
                      href="#"
                      className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:text-gray-500"
                  >
                    Previous
                  </a>
                  <a
                      href="#"
                      className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:text-gray-500"
                  >
                    Next
                  </a>
                </div>
              </nav>
            </div>

            {/* Activity table (small breakpoint and up) */}
            <div className="hidden sm:block col-span-12 lg:col-span-8">
              <div className="w-full">
                <div className="flex flex-col mt-2">
                  <div className="align-middle min-w-full overflow-x-auto shadow overflow-hidden sm:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead>
                      <tr>
                        <th
                          className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          scope="col"
                        >
                          Activity
                        </th>

                        <th
                            className="hidden px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider md:block"
                            scope="col"
                        >
                          Status
                        </th>
                        <th
                            className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                            scope="col"
                        >
                          Date
                        </th>
                      </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                      {/* {transactions.map((transaction) => (
                          <tr key={transaction.id} className="bg-white">
                            <td className="max-w-0 w-full px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              <div className="flex">
                                <a href={transaction.href} className="group inline-flex space-x-2 truncate text-sm">
                                  <BanknotesIcon
                                      className="shrink-0 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                                      aria-hidden="true"
                                  />
                                  <p className="text-gray-500 truncate group-hover:text-gray-900">
                                    {transaction.name}
                                  </p>
                                </a>
                              </div>
                            </td>
                            <td className="px-6 py-4 text-right whitespace-nowrap text-sm text-gray-500">
                              <span className="text-gray-900 font-medium">{transaction.amount} </span>
                              {transaction.currency}
                            </td>
                            <td className="hidden px-6 py-4 whitespace-nowrap text-sm text-gray-500 md:block">
                                  <span
                                      className={classNames(
                                          statusStyles[transaction.status],
                                          'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize'
                                      )}
                                  >
                                    {transaction.status}
                                  </span>
                            </td>
                            <td className="px-6 py-4 text-right whitespace-nowrap text-sm text-gray-500">
                              <time dateTime={transaction.datetime}>{transaction.date}</time>
                            </td>
                          </tr>
                      ))} */}
                      </tbody>
                    </table>
                    {/* Pagination */}
                    <nav
                        className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6"
                        aria-label="Pagination"
                    >
                      <div className="hidden sm:block">
                        <p className="text-sm text-gray-700">
                          {/* Showing <span className="font-medium">1</span> to <span className="font-medium">10</span> of{' '} */}
                          Showing <span className="font-medium">0</span> results
                        </p>
                      </div>
                      <div className="flex-1 flex justify-between sm:justify-end">
                        <a
                            href="#"
                            className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                        >
                          Previous
                        </a>
                        <a
                            href="#"
                            className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                        >
                          Next
                        </a>
                      </div>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </DashboardItem>
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
