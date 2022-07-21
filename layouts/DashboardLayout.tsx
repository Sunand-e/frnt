import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from '../utils/router';
import Layout from './Layout';

export default function DashboardLayout( {page, navState} ) {
  return (
    <Layout 
      page={page}
      navState={navState}
    >
      <div className="w-full h-[calc(100vh-4.5rem)] mx-auto bg-main-superlight">
        <div className="lg:flex h-full">
          <div id="content-wrapper" className="min-w-0 w-full flex-auto lg:static lg:max-h-full lg:overflow-visible h-full">
            <ToastContainer />
            {page}
          </div>
        </div>
      </div>
    </Layout>
  )
}
