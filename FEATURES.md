# MyShelter Property Details Page

This feature page needs to be implemented. Here's the structure:

## Page: Property Details (/property/:id)

### Features to Implement

1. **Property Gallery**
   - Image carousel/slider
   - Thumbnail selection
   - Lightbox view

2. **Property Information**
   - Title, description
   - Price and currency
   - Bedrooms, bathrooms, size
   - Amenities list
   - Availability date

3. **Location Map**
   - Google Maps integration
   - Address display
   - Nearby landmarks

4. **Landlord Card**
   - Profile image
   - Name and rating
   - Contact button
   - Verified badge

5. **Reviews Section**
   - Display existing reviews
   - Rating breakdown
   - Add review (if user visited)

6. **Action Buttons**
   - Message landlord
   - Request booking
   - Save to favorites (future)
   - Share property

7. **Similar Properties**
   - Show 3-4 related listings
   - Same location or price range

### Component Structure

```
PropertyDetails/
├── PropertyGallery.js
├── PropertyInfo.js
├── LandlordCard.js
├── ReviewsSection.js
├── SimilarProperties.js
└── styles/
    └── PropertyDetails.css
```

### Implementation Priority

1. Basic info display
2. Landlord contact
3. Image gallery
4. Messaging integration
5. Reviews system
6. Map integration

---

Backend endpoints already prepared:
- `GET /api/properties/:id` - Fetch property details
- `POST /api/messages` - Send message to landlord
