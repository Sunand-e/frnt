const navStructureAdmin = [
  {
    name: 'dashboard',
    title: 'Dashboard',
    urlPath: '/admin',
    icon: 'house-chimney',
    subPages: [],
  },
  {
    name: 'library',
    title: 'Content Library',
    urlPath: '/admin/library',
    icon: 'school',
    subPages: [
      {
        name: 'overview',
        title: 'All Library Items',
        urlPath: '/admin/library',
      },
      {
        name: 'oversview',
        title: 'Guides',
        urlPath: '/admin/library',
      },
      {
        name: 'overvsiew',
        title: 'Videos',
        urlPath: '/admin/library',
      },
      {
        name: 'ovesrview',
        title: 'Podcasts',
        urlPath: '/admin/library',
      },
      {
        name: 'ovesrview',
        title: 'Process Flows',
        urlPath: '/admin/library',
      },
      // {
      //   name: 'add',
      //   title: 'Add New',
      //   urlPath: '/admin/library/add',
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
      },
      {
        name: 'categories',
        title: 'Categories',
        urlPath: '/admin/courses/categories',
      },
      {
        name: 'pathways',
        title: 'Pathways',
        urlPath: '/admin/courses/pathways',
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
      },
      {
        name: 'groups',
        title: 'Groups',
        urlPath: '/admin/users/groups',
      },
      {
        name: 'roles',
        title: 'Roles',
        urlPath: '/admin/users/roles',
      },
      {
        name: 'exports',
        title: 'My Exports',
        urlPath: '/admin/users/exports',
      },
      {
        name: 'memberships',
        title: 'Memberships',
        urlPath: '/admin/users/memberships',
      },
      {
        name: 'leaderboard',
        title: 'Leaderboard',
        urlPath: '/admin/users/leaderboard',
      },
      {
        name: 'survey',
        title: 'Survey',
        urlPath: '/admin/users/survey',
      },
    ],
  },
  {
    name: 'medialibrary',
    title: 'Media Library',
    urlPath: '/admin/medialibrary',
    icon: 'photo-video',
  },
  {
    name: 'reporting',
    title: 'Reporting',
    urlPath: '/admin/reports',
    icon: 'chart-line',
  },
  {
    name: 'ecommunity',
    title: 'E-community',
    urlPath: '/admin/community',
    icon: 'comments',
  },
  {
    name: 'events',
    title: 'Live Sessions',
    urlPath: '/admin/events',
    icon: 'calendar-alt',
    subPages: [
      {
        name: 'events',
        title: 'Live Sessions',
        urlPath: '/admin/events',
      },
      {
        name: 'events',
        title: 'Add New',
        urlPath: '/admin/events/add',
      },
    ],
  },
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