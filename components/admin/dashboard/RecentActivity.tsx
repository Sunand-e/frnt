import Link from "next/link"
import DashboardItem from "./DashboardItem"

const RecentActivity = () => {
  return (
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
  )
}

export default RecentActivity
