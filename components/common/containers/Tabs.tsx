import classNames from "../../../utils/classNames"

const Tabs = ({tabs, className, activeTab, setActiveTab}) => {

  
  return (
    <div className={className}>
      <div className="sm:hidden">
        <label htmlFor="tabs" className="sr-only">
          Select a tab
        </label>
        {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
        <select
          id="tabs"
          name="tabs"
          className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-main focus:border-main sm:text-sm rounded-md"
          defaultValue={activeTab || tabs[0].name}
          onChange={e => setActiveTab(e.target.value)}
        >
          {tabs.map((tab) => (
            <option key={tab.name} value={tab.name}>{tab.title}</option>
          ))}
        </select>
      </div>
      <div className="hidden sm:block">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            {tabs.map((tab, index) => (
              <a
                key={tab.name}
                // href='#'
                onClick={() => setActiveTab(tab.name)}
                className={classNames(
                  tab.name === activeTab
                    ? 'border-main text-main-secondary'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-200',
                  'whitespace-nowrap flex py-4 px-1 border-b-2 font-medium text-sm cursor-pointer'
                )}
                aria-current={tab.name === activeTab ? 'page' : undefined}
              >
                {tab.title}
                {tab.count ? (
                  <span
                    className={classNames(
                      tab.name === activeTab ? 'bg-main/20 text-main-secondary' : 'bg-gray-100 text-gray-900',
                      'hidden ml-3 py-0.5 px-2.5 rounded-full text-xs font-medium md:inline-block'
                    )}
                  >
                    {tab.count}
                  </span>
                ) : null}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </div>
  )
}

export default Tabs
