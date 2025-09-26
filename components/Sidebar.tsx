import React from 'react';
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
            <li><a href="/" onClick={onClose}>Main Page</a></li>
            <li><a href="/profile" onClick={onClose}>Profile</a></li>
          </ul>
        </nav>
      </div>
      {isOpen && <div className="overlay" onClick={onClose}></div>}
    </>
  );
};

export default Sidebar;