import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, MapPin, Bed, Bath, Share2, Heart } from 'lucide-react';
import { propertyAPI, messageAPI } from '../utils/api';
import { useAuth } from '../context/AuthContext';
import '../styles/PropertyDetail.css';

export default function PropertyDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imageIndex, setImageIndex] = useState(0);
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);

  useEffect(() => {
    fetchProperty();
  }, [id]);

  const fetchProperty = async () => {
    try {
      const response = await propertyAPI.getById(id);
      setProperty(response.data.property);
    } catch (error) {
      console.error('Error fetching property:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePrevImage = () => {
    if (property?.images?.length) {
      setImageIndex((prev) => (prev === 0 ? property.images.length - 1 : prev - 1));
    }
  };

  const handleNextImage = () => {
    if (property?.images?.length) {
      setImageIndex((prev) => (prev === property.images.length - 1 ? 0 : prev + 1));
    }
  };

  const handleSendMessage = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (!message.trim()) return;

    setSending(true);
    try {
      await messageAPI.send({
        receiverId: property.landlordId._id,
        message: message.trim(),
        propertyId: id,
      });
      setMessage('');
      alert('Message sent successfully!');
    } catch (error) {
      alert('Failed to send message');
    } finally {
      setSending(false);
    }
  };

  if (loading) return <div className="loading">Loading property details...</div>;
  if (!property) return <div className="error">Property not found</div>;

  const images = property.images?.length > 0 ? property.images : ['https://via.placeholder.com/800x500?text=Property'];

  return (
    <div className="property-detail-container">
      {/* Image Gallery */}
      <div className="property-gallery">
        <div className="gallery-main">
          <img src={images[imageIndex]} alt={property.title} />
          {images.length > 1 && (
            <>
              <button className="gallery-btn prev" onClick={handlePrevImage}>
                <ChevronLeft />
              </button>
              <button className="gallery-btn next" onClick={handleNextImage}>
                <ChevronRight />
              </button>
            </>
          )}
          <span className="gallery-counter">{imageIndex + 1} / {images.length}</span>
        </div>
      </div>

      <div className="property-detail-content">
        <div className="detail-main">
          {/* Property Info */}
          <div className="property-header">
            <h1>{property.title}</h1>
            <div className="price-section">
              <span className="price">{property.price.toLocaleString()} {property.currency}</span>
              <span className="property-type">{property.propertyType}</span>
            </div>
          </div>

          {/* Location */}
          <div className="location-section">
            <MapPin size={20} />
            <div>
              <p className="location-text">
                {property.location?.address || 'Address not provided'}
              </p>
              <p className="location-subtext">
                {property.location?.cell}, {property.location?.sector}, {property.location?.district}
              </p>
            </div>
          </div>

          {/* Features */}
          <div className="features-section">
            <div className="feature-item">
              <Bed size={24} />
              <div>
                <span className="feature-label">Bedrooms</span>
                <span className="feature-value">{property.bedrooms}</span>
              </div>
            </div>
            <div className="feature-item">
              <Bath size={24} />
              <div>
                <span className="feature-label">Bathrooms</span>
                <span className="feature-value">{property.bathrooms}</span>
              </div>
            </div>
            {property.squareFeet && (
              <div className="feature-item">
                <span className="feature-label">Size</span>
                <span className="feature-value">{property.squareFeet} sqft</span>
              </div>
            )}
          </div>

          {/* Description */}
          <div className="description-section">
            <h2>About this property</h2>
            <p>{property.description}</p>
          </div>

          {/* Amenities */}
          {property.amenities?.length > 0 && (
            <div className="amenities-section">
              <h2>Amenities</h2>
              <div className="amenities-grid">
                {property.amenities.map((amenity, idx) => (
                  <div key={idx} className="amenity-tag">
                    ✓ {amenity}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <aside className="detail-sidebar">
          {/* Landlord Card */}
          <div className="landlord-card">
            <h3>Contact Landlord</h3>
            {property.landlordId && (
              <>
                <div className="landlord-info">
                  {property.landlordId.profileImage && (
                    <img src={property.landlordId.profileImage} alt={property.landlordId.fullName} />
                  )}
                  <div>
                    <h4>{property.landlordId.fullName}</h4>
                    <p className="landlord-role">Property Owner</p>
                    {property.landlordId.rating > 0 && (
                      <p className="landlord-rating">⭐ {property.landlordId.rating.toFixed(1)}</p>
                    )}
                  </div>
                </div>

                <div className="contact-section">
                  <p className="contact-label">Send a message:</p>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Hi, I'm interested in this property..."
                    rows="4"
                  />
                  <button
                    className="btn-message"
                    onClick={handleSendMessage}
                    disabled={sending || !message.trim()}
                  >
                    {sending ? 'Sending...' : 'Send Message'}
                  </button>
                </div>

                <div className="contact-info">
                  <p><strong>Email:</strong> {property.landlordId.email}</p>
                  <p><strong>Phone:</strong> {property.landlordId.phone}</p>
                </div>
              </>
            )}
          </div>

          {/* Action Buttons */}
          <div className="action-buttons">
            <button className="btn-share">
              <Share2 size={18} /> Share
            </button>
            <button className="btn-save">
              <Heart size={18} /> Save
            </button>
          </div>

          {/* Availability */}
          {property.availableFrom && (
            <div className="availability-card">
              <h4>Availability</h4>
              <p>Available from {new Date(property.availableFrom).toLocaleDateString()}</p>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
