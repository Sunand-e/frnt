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
      },
      {
        name: 'available',
        title: 'Available Courses',
        urlPath: '/courses/available',
      },
      {
        name: 'pathways',
        title: 'Pathways',
        urlPath: '/courses/pathways'
      },
      
    ],
  },
  
  {
    name: 'library',
    title: 'Content Library',
    urlPath: '/library',
    icon: 'school',
    subPages: [
      {
        name: 'overview',
        title: 'Overview',
        urlPath: '/library',
      },
      
    ],
  },
  {
    name: 'events',
    title: 'Live Sessions',
    urlPath: '/events',
    icon: 'calendar-alt',
  },
  {
    name: 'community',
    title: 'Community',
    urlPath: '/community',
    icon: 'comments',
  },
  {
    name: 'store',
    title: 'Store',
    urlPath: '/store',
    icon: 'store',
    subPages: [
      {
        name: 'products',
        title: 'Products',
        urlPath: '/store',
      },
      {
        name: 'offers',
        title: 'Offers',
        urlPath: '/store/offers',
      },
      {
        name: 'trials',
        title: 'Trials',
        urlPath: '/store/trials',
      },
      {
        name: 'coupons',
        title: 'Coupons',
        urlPath: '/store/coupons',
      },
    ],
  },
]

export default navStructureUser