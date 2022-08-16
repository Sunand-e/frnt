import {
  CheckCircleIcon,
  OfficeBuildingIcon
} from '@heroicons/react/solid'
import {gql, useQuery} from "@apollo/client";
import dayjs from 'dayjs';

const USER_FIRST_NAME = gql`
  query GetUserWelcome {
    user {
      fullName
    }
  }
`

const [hour, am_pm] = dayjs().format("dddd,h,A").split(",");

let timeOfDay;

if (am_pm === 'AM') {
  timeOfDay = 'morning';
} else {
  if (hour === '12' || hour < '6') {
    timeOfDay = 'afternoon';
  } else {
    timeOfDay = 'evening';
  }
}

const WelcomeUserPanel = () => {

  const { loading, error, data } = useQuery(USER_FIRST_NAME);

  return (
    <div className="bg-white shadow hidden md:block">
      <div className="px-4 sm:px-6 lg:max-w-screen-2xl lg:mx-auto lg:px-8">
        <div className="py-6 md:flex md:items-center md:justify-between lg:border-t lg:border-gray-200">
          <div className="flex-1 min-w-0">
            {/* Profile */}
            <div className="flex items-center">
              <img
                  className="hidden h-16 w-16 rounded-full sm:block"
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.6&w=256&h=256&q=80"
                  alt=""
              />
              <div>
                <div className="flex items-center">
                  <img
                      className="h-16 w-16 rounded-full sm:hidden"
                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.6&w=256&h=256&q=80"
                      alt=""
                  />
                  <h1 className="ml-3 text-2xl font-bold leading-7 text-gray-900 sm:leading-9 sm:truncate">
                    {/*Good morning, {data?.user?.fullName || error?.message}*/}
                    Good { timeOfDay }, { data?.user?.fullName }
                  </h1>
                </div>
                <dl className="mt-6 flex flex-col sm:ml-3 sm:mt-1 sm:flex-row sm:flex-wrap">
                  <dt className="sr-only">Company</dt>
                  <dd className="flex items-center text-sm text-gray-500 font-medium capitalize sm:mr-6">
                    <OfficeBuildingIcon
                        className="shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                        aria-hidden="true"
                    />
                    Duke street studio
                  </dd>
                  <dt className="sr-only">Account status</dt>
                  {/*<dd className="mt-3 flex items-center text-sm text-gray-500 font-medium sm:mr-6 sm:mt-0 capitalize">*/}
                  {/*  <CheckCircleIcon*/}
                  {/*      className="shrink-0 mr-1.5 h-5 w-5 text-green-400"*/}
                  {/*      aria-hidden="true"*/}
                  {/*  />*/}
                  {/*  Verified account*/}
                  {/*</dd>*/}
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WelcomeUserPanel
