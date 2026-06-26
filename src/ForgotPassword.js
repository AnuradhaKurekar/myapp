import { useState } from 'react';
import { Link } from 'react-router-dom';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) {
      setError('Email is required');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email');
      return;
    }
    setError('');
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div style={{ maxWidth: '400px', margin: '80px auto', fontFamily: 'sans-serif' }}>
        <h1>Check your email</h1>
        <p data-testid="reset-success-message">
          If an account exists for <strong>{email}</strong>, a reset link has been sent.
        </p>
        <Link to="/login" data-testid="back-to-login-link">Back to Login</Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '400px', margin: '80px auto', fontFamily: 'sans-serif' }}>
      <h1>Forgot Password</h1>
      <p>Enter your email address and we'll send you a reset link.</p>
      <form onSubmit={handleSubmit} noValidate>

        <div style={{ marginBottom: '16px' }}>
          <label htmlFor="email">Email</label><br />
          <input
            id="email"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            data-testid="forgot-email-input"
          />
          {error && <p data-testid="forgot-email-error" style={{ color: 'red' }}>{error}</p>}
        </div>

        <button type="submit" data-testid="send-reset-button">Send Reset Link</button>

        <div style={{ marginTop: '16px' }}>
          <Link to="/login" data-testid="back-to-login-link">Back to Login</Link>
        </div>

      </form>
    </div>
  );
}

export default ForgotPassword;