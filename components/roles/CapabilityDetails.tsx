import { useEffect } from 'react';
import CapabilityReachEntry from './CapabilityReachEntry';

const CapabilityDetails = ({cap}) => {

  return (
    <div className='text-left'>
      { cap && (
        <>
          <CapabilityReachEntry cap={cap} type="tenant" /> 
          <CapabilityReachEntry cap={cap} type="group" /> 
          <CapabilityReachEntry cap={cap} type="content" /> 
        </>
      )}
    </div>
  )
}

export default CapabilityDetails
