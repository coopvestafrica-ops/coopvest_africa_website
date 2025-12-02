# Coopvest Flutter to Web App Feature Parity Implementation Plan

**Document Version**: 1.0  
**Date**: November 12, 2025  
**Objective**: Implement all Flutter app features into the web application with feature parity

---

## 📋 Executive Summary

This document outlines a comprehensive plan to migrate and implement all features from the **Coopvest Flutter mobile app** into the **Coopvest web application** (Vue.js/React frontend with Laravel/Node.js backend).

The Flutter app has been analyzed to extract:
- **Core Features**: Loan management, guarantor system, savings, contributions, referrals
- **Data Models**: User, Loan, LoanApplication, EmploymentVerification, Guarantor
- **Services**: API integration, authentication, loan processing
- **Workflows**: Application flows, QR code scanning, document verification

---

## 🎯 Flutter App Features Identified

### **1. Authentication & User Management**
- ✅ Login/Signup
- ✅ 2FA (Two-Factor Authentication)
- ✅ Biometric authentication
- ✅ JWT token management
- ✅ Session management

### **2. Loan System**
- ✅ **Loan Types**: Multiple loan products with configurable interest rates
- ✅ **Loan Application**: Multi-step form with employment & financial info
- ✅ **Loan Status Tracking**: pending, approved, rejected, active, completed
- ✅ **Loan Rollover**: Ability to take new loans based on previous loan balance
- ✅ **Guarantor System**: Multi-guarantor support with QR code verification
- ✅ **Employment Verification**: Verify employment status and salary
- ✅ **Document Upload**: Supporting documents (employment letter, ID, etc.)

### **3. User Features**
- ✅ Member Dashboard
- ✅ Savings Management
- ✅ Contribution Tracking
- ✅ Wallet/Transactions
- ✅ Referral Program
- ✅ My Guarantees (Guarantees user has given)
- ✅ Profile Management
- ✅ Employment Details

### **4. Admin Features**
- ✅ Admin Dashboard
- ✅ KYC Management
- ✅ Loan Application Review
- ✅ Guarantor Verification
- ✅ Employment Verification Review
- ✅ Salary Deduction Consent

### **5. Advanced Features**
- ✅ QR Code Generation & Scanning (Guarantor verification)
- ✅ PDF Document Generation
- ✅ Real-time Notifications
- ✅ Offline Support (Local storage)
- ✅ Analytics & Reporting

---

## 🏗️ Data Models to Implement

### **1. User Model**
```typescript
interface User {
  id: string;
  email: string;
  fullName: string;
  dateOfBirth: Date;
  gender: string;
  address: string;
  phone: string;
  bvn: string; // Bank Verification Number
  profilePhotoUrl?: string;
  governmentIdUrl?: string;
  
  // Employment Information
  employerName: string;
  employmentStatus: string; // "permanent", "contract", "self-employed"
  jobTitle: string;
  workAddress: string;
  monthlyIncome: number;
  employmentStartDate: Date;
  
  // Account Status
  accountStatus: string; // "active", "suspended", "pending_verification"
  kycStatus: string; // "pending", "verified", "rejected"
  createdAt: Date;
  updatedAt: Date;
}
```

### **2. Loan Model**
```typescript
interface Loan {
  id: string;
  userId: string;
  amount: number;
  status: string; // "pending", "approved", "rejected", "active", "completed", "defaulted"
  tenureMonths: number;
  startDate: Date;
  endDate: Date;
  amountPaid: number;
  interestRate: number;
  monthlyPayment: number;
  totalInterest: number;
  
  // Rollover Support
  isRollover: boolean;
  remainingFromPrevious?: number;
  previousLoanId?: string;
  
  // Additional Info
  loanType: string; // "personal", "emergency", "business", etc.
  purpose: string;
  documents: LoanDocument[];
  createdAt: Date;
  lastUpdated: Date;
}
```

