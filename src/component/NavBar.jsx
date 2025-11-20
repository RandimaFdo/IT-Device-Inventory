import { useState, useEffect } from 'react';
import { FiSearch, FiMenu, FiX } from 'react-icons/fi';
import { BsSpeedometer2, BsBoxSeam, BsGraphUp, BsGear } from 'react-icons/bs';

function NavBar({ activeTab, setActiveTab, isMenuOpen, toggleMenu, onNavigate, searchQuery, onSearchChange }) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'dashboard', icon: <BsSpeedometer2 />, label: 'Dashboard' },
    { id: 'inventory', icon: <BsBoxSeam />, label: 'Inventory' },
    { id: 'reports', icon: <BsGraphUp />, label: 'Device Users' },
    { id: 'settings', icon: <BsGear />, label: 'Settings' }
  ];

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        <div className="nav-left">
          <button className="menu-toggle" onClick={toggleMenu}>
            {isMenuOpen ? <FiX /> : <FiMenu />}
          </button>
          <div className="nav-brand">
            <span className="logo-text">Uga</span>
            <span className="logo-badge">IT</span>
          </div>
        </div>

        <div className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
          {navItems.map(item => (
            <button
              key={item.id}
              className={`nav-link ${activeTab === item.id ? 'active' : ''}`}
              onClick={() => {
                setActiveTab(item.id);
                if (onNavigate) onNavigate(item.id);
                if (window.innerWidth < 1024) toggleMenu();
              }}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </button>
          ))}
        </div>

        <div className="nav-right">
          <div className="search-bar">
            <FiSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search inventory..."
              value={searchQuery}
              onChange={(e) => onSearchChange?.(e.target.value)}
            />
          </div>
          <div className="user-profile">
            <div className="user-info">
              <span className="username">Admin</span>
              <span className="user-role">Administrator</span>
            </div>
            <div className="avatar">
              <span>AD</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
