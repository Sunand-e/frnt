import {TextLeft} from '@styled-icons/bootstrap/TextLeft'
import {Video} from '@styled-icons/fluentui-system-filled/Video'
import {Speaker2} from '@styled-icons/fluentui-system-filled/Speaker2'
import {Document} from '@styled-icons/fluentui-system-filled/Document'
import {Category} from '@styled-icons/material-rounded/Category'
import {FlowChart} from '@styled-icons/remix-editor/FlowChart'
import {Library} from "@styled-icons/ionicons-solid/Library"
import {Flow} from "@styled-icons/fluentui-system-regular/Flow"
import {GraduationCap} from "@styled-icons/fa-solid/GraduationCap"

const navStructureUser = [
  {
    name: 'dashboard',
    title: 'Dashboard',
    urlPath: '/',
    icon: 'home'
  },
  {
    name: 'courses',
    title: 'Courses',
    urlPath: '/courses',
    icon: 'graduation-cap',
    subPages: [
      {
        name: 'mycourses',
        title: 'My Courses',
        urlPath: '/courses',
        icon: GraduationCap
      },
      {
        name: 'categories',
        title: 'Categories',
        urlPath: '/categories',
        icon: Category
      },
      {
        name: 'pathways',
        title: 'Pathways',
        urlPath: '/pathways',
        icon: Flow
      },
      
    ],
  },
  
  {
    name: 'library',
    title: 'Resource Library',
    urlPath: '/library',
    icon: 'school',
    subPages: [
      {
        name: 'overview',
        title: 'All Library Items',
        urlPath: '/library',
        icon: Library
      },
      {
        name: 'library-guides',
        title: 'Guides',
        urlPath: '/library?type=guide',
        icon: TextLeft,
      },
      {
        name: 'library-videos',
        title: 'Videos',
        urlPath: '/library?type=video',
        icon: Video,
      },
      {
        name: 'library-documents',
        title: 'Documents',
        urlPath: '/library?type=document',
        icon: Document,
      },
      {
        name: 'library-podcasts',
        title: 'Podcasts',
        urlPath: '/library?type=podcast',
        icon: Speaker2,
      },
      {
        name: 'library-process-flows',
        title: 'Process Flows',
        urlPath: '/library?type=process_flow',
        icon: FlowChart,
      }
    ]
  },
  {
    name: 'events',
    title: 'Live Sessions',
    urlPath: '/events',
    icon: 'calendar-alt',
  },
  // {
  //   name: 'messaging',
  //   title: 'Messaging',
  //   urlPath: '/messaging',
  //   icon: 'comments',
  // },
  // {
  //   name: 'community',
  //   title: 'Community',
  //   urlPath: '/community',
  //   icon: 'comments',
  // },
  // {
  //   name: 'store',
  //   title: 'Store',
  //   urlPath: '/store',
  //   icon: 'store',
  //   subPages: [
  //     {
  //       name: 'products',
  //       title: 'Products',
  //       urlPath: '/store',
  //     },
  //     {
  //       name: 'offers',
  //       title: 'Offers',
  //       urlPath: '/store/offers',
  //     },
  //     {
  //       name: 'trials',
  //       title: 'Trials',
  //       urlPath: '/store/trials',
  //     },
  //     {
  //       name: 'coupons',
  //       title: 'Coupons',
  //       urlPath: '/store/coupons',
  //     },
  //   ],
  // },
]

export default navStructureUser