### **3. Loan Application Model**
```typescript
interface LoanApplication {
  id?: string;
  userId: string;
  amount: number;
  tenureMonths: number;
  status: string; // "draft", "submitted", "reviewing", "approved", "rejected"
  
  // Employment Details
  employment: {
    companyName: string;
    position: string;
    employmentType: string; // "permanent", "contract", "self-employed"
    monthlySalary: number;
    employmentDate: Date;
    companyEmail?: string;
  };
  
  // Financial Information
  financials: {
    monthlyExpenses: number;
    existingDebt: number;
    creditLimit?: number;
    savingsBalance: number;
  };
  
  // Guarantors
  guarantors: Guarantor[];
  
  // Documents
  documents?: Record<string, string>; // docType -> fileUrl
  
  // Timestamps
  createdAt?: Date;
  lastUpdated?: Date;
}
```

### **4. Guarantor Model**
```typescript
interface Guarantor {
  id: string;
  loanId: string;
  guarantorUserId: string;
  guarantorName: string;
  guarantorPhone: string;
  relationship: string; // "family", "friend", "colleague"
  status: string; // "pending", "confirmed", "rejected", "revoked"
  
  // Verification
  verificationCode: string;
  qrCodeUrl: string;
  confirmedAt?: Date;
  
  // Employment Verification
  employmentVerified: boolean;
  employmentVerificationUrl?: string;
  
  createdAt: Date;
}
```

### **5. Employment Verification Model**
```typescript
interface EmploymentVerification {
  id: string;
  userId: string;
  companyName: string;
  employeeId?: string;
  position: string;
  companyEmail?: string;
  isEmailVerified: boolean;
  employmentStartDate: Date;
  monthlySalary: number;
  employmentStatus: string; // "permanent", "contract"
  
  // Documents
  documentUrls: string[];
  
  // Verification Status
  verificationStatus: string; // "pending", "verified", "rejected"
  verifiedAt?: Date;
  rejectionReason?: string;
  
  // Steps
  verificationSteps: Record<string, boolean>;
  
  createdAt: Date;
}
```

---

## 🔄 Feature Implementation Mapping

### **Phase 1: Core Loan System**

#### **1.1 Loan Type Management**
**Flutter Implementation**: `LoanTypeInfo` with `interestRate` and `durationMonths`

**Web Implementation Tasks**:
- [ ] Create `LoanType` entity in Laravel
- [ ] Create `/admin/loan-types` management page
- [ ] Add API endpoints for CRUD operations
- [ ] Create loan calculator component

**API Endpoints Needed**:
```
GET    /api/loan-types                    # Get all loan types
POST   /api/loan-types                    # Create loan type (Admin)
PUT    /api/loan-types/:id                # Update loan type (Admin)
DELETE /api/loan-types/:id                # Delete loan type (Admin)
GET    /api/loan-types/:id/calculate      # Calculate loan details
```

---

#### **1.2 Loan Application**
**Flutter Implementation**: Multi-step form with employment, financials, and guarantors

**Web Implementation Tasks**:
- [ ] Create multi-step loan application form
- [ ] Implement employment information section
- [ ] Add financial information form
- [ ] Create guarantor selection/invitation UI
- [ ] Document upload functionality
- [ ] Form validation and submission

**Components to Create**:
- `LoanApplicationForm.vue` - Main form container
- `EmploymentInfoStep.vue` - Employment details
- `FinancialInfoStep.vue` - Financial information
- `GuarantorStep.vue` - Guarantor management
- `DocumentUploadStep.vue` - Document uploads
- `LoanReviewStep.vue` - Summary and submission

**API Endpoints Needed**:
```
POST   /api/loan/apply                    # Submit loan application
GET    /api/loan/application/:id          # Get application details
PUT    /api/loan/application/:id          # Update application (Draft)
GET    /api/loan/applications             # List user's applications
GET    /api/admin/loan/applications       # List all applications (Admin)
PUT    /api/admin/loan/application/:id/review  # Review application (Admin)
```

---

#### **1.3 Loan Status Management**
**Flutter Implementation**: Status tracking with active/completed/defaulted states

