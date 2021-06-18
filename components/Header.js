export default function Header( {page} ) {
  return (
    <>
      <div className="py-2 bg-blue-dark">
        <div className="relative mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative flex justify-center items-center">
            <div className="text-sm font-medium text-white">
              MemberHub: The Learning Platform and Resource Center
            </div>
            <span aria-hidden="true" className="hidden sm:block mx-6 h-6 w-px bg-white bg-opacity-20"></span>
            <div className="ml-6 sm:ml-0">
              <a className="whitespace-nowrap inline-flex rounded-md bg-white py-2 px-3 text-xs font-semibold uppercase text-blue-500 hover:bg-opacity-90" href="/docs/just-in-time-mode">Learn more →</a>
            </div>
          </div>
        </div>
      </div>
      <div className="sticky top-0 z-40 lg:z-50 w-full mx-auto bg-white flex bg-white shadow-md py-6 justify-between">
        <div
            className="flex-none pl-4 sm:pl-6 xl:pl-8 flex items-center border-b border-gray-200 lg:border-b-0 lg:w-60 xl:w-72">
            <a className="overflow-hidden w-10 md:w-auto" href="/">
                <span className="sr-only">MemberHub Dashboard</span>
                <img src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/logo-color.png`} className="w-auto"/>
            </a>
        </div>
        <div
          className="h-18 flex items-center justify-between px-4 sm:px-6 lg:mx-6 lg:px-0 xl:mx-8">
          <div className="lg:w-64 pl-8 flex-shrink-0 flex items-center justify-end space-x-6">
            [HEADER RIGHT AREA]
          </div>
        </div>
      </div>
    <button type="button"
        className="fixed z-50 bottom-4 right-4 w-16 h-16 rounded-full bg-gray-900 text-white block lg:hidden"><span
            className="sr-only">Open site navigation</span><svg width="24" height="24" fill="none"
            className="absolute top-1/2 left-1/2 -mt-3 -ml-3 transition duration-300 transform">
            <path d="M4 8h16M4 16h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                strokeLinejoin="round"></path>
        </svg><svg width="24" height="24" fill="none"
            className="absolute top-1/2 left-1/2 -mt-3 -ml-3 transition duration-300 transform opacity-0 scale-80">
            <path d="M6 18L18 6M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                strokeLinejoin="round"></path>
        </svg></button>
    </>
  )
}