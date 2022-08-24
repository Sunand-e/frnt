import Button from "../../Button";
import {UserAdd} from '@styled-icons/typicons/UserAdd'
import {GraduationCap} from "@styled-icons/fa-solid/GraduationCap"
import {Group2} from "@styled-icons/remix-fill/Group2"

import Link from "next/link";
import DashboardItem from "./DashboardItem";

const QuickActionLink = ({text,icon,href}) => {
  const IconComponent = icon
  return (
    <Link href={href}>
      <a className="text-sm font-medium text-gray-500 flex space-x-4">
        <span className="w-6"><IconComponent /></span>
        <span className="text-gray-900">{text}</span>
      </a>
    </Link>
  )
}
const QuickActions = () => {
  
  return (
    <DashboardItem title="Quick actions">
        <div className="flex flex-col items-start px-4 py-6 space-y-4 bg-white shadow rounded-md ">
          <QuickActionLink
            text={'Add a new course'} 
            href='/admin/courses/setup'
            icon={GraduationCap}
          />
          <QuickActionLink
            text={'Add a new user'} 
            href='/admin/users/new'
            icon={UserAdd}
            />
          <QuickActionLink
            text={'Add a new group'} 
            href='/admin/users/groups/add'
            icon={Group2}
          />
        </div>
    </DashboardItem>
  );
}
export default QuickActions