**Web Implementation Tasks**:
- [ ] Create loan status dashboard
- [ ] Implement payment tracking
- [ ] Add loan history view
- [ ] Create loan details page with payment schedule
- [ ] Add amortization schedule calculator

**Components to Create**:
- `LoanDashboard.vue` - Overview of active loans
- `LoanDetails.vue` - Individual loan details
- `LoanHistory.vue` - Past loans
- `PaymentSchedule.vue` - Amortization table
- `LoanStatusBadge.vue` - Status indicator

**API Endpoints Needed**:
```
GET    /api/loans                         # Get user's loans
GET    /api/loans/:id                     # Get loan details
GET    /api/loans/:id/payments            # Get payment history
GET    /api/loans/:id/schedule            # Get payment schedule
POST   /api/loans/:id/pay                 # Record payment
```

---

#### **1.4 Loan Rollover Feature**
**Flutter Implementation**: Create new loan based on remaining balance from previous loan

**Web Implementation Tasks**:
- [ ] Add rollover eligibility check logic
- [ ] Create rollover application UI
- [ ] Implement automatic loan linking
- [ ] Display rollover opportunity badge

**Components to Create**:
- `LoanRolloverOption.vue` - Rollover CTA
- `RolloverEligibilityCheck.vue` - Validation

**API Endpoints Needed**:
```
POST   /api/loans/:id/check-rollover      # Check rollover eligibility
POST   /api/loans/:id/rollover            # Apply for rollover
GET    /api/loans/:id/rollover-suggestion # Get rollover terms
```

---

### **Phase 2: Guarantor System**

#### **2.1 Guarantor Management**
**Flutter Implementation**: QR code scanning, verification, confirmation

**Web Implementation Tasks**:
- [ ] Create guarantor invitation system
- [ ] Generate QR codes for guarantor verification
- [ ] Build guarantor verification page
- [ ] Implement "My Guarantees" dashboard
- [ ] Add guarantor revocation functionality

**Components to Create**:
- `GuarantorList.vue` - List guarantors for a loan
- `InviteGuarantor.vue` - Send guarantor invitation
- `GuarantorQRCode.vue` - Display QR for scanning
- `GuarantorVerification.vue` - Guarantor acceptance page
- `MyGuarantees.vue` - Guarantees user has given
- `GuarantorManagement.vue` - Revoke/view guarantees

**API Endpoints Needed**:
```
POST   /api/guarantor/invite              # Invite guarantor
GET    /api/guarantor/:code               # Get guarantor verification details
POST   /api/guarantor/:code/confirm       # Confirm as guarantor
POST   /api/guarantor/:id/revoke          # Revoke guarantee
GET    /api/guarantor/my-guarantees       # Get guarantees user has given
GET    /api/loan/:id/guarantors           # Get loan guarantors
```

---

#### **2.2 Guarantor Eligibility Check**
**Flutter Implementation**: Validate guarantor eligibility before confirmation

**Web Implementation Tasks**:
- [ ] Implement eligibility validation logic
- [ ] Display eligibility criteria to user
- [ ] Show reasons if ineligible
- [ ] Allow appeal process (optional)

**API Endpoints Needed**:
```
GET    /api/guarantor/eligibility/:id     # Check guarantor eligibility
GET    /api/guarantor/:id/requirements    # Get eligibility requirements
```

---

### **Phase 3: Employment & KYC Verification**

#### **3.1 Employment Verification**
**Flutter Implementation**: Verify employment status with company email verification

**Web Implementation Tasks**:
- [ ] Create employment details form
- [ ] Add email verification flow
- [ ] Build document upload for employment proof
- [ ] Implement verification status dashboard
- [ ] Create admin review interface

**Components to Create**:
- `EmploymentVerificationForm.vue` - Submit employment info
- `EmailVerificationStep.vue` - Email verification
- `DocumentUploadEmployment.vue` - Upload proofs
- `EmploymentVerificationStatus.vue` - Status display
- `AdminEmploymentReview.vue` - Admin review interface

