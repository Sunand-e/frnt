import Button from "../../Button";
import {UserAdd} from '@styled-icons/typicons/UserAdd'
import {GraduationCap} from "@styled-icons/fa-solid/GraduationCap"
import {Group2} from "@styled-icons/remix-fill/Group2"

import Link from "next/link";

const QuickActionLink = ({text,icon,href}) => {
  const IconComponent = icon
  return (
    <Link href={href}>
      <a className="text-main-secondary flex space-x-4 text-xl">
        <span className="w-8"><IconComponent /></span>
        <span>{text}</span>      
      </a>
    </Link>
  )
}
const QuickActions = () => {
  
  return (
    <>
    <div className="-mx-4 -mt-4 bg-main/20 rounded-t-md flex justify-between items-center px-4 py-2">
      <h3 className="text-main-secondary text-xl">Quick actions</h3>
    </div>

    <div className="flex flex-col items-start px-4 py-2 space-y-4">
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
        href='/admin/groups/new'
        icon={Group2}
      />
    </div>
    </>
  );
}
export default QuickActions

