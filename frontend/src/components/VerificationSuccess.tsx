// VerificationSuccess.tsx
import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const VerificationSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Extract the email parameter from the query string
  const email = new URLSearchParams(location.search).get('email');

  useEffect(() => {
    setTimeout(() => {
      alert('Your email has been successfully verified!');
      navigate('/login'); // Redirect to login after verification success
    }, 2000);
  }, [navigate]);

  return (
    <div>
      <h1>Email Verified Successfully</h1>
      <p>Your email ({email}) has been successfully verified. You can now log in.</p>
    </div>
  );
};

export default VerificationSuccess;