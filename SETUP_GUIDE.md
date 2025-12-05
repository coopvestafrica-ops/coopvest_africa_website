# CoopVest Africa - Complete Setup Guide

## 🚀 Quick Start

This guide will help you set up both the frontend and backend projects from scratch.

---

## 📋 Prerequisites

### Required Software
- **Node.js** 18+ and npm/pnpm
- **PHP** 8.2+
- **Composer** 2.x
- **PostgreSQL** 14+ (for frontend database)
- **MySQL** 8.0+ (for backend database)
- **Git**

### Optional Tools
- **Docker** & Docker Compose (for containerized setup)
- **Redis** (for caching and queues)
- **Postman** (for API testing)

---

## 🎯 Frontend Setup (React/TypeScript)

### Step 1: Install Dependencies

```bash
cd coopvest_africa_website

# Using npm (recommended for this project)
npm install --legacy-peer-deps

# Or using pnpm
pnpm install
```

### Step 2: Configure Environment

```bash
# Copy the environment template
cp .env.local .env.local

# Edit .env.local with your configuration
nano .env.local
```

**Required Environment Variables:**
```env
# Database (PostgreSQL)
DATABASE_URL=postgresql://username:password@localhost:5432/coopvest_africa

# Backend API
VITE_API_URL=http://localhost:8000/api
VITE_BACKEND_URL=http://localhost:8000

# App Configuration
VITE_APP_TITLE=Coopvest Africa
VITE_APP_ENV=development
```

### Step 3: Set Up Database

```bash
# Option 1: Using Drizzle ORM (recommended)
npm run db:push

# Option 2: Manual migration
npx drizzle-kit generate
npx drizzle-kit migrate
```

### Step 4: Start Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Step 5: Build for Production

```bash
# Build frontend and backend
npm run build

# Start production server
npm start
```

---

## 🔧 Backend Setup (Laravel/PHP)

### Step 1: Install Dependencies

```bash
cd coopvest_africa_backend

# Install PHP dependencies
composer install
```

### Step 2: Configure Environment

```bash
# Copy environment template
cp .env.example .env

# Generate application key
php artisan key:generate
```

### Step 3: Configure Database

Edit `.env` file:
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=coopvest_africa
DB_USERNAME=root
DB_PASSWORD=your_password
```

### Step 4: Create Database

```bash
# Using MySQL CLI
mysql -u root -p
CREATE DATABASE coopvest_africa CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
EXIT;
```

### Step 5: Run Migrations

```bash
# Run all migrations
php artisan migrate

# Run migrations with seeders
php artisan migrate --seed
```

### Step 6: Configure Storage

```bash
# Create symbolic link for storage
php artisan storage:link

# Set proper permissions
chmod -R 775 storage bootstrap/cache
```

### Step 7: Start Development Server

```bash
# Start Laravel development server
php artisan serve

# Or specify host and port
php artisan serve --host=0.0.0.0 --port=8000
```

The API will be available at `http://localhost:8000`

---

## 🔐 Security Configuration

### Frontend Security

1. **Update JWT Secret**
```env
VITE_JWT_SECRET=your_secure_random_string_here
```

2. **Configure CORS** (if needed)
```typescript
// In vite.config.ts
server: {
  proxy: {
    '/api': {
      target: 'http://localhost:8000',
      changeOrigin: true,
    }
  }
}
```

### Backend Security

1. **Configure Sanctum** (API Authentication)
```bash
php artisan vendor:publish --provider="Laravel\Sanctum\SanctumServiceProvider"
php artisan migrate
```

2. **Configure CORS**
Edit `config/cors.php`:
```php
'paths' => ['api/*', 'sanctum/csrf-cookie'],
'allowed_origins' => ['http://localhost:5173'],
'supports_credentials' => true,
```

3. **Set Up Rate Limiting**
Edit `app/Http/Kernel.php` or configure in routes.

---

## 🧪 Testing

### Frontend Tests

```bash
# Run unit tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage
```

### Backend Tests

```bash
# Run PHPUnit tests
php artisan test

# Run specific test suite
php artisan test --testsuite=Feature

# Run with coverage
php artisan test --coverage
```

---

## 🐳 Docker Setup (Optional)

### Using Docker Compose

Create `docker-compose.yml` in project root:

```yaml
version: '3.8'

services:
  frontend:
    build: ./coopvest_africa_website
    ports:
      - "5173:5173"
    volumes:
      - ./coopvest_africa_website:/app
    environment:
      - NODE_ENV=development

  backend:
    build: ./coopvest_africa_backend
    ports:
      - "8000:8000"
    volumes:
      - ./coopvest_africa_backend:/var/www/html
    depends_on:
      - mysql
      - postgres

  mysql:
    image: mysql:8.0
    environment:
      MYSQL_ROOT_PASSWORD: root
      MYSQL_DATABASE: coopvest_africa
    ports:
      - "3306:3306"

  postgres:
    image: postgres:14
    environment:
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: coopvest_africa
    ports:
      - "5432:5432"
```

Run with Docker:
```bash
docker-compose up -d
```

---

## 📊 Database Seeding

### Backend Seeders

```bash
# Run all seeders
php artisan db:seed

# Run specific seeder
php artisan db:seed --class=UserSeeder

# Fresh migration with seeding
php artisan migrate:fresh --seed
```

### Frontend Test Data

Create test data using the API or database directly.

---

## 🔍 Troubleshooting

### Common Issues

#### 1. **Port Already in Use**
```bash
# Frontend
lsof -ti:5173 | xargs kill -9

# Backend
lsof -ti:8000 | xargs kill -9
```

#### 2. **Permission Denied (Laravel)**
```bash
sudo chmod -R 775 storage bootstrap/cache
sudo chown -R $USER:www-data storage bootstrap/cache
```

#### 3. **Database Connection Failed**
- Verify database credentials in `.env`
- Ensure database server is running
- Check firewall settings

#### 4. **npm install fails**
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
```

#### 5. **Composer install fails**
```bash
# Update composer
composer self-update

# Clear composer cache
composer clear-cache

# Install with verbose output
composer install -vvv
```

---

## 🚀 Deployment

### Frontend Deployment (Vercel/Netlify)

```bash
# Build for production
npm run build

# Deploy to Vercel
vercel deploy

# Or deploy to Netlify
netlify deploy --prod
```

### Backend Deployment (VPS/Cloud)

```bash
# Optimize for production
composer install --optimize-autoloader --no-dev
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Set proper permissions
chmod -R 755 storage bootstrap/cache
```

---

## 📚 Additional Resources

- [React Documentation](https://react.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/)
- [Laravel Documentation](https://laravel.com/docs)
- [Vite Documentation](https://vitejs.dev/)
- [Drizzle ORM Documentation](https://orm.drizzle.team/)

---

## 🆘 Getting Help

- Check the [ERROR_ANALYSIS_AND_FIXES.md](./ERROR_ANALYSIS_AND_FIXES.md) document
- Review existing documentation in the project
- Contact the development team

---

**Last Updated**: December 2, 2024
**Version**: 1.0.0