**API Endpoints Needed**:
```
POST   /api/employment/verify             # Submit employment info
POST   /api/employment/send-email         # Send verification email
GET    /api/employment/verify/:token      # Verify email token
GET    /api/employment/status             # Get verification status
PUT    /api/admin/employment/:id/review   # Admin review/approve
GET    /api/admin/employment              # List verifications to review
```

---

#### **3.2 KYC Verification**
**Flutter Implementation**: KYC with document upload and face verification

**Web Implementation Tasks**:
- [ ] Create KYC form
- [ ] Document upload functionality
- [ ] Identity verification (BVN validation)
- [ ] Build admin KYC review dashboard
- [ ] Create KYC status tracker

**Components to Create**:
- `KYCForm.vue` - KYC information form
- `DocumentUploadKYC.vue` - Upload ID documents
- `KYCStatus.vue` - Verification status
- `AdminKYCReview.vue` - Admin review interface
- `BVNValidation.vue` - BVN lookup/validation

**API Endpoints Needed**:
```
POST   /api/kyc/submit                    # Submit KYC
GET    /api/kyc/status                    # Get KYC status
PUT    /api/kyc/upload/:docType           # Upload document
POST   /api/kyc/validate-bvn              # Validate BVN
PUT    /api/admin/kyc/:id/approve         # Admin approve KYC
PUT    /api/admin/kyc/:id/reject          # Admin reject KYC
GET    /api/admin/kyc                     # List pending KYC
```

---

### **Phase 4: Member Features**

#### **4.1 Savings Management**
**Flutter Implementation**: View savings balance, transaction history

**Web Implementation Tasks**:
- [ ] Create savings dashboard
- [ ] Show balance and statistics
- [ ] Transaction history view
- [ ] Savings goals tracker (optional)

**Components to Create**:
- `SavingsDashboard.vue` - Main savings overview
- `SavingsTransactions.vue` - Transaction history
- `SavingsGoals.vue` - Goals tracker (optional)
- `SavingsStatistics.vue` - Charts and stats

**API Endpoints Needed**:
```
GET    /api/savings/balance               # Get savings balance
GET    /api/savings/transactions          # Get transactions
GET    /api/savings/statistics            # Get statistics
POST   /api/savings/deposit               # Record deposit
POST   /api/savings/withdraw              # Record withdrawal
```

---

#### **4.2 Contributions Management**
**Flutter Implementation**: Track member contributions

**Web Implementation Tasks**:
- [ ] Create contributions view
- [ ] Show contribution history
- [ ] Display contribution rules/schedule
- [ ] Calculate contribution amounts

**Components to Create**:
- `ContributionsDashboard.vue` - Overview
- `ContributionHistory.vue` - Historical records
- `ContributionSchedule.vue` - Upcoming contributions
- `ContributionStatistics.vue` - Charts

**API Endpoints Needed**:
```
GET    /api/contributions/balance         # Get total contributions
GET    /api/contributions/history         # Get history
GET    /api/contributions/schedule        # Get schedule
POST   /api/contributions/make            # Make contribution
```

---

#### **4.3 Referral Program**
**Flutter Implementation**: Referral tracking, bonus management

**Web Implementation Tasks**:
- [ ] Create referral dashboard
- [ ] Generate referral links/codes
- [ ] Track referrals and bonuses
- [ ] Referral history view

**Components to Create**:
- `ReferralDashboard.vue` - Overview
- `ReferralLink.vue` - Generate and share
- `ReferralHistory.vue` - Track referrals
- `ReferralBonus.vue` - Bonus tracking

**API Endpoints Needed**:
```
GET    /api/referral/code                 # Get referral code
GET    /api/referral/history              # Get referrals made
GET    /api/referral/bonus                # Get bonus info
POST   /api/referral/claim-bonus          # Claim referral bonus
```

---

#### **4.4 Wallet & Transactions**
**Flutter Implementation**: Wallet balance, transaction history

**Web Implementation Tasks**:
- [ ] Create wallet dashboard
- [ ] Transaction history with filters
- [ ] Transaction details view
- [ ] Export transactions (CSV/PDF)

