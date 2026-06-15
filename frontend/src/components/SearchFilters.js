import React, { useState } from 'react';
import { Search } from 'lucide-react';
import '../styles/SearchFilters.css';

export default function SearchFilters({ onFilterChange }) {
  const [filters, setFilters] = useState({
    bedrooms: '',
    maxPrice: '',
    propertyType: '',
    location: '',
    search: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="search-filters-panel">
      <h3>Filter Properties</h3>

      <div className="filter-group">
        <label>Search</label>
        <input
          type="text"
          name="search"
          placeholder="Search properties..."
          value={filters.search}
          onChange={handleChange}
        />
      </div>

      <div className="filter-group">
        <label>Bedrooms</label>
        <select name="bedrooms" value={filters.bedrooms} onChange={handleChange}>
          <option value="">Any</option>
          <option value="1">1+</option>
          <option value="2">2+</option>
          <option value="3">3+</option>
          <option value="4">4+</option>
        </select>
      </div>

      <div className="filter-group">
        <label>Max Price (RWF)</label>
        <input
          type="number"
          name="maxPrice"
          placeholder="Enter max price"
          value={filters.maxPrice}
          onChange={handleChange}
        />
      </div>

      <div className="filter-group">
        <label>Property Type</label>
        <select name="propertyType" value={filters.propertyType} onChange={handleChange}>
          <option value="">All Types</option>
          <option value="apartment">Apartment</option>
          <option value="house">House</option>
          <option value="studio">Studio</option>
          <option value="shared">Shared</option>
        </select>
      </div>

      <div className="filter-group">
        <label>District</label>
        <select name="location" value={filters.location} onChange={handleChange}>
          <option value="">All Districts</option>
          <option value="Gasabo">Gasabo</option>
          <option value="Kicukiro">Kicukiro</option>
          <option value="Nyarugenge">Nyarugenge</option>
        </select>
      </div>
    </div>
  );
}
