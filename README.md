# Coopvest Africa – Smart Cooperative Investment Platform

A modern, full-stack digital cooperative and investment platform designed to empower salaried workers and everyday people across Africa with access to savings, loans, and investment opportunities.

## 🎯 Project Overview

Coopvest Africa combines the trust and community-driven values of traditional cooperatives with cutting-edge financial technology to provide:

- **Savings Pools**: Build wealth through flexible, interest-bearing savings accounts
- **Smart Loans**: Access quick, affordable loans with transparent terms
- **Investment Opportunities**: Grow money through curated investment pools
- **Secure & Transparent**: Bank-level security with full transparency
- **Member Support**: 24/7 AI-powered chatbot assistance

---

## 🏗️ Technology Stack

### Frontend
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI
- **Routing**: Wouter
- **Icons**: Lucide React
- **Theme**: Dual Light/Dark mode support

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: Drizzle ORM with PostgreSQL
- **Build**: ESBuild

### Features
- ✅ Responsive design (mobile-first)
- ✅ Dark/Light theme toggle
- ✅ Role-based access control (Member, Admin, Super Admin)
- ✅ Real-time notifications
- ✅ AI-powered chatbot
- ✅ Audit logging
- ✅ Multi-factor authentication ready

---

## 📁 Project Structure

```
coopvest_africa_website/
├── client/                          # Frontend React application
│   ├── src/
│   │   ├── pages/                  # Page components
│   │   │   ├── Home.tsx            # Landing page
│   │   │   ├── About.tsx           # About Us page
│   │   │   ├── AdminDashboard.tsx  # Admin dashboard
│   │   │   ├── SuperAdminPanel.tsx # Super Admin panel
│   │   │   └── NotFound.tsx        # 404 page
│   │   ├── components/             # Reusable components
│   │   │   ├── Navigation.tsx      # Main navigation
│   │   │   ├── Footer.tsx          # Footer
│   │   │   ├── Chatbot.tsx         # AI chatbot
│   │   │   ├── ProtectedRoute.tsx  # Auth protection
│   │   │   ├── AnimatedCounters.tsx # Stat counters
│   │   │   ├── sections/           # Page sections
│   │   │   │   ├── Hero.tsx
│   │   │   │   ├── Features.tsx
│   │   │   │   ├── Testimonials.tsx
│   │   │   │   ├── FAQ.tsx
│   │   │   │   └── CTA.tsx
│   │   │   └── ui/                 # Radix UI components
│   │   ├── contexts/               # React contexts
│   │   │   ├── ThemeContext.tsx    # Theme management
│   │   │   └── AuthContext.tsx     # Authentication
│   │   ├── App.tsx                 # Main app component
│   │   └── index.css               # Global styles
│   └── package.json
├── server/                          # Backend Node.js application
│   ├── _core/                      # Core server logic
│   └── index.ts                    # Server entry point
├── drizzle/                        # Database migrations
├── shared/                         # Shared types/utilities
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── postcss.config.js
└── vite.config.ts
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and pnpm
- PostgreSQL database (for production)

### Installation

1. **Clone or extract the project**
   ```bash
   cd coopvest_africa_website
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root:
   ```env
   # Database
   DATABASE_URL=postgresql://user:password@localhost:5432/coopvest

   # API
   VITE_API_URL=http://localhost:3000/api

   # App
   VITE_APP_TITLE=Coopvest Africa
   VITE_APP_LOGO=/logo.png
   ```

4. **Run database migrations**
   ```bash
   pnpm db:push
   ```

5. **Start development server**
   ```bash
   pnpm dev
   ```

   The application will be available at `http://localhost:5173`

---

## 📋 Features

### Public Website
- ✅ Modern, responsive landing page
- ✅ About Us page with company story and values
- ✅ Services overview (Savings, Loans, Investments)
- ✅ Testimonial carousel with member success stories
- ✅ FAQ accordion with common questions
- ✅ Newsletter subscription
- ✅ Contact information and social links
- ✅ Smooth animations and micro-interactions

### Member Portal
- ✅ User authentication (login/register)
- ✅ Dashboard with account overview
- ✅ Savings management
- ✅ Loan applications
- ✅ Transaction history
- ✅ Profile management
- ✅ 24/7 AI chatbot support

### Admin Dashboard
- ✅ Quick statistics (members, loans, contributions)
- ✅ Data visualization placeholders
- ✅ User management interface
- ✅ Content management
- ✅ Loan tracking
- ✅ Notification management
- ✅ Role-based access control

### Super Admin Panel
- ✅ Global settings control
  - Interest rates
  - Contribution cycles
  - Loan parameters
  - Security policies
- ✅ Admin account management
- ✅ Security configuration
- ✅ Comprehensive audit logs
- ✅ Platform-wide analytics
- ✅ Feature rollout management

---

## 🔐 Security Features

- **Multi-Factor Authentication (MFA)**: Available for admin accounts
- **Role-Based Access Control (RBAC)**: Member, Admin, Super Admin roles
- **Data Encryption**: SSL/TLS for all communications
- **Audit Logging**: All admin actions logged and auditable
- **Secure API Endpoints**: Protected with authentication tokens
- **Input Validation**: Client and server-side validation
- **CSRF Protection**: Built-in protection against CSRF attacks

---

## 🎨 Design System

### Color Palette
- **Primary**: Blue (#2563EB)
- **Secondary**: Indigo (#4F46E5)
- **Success**: Green (#10B981)
- **Warning**: Orange (#F59E0B)
- **Danger**: Red (#EF4444)

### Typography
- **Headings**: Bold, 24px - 48px
- **Body**: Regular, 14px - 16px
- **Captions**: Small, 12px

### Components
- Rounded corners (8px - 12px)
- Soft shadows
- Smooth transitions (200ms - 300ms)
- Accessible color contrasts

---

## 📱 Responsive Design

- **Mobile**: 320px and up
- **Tablet**: 768px and up
- **Desktop**: 1024px and up
- **Large Desktop**: 1280px and up

All pages are fully responsive and mobile-optimized.

---

## 🔄 API Integration

The application connects to backend microservices for:
- User authentication
- Member data management
- Loan processing
- Transaction handling
- Notification delivery

API endpoints are documented in the backend service documentation.

---

## 🧪 Testing

Run tests with:
```bash
pnpm test
```

---

## 📦 Building for Production

```bash
pnpm build
pnpm start
```

The application will be optimized and ready for deployment.

---

## 🚀 Deployment

### Vercel (Recommended for Frontend)
```bash
vercel deploy
```

### Docker
```bash
docker build -t coopvest-africa .
docker run -p 3000:3000 coopvest-africa
```

### Traditional Server
```bash
pnpm build
pnpm start
```

---

## 📚 Documentation

- **Design Guide**: See `DESIGN.md`
- **API Documentation**: See `API.md`
- **Contributing**: See `CONTRIBUTING.md`

---

## 🤝 Support

For support, please:
1. Check the FAQ section on the website
2. Use the in-app chatbot
3. Email: support@coopvest.africa
4. Phone: +234 (800) 000-0000

---

## 📄 License

This project is proprietary software. All rights reserved © 2024 Coopvest Africa.

---

## 👥 Team

- **Amara Okonkwo** - CEO
- **Kwame Mensah** - CTO
- **Zainab Hassan** - COO

---

## 🎉 Acknowledgments

Built with modern web technologies and best practices for financial services in Africa.

---

**Last Updated**: November 2, 2024
**Version**: 1.0.0
