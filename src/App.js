// In your App.js or similar file
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from '../src/screens/LoginPage';
import './App.css'; // You might have other global styles here
import ChatPage from '../src/screens/ChatPage';
function App() {
  return (
    <Router>
      {/* Wrap your Route components inside Routes */}
      <Routes>
        {/* The exact route for LoginPage */}
        <Route path="/" element={<LoginPage />} />
        
        {/* The route for ChatPage */}
        <Route path="/chat" element={<ChatPage />} />
      </Routes>
    </Router>
  );
}

export default App;