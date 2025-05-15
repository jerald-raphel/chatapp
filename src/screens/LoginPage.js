
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import themes from '../screens/themes';
import '../styles/LoginPage.css';

function LoginPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [currentTheme, setCurrentTheme] = useState('dark');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [message, setMessage] = useState('');
  const theme = themes[currentTheme];
  const navigate = useNavigate();

  const handleThemeChange = (themeName) => {
    setCurrentTheme(themeName);
    setIsSettingsOpen(false);
  };

  const renderPatternSquares = () => {
    return [...Array(9)].map((_, i) => (
      <div key={i} className="pattern-square" style={{ backgroundColor: theme.square }}></div>
    ));
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isSignUp
        ? 'https://chatapp-server-cq7p.onrender.com/api/signup '
          : 'https://chatapp-server-cq7p.onrender.com/api/login';
        //  ? 'http://localhost:1000/api/signup '
        // : 'http://localhost:1000/api/login';
      

    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      console.log('Response Data:', data);

      if (!res.ok) {
        setMessage(data.message ||  'Name or email already exists');
        return;
      }

      setMessage(data.message);

      if (!isSignUp) {
        // Store the logged-in user data in localStorage
        localStorage.setItem('authToken', data.token);
        localStorage.setItem('user', JSON.stringify(data.user)); // Store the user details

        // Redirect to the chat page
        navigate('/chat');
      } else {
        setIsSignUp(false);
      }
    } catch (err) {
      console.error('Error:', err);
      setMessage('Server error');
    }
  };

  return (
    <div className="login-container" style={{ backgroundColor: theme.background, color: theme.text }}>
      {/* Top Bar */}
      <div className="top-bar">
        <div className="app-name">Blabby</div>
        <div className="settings-icon" onClick={() => setIsSettingsOpen(!isSettingsOpen)}>⚙️</div>
      </div>

      {/* Theme Settings */}
      {isSettingsOpen && (
        <div className="settings-card" style={{ backgroundColor: theme.formBackground }}>
          <h3>Choose Theme</h3>
          <ul className="theme-list">
            {Object.keys(themes).map((themeName) => (
              <li key={themeName} onClick={() => handleThemeChange(themeName)} style={{ color: theme.text }}>
                {themeName.charAt(0).toUpperCase() + themeName.slice(1)}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Login Form */}
      <div className="login-form" style={{ backgroundColor: theme.background }}>
        <h2>{isSignUp ? 'Create Account' : 'Welcome Back'}</h2>
        <p>
          {isSignUp
            ? <>
                 Already have an account?{' '}
                <a href="#" onClick={(e) => { e.preventDefault(); setIsSignUp(false); }}>
                  Sign in
                </a>
              </>
            : <>
                Don’t have an account?{' '}
                <a href="#" onClick={(e) => { e.preventDefault(); setIsSignUp(true); }}>
                  Create account
                </a>
              </>
          }
        </p>

        {message && <p style={{ color: 'tomato' }}>{message}</p>}

        <form onSubmit={handleSubmit}>
          {isSignUp && (
            <div className="input-group">
              <div className="input-field">
                <span className="input-icon">👤</span>
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  style={{ color: theme.text }}
                />
              </div>
            </div>
          )}
          <div className="input-group">
            <div className="input-field">
              <span className="input-icon">📧</span>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                style={{ color: theme.text }}
              />
            </div>
          </div>
          <div className="input-group">
            <div className="input-field">
              <span className="input-icon">🔒</span>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                style={{ color: theme.text }}
              />
            </div>
          </div>
          <button
            type="submit"
            className="sign-in-button"
            style={{ backgroundColor: theme.button, color: theme.text }}
            onMouseOver={(e) => e.target.style.backgroundColor = theme.buttonHover}
            onMouseOut={(e) => e.target.style.backgroundColor = theme.button}>
            {isSignUp ? 'Create Account' : 'Sign In'}
          </button>
        </form>
      </div>

      {/* Pattern Squares */}
      <div className="right-section" style={{ backgroundColor: theme.background }}>
        <div className="pattern-container">{renderPatternSquares()}</div>
        <div className="welcome-message">
          <h2>{isSignUp ? 'Join Us!' : 'Welcome back!'}</h2>
          <p style={{ color: theme.placeholder }}>
            {isSignUp
              ? 'Create your account to start new conversations and connect.'
              : 'Sign in to continue your conversations and catch up with your messages.'}
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;

