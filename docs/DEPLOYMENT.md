# Deployment Guide

## Overview

This guide covers deploying the OHANNA application to production environments.

## Pre-Deployment Checklist

- [ ] All tests passing
- [ ] No console errors or warnings
- [ ] Environment variables configured
- [ ] Database migrations run
- [ ] API documentation updated
- [ ] Security review completed
- [ ] Performance testing done

## Environment Variables

### Backend (.env)

```bash
# Server
PORT=3001
NODE_ENV=production

# Stripe (Required for payments)
STRIPE_SECRET_KEY=sk_live_your_production_key

# CORS (Update with production domains)
CORS_ORIGINS=https://ohanna.com,https://www.ohanna.com

# Database (When configured)
DATABASE_URL=postgresql://user:password@host:5432/ohanna
```

### Frontend (.env)

```bash
# API Base URL
VITE_API_URL=https://api.ohanna.com
```

## Building for Production

### Backend

```bash
cd api-server

# Install dependencies
npm install --legacy-peer-deps

# Build
npm run build

# Verify build
npm start
```

### Frontend

```bash
cd ohanna

# Install dependencies
npm install

# Build
npm run build

# Output in dist/
```

## Deployment Options

### Option 1: Docker

#### Dockerfile (Backend)

```dockerfile
FROM node:20-alpine

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install --legacy-peer-deps

# Copy source
COPY . .

# Build
RUN npm run build

# Expose port
EXPOSE 3001

# Start
CMD ["npm", "start"]
```

#### Dockerfile (Frontend)

```dockerfile
FROM node:20-alpine as builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Serve with nginx
FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

#### Docker Compose

```yaml
version: '3.8'

