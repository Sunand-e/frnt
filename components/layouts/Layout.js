import Footer from '../Footer'
import Header from '../Header'
import Menu2 from '../Menu-2'
import PageTitle from '../PageTitle'
import Sidebar from '../Sidebar'

export default function Layout( {children, title, subtitle, sidebar} ) {
  return (
    <>
      <Header />
      <div className="bg-blue">
        <Menu2 />
      </div>
      <PageTitle title={title} subtitle={subtitle} />
      <div className="max-w-screen-xl px-8 w-full mx-auto flex justify-between my-9">
        <div className="flex-grow">
          { children }
        </div>
        { sidebar && <Sidebar />}
      </div>
      <Footer />
    </>
  )
}
