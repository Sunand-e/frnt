import {TextLeft} from '@styled-icons/bootstrap/TextLeft'
import {Video} from '@styled-icons/fluentui-system-filled/Video'
import {Speaker2} from '@styled-icons/fluentui-system-filled/Speaker2'
import {Document} from '@styled-icons/fluentui-system-filled/Document'
import {Category} from '@styled-icons/material-rounded/Category'
import {FlowChart} from '@styled-icons/remix-editor/FlowChart'
import {Library} from "@styled-icons/ionicons-solid/Library"
import {Flow} from "@styled-icons/fluentui-system-regular/Flow"
import {GraduationCap} from "@styled-icons/fa-solid/GraduationCap"
import {Users} from "@styled-icons/fa-solid/Users"
import {Group2} from "@styled-icons/remix-fill/Group2"
import {Identification} from "@styled-icons/heroicons-solid/Identification"
import {Calendar2PlusFill} from "@styled-icons/bootstrap/Calendar2PlusFill"
import {CalendarAlt} from "@styled-icons/fa-regular/CalendarAlt"
import {Buildings} from "@styled-icons/boxicons-solid/Buildings"
import {Image} from '@styled-icons/fluentui-system-filled/Image'

const navStructureAdmin = [
  {
    name: 'dashboard',
    title: 'Dashboard',
    urlPath: '/admin',
    icon: 'house-chimney',
    subPages: [],
  },
  {
    name: 'resources',
    title: 'Resource Library',
    urlPath: '/admin/resources',
    icon: 'school',
    subPages: [
      {
        name: 'overview',
        title: 'All Library Items',
        urlPath: '/admin/resources',
        icon: Library
      },
      // {
      //   name: 'guides',
      //   title: 'Guides',
      //   urlPath: '/admin/resources?type=guide',
      //   icon: TextLeft,
      // },
      {
        name: 'documents',
        title: 'Documents',
        urlPath: '/admin/resources?type=document',
        icon: Document,
      },
      {
        name: 'videos',
        title: 'Videos',
        urlPath: '/admin/resources?type=video',
        icon: Video,
      },
      {
        name: 'images',
        title: 'Images',
        urlPath: '/admin/resources?type=image',
        icon: Image,
      },
      {
        name: 'audio',
        title: 'Audio',
        urlPath: '/admin/resources?type=audio',
        icon: Speaker2,
      },
      // {
      //   name: 'process-flows',
      //   title: 'Process Flows',
      //   urlPath: '/admin/resources?type=process_flow',
      //   icon: FlowChart,
      // },
      // {
      //   name: 'add',
      //   title: 'Add New',
      //   urlPath: '/admin/resources/add',
      // },
    ],
  },
  {
    name: 'courses',
    title: 'Courses',
    urlPath: '/admin/courses',
    icon: 'graduation-cap',
    subPages: [
      {
        name: 'courses',
        title: 'All Courses',
        urlPath: '/admin/courses',
        icon: GraduationCap
      },
      {
        name: 'categories',
        title: 'Categories',
        urlPath: '/admin/tags',
        icon: Category
      },
      {
        name: 'pathways',
        title: 'Pathways',
        urlPath: '/admin/pathways',
        icon: Flow
      },
    ],
  },
  {
    name: 'users',
    title: 'Users',
    urlPath: '/admin/users',
    icon: 'users',
    subPages: [
      {
        name: 'overview',
        title: 'Users',
        urlPath: '/admin/users',
        icon: Users
      },
      {
        name: 'groups',
        title: 'Groups',
        urlPath: '/admin/users/groups',
        icon: Group2
      },
      {
        name: 'roles',
        title: 'Roles',
        urlPath: '/admin/users/roles',
        icon: Identification
      },
      // {
      //   name: 'exports',
      //   title: 'My Exports',
      //   urlPath: '/admin/users/exports',
      // },
      // {
      //   name: 'memberships',
      //   title: 'Memberships',
      //   urlPath: '/admin/users/memberships',
      // },
      // {
      //   name: 'leaderboard',
      //   title: 'Leaderboard',
      //   urlPath: '/admin/users/leaderboard',
      // },
      // {
      //   name: 'survey',
      //   title: 'Survey',
      //   urlPath: '/admin/users/survey',
      // },
    ],
  },
  {
    name: 'mediaresources',
    title: 'Media Library',
    urlPath: '/admin/mediaresources',
    icon: 'photo-video',
  },
  {
    name: 'events',
    title: 'Events',
    urlPath: '/admin/events',
    icon: 'calendar-alt',
    subPages: [
      {
        name: 'events',
        title: 'All Events',
        urlPath: '/admin/events',
        icon: CalendarAlt
      },
      {
        name: 'virtual',
        title: 'Virtual Event',
        urlPath: '/admin/events?type=virtual',
        icon: CalendarAlt
      },
      {
        name: 'physical',
        title: 'Physical Event',
        urlPath: '/admin/events?type=physical',
        icon: CalendarAlt
      },
    ],
  },
  {
    name: 'reports',
    title: 'Reporting',
    urlPath: '/admin/reports',
    icon: 'chart-line',
  },
  {
    name: 'tenants',
    title: 'Tenants',
    urlPath: '/admin/tenants',
    icon: Buildings,
    superAdminOnly: true
  },
  // {
  //   name: 'messaging',
  //   title: 'Messaging',
  //   urlPath: '/admin/messaging',
  //   icon: 'comments',
  // },
  // {
  //   name: 'store',
  //   title: 'Store',
  //   urlPath: '/admin/store',
  //   icon: 'store',
  //   subPages: [
  //     {
  //       title: 'Overview',
  //       urlPath: '/admin/store',
  //     },
  //     {
  //       title: 'Products',
  //       urlPath: '/admin/store/products',
  //     },
  //     {
  //       title: 'Offers',
  //       urlPath: '/admin/store/offers',
  //     },
  //     {
  //       title: 'Subscriptions',
  //       urlPath: '/admin/store/subscriptions',
  //     },
  //     {
  //       title: 'Trials',
  //       urlPath: '/admin/store/trials',
  //     },
  //     {
  //       title: 'Coupons',
  //       urlPath: '/admin/store/coupons',
  //     },
      
      
  //   ],
  // },
]

export default navStructureAdmin
