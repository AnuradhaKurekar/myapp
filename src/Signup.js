import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      localStorage.setItem('registeredUser', JSON.stringify({
        ...formData,
        name: `${formData.firstName} ${formData.lastName}`
      }));
      navigate('/login');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '80px auto', fontFamily: 'sans-serif' }}>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit} noValidate>

        <div style={{ marginBottom: '16px' }}>
          <label htmlFor="firstName">First Name</label><br />
          <input
            id="firstName"
            name="firstName"
            type="text"
            value={formData.firstName}
            onChange={handleChange}
            data-testid="firstname-input"
          />
          {errors.firstName && <p data-testid="firstname-error" style={{ color: 'red' }}>{errors.firstName}</p>}
        </div>

        <div style={{ marginBottom: '16px' }}>
          <label htmlFor="lastName">Last Name</label><br />
          <input
            id="lastName"
            name="lastName"
            type="text"
            value={formData.lastName}
            onChange={handleChange}
            data-testid="lastname-input"
          />
          {errors.lastName && <p data-testid="lastname-error" style={{ color: 'red' }}>{errors.lastName}</p>}
        </div>

        <div style={{ marginBottom: '16px' }}>
          <label htmlFor="email">Email</label><br />
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            data-testid="email-input"
          />
          {errors.email && <p data-testid="email-error" style={{ color: 'red' }}>{errors.email}</p>}
        </div>

        <div style={{ marginBottom: '16px' }}>
          <label htmlFor="password">Password</label><br />
          <input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            data-testid="password-input"
          />
          {errors.password && <p data-testid="password-error" style={{ color: 'red' }}>{errors.password}</p>}
        </div>

        <button type="submit" data-testid="submit-button">Sign Up</button>

      </form>
    </div>
  );
}

export default Signup;