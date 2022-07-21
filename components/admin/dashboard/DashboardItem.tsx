const DashboardItem = ({title, className='', children}) => {  
  return (
    <div className={className}>
      <h2 className="text-lg leading-6 font-medium text-gray-900 mb-4">{title}</h2>
      { children }
    </div>
  );
}
export default DashboardItem