**Components to Create**:
- `WalletDashboard.vue` - Overview
- `TransactionHistory.vue` - Full history
- `TransactionDetails.vue` - Single transaction
- `TransactionExport.vue` - Export functionality

**API Endpoints Needed**:
```
GET    /api/wallet/balance                # Get wallet balance
GET    /api/transactions                  # Get transactions
GET    /api/transactions/:id              # Get transaction details
POST   /api/transactions/export           # Export transactions
```

---

### **Phase 5: Admin Features**

#### **5.1 Admin Dashboard**
**Flutter Implementation**: Overview of all activities

**Web Implementation Tasks**:
- [ ] Create comprehensive admin dashboard
- [ ] Add key metrics/KPIs
- [ ] User management interface
- [ ] Loan overview statistics
- [ ] Recent activities feed

**Components to Create**:
- `AdminDashboard.vue` - Main dashboard
- `AdminMetrics.vue` - KPI cards
- `AdminActivityFeed.vue` - Recent activities
- `AdminCharts.vue` - Dashboard charts

---

#### **5.2 Salary Deduction Consent**
**Flutter Implementation**: Salary deduction authorization form

**Web Implementation Tasks**:
- [ ] Create salary deduction form
- [ ] Store consent records
- [ ] Admin approval workflow
- [ ] Consent status tracking

**Components to Create**:
- `SalaryDeductionForm.vue` - Consent form
- `SalaryDeductionConsent.vue` - Review consent
- `AdminSalaryDeductionReview.vue` - Admin review

**API Endpoints Needed**:
```
POST   /api/salary-deduction/consent      # Submit consent
GET    /api/salary-deduction/consent      # Get consent status
PUT    /api/admin/salary-deduction/:id/approve  # Approve
PUT    /api/admin/salary-deduction/:id/reject   # Reject
```

---

#### **5.3 User Management**
**Flutter Implementation**: Not directly shown, but needed for admin

**Web Implementation Tasks**:
- [ ] Create user list page
- [ ] User details/edit page
- [ ] Account suspension/activation
- [ ] User search and filters
- [ ] Bulk actions (optional)

**Components to Create**:
- `UserManagement.vue` - User list
- `UserDetails.vue` - User profile
- `UserActions.vue` - Suspend/activate

---

### **Phase 6: Support & Notifications**

#### **6.1 Ticketing System**
**Flutter Implementation**: Support tickets (from `/features/tickets`)

**Web Implementation Tasks**:
- [ ] Create ticket submission form
- [ ] Ticket tracking dashboard
- [ ] Ticket details with messages
- [ ] Admin ticket management
- [ ] Ticket status workflow

**Components to Create**:
- `TicketForm.vue` - Submit ticket
- `TicketList.vue` - User's tickets
- `TicketDetails.vue` - Ticket view
- `AdminTicketManagement.vue` - Admin interface

**API Endpoints Needed**:
```
POST   /api/ticket/create                 # Create ticket
GET    /api/tickets                       # Get user's tickets
GET    /api/ticket/:id                    # Get ticket details
POST   /api/ticket/:id/reply              # Add reply
GET    /api/admin/tickets                 # Admin: List all
PUT    /api/admin/ticket/:id/status       # Admin: Change status
```

---

#### **6.2 Real-time Notifications**
**Flutter Implementation**: Firebase Cloud Messaging

**Web Implementation Tasks**:
- [ ] Implement WebSocket or Server-Sent Events
- [ ] Create notification center
- [ ] Notification preferences
- [ ] Email notifications option
- [ ] In-app notification toast

**Components to Create**:
- `NotificationCenter.vue` - Notification list
- `NotificationBell.vue` - Bell icon with badge
- `NotificationPreferences.vue` - Settings
- `NotificationToast.vue` - Toast display

**API Endpoints Needed**:
```
GET    /api/notifications                 # Get notifications
POST   /api/notifications/:id/read        # Mark as read
POST   /api/notifications/read-all        # Mark all as read
PUT    /api/notification-preferences      # Update preferences
DELETE /api/notifications/:id             # Delete notification
```

