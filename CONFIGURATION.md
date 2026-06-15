# MyShelter Configuration Guide

## Backend Configuration

### Environment Variables (.env)

Create a `.env` file in the `backend` directory:

```env
# Server
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/myshelter

# Authentication
JWT_SECRET=your_very_secure_jwt_secret_key_change_this_in_production

# Image Storage (Cloudinary)
CLOUDINARY_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

### MongoDB Setup

#### Option 1: Local MongoDB
```bash
# On Windows
mongod

# On Mac
brew services start mongodb-community

# On Linux
sudo systemctl start mongod
```

#### Option 2: MongoDB Atlas (Cloud)
1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account
3. Create a cluster
4. Get connection string
5. Replace MONGODB_URI in .env

### Cloudinary Setup

1. Sign up at https://cloudinary.com/
2. Go to Dashboard
3. Copy Cloud Name, API Key, and API Secret
4. Add to .env file

## Frontend Configuration

### API URL

The frontend uses `http://localhost:5000/api` by default (from package.json proxy).

To use a different API:
1. Create `.env` file in frontend directory:
   ```
   REACT_APP_API_URL=http://your-api-url/api
   ```

2. Restart the development server

## Production Deployment

### Backend Deployment (Heroku Example)

1. Install Heroku CLI
2. Login: `heroku login`
3. Create app: `heroku create myshelter-api`
4. Set environment variables:
   ```bash
   heroku config:set JWT_SECRET=your_secret
   heroku config:set MONGODB_URI=your_mongodb_uri
   heroku config:set CLOUDINARY_NAME=your_name
   heroku config:set CLOUDINARY_API_KEY=your_key
   heroku config:set CLOUDINARY_API_SECRET=your_secret
   ```
5. Deploy: `git push heroku main`

### Frontend Deployment (Vercel Example)

1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Set environment variables in Vercel dashboard:
   ```
   REACT_APP_API_URL=https://your-backend-url/api
   ```

## Database Backup

### MongoDB Local
```bash
# Backup
mongodump --out ./backup

# Restore
mongorestore ./backup
```

### MongoDB Atlas
- Automated backups available in Atlas dashboard
- Manual backups via Export feature

## Performance Configuration

### Backend
- Connection pooling (Mongoose default)
- Response compression (add to server.js)
- Rate limiting (recommended for production)
- Caching strategies

### Frontend
- Code splitting with React.lazy
- Image optimization
- Bundle analysis

## Security Checklist

- [ ] Change JWT_SECRET to strong value
- [ ] Use environment variables for secrets
- [ ] Enable HTTPS in production
- [ ] Set up CORS properly
- [ ] Implement rate limiting
- [ ] Add input validation
- [ ] Use helmet.js for security headers
- [ ] Keep dependencies updated
- [ ] Use MongoDB user authentication
- [ ] Enable database backups

## Scaling Recommendations

1. Use MongoDB Atlas for scalability
2. Implement caching (Redis)
3. Use CDN for images (Cloudinary)
4. Load balancing for backend
5. Frontend hosted on CDN

---

For more help, see DEVELOPMENT.md
