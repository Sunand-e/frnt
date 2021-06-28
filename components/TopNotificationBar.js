const TopNotificationBar = () => {
  return (
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
  )
}

export default TopNotificationBar