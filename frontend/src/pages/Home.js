import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Home, Users, MessageSquare, Shield } from 'lucide-react';
import '../styles/Home.css';

export default function Home() {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Find Your Perfect Home in Kigali</h1>
          <p className="hero-subtitle">Connect with verified landlords and discover amazing properties in Rwanda's vibrant capital</p>
          <Link to="/search" className="btn-primary-large">
            Explore Properties <ArrowRight size={20} />
          </Link>
        </div>
        <div className="hero-image">
          <div className="image-placeholder">🏠</div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <h2>Why Choose MyShelter?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <Home size={40} />
            <h3>Wide Selection</h3>
            <p>Browse hundreds of verified properties across Kigali districts</p>
          </div>
          <div className="feature-card">
            <Users size={40} />
            <h3>Verified Users</h3>
            <p>Connect with trusted landlords and house hunters in the community</p>
          </div>
          <div className="feature-card">
            <MessageSquare size={40} />
            <h3>Direct Messaging</h3>
            <p>Communicate directly with property owners and inquire about listings</p>
          </div>
          <div className="feature-card">
            <Shield size={40} />
            <h3>Safe & Secure</h3>
            <p>Your data is protected with industry-standard security measures</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <h2>Ready to Find Your Perfect Home?</h2>
        <p>Join thousands of satisfied users on MyShelter</p>
        <div className="cta-buttons">
          <Link to="/register?role=houseFinder" className="btn-primary">
            I'm Looking for a Home
          </Link>
          <Link to="/register?role=landlord" className="btn-secondary">
            I'm a Landlord
          </Link>
        </div>
      </section>
    </div>
  );
}
