const DashboardItem = ({title}) => {  
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-lg leading-6 font-medium text-gray-900">title</h2>
      { children }
    </div>
  );
}
export default DashboardItem

