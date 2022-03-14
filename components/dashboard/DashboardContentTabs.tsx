import { useState } from 'react'
import ContinueWatching from './ContinueWatching';

import RecentlyReleased from "./RecentlyReleased";

export default function DashboardContentTabs() {

  const [current, setCurrent] = useState('recent');

  const tabs = [
    {
      name: 'recent',
      title: 'Recently Released',
      element: <RecentlyReleased />
    },
    {
      name: 'continue',
      title: 'Continue Watching',
      element: <ContinueWatching />
    }
  ]

  const handleTabClick = tab => {    
    setCurrent(tab.name)
  }

  return (
    <div className="">
      <div id="tabs" className="flex space-x-2 mb-8">
      {
        tabs.map((tab, idx) => {
          let classNames = ''
          if(tab.name === current) {
            classNames = 'bg-main-dark text-white'
          } else {
            classNames = 'bg-grey text-main-dark'
          }
          return (
            <a 
            key={tab.name}
            className={`py-2 px-4
            font-semibold border-2
            border-main-dark  
            hover:bg-main-dark 
            hover:text-white 
            transition ease-in duration-200 transform 
            top-1 ${classNames}
            
            ${tab.name === current}`} 
            onClick={() => handleTabClick(tab)}
            >
              {tab.title}
            </a>
          )
        })
      }
      </div>
      { tabs.find(tab => tab.name === current).element }
    </div>
  )

}
