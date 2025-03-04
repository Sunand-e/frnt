import { ComponentType, useCallback, useState } from 'react';
import { getCookie } from '../../utils/cookieUtils';
import PasswordVerificationForm from './PasswordVerificationForm';
import useHeaderButtons from '../../hooks/useHeaderButtons';
import ButtonBack from '../common/ButtonBack';
import ProfileMenu from './ProfileMenu';

interface ChildProps {
  Component: ComponentType;
}

const TwoSV: React.FC<ChildProps> = ({ Component }) => {
  useHeaderButtons({
    id: "backToDashboard",
    component: <ButtonBack text="Back to dashboard" action="/" />
  });

  const [securityVerified, setsecurityVerified] = useState(getCookie('security_verified'));

  const onSuccess = useCallback(() => {
    setsecurityVerified(getCookie('security_verified'))
  }, [])

  return ( 
    <div className='flex'>
      <ProfileMenu />
      {securityVerified ? <Component/> : <PasswordVerificationForm onSuccess = {onSuccess} />}
    </div>
  );
}

export default TwoSV
