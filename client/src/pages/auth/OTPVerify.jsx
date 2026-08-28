import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AuthLayout from '../../layouts/AuthLayout';
import { useAuth } from '../../contexts/AuthContext';

const OTPVerify = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const email = location.state?.email;
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const inputRefs = useRef([]);

  useEffect(() => {
    if (!email) {
      navigate('/login');
    }
  }, [email, navigate]);

  const handleChange = (index, value) => {
    if (isNaN(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value !== '' && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    // Auto-focus previous input on backspace if current is empty
    if (e.key === 'Backspace' && otp[index] === '' && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpValue = otp.join('');
    if (otpValue.length !== 6) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp: otpValue })
      });
      const data = await response.json();
      
      if (data.success) {
        // Authenticate user via context
        login(data.user, data.token);
        navigate('/');
      } else {
        setError(data.message || 'Invalid OTP');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout 
      title="Verify your identity" 
      subtitle={`We've sent a 6-digit secure code to ${email || 'your device'}`}
    >
      <form className="space-y-8" onSubmit={handleSubmit}>
        <div className="flex justify-center space-x-3 sm:space-x-4">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={el => inputRefs.current[index] = el}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="w-10 h-12 sm:w-12 sm:h-14 text-center text-xl sm:text-2xl font-bold border border-gray-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm dark:bg-slate-800 dark:text-white transition-shadow"
            />
          ))}
        </div>

        {error && <div className="text-red-500 text-sm text-center font-medium">{error}</div>}

        <div className="pt-2">
          <button
            type="submit"
            disabled={loading || otp.join('').length !== 6}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-lg shadow-blue-500/30 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 hover:scale-[1.02] transition-all disabled:opacity-50 disabled:hover:scale-100"
          >
            {loading ? 'Verifying...' : 'Verify Secure Code'}
          </button>
        </div>

        <div className="text-center mt-6">
          <p className="text-sm text-gray-500 dark:text-slate-400">
            Didn't receive the code?{' '}
            <button type="button" className="font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500 transition-colors">
              Resend Code
            </button>
          </p>
        </div>
      </form>
    </AuthLayout>
  );
};

export default OTPVerify;
