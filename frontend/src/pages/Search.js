import React, { useState, useEffect } from 'react';
import { propertyAPI } from '../utils/api';
import PropertyCard from '../components/PropertyCard';
import SearchFilters from '../components/SearchFilters';
import '../styles/Properties.css';

export default function Search() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    bedrooms: '',
    maxPrice: '',
    propertyType: '',
    location: '',
    search: '',
  });

  useEffect(() => {
    fetchProperties();
  }, [filters]);

  const fetchProperties = async () => {
    setLoading(true);
    try {
      const response = await propertyAPI.getAll(filters);
      setProperties(response.data.properties);
    } catch (error) {
      console.error('Error fetching properties:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <div className="search-container">
      <div className="search-header">
        <h1>Find Your Perfect Home</h1>
        <p>Discover properties in Kigali, Rwanda</p>
      </div>

      <div className="search-layout">
        <div className="search-filters">
          <SearchFilters onFilterChange={handleFilterChange} />
        </div>

        <div className="search-results">
          {loading ? (
            <div className="loading">Loading properties...</div>
          ) : properties.length === 0 ? (
            <div className="no-results">No properties found matching your criteria</div>
          ) : (
            <div className="properties-grid">
              {properties.map(property => (
                <PropertyCard key={property._id} property={property} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
