const ProgressBar = ({value}) => {
  return (
    <div className="w-full bg-white/80 rounded-full dark:bg-gray-700 shadow-sm -mb-1">
    <div
      className="bg-green-500/70 text-xs font-medium text-blue-100 text-center leading-none rounded-full" 
      style={{
        width: `${value}%`,
        minWidth: `30px`,
        padding: '2px'
      }}
    >
      {value}%
    </div>
  </div>
  )
}

export default ProgressBar