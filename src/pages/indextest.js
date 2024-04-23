// File: pages/index.js

import React, { useState } from 'react';
import Profile from '@/pages/profile';

const Dashboard = () => {
  const [showProfile, setShowProfile] = useState(false);

  const handleProfileClick = () => {
    setShowProfile(true);
  };

  return (
    <div className="dashboard">
      {/* Kolom Kiri (Sidebar Navigasi) */}
      <div className="sidebar">
        <ul>
          <li onClick={handleProfileClick}>Profile</li>
          <li>User</li>
          <li>Banner</li>
          <li>Promo</li>
          <li>Category</li>
          <li>Destination</li>
          <li>Logout</li>
        </ul>
      </div>

      {/* Kolom Kanan (Konten Dinamis) */}
      <div className="content">
        <h1>Dashboard Content</h1>
        {showProfile && <Profile />}
        {/* Tampilkan konten di sini berdasarkan item navigasi */}
      </div>
    </div>
  );
};

export default Dashboard;
