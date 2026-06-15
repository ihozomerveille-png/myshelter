import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Phone, MapPin, LogOut } from 'lucide-react';
import '../styles/Profile.css';

export default function Profile() {
  const { user, logout } = useAuth();

  if (!user) {
    return <div className="profile-container">Please log in to view your profile</div>;
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-header">
          {user.profileImage ? (
            <img src={user.profileImage} alt={user.fullName} className="profile-avatar" />
          ) : (
            <div className="profile-avatar-placeholder">{user.fullName.charAt(0)}</div>
          )}
          <div className="profile-top-info">
            <h1>{user.fullName}</h1>
            <span className="role-badge">{user.role === 'landlord' ? '🏠 Landlord' : '🔍 House Finder'}</span>
          </div>
        </div>

        <div className="profile-info">
          <div className="info-group">
            <Mail size={18} />
            <div>
              <span className="label">Email</span>
              <p>{user.email}</p>
            </div>
          </div>

          <div className="info-group">
            <Phone size={18} />
            <div>
              <span className="label">Phone</span>
              <p>{user.phone}</p>
            </div>
          </div>

          {user.location && (
            <div className="info-group">
              <MapPin size={18} />
              <div>
                <span className="label">Location</span>
                <p>{user.location.cell}, {user.location.sector}, {user.location.district}</p>
              </div>
            </div>
          )}
        </div>

        {user.bio && (
          <div className="profile-bio">
            <h3>About</h3>
            <p>{user.bio}</p>
          </div>
        )}

        {user.role === 'landlord' && (
          <div className="profile-stats">
            <div className="stat">
              <span className="stat-value">{user.totalReviews}</span>
              <span className="stat-label">Reviews</span>
            </div>
            <div className="stat">
              <span className="stat-value">{user.rating.toFixed(1)}</span>
              <span className="stat-label">Rating</span>
            </div>
            <div className="stat">
              <span className="stat-value">🟢</span>
              <span className="stat-label">{user.verified ? 'Verified' : 'Not Verified'}</span>
            </div>
          </div>
        )}

        <div className="profile-actions">
          <Link to="/edit-profile" className="btn-edit">
            <User size={18} /> Edit Profile
          </Link>
          {user.role === 'landlord' && (
            <Link to="/dashboard/properties" className="btn-properties">
              Manage Properties
            </Link>
          )}
          <button onClick={logout} className="btn-logout">
            <LogOut size={18} /> Logout
          </button>
        </div>
      </div>
    </div>
  );
}
