import { useState } from 'react'
import ItemCollection from '../common/items/ItemCollection';
import ItemGrid from '../common/items/ItemGrid';

import RecentlyReleased from "./RecentlyReleased";

export default function ItemFilterTabs({options, items, tabs}) {

  const [current, setCurrent] = useState('all');
  const [visibleItems, setVisibleItems] = useState(items);
  const [display, setDisplay] = useState(options?.display ?? 'grid');

  const handleTabClick = tab => {
    setCurrent(tab.name)
    // setVisibleItems(tab.filter(items))
  }
 
  const gridOptions = {
    ...options,
    maxItems: 10,
    itemOptions: {
      ...options?.itemOptions,
      showType: true,
    },
    display: 'list',
    ...options
  }

  return (
    <div className="w-full">
      <div id="tabs" className="flex space-x-2 mb-8">
      {
        tabs && tabs.map((tab, idx) => {
          let classNames = ''
          if(tab.name === current) {
            classNames = 'bg-main-secondary text-white'
          } else {
            classNames = 'bg-grey text-main-secondary'
          }
          return (
            <a 
            key={tab.name}
            className={`py-2 px-4
            font-semibold border-2
            border-main-secondary  
            hover:bg-main-secondary 
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
      { items.length && (
        <ItemGrid
          // viewAll={() => setSearchParams(viewAllParams)} 
          items={visibleItems} 
          options={gridOptions}
        />
      )}
    </div>
  )
}
