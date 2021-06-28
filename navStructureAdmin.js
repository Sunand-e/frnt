const navStructureAdmin = [
  {
    name: 'dashboard',
    title: 'Dashboard',
    urlPath: '/admin',
    subPages: [],
  },
  {
    name: 'library',
    title: 'Content Library',
    urlPath: '/admin/library',
    subPages: [
      {
        name: 'overview',
        title: 'Overview',
        urlPath: '/admin/library',
      },
      {
        name: 'add',
        title: 'Add New',
        urlPath: '/admin/library/add',
      },
    ],
  },
  {
    name: 'courses',
    title: 'Courses',
    urlPath: '/admin/courses',
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
    name: 'ecommunity',
    title: 'E-community',
    urlPath: '/admin/community',
  },
  {
    name: 'events',
    title: 'Live Sessions',
    urlPath: '/admin/events',
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
  {
    name: 'store',
    title: 'Store',
    urlPath: '/admin/store',
    subPages: [
      {
        title: 'Overview',
        urlPath: '/admin/store',
      },
      {
        title: 'Products',
        urlPath: '/admin/store/products',
      },
      {
        title: 'Offers',
        urlPath: '/admin/store/offers',
      },
      {
        title: 'Subscriptions',
        urlPath: '/admin/store/subscriptions',
      },
      {
        title: 'Trials',
        urlPath: '/admin/store/trials',
      },
      {
        title: 'Coupons',
        urlPath: '/admin/store/coupons',
      },
      

    ],
  },
]
export default navStructureAdmin