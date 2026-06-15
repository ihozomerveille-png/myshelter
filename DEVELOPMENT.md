# MyShelter Development Guide

## Quick Start

### Starting Backend
```bash
cd backend
npm install
# Update .env with your configuration
npm run dev
```

### Starting Frontend
```bash
cd frontend
npm install
npm start
```

## Database Setup

MongoDB is required. You can:
1. Install MongoDB locally: https://docs.mongodb.com/manual/installation/
2. Use MongoDB Atlas (cloud): https://www.mongodb.com/cloud/atlas

## Required Services

### Cloudinary (Image Upload)
1. Sign up at https://cloudinary.com/
2. Get your API credentials from dashboard
3. Add to `.env` file in backend

## API Documentation

### User Registration
**POST** `/api/auth/register`
```json
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "phone": "+250788123456",
  "password": "password123",
  "role": "houseFinder" or "landlord"
}
```

### User Login
**POST** `/api/auth/login`
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

### Get Properties
**GET** `/api/properties?bedrooms=2&maxPrice=500000&location=Gasabo`

Query Parameters:
- `bedrooms`: Minimum bedrooms
- `maxPrice`: Maximum price (RWF)
- `propertyType`: apartment, house, studio, shared
- `location`: District name
- `search`: Search keyword

### Create Property
**POST** `/api/properties` (requires authentication)
```json
{
  "title": "Beautiful 2BR Apartment",
  "description": "Well-maintained apartment...",
  "price": 450000,
  "bedrooms": 2,
  "bathrooms": 1,
  "propertyType": "apartment",
  "location": {
    "district": "Gasabo",
    "sector": "Ndera",
    "cell": "Kigali",
    "address": "123 Main Street"
  },
  "amenities": ["WiFi", "Parking", "Garden"],
  "images": []
}
```

## Frontend Routes

- `/` - Home page
- `/search` - Property search
- `/login` - User login
- `/register` - User registration
- `/property/:id` - Property details
- `/messages` - Messaging
- `/bookings` - Bookings
- `/profile` - User profile

## Development Tips

1. **Authentication**: Token is stored in localStorage
2. **API Calls**: Use the `api` utility from `src/utils/api.js`
3. **Styling**: CSS modules for component styles
4. **Icons**: Use lucide-react components
5. **Responsive**: Mobile-first approach

## Troubleshooting

### Backend won't start
- Check MongoDB connection
- Verify .env configuration
- Check if port 5000 is available

### Frontend won't start
- Clear node_modules: `rm -rf node_modules && npm install`
- Clear npm cache: `npm cache clean --force`
- Check Node version: `node --version` (should be 14+)

### API calls failing
- Check backend server is running
- Verify API_URL in frontend
- Check CORS settings in backend

## Performance Optimization

- Images should be optimized before upload
- Use pagination for property lists
- Cache property data when possible
- Lazy load images in lists

## Security Notes

- Never commit .env file
- Keep JWT secret secure
- Validate all inputs on backend
- Use HTTPS in production
- Implement rate limiting
- Sanitize user inputs

## Testing

Coming soon:
- Unit tests
- Integration tests
- E2E tests

---

For issues or questions, please create a GitHub issue.
