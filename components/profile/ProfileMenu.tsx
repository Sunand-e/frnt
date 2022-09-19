/* This example requires Tailwind CSS v2.0+ */

import {User} from '@styled-icons/fa-solid/User'
import { Lock } from '@styled-icons/boxicons-regular/Lock'
import Link from 'next/link'
import { useRouter } from 'next/router'

const navigation = [
  { name: 'Edit Profile', icon: User, href: '/profile', current: true },
  { name: 'Change Password', icon: Lock, href: '/profile/change-password', current: false },
  // { name: 'Caps', icon: Lock, href: '/profile/caps', current: false },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function ProfileMenu() {
  
  const router = useRouter()
  const path = router.asPath

  return (
      <div className="flex flex-grow flex-col max-w-xs rounded-md overflow-hidden shadow-md mr-8">
        <nav className="flex-1 space-y-1 bg-white px-2 py-4" aria-label="Sidebar">
          {navigation.map((item) => {
            const isCurrent = path === item.href
            return (
              <Link href={item.href}>
              <a
                key={item.name}
                className={classNames(
                  isCurrent
                    ? 'bg-main/10 border-main text-main'
                    : 'border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                  'group flex items-center px-3 py-2 text-sm font-medium border-l-4 rounded-md '
                )}
              >
                <item.icon
                  className={classNames(
                    isCurrent ? 'text-main' : 'text-gray-400 group-hover:text-gray-500',
                    'mr-3 flex-shrink-0 h-6 w-6'
                  )}
                  aria-hidden="true"
                />
                {item.name}
              </a>
              </Link>
            )
          })}
        </nav>
      </div>
  )
}
