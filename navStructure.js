const navStructure = [
  {
    name: 'dashboard',
    title: 'Dashboard',
    urlPath: '/',
    subPages: [
      {
        name: 'dashboard1',
        title: 'Dashboard 1',
        urlPath: '/dashboard/1',
      },
      {
        name: 'dashboard2',
        title: 'Dashboard 2',
        urlPath: '/dashboard/2',
      },
      {
        name: 'dashboard3',
        title: 'Dashboard 3',
        urlPath: '/dashboard/3',
      },
    ],
  },
  {
    name: 'courses',
    title: 'Courses',
    urlPath: '/library',
    subPages: [
      {
        name: 'courses1',
        title: 'Courses 1',
        urlPath: '/library',
      },
      {
        name: 'courses1',
        title: 'Courses 1',
        urlPath: '/courses/1',
      },
      {
        name: 'courses2',
        title: 'Courses 2',
        urlPath: '/courses/2',
      },
      {
        name: 'courses3',
        title: 'Courses 3',
        urlPath: '/courses/3',
      },
    ],
  },

  {
    name: 'programmes',
    title: 'Programmes',
    urlPath: '/programmes'
  },
  {
    name: 'library',
    title: 'Library',
    urlPath: '/library',
    subPages: [
      {
        name: 'courses1',
        title: 'Courses 1',
        urlPath: '/library',
      },
      {
        name: 'courses1',
        title: 'Courses 1',
        urlPath: '/courses/1',
      },
      {
        name: 'courses2',
        title: 'Courses 2',
        urlPath: '/courses/2',
      },
      {
        name: 'courses3',
        title: 'Courses 3',
        urlPath: '/courses/3',
      },
    ],
  },
  {
    name: 'resources',
    title: 'Resources',
    urlPath: '/resources',
  },
  {
    name: 'events',
    title: 'Events',
    urlPath: '/events',
    subPages: [
      {
        title: 'Events 1',
        urlPath: '/events/1',
      },
      {
        title: 'Events 2',
        urlPath: '/events/2',
      },
      {
        title: 'Events 3',
        urlPath: '/events/3',
      },
    ],
  },
  {
    name: 'community',
    title: 'Community',
    urlPath: '/forum'
  },
]
export default navStructure