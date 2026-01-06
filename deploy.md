# Deployment Guide

## 🚀 Deployment Options

### 1. Vercel (Recommended)

1. **Install Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Deploy:**
   ```bash
   vercel
   ```

3. **Configure:**
   - Set build command: `npm run build`
   - Set output directory: `dist`
   - Set install command: `npm install`

### 2. Netlify

1. **Build the project:**
   ```bash
   npm run build
   ```

2. **Deploy to Netlify:**
   - Drag and drop the `dist` folder to Netlify
   - Or connect your Git repository

3. **Configure:**
   - Build command: `npm run build`
   - Publish directory: `dist`

### 3. GitHub Pages

1. **Install gh-pages:**
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Add to package.json:**
   ```json
   {
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d dist"
     }
   }
   ```

3. **Deploy:**
   ```bash
   npm run deploy
   ```

### 4. Traditional Web Hosting

1. **Build the project:**
   ```bash
   npm run build
   ```

2. **Upload contents of `dist` folder to your web server**

## 🔧 Environment Variables

Set these in your deployment platform:

- `VITE_APP_TITLE`: App title
- `VITE_APP_DESCRIPTION`: App description
- `VITE_YOUTUBE_API_KEY`: YouTube API key
- `VITE_DEFAULT_VIDEO_ID`: Default video ID

## 📱 Performance Optimization

- Enable gzip compression
- Set up CDN for static assets
- Configure caching headers
- Enable HTTPS
- Set up monitoring and analytics

## 🔒 Security Considerations

- Use HTTPS in production
- Set up CSP headers
- Configure security headers
- Regular dependency updates
- Environment variable security
