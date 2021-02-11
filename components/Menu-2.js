import Menu from './Menu'
export default function Menu2() {

  const items = [
    {
      title: 'Dashboard',
      link: '/'
    },
    {
      title: 'Programme',
      link: '/programme'
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
      title: 'Q&A',
      link: '/workshops'
    },
    {
      title: 'Community',
      link: '/forum'
    },
  ]
  return (
    <Menu items={items} className="max-w-screen-xl bg-blue mx-auto text-lg text-white uppercase p-8 flex justify-between space-x-5" />
  )
}