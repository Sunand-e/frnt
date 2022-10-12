import Menu from './Menu'
export default function Navigation() {

  const items = [
    {
      title: 'Dashboard',
      link: '/'
    },
    {
      title: 'Programmes',
      link: '/programmes'
    },
    {
      title: 'Library',
      link: '/library'
    },
    {
      title: 'Resources',
      link: '/resources'
    },
    {
      title: 'Upcoming Events',
      link: '/events'
    },
    {
      title: 'Community',
      link: '/forum'
    },
  ]
  return (
    <Menu items={items} className="max-w-screen-xl bg-main mx-auto text-lg text-white uppercase p-8 flex justify-between space-x-5" />
  )
}
