import Link from 'next/link'
import navStructureUser from '../../navStructureUser'
import navStructureAdmin from '../../navStructureAdmin'
import { forwardRef } from 'react';
import Tippy from '@tippyjs/react';
import { viewVar } from '../../graphql/cache';
import { useReactiveVar } from '@apollo/client';
import { PrimaryNavItem } from './PrimaryNavItem';

export default function PrimaryNav({isSlim, pageNavState}) {

  const view = useReactiveVar(viewVar);

  const navStructure = view.isAdmin ? navStructureAdmin : navStructureUser;
  
  return (
    <div id="primaryNav" className={`transition-width ${isSlim ? 'w-16' : 'w-64'}`}>
      <div className="sticky z-30 top-0">
        <div className={`h-18 bg-main${view.isAdmin ? '-dark' : ''} flex justify-center py-4`}>
          <img src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/elp-logo-notext-white.svg`} className="w-auto"/>
          {/* {isSlim ? 'secondary active' : 'secondary INACTIVE'} */}
        </div>

        <div 
          id="navWrapper"
          // className="h-full overflow-y-auto scrolling-touch lg:h-auto lg:block lg:relative lg:sticky lg:bg-transparent overflow-hidden bg-white mr-24 lg:mr-0"
          className="h-full overflow-visible scrolling-touch lg:h-auto lg:block lg:relative lg:sticky lg:bg-transparent bg-white mr-24 lg:mr-0"
        >
          <nav
            id="nav"
            className="overflow-x-hidden"
          >
            <ul>

              { navStructure.map((item, index) => {
                let menuItemClasses, menuIconClasses
                if (pageNavState?.topLevel === item.name) {

                // if (current === item.urlPath) {
                  menuIconClasses = 'bg-blue bg-opacity-20 text-blue'
                  menuIconClasses = 'bg-blue text-white border-white'
                } else {
                  menuItemClasses = 'group bg-white text-blue-dark hover:bg-blue hover:bg-opacity-10'
                  // menuIconClasses = 'group-hover:bg-white border-2 group-hover:border-blue-dark'
                  menuIconClasses = ''
                }

                const ThisWillWork = forwardRef((props, ref) => {
                  return <PrimaryNavItem {...props} innerRef={ref} />;
                });

                if(isSlim) {
                  return (
                    <Tippy
                      key={index}
                      className="bg-main text-white p-2 cursor-pointer whitespace-nowrap"
                      interactive={true}
                      hideOnClick={false}
                      placement='right'
                      theme="memberhub"
                      
                      // placement='right-start'
                      // placement='right-end'
                      // theme='light'
                      content = {item.title}
                      // content={
                      //   <>
                      //     <ul className="flex flex-col">
                      //       {
                      //         item.subPages?.map((item, index) => (
                      //           <li key={index} onClick={() => {}}>
                      //             <Link href={item.urlPath}>
                      //               {item.title}
                      //             </Link>
                      //           </li>
                      //         ))
                      //       }
                      //     </ul>
                      //   </>
                      // }
                    >
                      <ThisWillWork item={item} index={index} iconClasses={menuIconClasses} itemClasses={menuItemClasses} />
                    </Tippy>
                  )
                } else {
                  return (
                    <PrimaryNavItem key={index} item={item} index={index} iconClasses={menuIconClasses} itemClasses={menuItemClasses} />
                    // <li className={current === item.title ? styles.current : ''} key={index}>
                  )
                }
              })}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  )
}