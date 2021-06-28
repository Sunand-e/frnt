const navStructureUser = [
  {
    name: 'dashboard',
    title: 'Dashboard',
    urlPath: '/',
  },
  {
    name: 'courses',
    title: 'Courses',
    urlPath: '/courses',
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
  },
  {
    name: 'community',
    title: 'Community',
    urlPath: '/community'
  },
  {
    name: 'store',
    title: 'Store',
    urlPath: '/store',
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