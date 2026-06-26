import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedIn = JSON.parse(localStorage.getItem('loggedInUser') || 'null');
    if (!loggedIn) {
      navigate('/login');
    } else {
      setUser(loggedIn);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    navigate('/login');
  };

  if (!user) return null;

  return (
    <div style={{ textAlign: 'center', marginTop: '100px', fontFamily: 'sans-serif' }}>
      <h1 data-testid="dashboard-welcome">Welcome, {user.name}! 🎉</h1>
      <p>You're logged in as {user.email}</p>
      <button onClick={handleLogout} data-testid="logout-button">Log Out</button>
    </div>
  );
}

export default Dashboard;