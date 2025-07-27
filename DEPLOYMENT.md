# 🚀 Deployment Guide

This guide will help you deploy the GameAI platform with backend on Render and frontend on Vercel.

## 📋 Prerequisites

- GitHub account
- Render account (free tier available)
- Vercel account (free tier available)
- Gemini AI API key

## 🔧 Backend Deployment on Render

### Step 1: Prepare Your Repository
1. Commit all your changes to GitHub
2. Make sure your `.env` file is NOT committed (it's in `.gitignore`)

### Step 2: Deploy on Render
1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click "New" → "Web Service"
3. Connect your GitHub repository
4. Configure the service:
   - **Name**: `gameai-backend`
   - **Environment**: `Node`
   - **Region**: Choose closest to your users
   - **Branch**: `main` (or your default branch)
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`

### Step 3: Set Environment Variables
In Render dashboard, add these environment variables:
```
NODE_ENV=production
PORT=10000
GEMINI_API_KEY=your_actual_gemini_api_key_here
```

### Step 4: Deploy
1. Click "Create Web Service"
2. Wait for deployment to complete
3. Note your backend URL (e.g., `https://gameai-backend-xxx.onrender.com`)

### Step 5: Test Backend
Visit your backend URL - you should see:
```json
{
  "message": "🎮 GameAI Backend API is running!",
  "status": "healthy",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "version": "1.0.0"
}
```

## 🎯 Frontend Deployment on Vercel

### Step 1: Update API Configuration
1. Update `frontend/src/config/api.js`:
   ```javascript
   const API_CONFIG = {
     development: {
       baseURL: 'http://localhost:5000',
     },
     production: {
       baseURL: 'https://your-actual-render-backend-url.onrender.com',
     }
   };
   ```

2. Replace `your-actual-render-backend-url` with your actual Render URL

### Step 2: Deploy on Vercel
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Import your GitHub repository
4. Configure the project:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

### Step 3: Set Environment Variables
In Vercel dashboard, add these environment variables:
```
VITE_API_URL=https://your-actual-render-backend-url.onrender.com
VITE_NODE_ENV=production
```

### Step 4: Deploy
1. Click "Deploy"
2. Wait for deployment to complete
3. Your frontend will be available at `https://your-project-name.vercel.app`

## 🔍 Testing Deployment

### Backend Tests
1. Health check: `GET https://your-backend-url.onrender.com/health`
2. API test: `GET https://your-backend-url.onrender.com/api/ai/popular-games`

### Frontend Tests
1. Visit your Vercel URL
2. Check browser console for API connection
3. Try refreshing games to test AI functionality

## 🐛 Troubleshooting

### Common Backend Issues

**1. Build Fails**
- Check Node.js version in `package.json` engines
- Verify all dependencies are in `package.json`
- Check build logs in Render dashboard

**2. API Key Issues**
- Verify `GEMINI_API_KEY` is set correctly
- Check API key permissions in Google AI Studio
- Look for authentication errors in logs

**3. CORS Issues**
- Ensure CORS is configured in `server.js`
- Check if frontend URL is allowed

### Common Frontend Issues

**1. API Connection Failed**
- Verify backend URL in `api.js`
- Check if backend is running
- Look for CORS errors in browser console

**2. Build Fails**
- Check for TypeScript errors
- Verify all imports are correct
- Check Vite configuration

**3. Environment Variables**
- Ensure variables start with `VITE_`
- Check if variables are set in Vercel dashboard
- Restart deployment after adding variables

## 📊 Performance Optimization

### Backend Optimization
- Enable compression middleware
- Implement response caching
- Use connection pooling for databases
- Monitor memory usage

### Frontend Optimization
- Enable Vercel's Edge Network
- Implement image optimization
- Use code splitting
- Enable service worker caching

## 🔒 Security Checklist

- [ ] API keys are in environment variables, not code
- [ ] CORS is properly configured
- [ ] Rate limiting is implemented
- [ ] Input validation is in place
- [ ] HTTPS is enforced
- [ ] Error messages don't expose sensitive info

## 📈 Monitoring

### Backend Monitoring
- Use Render's built-in metrics
- Monitor response times
- Track error rates
- Set up alerts for downtime

### Frontend Monitoring
- Use Vercel Analytics
- Monitor Core Web Vitals
- Track user interactions
- Monitor API call success rates

## 🔄 Continuous Deployment

### Automatic Deployments
Both Render and Vercel support automatic deployments:
- Backend: Redeploys on push to main branch
- Frontend: Redeploys on push to main branch

### Manual Deployments
- Render: Click "Manual Deploy" in dashboard
- Vercel: Click "Redeploy" in dashboard

## 📞 Support

If you encounter issues:
1. Check the logs in respective dashboards
2. Verify environment variables
3. Test API endpoints manually
4. Check GitHub Issues for similar problems

---

**🎉 Congratulations! Your GameAI platform is now live!**

Share your deployed URLs:
- Backend: `https://your-backend-url.onrender.com`
- Frontend: `https://your-project-name.vercel.app`