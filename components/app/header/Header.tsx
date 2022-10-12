import HeaderButtons from "./HeaderButtons";
import PageTitle from "./PageTitle";
import ProfileWidget from "./ProfileWidget";

export default function Header() {

  return (
    <>
      <div className="sticky top-0 z-20 w-full mx-auto bg-white shadow-sm">
        <div className="h-18 mx-auto flex justify-between max-w-screen-2xl w-full pl-20 pr-4 lg:pl-6 lg:pr-6 xl:pl-8 xl:pr-8">
          <div className="flex items-center border-b border-gray-200 lg:border-b-0">
            <PageTitle />
              {/* <a className="overflow-hidden w-auto text-lg text-main-secondary font-bold" href="/"> */}
                {/* {` isAdmin: ${view.isAdmin ? 'on' : 'off'}.`} */}
              {/* </a> */}
          </div>
          <div className="flex items-center justify-between pl-4 sm:pl-6 lg:px-0">
              <HeaderButtons />
              <ProfileWidget />
          </div>
        </div>
      </div>

{/*       
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
        </svg></button> */}
    </>
  )
}
