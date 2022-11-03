import { motion } from "framer-motion"

const ProgressBar = ({value, className=''}) => {
  return (
    <div className={`${className} w-full bg-white/80 rounded-full dark:bg-gray-700 shadow-sm`}>
    <motion.div
      initial={{ width: 0 }}
      animate={{ width: `${value}%` }}
      transition={{ duration: 1, delay:0 }}
      className="bg-green-600/70 text-xs font-medium flex justify-center items-center font-bold text-main-superlight text-center leading-none rounded-full"
      style={{
        minWidth: `30px`,
        height: '14px',
        padding: '2px'
      }}
    >
      {value}%
    </motion.div>
  </div>
  )
}

export default ProgressBar
