import React from 'react';
import Link from 'next/link';
import './Sidebar.css';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  return (
    <>
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <span>Level: Kid</span>
          <button onClick={onClose} className="close-btn">&times;</button>
        </div>
        <nav>
          <ul>
            <li><Link href="/" onClick={onClose}>Main Page</Link></li>
            <li><Link href="/profile" onClick={onClose}>Profile</Link></li>
          </ul>
        </nav>
      </div>
      {isOpen && <div className="overlay" onClick={onClose}></div>}
    </>
  );
};

export default Sidebar;