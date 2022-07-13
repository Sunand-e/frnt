const ProgressBar = ({value, className}) => {
  return (
    <div className={`${className} w-full bg-white/80 rounded-full dark:bg-gray-700 shadow-sm`}>
    <div
      className="bg-green-600/70 text-xs font-medium flex justify-center items-center font-bold text-main-100 text-center leading-none rounded-full"
      style={{
        width: `${value}%`,
        minWidth: `30px`,
        height: '14px',
        padding: '2px'
      }}
    >
      {value}%
    </div>
  </div>
  )
}

export default ProgressBar
