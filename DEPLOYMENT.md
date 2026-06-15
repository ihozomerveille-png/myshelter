# MyShelter - Deployment Guide

## 🚀 Deployment Options

### Backend Deployment

#### Option 1: Heroku (Recommended for beginners)

1. **Install Heroku CLI:**
   ```bash
   # Download from https://devcenter.heroku.com/articles/heroku-cli
   ```

2. **Login to Heroku:**
   ```bash
   heroku login
   ```

3. **Create Heroku App:**
   ```bash
   cd backend
   heroku create myshelter-api
   ```

4. **Add Environment Variables:**
   ```bash
   heroku config:set JWT_SECRET=your_secure_secret
   heroku config:set MONGODB_URI=your_mongodb_atlas_uri
   heroku config:set NODE_ENV=production
   ```

5. **Deploy:**
   ```bash
   git push heroku main
   ```

#### Option 2: Railway.app

1. Sign up at https://railway.app
2. Connect GitHub repository
3. Set environment variables in dashboard
4. Deploy with one click

**Railway Quick CLI (optional)**

If you prefer to deploy via Railway CLI (you'll need to login interactively):

```bash
npx railway login
npx railway init # initializes a new Railway project in this repo
# When asked, choose the `backend` folder as the service to deploy
npx railway up   # deploys the service and prints the public URL
```

Note: Railway will detect the `Dockerfile` or `package.json` in `backend` and build accordingly. We added a `Dockerfile` and `Procfile` to make this process smooth.

#### Option 3: Render.com

1. Sign up at https://render.com
2. Create new Web Service
3. Connect GitHub repository
4. Set environment variables
5. Deploy

#### Option 4: AWS/Google Cloud/Azure

For production-grade deployment with full control.

### Frontend Deployment

#### Option 1: Vercel (Recommended)

This is the easiest and recommended approach: deploy the **frontend** to Vercel and the **backend** to a separate service (Railway, Render, or Heroku). Vercel is ideal for Create React App static builds; Express backends should be deployed on a server or platform that supports long-lived processes.

1. **Option A — Quick (Recommended): Use Vercel for frontend, Railway/Render/Heroku for backend**

   a. Install Vercel CLI (optional):
   ```bash
   npm i -g vercel
   ```

   b. Deploy frontend (from project root or from the `frontend` folder):
   ```bash
   # from repo root (vercel.json included)
   vercel

   # or explicitly from frontend folder
   cd frontend
   vercel
   ```

   c. In the Vercel dashboard, set an environment variable for your API base URL:
   - Key: `REACT_APP_API_URL`
   - Value: `https://your-backend.example.com/api` (the publicly reachable backend URL)

   d. Redeploy (if needed) so the frontend build picks up the env var.

   Notes:
   - The included `vercel.json` at the repo root builds the `frontend` package using `@vercel/static-build` and rewrites SPA routes to `/`.
   - `frontend/src/utils/api.js` reads `process.env.REACT_APP_API_URL` and falls back to `http://localhost:5000/api` for local development.

2. **Deploy backend (Railway / Render / Heroku)**

   Railway (very quick):
   - Create an account at https://railway.app
   - Create a new project and link your GitHub repository (select the `backend` folder)
   - Set environment variables in the Railway dashboard: `MONGODB_URI`, `JWT_SECRET`, `CLOUDINARY_*` etc.
   - Deploy and copy the public URL Railway provides (e.g., `https://myshelter-backend.up.railway.app`).

   Render: similar flow — create Web Service, point to `backend` folder, set build/start commands (`npm install`, `npm run start`), and set envs.

   Heroku: from `backend` folder:
   ```bash
   heroku create myshelter-api
   git push heroku main
   heroku config:set MONGODB_URI=... JWT_SECRET=...
   ```

3. **Set the frontend API URL**

   In Vercel dashboard → Project → Settings → Environment Variables, add:
   - `REACT_APP_API_URL` = `https://<your-backend-url>/api`

   Re-deploy the frontend after adding this variable.

4. **Local testing**

   - Run backend locally: `cd backend && npm install && npm run dev`
   - Run frontend locally: `cd frontend && npm install && npm start`
   - Frontend will proxy API requests to `http://localhost:5000` during local dev (see `proxy` in `frontend/package.json`).


#### Option 2: Netlify

1. Sign up at https://netlify.com
2. Connect GitHub repository
3. Build settings:
   - Build command: `npm run build`
   - Publish directory: `build`
4. Deploy

#### Option 3: GitHub Pages

1. Add to `frontend/package.json`:
   ```json
   "homepage": "https://yourusername.github.io/MyShelter"
   ```

2. Install gh-pages:
   ```bash
   npm install --save-dev gh-pages
   ```

3. Add scripts to `package.json`:
   ```json
   "predeploy": "npm run build",
   "deploy": "gh-pages -d build"
   ```

4. Deploy:
   ```bash
   npm run deploy
   ```

## 🗄️ Database Deployment

### MongoDB Atlas Setup

1. **Go to:** https://www.mongodb.com/cloud/atlas

2. **Create Account & Cluster:**
   - Sign up
   - Create a free cluster
   - Choose region (Africa)

3. **Get Connection String:**
   - Click "Connect"
   - Choose "Connect Your Application"
   - Copy connection string
   - Replace `<password>` with your password

4. **Update `.env`:**
   ```
   MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/myshelter
   ```

## 🖼️ Image Storage Deployment

### Cloudinary Setup

1. **Sign up at:** https://cloudinary.com

2. **Get API Credentials:**
   - Dashboard → API Keys
   - Copy Cloud Name, API Key, API Secret

3. **Update `.env`:**
   ```
   CLOUDINARY_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```

## 📋 Pre-Deployment Checklist

### Backend
- [ ] All environment variables set
- [ ] MongoDB connection tested
- [ ] API endpoints tested
- [ ] Error handling implemented
- [ ] CORS properly configured
- [ ] JWT_SECRET is strong
- [ ] NODE_ENV set to production
- [ ] Logging implemented
- [ ] Database backups configured

### Frontend
- [ ] Build test: `npm run build`
- [ ] No console errors
- [ ] All routes working
- [ ] API URL configured
- [ ] Performance optimized
- [ ] Mobile responsiveness checked
- [ ] SEO tags added
- [ ] Analytics configured

### General
- [ ] Domain name registered
- [ ] SSL certificate obtained
- [ ] DNS configured
- [ ] Email service set up
- [ ] Monitoring enabled
- [ ] Backup strategy in place
- [ ] Documentation updated
- [ ] Team trained on deployment

## 🔒 Production Security

### Backend Security

1. **Install Helmet.js:**
   ```bash
   npm install helmet
   ```

2. **Update `server.js`:**
   ```javascript
   const helmet = require('helmet');
   app.use(helmet());
   ```

3. **Enable Rate Limiting:**
   ```bash
   npm install express-rate-limit
   ```

4. **Configure in `server.js`:**
   ```javascript
   const rateLimit = require('express-rate-limit');
   const limiter = rateLimit({
     windowMs: 15 * 60 * 1000,
     max: 100
   });
   app.use('/api/', limiter);
   ```

### Frontend Security

1. **Environment Variables:**
   - Never commit `.env` files
   - Use environment variable files only for development

2. **Build Optimization:**
   ```bash
   npm run build
   ```

3. **Security Headers:**
   - Configure on hosting platform
   - X-Frame-Options
   - X-Content-Type-Options
   - Content-Security-Policy

## 📊 Monitoring & Analytics

### Backend Monitoring

- Set up error tracking (Sentry)
- Enable logging (Morgan)
- Monitor database performance
- Set up alerts for errors

### Frontend Monitoring

- Google Analytics
- Sentry for error tracking
- Performance monitoring
- User behavior tracking

## 🔄 Continuous Deployment

### GitHub Actions (Recommended)

1. **Create `.github/workflows/deploy.yml`:**
   ```yaml
   name: Deploy to Production
   on:
     push:
       branches: [main]
   
   jobs:
     deploy:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v2
         - name: Deploy Backend
           run: git push heroku main
         - name: Deploy Frontend
           run: npm run deploy
   ```

## 📈 Performance Optimization

### Backend Optimization

1. Enable compression:
   ```bash
   npm install compression
   ```

2. Add to `server.js`:
   ```javascript
   const compression = require('compression');
   app.use(compression());
   ```

### Frontend Optimization

1. Code splitting with React.lazy()
2. Image optimization
3. Bundle analysis:
   ```bash
   npm install --save-dev cra-bundle-analyzer
   ```

## 🆘 Troubleshooting

### Build Fails
- Check Node version
- Clear cache: `npm cache clean --force`
- Delete node_modules and reinstall

### Connection Issues
- Verify API URL
- Check CORS settings
- Verify firewall rules

### Database Connection Fails
- Check MongoDB URI
- Verify IP whitelist (MongoDB Atlas)
- Test connection string

### Out of Memory
- Increase memory limit
- Optimize code
- Use production-grade hosting

## 📞 Support Contacts

- **Heroku Support:** https://www.heroku.com/support
- **MongoDB Support:** https://support.mongodb.com
- **Vercel Support:** https://vercel.com/support
- **Cloudinary Support:** https://cloudinary.com/support

## 📚 Additional Resources

- [Node.js Best Practices](https://nodejs.org/en/docs/guides/nodejs-performance-best-practices/)
- [React Production Build](https://create-react-app.dev/docs/production-build/)
- [MongoDB Security Checklist](https://docs.mongodb.com/manual/administration/security-checklist/)
- [OWASP Security Guidelines](https://owasp.org/www-project-top-ten/)

---

**Version:** 1.0.0  
**Last Updated:** June 2026
