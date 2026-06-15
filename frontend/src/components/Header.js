import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Search, Home, MessageSquare, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import '../styles/Header.css';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const { user, logout } = useAuth();

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="header-logo">
          <Home className="logo-icon" />
          <span>MyShelter</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="nav-desktop">
          <Link to="/search" className="nav-link">
            <Search size={18} /> Explore
          </Link>
          {user ? (
            <>
              {user.role === 'landlord' && (
                <Link to="/dashboard/properties" className="nav-link">
                  My Properties
                </Link>
              )}
              <Link to="/messages" className="nav-link">
                <MessageSquare size={18} /> Messages
              </Link>
              <Link to="/profile" className="nav-link">
                Profile
              </Link>
              <button onClick={logout} className="nav-link logout-btn">
                <LogOut size={18} /> Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">
                Login
              </Link>
              <Link to="/register" className="nav-link btn-primary">
                Sign Up
              </Link>
            </>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="mobile-menu-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <nav className="nav-mobile">
          <Link to="/search" className="mobile-nav-link">
            Explore Properties
          </Link>
          {user ? (
            <>
              {user.role === 'landlord' && (
                <Link to="/dashboard/properties" className="mobile-nav-link">
                  My Properties
                </Link>
              )}
              <Link to="/messages" className="mobile-nav-link">
                Messages
              </Link>
              <Link to="/profile" className="mobile-nav-link">
                Profile
              </Link>
              <button onClick={logout} className="mobile-nav-link logout-btn">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="mobile-nav-link">
                Login
              </Link>
              <Link to="/register" className="mobile-nav-link btn-primary">
                Sign Up
              </Link>
            </>
          )}
        </nav>
      )}
    </header>
  );
}
