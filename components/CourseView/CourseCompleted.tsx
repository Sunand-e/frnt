import { useRouter } from '../../utils/router'
import useCourse from '../../hooks/courses/useCourse'
import Link from 'next/link'
import ButtonLink from '../ButtonLink'
import { useReward } from 'react-rewards';
import Button from '../Button';
import { useContext, useEffect } from 'react';
import { TenantContext } from '../../context/TenantContext';

const CourseCompleted = () => {
  
  const router = useRouter()
  const { id } = router.query
  const { course } = useCourse(id)

  
const tenant = useContext(TenantContext)

useEffect(() => {
    reward()
  },[course])

  const {reward, isAnimating} = useReward('confettiReward', 'balloons', {
    colors: [
      tenant.primaryBrandColor,
      tenant.secondaryBrandColor,
    ]
  });


  return (
    <div className='flex flex-col items-center'>
    { !!course && (
      <>
        <p className='text-center my-16 text-xl'>Congratulations! You have completed {course?.title}.</p>
        <span id="confettiReward" className='mt-8 z-30' />
        <ButtonLink href="/">Back to Dashboard</ButtonLink>
      </>
    )}
    </div>
  )
}
export default CourseCompleted