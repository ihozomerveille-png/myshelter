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

1. **Install Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Deploy:**
   ```bash
   cd frontend
   vercel
   ```

3. **Set Environment Variables:**
   - Go to Vercel dashboard
   - Project settings → Environment Variables
   - Add `REACT_APP_API_URL=your_backend_url/api`

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
