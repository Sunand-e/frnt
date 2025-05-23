import {Fragment, useEffect, useState} from 'react'
import navStructureUser from '../../../navStructureUser'
import navStructureAdmin from '../../../navStructureAdmin'
import PrimaryNav from './PrimaryNav'
import SecondaryNav from './SecondaryNav'
import {Dialog, Transition} from "@headlessui/react";
import Bars3CenterLeftIcon from "@heroicons/react/24/outline/Bars3CenterLeftIcon";
import XMarkIcon from "@heroicons/react/24/outline/XMarkIcon";
import { useViewStore } from '../../../hooks/useViewStore'

export default function NavContainer({navState, sidebarComponent}) {

  const isAdminView = useViewStore(state => state.isAdminView)
  const isSlimNav = useViewStore(state => state.isSlimNav)
  const showSecondaryNav = useViewStore(state => state.showSecondaryNav)

  const navStructure = isAdminView ? navStructureAdmin : navStructureUser;

  // If the 'topLevel' property of navState is empty, create the default navstate.
  const pageNavState = navState?.topLevel ? navState : {
    topLevel: 'dashboard',
    // secondary: 'dashboard'
  }

  const primaryNavItem = navStructure.find(
    item => item.name === pageNavState.topLevel
  )

  const showSecondary = !sidebarComponent && (showSecondaryNav || primaryNavItem?.subPages?.length > 0)
  const isSlim = showSecondary || sidebarComponent

  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
<>
  <button
      type="button"
      className="absolute z-30 top-6 left-20px h-px-50 px-4 border-r border-gray-200 text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-cyan-500 lg:hidden"
      onClick={() => setSidebarOpen(true)}
  >
    <span className="sr-only">Open sidebar</span>
    <Bars3CenterLeftIcon className="h-6 w-6" aria-hidden="true" />
  </button>
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog as="div" className="relative z-40 lg:hidden" onClose={setSidebarOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
          </Transition.Child>

          <div className="fixed inset-0 flex z-50">
            <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="dialog-panel-menu relative flex-1 flex flex-col max-w-max w-full bg-white">
                <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                  <div className="absolute top-0 right-0 -mr-12 pt-2">
                    <button
                        type="button"
                        className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                        onClick={() => setSidebarOpen(false)}
                    >
                      <span className="sr-only">Close sidebar</span>
                      <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                    </button>
                  </div>
                </Transition.Child>
                <div
                    id="sidebar"
                    className={`shadow-md font-text-base bg-red  inset-0 flex-none flex h-full bg-opacity-25 lg:bg-white lg:h-auto lg:overflow-y-visible lg:pt-0`}
                >
                  <PrimaryNav isSlim={isSlim} pageNavState={pageNavState}/>
                  <SecondaryNav showSecondary={showSecondary} primaryNavItem={primaryNavItem} pageNavState={pageNavState} />
                  { sidebarComponent && (
                    <div className="sticky top-18 h-[calc(100vh)] w-[300px] bg-main bg-opacity-10 flex flex-col px-3 py-3 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 scrollbar-thumb-rounded-full scrollbar-track-rounded-full overflow-x-auto">
                      { sidebarComponent }
                    </div>
                  )}
                </div>
              </Dialog.Panel>
            </Transition.Child>
            <div className="shrink-0 w-14" aria-hidden="true">
              {/* Dummy element to force sidebar to shrink to fit close icon */}
            </div>
          </div>
        </Dialog>
      </Transition.Root>

      <div className="hidden shadow-md font-text-base relative z-40 inset-0 flex-none lg:flex lg:static lg:h-auto lg:overflow-y-visible lg:pt-0">
    <div

      id="sidebar"
      className={`shadow-md font-text-base bg-red  inset-0 flex-none flex h-18 bg-opacity-25 lg:bg-white lg:h-auto lg:overflow-y-visible lg:pt-0`}
    >
      <PrimaryNav isSlim={isSlim} pageNavState={pageNavState} />
      <SecondaryNav showSecondary={showSecondary} primaryNavItem={primaryNavItem} pageNavState={pageNavState} />
      { sidebarComponent && (
        <div className="sticky top-18 h-[calc(100vh-36px)] w-[256px]  bg-main bg-opacity-10 flex flex-col justify-stretch scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 scrollbar-thumb-rounded-full scrollbar-track-rounded-full overflow-x-auto">
          { sidebarComponent }
        </div>
      )}
    </div>
        </div>
</>
  )
}
