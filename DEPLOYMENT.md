# Coopvest Africa Frontend - Deployment Guide

This guide covers deploying the Coopvest Africa React/Vite frontend to production environments.

## 📋 Pre-Deployment Checklist

### Configuration
- [ ] Update API URL to production backend
- [ ] Set environment variables
- [ ] Configure analytics (Google Analytics, Mixpanel, etc.)
- [ ] Set up error tracking (Sentry, Rollbar, etc.)
- [ ] Configure CDN for static assets
- [ ] Enable compression and caching
- [ ] Set up HTTPS/SSL

### Performance
- [ ] Run performance audit
- [ ] Optimize images
- [ ] Minify CSS/JS
- [ ] Set up lazy loading
- [ ] Configure caching headers
- [ ] Test on slow networks

### Security
- [ ] Enable Content Security Policy (CSP)
- [ ] Configure CORS headers
- [ ] Set security headers
- [ ] Enable HTTPS only
- [ ] Implement rate limiting
- [ ] Set up DDoS protection

### Testing
- [ ] Test all pages and features
- [ ] Test on multiple browsers
- [ ] Test on mobile devices
- [ ] Test API integration
- [ ] Test error handling
- [ ] Verify analytics tracking

## 🚀 Deployment Steps

### 1. Environment Setup

Create `.env.production`:
```env
VITE_API_URL=https://api.yourdomain.com/api
VITE_APP_NAME=Coopvest Africa
VITE_APP_TITLE=Coopvest Africa - Smart Cooperative Investment
VITE_ANALYTICS_ID=UA-XXXXXXXXX-X
VITE_SENTRY_DSN=https://key@sentry.io/project-id
```

### 2. Build for Production

```bash
# Install dependencies
pnpm install

# Build
pnpm build

# The dist/ folder contains production-ready files
```

### 3. Deployment Options

#### Option A: Vercel (Recommended for React/Vite)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod

# Configure environment variables in Vercel dashboard
```

#### Option B: Netlify

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Deploy
netlify deploy --prod --dir=dist

# Configure in netlify.toml
```

Create `netlify.toml`:
```toml
[build]
command = "pnpm build"
publish = "dist"

[[redirects]]
from = "/*"
to = "/index.html"
status = 200

[[headers]]
for = "/*"
[headers.values]
X-Frame-Options = "SAMEORIGIN"
X-Content-Type-Options = "nosniff"
X-XSS-Protection = "1; mode=block"
Referrer-Policy = "no-referrer-when-downgrade"
```

#### Option C: AWS S3 + CloudFront

```bash
# Build
pnpm build

# Create S3 bucket
aws s3 mb s3://coopvest-frontend

# Upload files
aws s3 sync dist/ s3://coopvest-frontend --delete

# Create CloudFront distribution
# Configure in AWS Console
```

#### Option D: Docker

Create `Dockerfile`:
```dockerfile
# Build stage
FROM node:20-alpine as builder
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install
COPY . .
RUN pnpm build

# Production stage
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

Create `nginx.conf`:
```nginx
server {
    listen 80;
    server_name _;
    
    root /usr/share/nginx/html;
    index index.html;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;

    # Gzip compression
    gzip on;
    gzip_types text/plain text/css text/xml text/javascript 
               application/x-javascript application/xml+rss 
               application/json application/javascript;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

Build and push Docker image:
```bash
docker build -t coopvest-frontend:latest .
docker tag coopvest-frontend:latest your-registry/coopvest-frontend:latest
docker push your-registry/coopvest-frontend:latest
```

#### Option E: Traditional Server (Nginx)

```bash
# Build
pnpm build

# Copy to server
scp -r dist/* user@server:/var/www/coopvest-frontend/

# Configure Nginx
sudo nano /etc/nginx/sites-available/coopvest-frontend
```

Nginx configuration:
```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name yourdomain.com www.yourdomain.com;

    ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;

    root /var/www/coopvest-frontend;
    index index.html;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Permissions-Policy "geolocation=(), microphone=(), camera=()" always;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_types text/plain text/css text/xml text/javascript 
               application/x-javascript application/xml+rss 
               application/json application/javascript;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Deny access to sensitive files
    location ~ /\. {
        deny all;
    }
}
```

Enable and restart:
```bash
sudo ln -s /etc/nginx/sites-available/coopvest-frontend /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### 4. SSL Certificate

```bash
# Using Let's Encrypt
sudo apt install -y certbot python3-certbot-nginx
sudo certbot certonly --nginx -d yourdomain.com -d www.yourdomain.com
```

### 5. Performance Optimization

```bash
# Enable Gzip compression
# Already configured in Nginx

# Set cache headers
# Already configured in Nginx

# Optimize images
# Use tools like ImageOptim, TinyPNG

# Minify assets
# Already done by Vite build
```

## 📊 Post-Deployment

### Verification

```bash
# Test homepage
curl https://yourdomain.com

# Check security headers
curl -I https://yourdomain.com

# Test API connectivity
curl https://api.yourdomain.com/api/auth/me
```

### Monitoring Setup

1. **Performance Monitoring**
   - Set up Google Analytics
   - Configure Core Web Vitals tracking
   - Monitor page load times

2. **Error Tracking**
   - Set up Sentry
   - Configure error notifications
   - Monitor error rates

3. **Uptime Monitoring**
   - Set up UptimeRobot
   - Configure alerting
   - Monitor critical pages

4. **Log Aggregation**
   - Set up CloudWatch or similar
   - Configure log retention
   - Set up alerts

### Analytics Configuration

Update `client/src/main.tsx`:
```typescript
import { useEffect } from 'react';

// Google Analytics
useEffect(() => {
  if (import.meta.env.VITE_ANALYTICS_ID) {
    // Initialize GA
  }
}, []);

// Sentry
if (import.meta.env.VITE_SENTRY_DSN) {
  // Initialize Sentry
}
```

## 🔄 Maintenance

### Regular Tasks

**Daily:**
- Monitor error logs
- Check uptime status
- Review analytics

**Weekly:**
- Review performance metrics
- Check security alerts
- Test critical flows

**Monthly:**
- Review usage patterns
- Plan updates
- Analyze user feedback

### Updates & Patches

```bash
# Update dependencies
pnpm update

# Run tests
pnpm test

# Build and test
pnpm build
pnpm preview

# Deploy
pnpm build
# Deploy dist/ folder
```

## 🚨 Troubleshooting

### Common Issues

**404 on page refresh**
- Ensure Nginx is configured to serve index.html for all routes
- Check `try_files $uri $uri/ /index.html;` in Nginx config

**API calls failing**
- Verify CORS is configured on backend
- Check API URL in environment variables
- Verify API is accessible from frontend domain

**Slow performance**
- Check Gzip compression is enabled
- Verify caching headers are set
- Optimize images
- Use CDN for static assets

**SSL certificate issues**
- Renew certificate: `sudo certbot renew`
- Check certificate expiration: `sudo certbot certificates`

## 📞 Support

For deployment issues, refer to:
- Vite documentation: https://vitejs.dev/
- React documentation: https://react.dev/
- Nginx documentation: https://nginx.org/
