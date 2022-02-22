const MessagingSidebar = () => {
  return (
    <div className="flex flex-col w-full h-full pl-4 pr-4 py-4 -mr-4">
      <div className="flex flex-row">
        <ul className="flex-1 flex flex-row items-center justify-between">
          <li>
            <a href="#"
                className="flex items-center pb-3 text-xs font-semibold relative text-main">
              <span>All Conversations</span>
              <span className="absolute left-0 bottom-0 h-1 w-6 bg-main rounded-full"></span>
            </a>
          </li>
          <li>
            <a href="#"
                className="flex items-center pb-3 text-xs text-main-dark font-semibold">
              <span>Archived</span>
            </a>
          </li>
          <li>
            <a href="#"
                className="flex items-center pb-3 text-xs text-main-dark font-semibold">
              <span>Starred</span>
            </a>
          </li>
        </ul>
        <div className="ml-6">
          <button className="flex items-center justify-center h-7 w-7 bg-gray-200 text-gray-500 rounded-full">
            <svg className="w-4 h-4 stroke-current"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </button>
        </div>
      </div>
      <div className="mt-5">
        <div className="text-xs text-gray-400 font-semibold uppercase">Team</div>
      </div>
      <div className="mt-2">
        <div className="flex flex-col -mx-4">
          <div className="relative flex flex-row items-center p-4">
            <div className="absolute text-xs text-gray-500 right-0 top-0 mr-4 mt-3">5 min</div>
            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-main-dark text-white flex-shrink-0">
              T
            </div>
            <div className="flex flex-col flex-grow ml-3">
              <div className="text-sm font-medium">Cuberto</div>
              <div className="text-xs truncate w-48">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis, doloribus?</div>
            </div>
            <div className="flex-shrink-0 ml-2 self-end mb-1">
              <span className="flex items-center justify-center h-5 w-5 bg-red-600 text-white text-xs rounded-full">5</span>
            </div>
          </div>
          <div className="flex flex-row items-center p-4 bg-gradient-to-r from-main/10 to-transparent border-l-2 border-main">
            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-main-dark text-white flex-shrink-0">
              T
            </div>
            <div className="flex flex-col flex-grow ml-3">
              <div className="flex items-center">
                <div className="text-sm font-medium">UI Art Design</div>
                <div className="h-2 w-2 rounded-full bg-green-500 ml-2"></div>
              </div>
              <div className="text-xs truncate w-48">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis, doloribus?</div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-5">
        <div className="text-xs text-gray-400 font-semibold uppercase">Personal</div>
      </div>
      <div className="h-full overflow-hidden relative pt-2">
        <div className="flex flex-col divide-y h-full overflow-y-auto -mx-4">
          <div className="flex flex-row items-center p-4 relative">
            <div className="absolute text-xs text-gray-500 right-0 top-0 mr-4 mt-3">2 hours ago</div>
            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-main-dark text-white flex-shrink-0">
              T
            </div>
            <div className="flex flex-col flex-grow ml-3">
              <div className="text-sm font-medium">Flo Steinle</div>
              <div className="text-xs truncate w-48">Good after noon! how can i help you?</div>
            </div>
            <div className="flex-shrink-0 ml-2 self-end mb-1">
              <span className="flex items-center justify-center h-5 w-5 bg-red-600 text-white text-xs rounded-full">3</span>
            </div>
          </div>
          <div className="flex flex-row items-center p-4">
            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-main-dark text-white flex-shrink-0">
              T
            </div>
            <div className="flex flex-col flex-grow ml-3">
              <div className="flex items-center">
                <div className="text-sm font-medium">Sarah D</div>
                <div className="h-2 w-2 rounded-full bg-green-500 ml-2"></div>
              </div>
              <div className="text-xs truncate w-48">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis, doloribus?</div>
            </div>
          </div>
          <div className="flex flex-row items-center p-4">
            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-main-dark text-white flex-shrink-0">
              T
            </div>
            <div className="flex flex-col flex-grow ml-3">
              <div className="flex items-center">
                <div className="text-sm font-medium">Sarah D</div>
                <div className="h-2 w-2 rounded-full bg-green-500 ml-2"></div>
              </div>
              <div className="text-xs truncate w-48">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis, doloribus?</div>
            </div>
          </div>
          <div className="flex flex-row items-center p-4">
            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-main-dark text-white flex-shrink-0">
              T
            </div>
            <div className="flex flex-col flex-grow ml-3">
              <div className="flex items-center">
                <div className="text-sm font-medium">Sarah D</div>
                <div className="h-2 w-2 rounded-full bg-green-500 ml-2"></div>
              </div>
              <div className="text-xs truncate w-48">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis, doloribus?</div>
            </div>
          </div>
          <div className="flex flex-row items-center p-4">
            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-main-dark text-white flex-shrink-0">
              T
            </div>
            <div className="flex flex-col flex-grow ml-3">
              <div className="flex items-center">
                <div className="text-sm font-medium">Sarah D</div>
                <div className="h-2 w-2 rounded-full bg-green-500 ml-2"></div>
              </div>
              <div className="text-xs truncate w-48">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis, doloribus?</div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 right-0 mr-2">
          <button className="flex items-center justify-center shadow-sm h-10 w-10 bg-red-600 text-white rounded-full">
            <svg className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

export default MessagingSidebar