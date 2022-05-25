import { useReactiveVar } from '@apollo/client'
import Header from '../components/header/Header'
import NavContainer from '../components/navigation/NavContainer'
import TopNotificationBar from '../components/TopNotificationBar'
import { viewVar } from '../graphql/cache'

export default function Layout( {page, children, navState} ) {
  const view = useReactiveVar(viewVar)
  return (
    <>
      <TopNotificationBar />
      <div className={`flex min-h-full`}>
        <NavContainer page={page} navState={navState} />
        <div className="flex-grow">
          <Header />
          { children }
        </div>
      </div>
    </>
  )
}
