import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import '../styles/Footer.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        {/* Logo & Description */}
        <div className="footer-section">
          <div className="footer-logo">
            <Home size={24} />
            <span>MyShelter</span>
          </div>
          <p className="footer-description">
            Connecting landlords and house finders across Kigali, Rwanda. Find your perfect home today.
          </p>
          <div className="social-links">
            <a href="#" className="social-icon"><Facebook size={18} /></a>
            <a href="#" className="social-icon"><Twitter size={18} /></a>
            <a href="#" className="social-icon"><Instagram size={18} /></a>
            <a href="#" className="social-icon"><Linkedin size={18} /></a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul className="footer-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/search">Browse Properties</Link></li>
            <li><Link to="/register?role=houseFinder">Find Home</Link></li>
            <li><Link to="/register?role=landlord">List Property</Link></li>
          </ul>
        </div>

        {/* For Landlords */}
        <div className="footer-section">
          <h4>For Landlords</h4>
          <ul className="footer-links">
            <li><a href="#features">How it Works</a></li>
            <li><a href="#pricing">Pricing</a></li>
            <li><a href="#dashboard">Dashboard</a></li>
            <li><a href="#support">Support</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="footer-section">
          <h4>Contact Us</h4>
          <div className="contact-item">
            <Mail size={16} />
            <a href="mailto:info@myshelter.rw">info@myshelter.rw</a>
          </div>
          <div className="contact-item">
            <Phone size={16} />
            <a href="tel:+250788123456">+250 788 123 456</a>
          </div>
          <div className="contact-item">
            <MapPin size={16} />
            <span>Kigali, Rwanda</span>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <p>&copy; {currentYear} MyShelter. All rights reserved.</p>
        <div className="footer-links-bottom">
          <a href="#privacy">Privacy Policy</a>
          <a href="#terms">Terms of Service</a>
          <a href="#contact">Contact</a>
        </div>
      </div>
    </footer>
  );
}