services:
  backend:
    build:
      context: ./api-server
      dockerfile: Dockerfile
    ports:
      - "3001:3001"
    environment:
      PORT: 3001
      NODE_ENV: production
      STRIPE_SECRET_KEY: ${STRIPE_SECRET_KEY}
      CORS_ORIGINS: https://ohanna.com
    depends_on:
      - db

  frontend:
    build:
      context: ./ohanna
      dockerfile: Dockerfile
    ports:
      - "80:80"
    depends_on:
      - backend

  db:
    image: postgres:15-alpine
    environment:
      POSTGRES_DB: ohanna
      POSTGRES_USER: ${DB_USER}
      POSTGRES_PASSWORD: ${DB_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

### Option 2: Heroku

#### Backend Deployment

```bash
# Create Heroku app
heroku create ohanna-api

# Set environment variables
heroku config:set NODE_ENV=production
heroku config:set STRIPE_SECRET_KEY=sk_live_...
heroku config:set CORS_ORIGINS=https://ohanna.herokuapp.com

# Deploy
git push heroku main
```

#### Frontend Deployment

```bash
# Create Heroku app
heroku create ohanna-web

# Deploy
git push heroku main
```

### Option 3: Vercel (Frontend)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables in Vercel dashboard
# VITE_API_URL=https://api.ohanna.com
```

### Option 4: AWS

#### EC2 Deployment

```bash
# SSH into instance
ssh -i key.pem ec2-user@instance-ip

# Install Node.js
curl -fsSL https://rpm.nodesource.com/setup_20.x | sudo bash -
sudo yum install -y nodejs

# Clone repository
git clone <repo-url>
cd ohanna-landing-page

# Backend setup
cd api-server
npm install --legacy-peer-deps
npm run build

# Start with PM2
npm install -g pm2
pm2 start npm --name "ohanna-api" -- start
pm2 save
pm2 startup

# Frontend setup
cd ../ohanna
npm install
npm run build

# Serve with nginx
sudo yum install -y nginx
sudo cp dist/* /var/www/html/
sudo systemctl start nginx
```

#### RDS Database

```bash
# Create RDS instance
aws rds create-db-instance \
  --db-instance-identifier ohanna-db \
  --db-instance-class db.t3.micro \
  --engine postgres \
  --master-username admin \
  --master-user-password <password>

# Update DATABASE_URL in backend
DATABASE_URL=postgresql://admin:password@ohanna-db.xxx.rds.amazonaws.com:5432/ohanna
```

### Option 5: DigitalOcean

#### App Platform

1. Connect GitHub repository
2. Configure build commands:
   - Backend: `npm install --legacy-peer-deps && npm run build`
   - Frontend: `npm install && npm run build`
3. Set environment variables
4. Deploy

#### Droplet

```bash
# SSH into droplet
ssh root@droplet-ip

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Clone and setup (similar to AWS)
```

## SSL/TLS Certificate

### Let's Encrypt (Free)

```bash
# Install Certbot
sudo apt-get install certbot python3-certbot-nginx

# Get certificate
sudo certbot certonly --nginx -d ohanna.com -d www.ohanna.com

# Auto-renewal
sudo systemctl enable certbot.timer
```

### AWS Certificate Manager

```bash
# Request certificate in AWS Console
# Validate domain ownership
# Use in CloudFront or ALB
```

## Database Migrations

```bash
# Run migrations
npm run db:migrate

# Seed data
npm run db:seed

# Rollback
npm run db:rollback
```

## Monitoring & Logging

### Backend Logs

```bash
# View logs
pm2 logs ohanna-api

# Or with Docker
docker logs container-name

# Or with systemd
journalctl -u ohanna-api -f
```

### Frontend Monitoring

- Use Sentry for error tracking
- Use Google Analytics for user tracking
- Monitor Core Web Vitals

### Database Monitoring

- Monitor connection pool
- Monitor query performance
- Set up automated backups

## Performance Optimization

### Backend

```bash
# Enable compression
npm install compression

# Enable caching
npm install redis

# Monitor performance
npm install clinic
```

### Frontend

```bash
# Analyze bundle
npm run build -- --analyze

# Optimize images
npm install sharp

# Enable service worker
npm install workbox-webpack-plugin
```

## Security Hardening

### Backend

```bash
# Enable HTTPS only
app.use((req, res, next) => {
  if (req.header('x-forwarded-proto') !== 'https') {
    res.redirect(`https://${req.header('host')}${req.url}`)
  } else {
    next()
  }
})

# Set security headers
npm install helmet
app.use(helmet())

# Rate limiting
npm install express-rate-limit
```

### Frontend

```bash
# Content Security Policy
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; script-src 'self' 'unsafe-inline'">

# X-Frame-Options
<meta http-equiv="X-UA-Compatible" content="ie=edge">
```

## Backup Strategy

### Database Backups

```bash
# Daily automated backups
0 2 * * * pg_dump $DATABASE_URL | gzip > /backups/db-$(date +\%Y\%m\%d).sql.gz

# Retention: 30 days
find /backups -name "db-*.sql.gz" -mtime +30 -delete
```

### File Backups

```bash
# Backup uploads directory
0 3 * * * tar -czf /backups/uploads-$(date +\%Y\%m\%d).tar.gz /var/www/uploads/
```

## Rollback Procedure

```bash
# Backend rollback
git revert <commit-hash>
npm run build
pm2 restart ohanna-api

# Frontend rollback
git revert <commit-hash>
npm run build
# Redeploy to hosting

# Database rollback
# Restore from backup
psql $DATABASE_URL < /backups/db-20240521.sql
```

## Monitoring Checklist

- [ ] Server uptime monitoring
- [ ] API response time monitoring
- [ ] Database performance monitoring
- [ ] Error rate monitoring
- [ ] User activity monitoring
- [ ] Security monitoring
- [ ] Backup verification

## Troubleshooting

### High Memory Usage

```bash
# Check memory
free -h

# Restart service
pm2 restart ohanna-api

# Increase swap
sudo fallocate -l 4G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
```

### Database Connection Issues

```bash
# Check connection
psql $DATABASE_URL -c "SELECT 1"

# Restart database
sudo systemctl restart postgresql

# Check connection pool
# Increase pool size in config
```

### SSL Certificate Issues

```bash
# Check certificate
openssl s_client -connect ohanna.com:443

# Renew certificate
sudo certbot renew --force-renewal
```

## Support

For deployment issues:
1. Check logs
2. Review error messages
3. Check monitoring dashboards
4. Review deployment documentation
5. Contact hosting provider support
