import { forwardRef, useEffect, useState } from "react"
import { gql, useFragment_experimental, useReactiveVar } from '@apollo/client'
import { motion } from 'framer-motion'
import { useRouter } from '../../utils/router'
import useGetUserCourse from "../../hooks/users/useGetUserCourse"

const SidebarItemProgress = ({id}) => {

  const router = useRouter()
  const { id: courseId } = router.query
  
  const { lessons } = useGetUserCourse(courseId);
    
  let lessonEdge = lessons?.edges.find(edge => edge.node.id === id)

  const [progress, setProgress] = useState(0)
  console.log('lessonEdge')
  console.log(lessonEdge)
  console.log(id)
  useEffect(() => {
      // alert(lessonEdge?.status)
    switch(lessonEdge?.status) {
      case 'in_progress': {
        setProgress(0.5)
        break
      }
      case 'completed': {
        setProgress(1)
        break
      }
      default: {
        setProgress(0)
        break
      }
    }
  },[lessonEdge?.status])

  const circleStyle = {
    strokeDashoffset: 0,
    strokeWidth: '15%',
    fill: 'none'
  }
  return (
    <div className="ml-auto h-7 flex space-x-2 ">
    <svg id="progress" width="100%" height="auto" viewBox="0 0 100 100">
      <circle 
        cx="50" 
        cy="50" 
        r="30" 
        pathLength="1"
        className='stroke-main/10'
        style={circleStyle}
      />
      <motion.circle
        cx="50"
        cy="50"
        r="30"
        pathLength="0"
        className="stroke-main"
        style={{ ...circleStyle, rotate: '-90deg' }}
        transition={{ duration: 0.8 }}
        animate={{
          pathLength: progress
        }}
      />
    </svg>
  </div>
  )
}

export default SidebarItemProgress