---

## 📂 Directory Structure Updates for Web App

```
coopvest_africa_website/
├── client/src/
│   ├── types/
│   │   ├── user.ts                      # User interfaces
│   │   ├── loan.ts                      # Loan interfaces
│   │   ├── application.ts               # Loan application interfaces
│   │   ├── guarantor.ts                 # Guarantor interfaces
│   │   ├── employment.ts                # Employment verification
│   │   ├── kyc.ts                       # KYC interfaces
│   │   └── index.ts                     # Export all types
│   │
│   ├── pages/
│   │   ├── Dashboard.vue/tsx            # Enhanced member dashboard
│   │   ├── Loan/
│   │   │   ├── LoanApplication.vue      # New loan application
│   │   │   ├── LoanDetails.vue          # View loan details
│   │   │   ├── LoanHistory.vue          # Past loans
│   │   │   ├── PaymentSchedule.vue      # View schedule
│   │   │   ├── LoanRollover.vue         # Rollover application
│   │   │   └── LoanDashboard.vue        # Loans overview
│   │   ├── Guarantor/
│   │   │   ├── GuarantorManagement.vue  # Manage guarantors
│   │   │   ├── InviteGuarantor.vue      # Invite guarantor
│   │   │   ├── GuarantorVerify.vue      # Accept guarantee
│   │   │   └── MyGuarantees.vue         # Guarantees given
│   │   ├── Verification/
│   │   │   ├── EmploymentVerification.vue
│   │   │   ├── KYCVerification.vue      # Enhanced KYC
│   │   │   └── DocumentUpload.vue
│   │   ├── Member/
│   │   │   ├── Savings.vue              # Savings dashboard
│   │   │   ├── Contributions.vue        # Contributions
│   │   │   ├── Wallet.vue               # Wallet & transactions
│   │   │   └── Referral.vue             # Referral program
│   │   ├── Support/
│   │   │   ├── Tickets.vue              # Support tickets
│   │   │   └── TicketDetails.vue
│   │   ├── Admin/
│   │   │   ├── AdminDashboard.vue       # Enhanced admin dashboard
│   │   │   ├── UserManagement.vue       # User management
│   │   │   ├── LoanApproval.vue         # Review applications
│   │   │   ├── EmploymentReview.vue     # Review employment
│   │   │   ├── KYCReview.vue            # Review KYC
│   │   │   ├── SalaryDeduction.vue      # Salary deduction
│   │   │   ├── TicketManagement.vue     # Support tickets
│   │   │   └── ReportingAnalytics.vue   # Reports & analytics
│   │   └── SuperAdmin/
│   │       ├── SuperAdminPanel.vue      # Enhanced super admin
│   │       ├── LoanTypeManagement.vue   # Manage loan types
│   │       ├── SystemSettings.vue       # System configuration
│   │       └── AuditLogs.vue            # Audit trail
│   │
│   ├── components/
│   │   ├── Loan/
│   │   │   ├── LoanApplicationForm.vue
│   │   │   ├── EmploymentInfoStep.vue
│   │   │   ├── FinancialInfoStep.vue
│   │   │   ├── GuarantorStep.vue
│   │   │   ├── DocumentUploadStep.vue
│   │   │   ├── LoanReviewStep.vue
│   │   │   ├── LoanStatusBadge.vue
│   │   │   ├── LoanCard.vue
│   │   │   └── AmortizationTable.vue
│   │   ├── Guarantor/
│   │   │   ├── GuarantorList.vue
│   │   │   ├── GuarantorQRCode.vue
│   │   │   ├── GuarantorCard.vue
│   │   │   └── GuarantorEligibilityCheck.vue
│   │   ├── Verification/
│   │   │   ├── EmploymentVerificationForm.vue
│   │   │   ├── KYCForm.vue
│   │   │   ├── DocumentUploadWidget.vue
│   │   │   ├── BVNValidation.vue
│   │   │   └── VerificationStatus.vue
│   │   ├── Dashboard/
│   │   │   ├── StatCard.vue
│   │   │   ├── ActivityFeed.vue
│   │   │   ├── QuickActions.vue
│   │   │   └── ChartWidget.vue
│   │   └── Common/
│   │       ├── FileUpload.vue
│   │       ├── StepForm.vue
│   │       ├── StatusBadge.vue
│   │       └── ConfirmationModal.vue
│   │
│   ├── composables/ (or hooks/ for React)
│   │   ├── useLoan.ts                   # Loan operations
│   │   ├── useGuarantor.ts              # Guarantor operations
│   │   ├── useVerification.ts           # Verification operations
│   │   ├── useUser.ts                   # User operations
│   │   ├── useNotification.ts           # Notifications
│   │   └── useApi.ts                    # API client (already enhanced)
│   │
│   ├── services/
│   │   ├── loanService.ts               # Loan API calls
│   │   ├── guarantorService.ts          # Guarantor API calls
│   │   ├── verificationService.ts       # Verification API calls
│   │   ├── notificationService.ts       # Notification service
│   │   └── analyticsService.ts          # Analytics
│   │
│   └── store/
│       ├── loanStore.ts                 # Loan state (Pinia)
│       ├── userStore.ts                 # User state
│       ├── notificationStore.ts         # Notification state
│       └── adminStore.ts                # Admin state
│
└── server/
    ├── app/Http/Controllers/
    │   ├── LoanController.php            # Loan management
    │   ├── LoanApplicationController.php # Loan applications
    │   ├── GuarantorController.php       # Guarantor management
    │   ├── EmploymentVerificationController.php
    │   ├── KYCController.php             # KYC management
    │   ├── SavingsController.php         # Savings tracking
    │   ├── ContributionController.php    # Contributions
    │   ├── WalletController.php          # Wallet/transactions
    │   ├── ReferralController.php        # Referral program
    │   ├── TicketController.php          # Support tickets
    │   ├── SalaryDeductionController.php # Salary deductions
    │   └── AdminController.php           # Admin operations
    │
    ├── app/Models/
    │   ├── Loan.php                     # Loan model
    │   ├── LoanApplication.php          # Application model
    │   ├── Guarantor.php                # Guarantor model
    │   ├── EmploymentVerification.php   # Employment model
    │   ├── KYCVerification.php          # KYC model (enhance)
    │   ├── Savings.php                  # Savings model
    │   ├── Contribution.php             # Contribution model
    │   ├── Wallet.php                   # Wallet model
    │   ├── Transaction.php              # Transaction model
    │   ├── Referral.php                 # Referral model
    │   ├── Ticket.php                   # Support ticket model
    │   ├── SalaryDeductionConsent.php   # Salary consent model
    │   └── LoanType.php                 # Loan type model
    │
    ├── app/Services/
    │   ├── LoanService.php              # Loan business logic
    │   ├── GuarantorService.php         # Guarantor logic
    │   ├── LoanCalculator.php           # Loan calculations
    │   ├── EligibilityChecker.php       # Eligibility checks
    │   ├── VerificationService.php      # Verification logic
    │   └── NotificationService.php      # Notifications
    │
    └── database/migrations/
        ├── [timestamp]_create_loans_table.php
        ├── [timestamp]_create_loan_applications_table.php
        ├── [timestamp]_create_guarantors_table.php
        ├── [timestamp]_create_employment_verifications_table.php
        ├── [timestamp]_create_savings_table.php
        ├── [timestamp]_create_contributions_table.php
        ├── [timestamp]_create_referrals_table.php
        ├── [timestamp]_create_support_tickets_table.php
        ├── [timestamp]_create_salary_deduction_consents_table.php
        ├── [timestamp]_create_loan_types_table.php
        └── [timestamp]_create_wallets_table.php
```

