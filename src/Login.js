import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const registered = JSON.parse(localStorage.getItem('registeredUser') || 'null');

    if (!registered) {
      setError('No account found. Please sign up first.');
      return;
    }

    if (registered.email === formData.email && registered.password === formData.password) {
      localStorage.setItem('loggedInUser', JSON.stringify({
        name: registered.name,
        email: registered.email
      }));
      navigate('/dashboard');
    } else {
      setError('Invalid email or password.');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '80px auto', fontFamily: 'sans-serif' }}>
      <h1>Log In</h1>
      <form onSubmit={handleSubmit} noValidate>

        <div style={{ marginBottom: '16px' }}>
          <label htmlFor="email">Email</label><br />
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            data-testid="login-email-input"
          />
        </div>

        <div style={{ marginBottom: '16px' }}>
          <label htmlFor="password">Password</label><br />
          <input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            data-testid="login-password-input"
          />
        </div>

        {error && <p data-testid="login-error" style={{ color: 'red' }}>{error}</p>}

        <button type="submit" data-testid="login-button">Log In</button>

        <div style={{ marginTop: '16px' }}>
          <Link to="/forgot-password" data-testid="forgot-password-link">
            Forgot password?
          </Link>
        </div>

      </form>
    </div>
  );
}

export default Login;