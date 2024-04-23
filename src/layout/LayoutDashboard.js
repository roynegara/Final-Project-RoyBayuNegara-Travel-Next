// components/Layout.js
import React from 'react';

const Layout = ({ children }) => {
  return (
    <div className="flex">
      {/* Kolom Kiri (Sidebar Navigasi) */}
      <div className="w-1/4 bg-gray-200">
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
      <div className="w-3/4 p-4 overflow-y-auto">
        {children}
      </div>
    </div>
  );
};

export default Layout;