---

## 🔌 API Endpoints Summary

### **Authentication**
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/auth/logout` - User logout
- `POST /api/auth/refresh` - Refresh token
- `POST /api/auth/2fa/setup` - Setup 2FA
- `POST /api/auth/2fa/verify` - Verify 2FA

### **Loans**
- `GET /api/loans` - List user loans
- `GET /api/loans/:id` - Loan details
- `POST /api/loan/apply` - Submit application
- `GET /api/loan/application/:id` - Application details
- `GET /api/loans/:id/schedule` - Payment schedule
- `POST /api/loans/:id/pay` - Make payment

### **Guarantors**
- `POST /api/guarantor/invite` - Invite guarantor
- `GET /api/guarantor/:code` - Get guarantee details
- `POST /api/guarantor/:code/confirm` - Confirm guarantee
- `GET /api/guarantor/my-guarantees` - Get my guarantees

### **Verification**
- `POST /api/employment/verify` - Submit employment
- `POST /api/kyc/submit` - Submit KYC
- `PUT /api/kyc/upload/:docType` - Upload KYC documents

### **Members**
- `GET /api/savings/balance` - Savings balance
- `GET /api/contributions/balance` - Contribution balance
- `GET /api/wallet/balance` - Wallet balance
- `GET /api/transactions` - Transaction history

### **Admin**
- `GET /api/admin/loan/applications` - List applications
- `PUT /api/admin/loan/application/:id/review` - Review application
- `GET /api/admin/users` - List users
- `GET /api/admin/employment` - Employment verifications
- `GET /api/admin/kyc` - KYC verifications

---

## 📊 Implementation Phases & Timeline

### **Phase 1: Core Loan System** (Weeks 1-3)
- [ ] Create data models
- [ ] Implement API endpoints
- [ ] Build loan application form
- [ ] Create loan dashboard
- [ ] Implement loan calculator

### **Phase 2: Guarantor System** (Weeks 4-5)
- [ ] Guarantor invitation system
- [ ] QR code generation
- [ ] Verification workflow
- [ ] "My Guarantees" dashboard

### **Phase 3: Verification** (Weeks 6-7)
- [ ] Employment verification form
- [ ] KYC enhancement
- [ ] Document uploads
- [ ] Admin review interfaces

### **Phase 4: Member Features** (Weeks 8-9)
- [ ] Savings dashboard
- [ ] Contributions tracking
- [ ] Referral program
- [ ] Wallet & transactions

### **Phase 5: Admin & Support** (Weeks 10-11)
- [ ] Enhanced admin dashboard
- [ ] Salary deduction system
- [ ] Support ticket system
- [ ] Analytics & reporting

### **Phase 6: Polish & Testing** (Weeks 12)
- [ ] Integration testing
- [ ] Performance optimization
- [ ] Security audit
- [ ] Documentation

---

## 🧪 Testing Strategy

### **Unit Tests**
- Test all loan calculation logic
- Test eligibility checks
- Test validation rules

### **Integration Tests**
- Loan application workflow
- Guarantor confirmation flow
- Payment processing

### **E2E Tests**
- Complete loan application journey
- Guarantor verification flow
- Admin approval workflow

### **Performance Tests**
- Load testing on API endpoints
- Database query optimization
- Frontend performance optimization

---

## ✅ Acceptance Criteria

- [ ] All Flutter app features implemented in web
- [ ] API endpoints match Flutter app capabilities
- [ ] Full feature parity (same data, same workflows)
- [ ] All pages accessible and functional
- [ ] Responsive design on all devices
- [ ] Performance benchmarks met
- [ ] Security audit passed
- [ ] Comprehensive test coverage (>80%)
- [ ] Complete documentation

---

## 📝 Notes

1. **QR Code Generation**: Use `qr_flutter` equivalent in web (e.g., `qrcode.js`)
2. **Biometric Auth**: Not available on web directly, use WebAuthn or 2FA as alternative
3. **Firebase**: Existing Firebase integration can be maintained
4. **Database**: Ensure Laravel migrations create all required tables with proper relationships
5. **API Consistency**: Maintain consistent response formats with Flutter app
6. **Error Handling**: Implement same error codes and messages for consistency

---

**Next Step**: Begin with Phase 1 implementation, starting with database migrations and API endpoints.
