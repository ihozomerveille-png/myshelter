# MyShelter - Architecture & Data Flow

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        INTERNET / USERS                          │
└────────────────────────┬────────────────────────────────────────┘
                         │
            ┌────────────┴────────────┐
            │                         │
       ┌────▼──────┐          ┌──────▼────┐
       │  Browser  │          │  Browser  │
       │  Port 3000│          │  Port 3000│
       └────┬──────┘          └──────┬────┘
            │                        │
            └────────────┬───────────┘
                         │
                    ┌────▼─────────────┐
                    │   React App      │
                    │  (Frontend)      │
                    │  Port 3000       │
                    └────┬─────────────┘
                         │
           ┌─────────────┴──────────────┐
           │  API Calls (Axios/HTTP)    │
           │  with JWT Authorization   │
           └─────────────┬──────────────┘
                         │
                    ┌────▼──────────────┐
                    │  Express.js API   │
                    │  (Backend)        │
                    │  Port 5000        │
                    └────┬──────────────┘
                         │
           ┌─────────────┼──────────────┐
           │             │              │
      ┌────▼──┐      ┌───▼────┐   ┌───▼────┐
      │ Auth  │      │Property│   │Message │
      │Routes │      │Routes  │   │Routes  │
      └────┬──┘      └───┬────┘   └───┬────┘
           │             │            │
           └──────────┬───┴────────────┘
                      │
              ┌───────▼──────────┐
              │ Authentication   │
              │ Middleware       │
              │ (JWT Verify)     │
              └───────┬──────────┘
                      │
           ┌──────────┼──────────┐
           │          │          │
      ┌────▼──┐   ┌───▼────┐ ┌──▼───┐
      │ User  │   │Property│ │Message
      │Model  │   │Model   │ │Model
      └────┬──┘   └───┬────┘ └──┬───┘
           │          │         │
           └──────────┼─────────┘
                      │
                  ┌───▼────────┐
                  │  MongoDB   │
                  │  Database  │
                  └────────────┘
```

## 📊 Data Models Relationship

```
┌──────────────────────┐
│       User           │
├──────────────────────┤
│ _id (ObjectId)       │
│ fullName             │
│ email (unique)       │
│ phone                │
│ password (hashed)    │
│ role (enum)          │ ──┐
│ profileImage         │   │
│ bio                  │   │
│ location             │   │
│ verified             │   │
│ rating               │   │
│ totalReviews         │   │
│ createdAt            │   │
│ updatedAt            │   │
└──────────────────────┘   │
           │                │
           │ 1-Many         │
           ▼                │
┌──────────────────────┐    │
│     Property         │◄───┘
├──────────────────────┤
│ _id (ObjectId)       │
│ landlordId (ref)     │
│ title                │
│ description          │
│ price                │
│ currency             │
│ bedrooms             │
│ bathrooms            │
│ squareFeet           │
│ propertyType         │
│ location             │
│ images []            │
│ amenities []         │
│ available            │
│ views                │
│ rating               │
│ reviews []           │
│ createdAt            │
│ updatedAt            │
└──────────────────────┘
           │
           │ 1-Many
           ▼
┌──────────────────────┐
│     Message          │
├──────────────────────┤
│ _id (ObjectId)       │
│ conversationId       │
│ senderId (ref)       │
│ receiverId (ref)     │
│ propertyId (ref)     │
│ message              │
│ read                 │
│ createdAt            │
└──────────────────────┘

┌──────────────────────┐
│      Booking         │
├──────────────────────┤
│ _id (ObjectId)       │
│ propertyId (ref)     │
│ userId (ref)         │
│ landlordId (ref)     │
│ checkInDate          │
│ checkOutDate         │
│ status (enum)        │
│ totalPrice           │
│ notes                │
│ createdAt            │
│ updatedAt            │
└──────────────────────┘
```

## 🔄 User Flow Diagram

```
┌─────────────────┐
│   New Visitor   │
└────────┬────────┘
         │
         ▼
    ┌────────┐
    │  Home  │
    │ Page   │
    └────┬───┘
         │
    ┌────┴─────────┐
    │              │
    ▼              ▼
  Login      Browse As Guest
    │              │
    │              ▼
    │         ┌──────────┐
    │         │ Property │
    │         │ Search   │
    │         └─┬────────┘
    │           │
    │           ▼
    │      ┌─────────────┐
    │      │Property     │
    │      │Detail Page  │
    │      │- Contact    │
    │      │  Landlord   │
    │      └─────────────┘
    │
    ▼
┌─────────────┐
│  Login/     │
│  Register   │
│  Page       │
└──────┬──────┘
       │
       ├──House Finder Role──┐
       │                     │
       ▼                     ▼
  ┌────────┐           ┌──────────┐
  │ Browse │           │ Search & │
  │ Props  │           │ Filter   │
  └─┬──────┘           └────┬─────┘
    │                       │
    ├───────────┬───────────┘
    │           │
    ▼           ▼
┌──────────┐ ┌──────────────┐
│Property  │ │Send Message  │
│Detail    │ │to Landlord   │
└──────────┘ └──────────────┘
    │
    ▼
