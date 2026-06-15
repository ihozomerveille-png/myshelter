const Property = require('../models/Property');

// Get all properties with filtering
exports.getAllProperties = async (req, res) => {
  try {
    const { bedrooms, maxPrice, propertyType, location, search } = req.query;
    let filter = { available: true };

    if (bedrooms) filter.bedrooms = { $gte: parseInt(bedrooms) };
    if (maxPrice) filter.price = { $lte: parseInt(maxPrice) };
    if (propertyType) filter.propertyType = propertyType;
    if (location) filter['location.district'] = location;
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    const properties = await Property.find(filter)
      .populate('landlordId', 'fullName email phone profileImage rating')
      .sort({ createdAt: -1 })
      .limit(50);

    res.json({ success: true, count: properties.length, properties });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get single property
exports.getProperty = async (req, res) => {
  try {
    const property = await Property.findByIdAndUpdate(
      req.params.id,
      { $inc: { views: 1 } },
      { new: true }
    ).populate('landlordId', 'fullName email phone profileImage rating bio');

    if (!property) {
      return res.status(404).json({ success: false, message: 'Property not found' });
    }

    res.json({ success: true, property });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Create property (landlord only)
exports.createProperty = async (req, res) => {
  try {
    const { title, description, price, bedrooms, bathrooms, propertyType, location, amenities } = req.body;

    const property = new Property({
      landlordId: req.user.id,
      title,
      description,
      price,
      bedrooms,
      bathrooms,
      propertyType,
      location,
      amenities,
      images: req.body.images || [],
    });

    await property.save();
    res.status(201).json({ success: true, message: 'Property created successfully', property });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update property
exports.updateProperty = async (req, res) => {
  try {
    let property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({ success: false, message: 'Property not found' });
    }

    if (property.landlordId.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    property = await Property.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, message: 'Property updated successfully', property });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete property
exports.deleteProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({ success: false, message: 'Property not found' });
    }

    if (property.landlordId.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    await Property.findByIdAndRemove(req.params.id);
    res.json({ success: true, message: 'Property deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
