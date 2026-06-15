import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Bed, Bath, Star } from 'lucide-react';
import '../styles/PropertyCard.css';

export default function PropertyCard({ property }) {
  return (
    <Link to={`/property/${property._id}`} className="property-card">
      <div className="property-image">
        <img
          src={property.images?.[0] || 'https://via.placeholder.com/300x200?text=Property'}
          alt={property.title}
        />
        <span className="property-type-badge">{property.propertyType}</span>
      </div>

      <div className="property-info">
        <h3>{property.title}</h3>

        <div className="property-meta">
          <div className="meta-item">
            <Bed size={16} /> {property.bedrooms} beds
          </div>
          <div className="meta-item">
            <Bath size={16} /> {property.bathrooms} baths
          </div>
        </div>

        <div className="property-location">
          <MapPin size={14} />
          <span>{property.location?.sector}, {property.location?.district}</span>
        </div>

        <div className="property-footer">
          <div className="property-price">
            <span className="price">{property.price.toLocaleString()}</span>
            <span className="currency">{property.currency}</span>
          </div>
          {property.rating > 0 && (
            <div className="property-rating">
              <Star size={14} fill="gold" color="gold" />
              {property.rating.toFixed(1)}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
