import { useState } from 'react';
import useUserHasCapability from '../../hooks/users/useUserHasCapability';
import Button from '../Button';

const Caps = () => {

  const [capability, setCapability] = useState('')

  const {userHasCapability, userCapabilityArray} = useUserHasCapability()

  const bool = userHasCapability(capability)
  return (
    <>
     <input value={capability} onChange={v => setCapability(v.target.value)} />
      {bool ? 'yes':'no'}
      <pre>
      { JSON.stringify(userCapabilityArray,null,2) }
      </pre>
    </>
  )
}

export default Caps