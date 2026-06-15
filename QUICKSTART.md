# MyShelter - Quick Start Guide

## Prerequisites

Before you begin, ensure you have installed:
- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **Git** - [Download](https://git-scm.com/)
- **MongoDB** (local or cloud) - [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

## 🚀 Installation Steps

### Step 1: Clone/Extract the Project

```bash
cd MyShelter
```

### Step 2: Backend Setup

#### 2.1 Install Backend Dependencies
```bash
cd backend
npm install
```

#### 2.2 Configure Environment Variables
```bash
# Copy the example file
cp .env.example .env

# Edit .env file with your configuration
# Required variables:
# - MONGODB_URI: MongoDB connection string
# - JWT_SECRET: Any secure string (e.g., use an online generator)
# - Other optional variables for image upload
```

**Example `.env` file:**
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/myshelter
JWT_SECRET=your_secure_secret_key_12345
NODE_ENV=development
```

#### 2.3 Start Backend Server
```bash
npm run dev
```

You should see:
```
✓ MongoDB connected successfully
🏠 MyShelter Backend running on http://localhost:5000
```

### Step 3: Frontend Setup (in a new terminal)

#### 3.1 Install Frontend Dependencies
```bash
cd frontend
npm install
```

#### 3.2 Start Development Server
```bash
npm start
```

The browser will automatically open at `http://localhost:3000`

## ✅ Verify Installation

1. **Backend Health Check:**
   - Open http://localhost:5000/health
   - Should return: `{"status":"Server is running"}`

2. **Frontend:**
   - You should see the MyShelter home page
   - Navigation should work
   - Try registering a new account

## 🧪 Test the Application

### Test Account Creation
1. Click "Sign Up" button
2. Fill in the form:
   - Full Name: John Doe
   - Email: john@example.com
   - Phone: +250788123456
   - Password: password123
   - Role: House Finder
3. Click "Create Account"

### Test Property Search
1. Click "Explore Properties" or go to /search
2. Browse or filter properties
3. Properties list is currently empty (no properties added yet)

### Test Property Creation (Landlord)
1. Register as a Landlord
2. Go to dashboard (future feature)
3. Add a new property

## 📁 Key Files Structure

```
backend/
├── server.js              # Main server file
├── package.json           # Dependencies
├── .env                   # Configuration (create this)
├── routes/                # API endpoints
├── models/                # Database schemas
├── controllers/           # Business logic
└── middleware/            # Authentication

frontend/
├── public/                # Static files
├── src/
│   ├── pages/            # Page components
│   ├── components/       # Reusable components
│   ├── styles/           # CSS files
│   ├── context/          # React context (auth)
│   ├── utils/            # Helper functions
│   ├── App.js            # Main app
│   └── index.js          # Entry point
└── package.json          # Dependencies
```

## 🔧 Common Issues & Solutions

### MongoDB Connection Error
**Problem:** `Error: connect ECONNREFUSED 127.0.0.1:27017`

**Solutions:**
1. Start MongoDB locally:
   ```bash
   # Windows
   mongod
   
   # Mac
   brew services start mongodb-community
   ```
2. Or use MongoDB Atlas (cloud):
   - Sign up at https://www.mongodb.com/cloud/atlas
   - Create cluster and get connection string
   - Replace MONGODB_URI in .env

### Port Already in Use
**Problem:** `Error: listen EADDRINUSE: address already in use :::5000`

**Solutions:**
```bash
# Kill process on port 5000
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux
lsof -i :5000
kill -9 <PID>
```

### Frontend Can't Connect to Backend
**Problem:** CORS error or API not responding

**Solutions:**
1. Verify backend is running on http://localhost:5000
2. Check frontend package.json has proxy set to backend
3. Restart both servers

### npm install fails
**Problem:** Dependencies won't install

**Solutions:**
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

## 🌐 API Endpoints Reference

```
Authentication:
POST   /api/auth/register        # Create new account
POST   /api/auth/login           # Login user
GET    /api/auth/me              # Get current user (protected)

Properties:
GET    /api/properties           # Get all properties
GET    /api/properties/:id       # Get single property
POST   /api/properties           # Create property (protected)
PUT    /api/properties/:id       # Update property (protected)
DELETE /api/properties/:id       # Delete property (protected)

Users:
GET    /api/users/:id            # Get user profile
PUT    /api/users/:id            # Update profile (protected)

Messages:
GET    /api/messages             # Get messages (protected)
POST   /api/messages             # Send message (protected)

Bookings:
GET    /api/bookings             # Get bookings (protected)
POST   /api/bookings             # Create booking (protected)
```

## 📝 User Roles

### House Finder
- Browse all properties
- Search and filter
- Send messages to landlords
- Save favorite properties
- Create bookings

### Landlord
- Post new properties
- Manage listings
- Respond to inquiries
- Track property views
- Manage bookings/requests

## 🎨 Site Pages

| Page | URL | Status |
|------|-----|--------|
| Home | / | ✅ Ready |
| Search | /search | ✅ Ready |
| Property Detail | /property/:id | ✅ Ready |
| Login | /login | ✅ Ready |
| Register | /register | ✅ Ready |
| Messages | /messages | ✅ Ready |
| Profile | /profile | ✅ Ready |
| Dashboard | /dashboard | 🔄 Future |

## 💾 Database Models

**User:**
- fullName, email, phone, password
- role (landlord/houseFinder)
- profileImage, bio
- location (district, sector, cell)
- rating, reviews

**Property:**
- title, description, price
- bedrooms, bathrooms, squareFeet
- propertyType, location
- images, amenities
- views, rating, reviews

**Message:**
- conversationId, senderId, receiverId
- message, read status

**Booking:**
- propertyId, userId, landlordId
- checkInDate, checkOutDate
- status (pending, confirmed, cancelled, completed)

## 🚀 Next Steps

1. **Add Properties** - Register as landlord and add test properties
2. **Customize Colors** - Modify gradient colors in CSS files
3. **Add Images** - Integrate Cloudinary for image upload
4. **Deploy** - Deploy backend and frontend to production
5. **Add Features** - Implement dashboard, reviews, payments, etc.

## 📚 Additional Resources

- [Express.js Documentation](https://expressjs.com/)
- [React Documentation](https://react.dev/)
- [MongoDB Guide](https://docs.mongodb.com/)
- [REST API Best Practices](https://www.restapitutorial.com/)

## 🆘 Need Help?

- Check DEVELOPMENT.md for detailed development info
- See CONFIGURATION.md for setup help
- Review FEATURES.md for feature roadmap

---

**Happy coding! 🎉**