┌──────────────┐
│Make Booking  │
│Request       │
└──────────────┘

       ├──Landlord Role────────┐
       │                       │
       ▼                       ▼
  ┌──────────┐          ┌──────────────┐
  │ View Own │          │ Add New      │
  │ Profile  │          │ Property     │
  └──────────┘          └──┬───────────┘
                           │
                           ▼
                    ┌──────────────┐
                    │ Property     │
                    │ Dashboard    │
                    │ - Upload     │
                    │   Details    │
                    │ - Images     │
                    │ - Amenities  │
                    └──────────────┘
                           │
                           ▼
                    ┌──────────────┐
                    │ Manage       │
                    │ Inquiries &  │
                    │ Messages     │
                    └──────────────┘
```

## 🔐 Authentication Flow

```
┌─────────────────┐
│ User Registers  │
└────────┬────────┘
         │
         ▼
┌─────────────────────┐
│ Validate Input      │
│ - Email            │
│ - Password Length  │
│ - Phone Number     │
└────────┬────────────┘
         │
         ▼
┌──────────────────┐
│ Hash Password    │
│ (bcryptjs)       │
│ - Generate salt  │
│ - 10 rounds      │
└────────┬─────────┘
         │
         ▼
┌─────────────────┐
│ Save to Database│
│ (MongoDB)       │
└────────┬────────┘
         │
         ▼
┌──────────────────┐
│ Generate JWT     │
│ Token            │
│ - User ID        │
│ - Expiry: 7 days │
└────────┬─────────┘
         │
         ▼
┌─────────────────┐
│ Return Token    │
│ + User Info     │
└────────┬────────┘
         │
         ▼
┌──────────────────┐
│ Frontend Stores  │
│ Token in         │
│ localStorage     │
└──────────────────┘

─────────────────────────────────

┌─────────────────────┐
│ User Makes API Call │
└────────┬────────────┘
         │
         ▼
┌──────────────────────┐
│ Attach Token to      │
│ Authorization Header │
│ Bearer: <token>      │
└────────┬─────────────┘
         │
         ▼
┌────────────────────────┐
│ Backend Middleware     │
│ Verifies Token         │
│ - Extract token        │
│ - Verify signature     │
│ - Check expiry         │
└────────┬───────────────┘
         │
    ┌────┴────┐
    │          │
 Valid      Invalid
    │          │
    ▼          ▼
 Pass      Return 403
 Request   Unauthorized
    │
    ▼
 Process
 Request
```

## 🗄️ API Request/Response Flow

```
BROWSER (Frontend)
    │
    │ POST /api/auth/register
    │ {
    │   "fullName": "John",
    │   "email": "john@example.com",
    │   "password": "pass123",
    │   "role": "houseFinder"
    │ }
    │
    ▼
EXPRESS SERVER (Backend)
    │
    ├─ Receive request
    ├─ Validate input
    ├─ Check if user exists
    ├─ Hash password
    ├─ Save to MongoDB
    ├─ Generate JWT
    │
    ▼
BROWSER (Frontend)
    │
    │ Response 201 {
    │   "success": true,
    │   "token": "eyJhbGc...",
    │   "user": {
    │     "id": "60d5f4c5...",
    │     "fullName": "John",
    │     "email": "john@example.com",
    │     "role": "houseFinder"
    │   }
    │ }
    │
    ▼
STORE TOKEN
 (localStorage)
```

## 🎨 Component Hierarchy

```
App
├─ Header
│  ├─ Logo
│  ├─ Navigation
│  │  ├─ Links
│  │  ├─ User Menu (if logged in)
│  │  └─ Mobile Menu
│  └─ Auth Buttons (if logged out)
│
├─ Routes
│  ├─ Home Page
│  │  ├─ Hero Section
│  │  ├─ Features Grid
│  │  └─ CTA Section
│  │
│  ├─ Register/Login
│  │  └─ Auth Form
│  │
│  ├─ Search Page
│  │  ├─ SearchFilters
│  │  │  ├─ Bedrooms Select
│  │  │  ├─ Price Input
│  │  │  ├─ Type Select
│  │  │  ├─ Location Select
│  │  │  └─ Search Input
│  │  └─ Properties Grid
│  │     └─ PropertyCard (repeating)
│  │        ├─ Image
│  │        ├─ Title
│  │        ├─ Meta Info
│  │        ├─ Location
│  │        └─ Price
│  │
│  ├─ Property Detail
│  │  ├─ Property Gallery
│  │  ├─ Property Info
│  │  ├─ Features
│  │  ├─ Description
│  │  ├─ Amenities
│  │  └─ Landlord Card (Sidebar)
│  │
│  ├─ Messages
│  │  ├─ Conversations List
│  │  └─ Chat Area
│  │
│  └─ Profile
│     ├─ Avatar
│     ├─ User Info
│     ├─ Stats
│     └─ Actions
│
└─ Footer
   ├─ Links
   ├─ Contact Info
   └─ Social Media
```

---

This architecture document provides a complete overview of how MyShelter is structured!
