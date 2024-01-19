import useGetUserCourse from "../../hooks/users/useGetUserCourse"
import { useRouter } from "../../utils/router"
import ProgressBar from "../common/ProgressBar"

const CourseSidebarHeader = ({showProgress=true}) => {
  
  const router = useRouter()
  const { id, cid } = router.query
  const { courses } = useGetUserCourse(id)
  const courseEdge = courses?.edges[0]
  const tagEdges = courseEdge?.node?.tags?.edges

  return (
    <div className="shrink-0 flex flex-col justify-around p-2 px-4 h-18 bg-main bg-opacity-10 text-main-secondary">
      <div className="flex items-center max-w-xs h-10">
        { tagEdges?.[0] && (
        <div className="h-8 w-8 shrink-0">
          <img className="rounded-full" src={tagEdges[0].node.image?.location ?? '/images/placeholder-image.png'} alt="" />
        </div>
        ) }
        <div className="ml-3 flex items-center h-10">
          <h3 
            className="text-base font-bold font-medium text-main-secondary overflow-hidden leading-5"
            style={{
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical'  
            }}
          >
            {courseEdge?.node.title}
          </h3>
          {/* <div className='p-2 ml-2 cursor-pointer' onClick={openCourseSettings}>
            <Gear size="18"  />
          </div> */}
        </div>
      </div>
      { showProgress && courseEdge?.progress != null && (
        <ProgressBar value={courseEdge.progress} className={`-mb-0.5`} />
      )}
    </div>
  )
}

export default CourseSidebarHeader