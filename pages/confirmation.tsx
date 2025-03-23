import { useRouter } from "next/router";
import usePageTitle from "../hooks/usePageTitle";
import { useState } from "react";
import LoadingSpinner from "../components/common/LoadingSpinner";
import Button from "../components/common/Button";

const ConfirmationPage = () => {
  usePageTitle({ title: 'Confirmation' });

  const router = useRouter();
  const { confirmation_token } = router.query;
  const [status, setStatus] = useState('pending');
  const [errorMessage, setErrorMessage] = useState('');

  const handleConfirm = async () => {
    try {
      setStatus('loading');
      const response = await fetch(`/api/v1/users/confirmation?confirmation_token=${confirmation_token}`, {
        method: 'GET',
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
      } else {
        setErrorMessage(data.error || 'Something went wrong.');
        setStatus('error');
      }
    } catch (error: any) {
      setErrorMessage(error.message || 'Network error occurred.');
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">Email Confirmation</h1>

      {status === 'loading' && <LoadingSpinner />}

      {status === 'pending' && (
        <Button onClick={handleConfirm} size="md">
          Confirm Email
        </Button>
      )}

      {status === 'success' && (
        <p className="text-green-500">Your email has been successfully confirmed!</p>
      )}

      {status === 'error' && (
        <p className="text-red-500">{errorMessage}</p>
      )}
    </div>
  );
};

ConfirmationPage.isPublicPage = true;

export default ConfirmationPage;
