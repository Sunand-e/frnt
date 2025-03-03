import { useCallback, useState } from 'react';
import { getCookie } from '../../utils/cookieUtils';
import PasswordVerificationForm from './PasswordVerificationForm';
import TwoSVForm from './TwoSVForm';

const TwoSV = () => {
  const [securityVerified, setsecurityVerified] = useState(getCookie('security_verified'));

  const onSuccess = useCallback(() => {
    setsecurityVerified(getCookie('security_verified'))
  }, [])

  return (
    securityVerified ? <TwoSVForm/> : <PasswordVerificationForm onSuccess = {onSuccess} />
  );
}

export default TwoSV
