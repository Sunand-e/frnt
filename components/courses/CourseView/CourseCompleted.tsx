import { useRouter } from '../../../utils/router'
import Link from 'next/link'
import ButtonLink from '../../common/ButtonLink'
import { useReward } from 'react-rewards';
import Button from '../../common/Button';
import { useContext, useEffect } from 'react';
import { TenantContext } from '../../../context/TenantContext';
import useGetUserContent from '../../../hooks/users/useGetUserContent';

const CourseCompleted = () => {
  
  const router = useRouter()
  const { id, pid } = router.query
  const { user } = useGetUserContent(id)
  const course = user?.courses.edges[0].node
  
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
        { pid ? (
          <ButtonLink href={{
            pathname: `/pathway`,
            query: {
              ...router.query,
              pid
            }
          }}>Back to pathway</ButtonLink>
        ) : (
          <ButtonLink href="/">Back to Dashboard</ButtonLink>
        )}
      </>
    )}
    </div>
  )
}
export default CourseCompleted