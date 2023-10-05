// Dashboard.js
import React from 'react';

const Dashboard = () => {
  const handleLogout = () => {
    // Implement logout functionality here
    console.log('Logout clicked');
  };

  return (
    <div>
      {/* Navbar with Logout */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', backgroundColor: '#333', color: 'white' }}>
        <div>
          <span>Logo</span>
        </div>
        <div>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </nav>

      {/* Main Content */}
      <div style={{ padding: '20px' }}>
        {/* Logo */}
        <div style={{ textAlign: 'right', marginBottom: '20px' }}>
          <img src="path/to/logo.png" alt="Logo" style={{ maxWidth: '100px' }} />
        </div>

        {/* Options */}
        <div>
          <h2>Dashboard Options</h2>
          <ul>
            <li>Create Game</li>
            <li>Join Game</li>
            <li>Game History</li>
            <li>Previous Score</li>
            <li>Saved Games</li>
            <li>High Score</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
