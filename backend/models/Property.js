const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  landlordId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
    default: 'RWF',
  },
  bedrooms: {
    type: Number,
    required: true,
  },
  bathrooms: {
    type: Number,
    required: true,
  },
  squareFeet: {
    type: Number,
  },
  propertyType: {
    type: String,
    enum: ['apartment', 'house', 'studio', 'shared'],
    required: true,
  },
  location: {
    district: String,
    sector: String,
    cell: String,
    address: String,
    coordinates: {
      latitude: Number,
      longitude: Number,
    },
  },
  images: [String],
  amenities: [String],
  available: {
    type: Boolean,
    default: true,
  },
  availableFrom: {
    type: Date,
  },
  views: {
    type: Number,
    default: 0,
  },
  rating: {
    type: Number,
    default: 0,
  },
  reviews: [{
    userId: mongoose.Schema.Types.ObjectId,
    rating: Number,
    comment: String,
    createdAt: Date,
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
}, { timestamps: true });

module.exports = mongoose.model('Property', propertySchema);
