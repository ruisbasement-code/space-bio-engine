'use client';

import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import './MainLayout.css';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <div className="top-bar">
        <button onClick={toggleSidebar} className="hamburger-btn">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
      <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />
      <main>{children}</main>
    </>
  );
}