// components/Layout.js
import React from 'react';

const Layout = ({ children }) => {
  return (
    <div>
      {/* Kolom Kiri (Sidebar Navigasi) */}
      <div >
        <ul>
          <li>Profile</li>
          <li>User</li>
          <li>Banner</li>
          <li>Promo</li>
          <li>Category</li>
          <li>Destination</li>
          <li>Logout</li>
        </ul>
      </div>

      {/* Kolom Kanan (Konten Dinamis) */}
      <div>
        {children}
      </div>
    </div>
  );
};

export default Layout;
