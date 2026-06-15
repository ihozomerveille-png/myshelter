# MyShelter Project Overview

## 🏠 Project Description

**MyShelter** is a modern, full-stack housing marketplace web application designed specifically for Kigali, Rwanda. It connects property seekers with landlords, making it easy to find, list, and manage rental properties across Kigali's three main districts.

## 🎯 Main Features Implemented

### ✅ User Management
- User registration with role selection (Landlord/House Finder)
- Secure authentication with JWT tokens
- User profile management
- Password hashing with bcryptjs

### ✅ Property Listings
- Browse all available properties
- Advanced filtering (price, bedrooms, location, type)
- Property detail pages with full information
- Property images and amenities display
- View tracking

### ✅ Search & Discovery
- Advanced search filters
- Filter by bedrooms, price, property type
- Filter by Kigali districts (Gasabo, Kicukiro, Nyarugenge)
- Real-time search results

### ✅ Messaging System
- Direct landlord-tenant communication
- Conversation history
- Real-time message updates

### ✅ User Profiles
- Public profile pages
- Profile information display
- Landlord ratings and reviews

### ✅ Modern UI/UX
- Beautiful gradient design (purple/blue theme)
- Responsive design (mobile, tablet, desktop)
- Smooth animations and transitions
- Professional typography
- Accessible components

## 🛠️ Technology Stack

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB
- **Authentication:** JWT (JSON Web Tokens)
- **Password Security:** bcryptjs
- **Validation:** express-validator
- **File Upload:** Multer + Cloudinary

### Frontend
- **Library:** React 18
- **Routing:** React Router v6
- **HTTP Client:** Axios
- **Styling:** CSS3 + Responsive Design
- **Icons:** Lucide React
- **State Management:** React Context API

## 📁 Project Structure

```
MyShelter/
├── backend/
│   ├── config/
│   │   └── database.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Property.js
│   │   ├── Message.js
│   │   └── Booking.js
│   ├── controllers/
│   │   ├── authController.js
│   │   └── propertyController.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── properties.js
│   │   ├── users.js
│   │   ├── messages.js
│   │   └── bookings.js
│   ├── middleware/
│   │   └── auth.js
│   ├── server.js
│   ├── package.json
│   └── .env.example
│
├── frontend/
│   ├── public/
│   │   ├── index.html
│   │   └── manifest.json
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Home.js
│   │   │   ├── Login.js
│   │   │   ├── Register.js
│   │   │   ├── Search.js
│   │   │   ├── PropertyDetail.js
│   │   │   ├── Messages.js
│   │   │   └── Profile.js
│   │   ├── components/
│   │   │   ├── Header.js
│   │   │   ├── Footer.js
│   │   │   ├── PropertyCard.js
│   │   │   └── SearchFilters.js
│   │   ├── styles/
│   │   │   ├── index.css
│   │   │   ├── Header.css
│   │   │   ├── Footer.css
│   │   │   ├── Auth.css
│   │   │   ├── Home.css
│   │   │   ├── PropertyCard.css
│   │   │   ├── PropertyDetail.css
│   │   │   ├── SearchFilters.css
│   │   │   ├── Properties.css
│   │   │   ├── Messages.css
│   │   │   └── Profile.css
│   │   ├── context/
│   │   │   └── AuthContext.js
│   │   ├── utils/
│   │   │   └── api.js
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
│
├── README.md
├── QUICKSTART.md
├── DEVELOPMENT.md
├── CONFIGURATION.md
├── FEATURES.md
└── .gitignore
```

## 🌍 Location Focus

- **Primary Market:** Kigali, Rwanda
- **Districts:** Gasabo, Kicukiro, Nyarugenge
- **Currency:** RWF (Rwandan Franc)

## 🔐 Security Features

- JWT-based authentication
- Password hashing with salt rounds
- Protected API endpoints
- CORS enabled
- Input validation on both frontend and backend
- Environment variables for sensitive data

## 📱 Responsive Design

- Mobile-first approach
- Tablet optimization
- Desktop experience
- Touch-friendly interface
- Optimized navigation

## 🎨 Design System

- **Primary Color:** #667eea (Purple)
- **Secondary Color:** #764ba2 (Dark Purple)
- **Accent Color:** #667eea to #764ba2 (Gradient)
- **Background:** #f8f9fa (Light Gray)
- **Text:** #333 (Dark Gray)
- **Typography:** System fonts for performance

## 📊 API Architecture

RESTful API with the following structure:

```
Method  Endpoint                   Protected  Description
------  --------                   ---------  -----------
POST    /api/auth/register         No         Register new user
POST    /api/auth/login            No         Authenticate user
GET     /api/auth/me               Yes        Get current user
GET     /api/properties            No         Get all properties
GET     /api/properties/:id        No         Get property detail
POST    /api/properties            Yes        Create property
PUT     /api/properties/:id        Yes        Update property
DELETE  /api/properties/:id        Yes        Delete property
GET     /api/users/:id             No         Get user profile
PUT     /api/users/:id             Yes        Update profile
GET     /api/messages              Yes        Get messages
POST    /api/messages              Yes        Send message
GET     /api/bookings              Yes        Get bookings
POST    /api/bookings              Yes        Create booking
```

## 🚀 Getting Started

See **QUICKSTART.md** for detailed installation instructions.

Quick start:
```bash
# Backend
cd backend && npm install && npm run dev

# Frontend (in new terminal)
cd frontend && npm install && npm start
```

## 📈 Future Enhancements

- [ ] Advanced booking calendar
- [ ] Payment integration (Stripe, PayPal)
- [ ] Email notifications
- [ ] SMS alerts
- [ ] Property video tours
- [ ] AI recommendations
- [ ] Admin dashboard
- [ ] Landlord verification
- [ ] Reviews and ratings system
- [ ] Favorites/Wishlist
- [ ] Mobile app (React Native)
- [ ] Real-time notifications
- [ ] Analytics dashboard

## 🤝 Community

MyShelter is built with ❤️ for the Kigali community. We welcome contributions and feedback!

## 📄 License

MIT License - See LICENSE file for details

## 📞 Support

For support or questions:
- Email: support@myshelter.rw
- Website: www.myshelter.rw (coming soon)
- Issues: GitHub Issues

---

**Version:** 1.0.0  
**Last Updated:** June 2026  
**Status:** Active Development
