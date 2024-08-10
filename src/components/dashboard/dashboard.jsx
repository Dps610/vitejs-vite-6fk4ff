import React from 'react';
import './index.css';

function DashboardPage() {
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <div className="dashboard-container">
      <h1>Welcome, {user.user_firstname} {user.user_lastname}</h1>
      <div className="user-info">
        <p><strong>Email:</strong> {user.user_email}</p>
        <p><strong>Phone:</strong> {user.user_phone}</p>
        <p><strong>City:</strong> {user.user_city}</p>
        <p><strong>Zip Code:</strong> {user.user_zipcode}</p>
      </div>
    </div>
  );
}

export default DashboardPage;

