import { useState } from 'react'
import BlockWithTitle from './BlockWithTitle';
import ContinueWatching from './ContinueWatching';
import LinkWithIcon from './LinkWithIcon';

import RecentlyReleased from "./RecentlyReleased";

export default function LessonTabs() {

  const [current, setCurrent] = useState('resources');

  const tabs = [
    {
      name: 'resources',
      title: 'Resources',
      element: (
        <>
          <BlockWithTitle title="Downloads for this lesson">
            <LinkWithIcon href='#' icon={{prefix: 'fas', iconName: 'file-pdf'}}>
              Lesson Worksheet 1
            </LinkWithIcon>
            <LinkWithIcon href='#' icon={{prefix: 'fas', iconName: 'file-word'}}>
              Lesson Worksheet 2
            </LinkWithIcon>
          </BlockWithTitle>

          <BlockWithTitle title="Additional Resources">
            <LinkWithIcon href='https://www.themembershipguys.com/niche/' icon={{prefix: 'fas', iconName: 'link'}}>
            Podcast/Blog – Why Membership Owners Need to Niche
            </LinkWithIcon>
            <LinkWithIcon href='https://amzn.to/3gNVPE0' icon={{prefix: 'fas', iconName: 'link'}}>
            The Forever Transaction by Robbie Kellman Baxter
            </LinkWithIcon>
          </BlockWithTitle>
        </>
      )
    },
    {
      name: 'discussion',
      title: 'Discussion',
      element: <RecentlyReleased />
    },
    {
      name: 'related',
      title: 'Related Training',
      element: <RecentlyReleased />
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
