import CourseTabs from './CourseTabs';

const Dashboard = () => {
  return (
    <div className="max-w-screen-2xl mx-auto px-4 py-8 lg:px-6 xl:px-8">
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 xl:col-span-12">
          <CourseTabs />
        </div>
      </div>
    </div>
  )
}

export default Dashboard
