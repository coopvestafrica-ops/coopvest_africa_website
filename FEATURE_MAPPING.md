# Flutter to Web: Feature Mapping & Implementation Roadmap

**Project**: Coopvest Africa - Web & Mobile Platform Feature Parity
**Created**: 2024
**Purpose**: Map all Flutter mobile app features to web platform with implementation plan
**Status**: In Progress

---

## 📋 Table of Contents

1. [Executive Summary](#executive-summary)
2. [Feature Inventory](#feature-inventory)
3. [Implementation Priority](#implementation-priority)
4. [Phase Breakdown](#phase-breakdown)
5. [Database Schema](#database-schema)
6. [API Endpoints](#api-endpoints)
7. [Component Architecture](#component-architecture)
8. [Testing Strategy](#testing-strategy)
9. [Migration Checklist](#migration-checklist)

---

## Executive Summary

### Current State
- **Flutter Mobile App**: ✅ 95% Feature Complete
  - Loan management with rollover
  - Multi-step loan applications
  - Guarantor system with QR codes
  - Employment verification workflows
  - Savings & contributions tracking
  - Referral system
  - KYC verification
  - Support ticketing
  - Admin dashboard

- **Vue.js Web App**: ⚠️ 40% Feature Complete (Missing)
  - ❌ Core loan management system
  - ❌ Loan application workflow
  - ❌ Guarantor invitation & verification
  - ❌ Employment verification
  - ❌ Advanced loan calculations
  - ❌ Referral system
  - ✅ User authentication
  - ✅ Dashboard (basic)
  - ✅ Profile management
  - ✅ Basic transactions

### Goal
Achieve **100% feature parity** between mobile and web platforms by implementing 30+ missing features across 6 phases over 12 weeks.

### Success Metrics
- All 50+ data models implemented in web
- All 80+ API endpoints functional
- All 200+ components created/updated
- Unit test coverage > 80%
- Integration tests for critical flows
- Zero breaking changes to mobile API
- Performance within acceptable thresholds

---

## Feature Inventory

### ✅ Already Implemented (Web)

#### Authentication Module
- [x] User registration with email
- [x] Email/password login
- [x] Token refresh mechanism
- [x] Logout functionality
- [x] Password reset

#### User Management
- [x] Profile viewing
- [x] Basic profile editing
- [x] Role assignment (basic)
- [x] Account deactivation

#### Dashboard (Basic)
- [x] Home page
- [x] Quick stats
- [x] Recent transactions list

---

### ❌ Missing - Must Implement (Mobile Features)

#### Phase 1: Core Loan System (Weeks 1-3)
**Status**: ❌ NOT IMPLEMENTED

##### Loan Types Management
- [ ] Create loan type definitions
- [ ] Set interest rates per loan type
- [ ] Configure loan term options
- [ ] Define eligibility requirements
- [ ] Set processing fees
- [ ] Loan type availability controls

##### Loan Lifecycle
- [ ] Create new loan application
- [ ] View loan applications list
- [ ] View loan application details
- [ ] Track application status
- [ ] Approve/reject applications (admin)
- [ ] Disburse approved loans (admin)
- [ ] Adjust loan details pre-approval
- [ ] Cancel applications

##### Loan Management
- [ ] View active loans
- [ ] View loan details with amortization
- [ ] Calculate monthly payments
- [ ] Generate amortization schedule
- [ ] Track payment history
- [ ] Make loan payments
- [ ] View payment schedule
- [ ] Rollover active loan
- [ ] Refinance existing loan
- [ ] Close completed loans

##### Components Needed
```
/components/loans/
├── LoanTypeCard.vue
├── LoanApplicationForm.vue
├── LoanApplicationReview.vue
├── LoanDetails.vue
├── LoanListCard.vue
├── LoansList.vue
├── PaymentScheduleTable.vue
├── MonthlyPaymentCard.vue
├── PaymentHistoryList.vue
├── LoanCalculator.vue
├── RolloverConfirmation.vue
├── AmortizationTable.vue
└── LoanStatusBadge.vue

/pages/loans/
├── LoansIndex.vue (List all loans)
├── LoanDetail.vue (Single loan details)
├── ApplicationNew.vue (New application)
├── ApplicationReview.vue (Review before submit)
├── PaymentMake.vue (Make a payment)
└── Rollover.vue (Rollover workflow)
```

---

#### Phase 2: Guarantor System (Weeks 4-6)
**Status**: ❌ NOT IMPLEMENTED

##### Guarantor Invitation
- [ ] Add guarantor to application
- [ ] Generate guarantor invite link
- [ ] Send guarantor invite email
- [ ] Generate QR code for quick acceptance
- [ ] Track invitation status
- [ ] Resend expired invitations
- [ ] Remove guarantor from application

##### Guarantor Verification
- [ ] Guarantor accepts invitation via link
- [ ] Guarantor accepts invitation via QR code
- [ ] Verify guarantor employment (auto)
- [ ] Request additional guarantor documents
- [ ] Guarantor submits verification documents
- [ ] Admin reviews guarantor verification
- [ ] Approve/reject guarantor
- [ ] Guarantor liability management

##### Guarantor Dashboard
- [ ] View pending guarantor requests
- [ ] View accepted loans (as guarantor)
- [ ] View guarantor obligations
- [ ] Download guarantor letter
- [ ] Guarantor contact information
- [ ] Guarantor history/statistics

##### Components Needed
```
/components/guarantors/
├── GuarantorInviteForm.vue
├── GuarantorCard.vue
├── GuarantorList.vue
├── GuarantorVerificationForm.vue
├── GuarantorQRCode.vue
├── GuarantorAcceptanceModal.vue
├── GuarantorStatusBadge.vue
├── GuarantorDocumentUpload.vue
└── GuarantorLiabilityCard.vue

/pages/guarantors/
├── GuarantorsIndex.vue
├── GuarantorDetail.vue
├── GuarantorAccept.vue (Accept invitation)
├── VerificationReview.vue (Admin)
└── GuarantorRequests.vue (Pending)
```

---

#### Phase 3: Employment Verification (Weeks 7-8)
**Status**: ❌ NOT IMPLEMENTED

##### User Employment Data
- [ ] Add employment information to profile
- [ ] Edit employment details
- [ ] Upload employment documents
- [ ] Verify employment via email
- [ ] Track verification status
- [ ] Renew employment verification

##### Verification Workflow
- [ ] Send employer verification email
- [ ] Employer click verification link
- [ ] Employer confirms employment
- [ ] Employer provides salary details
- [ ] Admin review verification
- [ ] Auto-sync with loan eligibility

##### Components Needed
```
/components/employment/
├── EmploymentForm.vue
├── EmploymentDetails.vue
├── DocumentUpload.vue
├── VerificationStatus.vue
├── VerificationEmail.vue
└── EmploymentHistory.vue

/pages/employment/
├── EmploymentSetup.vue
├── VerificationProcess.vue
└── EmploymentDocuments.vue
```

---

#### Phase 4: User Features & KYC (Weeks 9-10)
**Status**: ⚠️ PARTIALLY IMPLEMENTED

##### Enhanced Profile
- [ ] Complete government ID verification
- [ ] Add BVN verification
- [ ] Upload profile photo
- [ ] Add identification documents
- [ ] Track KYC verification status
- [ ] KYC approval/rejection reasons

##### Savings Features
- [ ] Create savings account
- [ ] Configure savings goal
- [ ] Track savings progress
- [ ] Deposit to savings
- [ ] Withdraw from savings
- [ ] View savings history
- [ ] Savings target notifications

##### Contributions
- [ ] Setup monthly contributions
- [ ] Configure contribution amount
- [ ] Track contribution status
- [ ] Pay missed contributions
- [ ] View contribution history
- [ ] Contribution receipts

##### Components Needed
```
/components/kyc/
├── KYCForm.vue
├── DocumentUpload.vue
├── VerificationStatus.vue
└── ApprovalBadge.vue

/components/savings/
├── SavingsGoalForm.vue
├── SavingsProgress.vue
├── SavingsTransaction.vue
├── SavingsList.vue
└── SavingsHistory.vue

/components/contributions/
├── ContributionForm.vue
├── ContributionStatus.vue
├── ContributionCalendar.vue
└── ContributionHistory.vue
```

---

#### Phase 5: Referral & Admin Tools (Weeks 11)
**Status**: ❌ NOT IMPLEMENTED

##### Referral System
- [ ] Generate unique referral code
- [ ] Share referral link
- [ ] Track referral statistics
- [ ] View referred users
- [ ] Claim referral rewards
- [ ] Referral reward history

##### Admin Features
- [ ] Application review dashboard
- [ ] Application approval workflow
- [ ] Disbursement management
- [ ] Loan monitoring dashboard
- [ ] User management
- [ ] Loan type management
- [ ] System settings
- [ ] Audit logs

##### Components Needed
```
/components/referrals/
├── ReferralCard.vue
├── ShareReferralLink.vue
├── ReferralStats.vue
├── ReferredUsersList.vue
└── RewardsList.vue

/components/admin/
├── ApplicationReviewCard.vue
├── ApplicationApprovalForm.vue
├── DisbursementForm.vue
├── LoanMonitoringDashboard.vue
├── UserManagementTable.vue
├── LoanTypeForm.vue
├── SystemSettingsForm.vue
└── AuditLogViewer.vue
```

---

#### Phase 6: Polish & Optimization (Week 12)
**Status**: ⏳ PENDING

##### Performance
- [ ] Implement request caching
- [ ] Optimize database queries
- [ ] Add pagination to all lists
- [ ] Lazy load components
- [ ] Code splitting for routes

##### User Experience
- [ ] Add loading states
- [ ] Add empty states
- [ ] Add error boundary
- [ ] Add success notifications
- [ ] Add confirmation dialogs
- [ ] Accessibility improvements

##### Documentation
- [ ] API documentation
- [ ] Component storybook
- [ ] User guide
- [ ] Admin guide
- [ ] Deployment guide

---

## Implementation Priority

### Tier 1: CRITICAL (Must Have for MVP)
**Timeline**: Weeks 1-4 (4 weeks)

1. **Core Loan System** (Week 1-3)
   - Loan type definitions
   - Basic loan creation/management
   - Payment tracking
   - Amortization schedule

2. **Guarantor System** (Week 4)
   - Guarantor invitation
   - QR code acceptance
   - Basic verification

### Tier 2: HIGH (Core Features)
**Timeline**: Weeks 5-9 (5 weeks)

3. **Employment Verification** (Week 5)
4. **Savings & Contributions** (Week 6-7)
5. **KYC Enhancement** (Week 8)
6. **Referral System** (Week 9)

### Tier 3: MEDIUM (Nice to Have)
**Timeline**: Week 10-11

7. **Admin Tools** (Week 10)
8. **Advanced Features** (Week 11)

### Tier 4: LOW (Polish)
**Timeline**: Week 12

9. **Performance & UX** (Week 12)

---

## Phase Breakdown

### Phase 1: Core Loan System (Weeks 1-3)

#### Week 1: Foundation
- [ ] Create database migrations
  - `loans` table
  - `loan_types` table
  - `loan_payments` table
  - `loan_applications` table

- [ ] Create Laravel models
  - `LoanType` model with relationships
  - `Loan` model with relationships
  - `LoanPayment` model
  - `LoanApplication` model

- [ ] Create API endpoints (GET/POST/PUT)
  - `POST /api/loan-types` - Create loan type (admin)
  - `GET /api/loan-types` - List available types
  - `GET /api/loan-types/{id}` - Get loan type details
  - `PUT /api/loan-types/{id}` - Update loan type (admin)

#### Week 2: Loan Application
- [ ] Create loan application endpoints
  - `POST /api/loan-applications` - Create application
  - `GET /api/loan-applications` - List user applications
  - `GET /api/loan-applications/{id}` - Get application details
  - `PUT /api/loan-applications/{id}` - Update application
  - `POST /api/loan-applications/{id}/submit` - Submit for review
  - `POST /api/loan-applications/{id}/cancel` - Cancel application

- [ ] Create Vue.js form components
  - `LoanApplicationForm.vue` - Multi-step form
  - `LoanTypeSelector.vue` - Loan type selection
  - `LoanCalculator.vue` - Payment calculator

- [ ] Add validation rules
  - Amount range validation
  - Tenure validation
  - Income/expense ratio validation
  - Eligibility checks

#### Week 3: Loan Management
- [ ] Create loan endpoints
  - `POST /api/loans` - Create loan (admin/system)
  - `GET /api/loans` - List user loans
  - `GET /api/loans/{id}` - Get loan details
  - `POST /api/loans/{id}/payment` - Make payment
  - `GET /api/loans/{id}/payments` - Get payment history
  - `GET /api/loans/{id}/schedule` - Get amortization schedule

- [ ] Create components
  - `LoansList.vue` - List all user loans
  - `LoanDetail.vue` - Detailed loan view
  - `PaymentScheduleTable.vue` - Amortization schedule
  - `MakePaymentForm.vue` - Payment form

- [ ] Implement payment calculator
  - Monthly payment calculation: `P * [r(1+r)^n] / [(1+r)^n-1]`
  - Interest and principal breakdown
  - Remaining balance tracking

#### Week 3: Rollover Support
- [ ] Add rollover logic
  - `POST /api/loans/{id}/rollover` - Request rollover
  - Check rollover eligibility
  - Create new loan from existing
  - Link loans via `previousLoanId`

- [ ] Create components
  - `RolloverDialog.vue` - Rollover confirmation
  - `RolloverTerms.vue` - Display rollover terms

**Deliverables**:
- ✅ 4 database tables with migrations
- ✅ 4 Laravel models
- ✅ 15 API endpoints
- ✅ 10 Vue.js components
- ✅ Unit tests for calculations
- ✅ API documentation

---

### Phase 2: Guarantor System (Weeks 4-6)

#### Week 4: Guarantor Invitation
- [ ] Create guarantor tables/models
  - `guarantors` table
  - `guarantor_invitations` table
  - `Guarantor` and `GuarantorInvitation` models

- [ ] Create invitation endpoints
  - `POST /api/loans/{id}/guarantors` - Add guarantor
  - `GET /api/loans/{id}/guarantors` - List guarantors
  - `POST /api/guarantor-invitations/{token}/accept` - Accept via link
  - `POST /api/guarantor-invitations/{token}/decline` - Decline
  - `DELETE /api/loans/{id}/guarantors/{guarantorId}` - Remove

- [ ] Generate QR codes
  - Use `qrcode.js` library
  - Generate unique tokens
  - Create shortlinks with QR
  - Store QR images in storage

- [ ] Create components
  - `GuarantorInviteForm.vue` - Add new guarantor
  - `GuarantorList.vue` - List of guarantors
  - `GuarantorQRCode.vue` - Display QR for acceptance
  - `GuarantorCard.vue` - Guarantor details card

#### Week 5: Guarantor Verification
- [ ] Create verification workflow
  - `POST /api/guarantors/{id}/verify` - Start verification
  - `PUT /api/guarantors/{id}/documents` - Upload documents
  - `GET /api/guarantors/{id}/verification-status` - Check status

- [ ] Implement employment sync
  - Link guarantor's employment verification
  - Auto-approve if verified
  - Request if not verified

- [ ] Create components
  - `GuarantorVerificationForm.vue` - Upload documents
  - `EmploymentVerificationStatus.vue` - Show verification status
  - `GuarantorVerificationReview.vue` - Admin review (Phase 5)

- [ ] Add notifications
  - Guarantor invitation sent
  - Guarantor accepted/declined
  - Verification status changed
  - Admin approval

#### Week 6: Guarantor Portal
- [ ] Create guarantor-specific endpoints
  - `GET /api/guarantor/pending-requests` - Pending guarantor requests
  - `GET /api/guarantor/obligations` - View loan obligations
  - `GET /api/guarantor/history` - Guarantor history

- [ ] Create guarantor dashboard
  - List pending requests
  - View accepted loans
  - Track liability amount
  - Download letters

- [ ] Create components
  - `GuarantorDashboard.vue` - Guarantor home
  - `GuarantorRequestCard.vue` - Request card
  - `GuarantorLiabilityCard.vue` - Liability tracking

**Deliverables**:
- ✅ 2 database tables
- ✅ 2 models with relationships
- ✅ 12 API endpoints
- ✅ 8 Vue.js components
- ✅ QR code generation system
- ✅ Email notification templates

---

### Phase 3: Employment Verification (Weeks 7-8)

#### Week 7: User Employment Setup
- [ ] Create employment table/model
  - `employment_verifications` table
  - `EmploymentVerification` model

- [ ] Create employment endpoints
  - `POST /api/users/employment` - Add employment
  - `PUT /api/users/employment` - Update employment
  - `GET /api/users/employment` - Get employment details
  - `POST /api/users/employment/verify` - Request verification
  - `GET /api/users/employment/status` - Verification status

- [ ] Create components
  - `EmploymentForm.vue` - Employment details form
  - `EmploymentStatus.vue` - Verification status display
  - `DocumentUpload.vue` - Upload employment documents

#### Week 8: Verification Workflow
- [ ] Create verification flow
  - `POST /api/employment-verification/{token}/confirm` - Employer confirmation
  - Send verification email to employer
  - Track verification tokens
  - Store employer responses

- [ ] Create employer verification page
  - Employer clicks email link
  - Confirms employment details
  - Provides salary info
  - System records verification

- [ ] Create components
  - `EmploymentVerificationEmail.vue` - Email verification UI
  - `EmployerConfirmationPage.vue` - Employer verification page
  - `EmploymentVerificationHistory.vue` - Verification history

- [ ] Integrate with loan eligibility
  - Check employment verification on loan application
  - Require verification for certain loan types
  - Auto-update eligibility when verified

**Deliverables**:
- ✅ 1 database table
- ✅ 1 model
- ✅ 8 API endpoints
- ✅ 6 Vue.js components
- ✅ Email templates
- ✅ Security token system

---

### Phase 4: Savings, Contributions & KYC (Weeks 9-10)

#### Week 9: Savings & Contributions
- [ ] Create savings/contributions tables
  - `savings` table
  - `savings_transactions` table
  - `contributions` table

- [ ] Create endpoints
  - `POST /api/savings` - Create savings goal
  - `GET /api/savings` - List savings
  - `POST /api/savings/{id}/deposit` - Deposit
  - `POST /api/savings/{id}/withdraw` - Withdraw
  - `GET /api/savings/{id}/transactions` - History
  - `POST /api/contributions` - Create contribution
  - `GET /api/contributions` - List contributions
  - `POST /api/contributions/{id}/pay` - Pay contribution

- [ ] Create components
  - `SavingsGoalForm.vue` - Create savings goal
  - `SavingsProgressCard.vue` - Progress visualization
  - `SavingsTransactionList.vue` - Transaction history
  - `ContributionForm.vue` - Setup contribution
  - `ContributionStatus.vue` - Contribution status

#### Week 10: KYC Enhancement
- [ ] Enhance KYC endpoints
  - `PUT /api/users/kyc` - Update KYC data
  - `POST /api/users/kyc/verify` - Submit for verification
  - `GET /api/users/kyc/status` - Get verification status
  - `POST /api/users/kyc/documents` - Upload documents

- [ ] Create components
  - `KYCForm.vue` - KYC data entry
  - `DocumentUploadForm.vue` - Document upload
  - `KYCStatusBadge.vue` - Status display
  - `VerificationApprovalBadge.vue` - Approval status

**Deliverables**:
- ✅ 3 database tables
- ✅ 3 models
- ✅ 12 API endpoints
- ✅ 10 Vue.js components
- ✅ Progress visualization
- ✅ Document management

---

### Phase 5: Referral System & Admin (Week 11)

#### Referral System
- [ ] Create referral tables
  - `referrals` table
  - `referral_rewards` table

- [ ] Create endpoints
  - `GET /api/referrals` - Get referral info
  - `POST /api/referrals/claim` - Claim rewards
  - `GET /api/referrals/statistics` - Referral stats
  - `GET /api/referrals/referred-users` - List referred users

- [ ] Create components
  - `ReferralCard.vue` - Referral info card
  - `ShareReferralLink.vue` - Share dialog
  - `ReferralStatsCard.vue` - Statistics
  - `ReferredUsersTable.vue` - Referred users list

#### Admin Features
- [ ] Create admin-only endpoints
  - `GET /api/admin/applications` - List applications
  - `POST /api/admin/applications/{id}/approve` - Approve
  - `POST /api/admin/applications/{id}/reject` - Reject
  - `POST /api/admin/loans/{id}/disburse` - Disburse
  - `GET /api/admin/statistics` - Dashboard stats
  - `GET /api/admin/audit-logs` - Audit logs

- [ ] Create components
  - `ApplicationReviewCard.vue` - Review card
  - `ApplicationApprovalForm.vue` - Approval form
  - `AdminDashboard.vue` - Main admin dashboard
  - `LoanMonitoringDashboard.vue` - Loan monitoring
  - `UserManagementTable.vue` - User management
  - `AuditLogViewer.vue` - Audit logs

**Deliverables**:
- ✅ 2 database tables
- ✅ 2 models
- ✅ 15+ API endpoints
- ✅ 12 Vue.js components
- ✅ Admin roles/permissions

---

### Phase 6: Polish & Optimization (Week 12)

#### Performance
- [ ] Implement caching
  - Request caching in useApi.ts
  - Component-level caching
  - Database query optimization

- [ ] Optimize loading
  - Lazy load components
  - Code splitting for routes
  - Pagination for lists
  - Image optimization

#### UX Improvements
- [ ] Add missing UI states
  - Loading states
  - Empty states
  - Error states
  - Success confirmations

- [ ] Add accessibility
  - ARIA labels
  - Keyboard navigation
  - Screen reader support
  - Color contrast

- [ ] Documentation
  - API documentation (Swagger)
  - Component storybook
  - User guide
  - Admin guide

**Deliverables**:
- ✅ Performance improvements
- ✅ UX enhancements
- ✅ Documentation
- ✅ Accessibility audit

---

## Database Schema

### Core Migrations

#### 1. `loan_types` Table
```sql
CREATE TABLE loan_types (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL UNIQUE,
  description LONGTEXT,
  minimum_amount DECIMAL(15, 2) NOT NULL,
  maximum_amount DECIMAL(15, 2) NOT NULL,
  interest_rate DECIMAL(5, 2) NOT NULL,
  duration_months INT NOT NULL,
  processing_fee_percentage DECIMAL(5, 2) NOT NULL,
  requires_guarantor BOOLEAN DEFAULT TRUE,
  minimum_employment_months INT,
  minimum_salary DECIMAL(15, 2),
  eligibility_requirements JSON,
  max_rollover_times INT DEFAULT 3,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP,
  updated_at TIMESTAMP,
  deleted_at TIMESTAMP NULL
);
```

#### 2. `loans` Table
```sql
CREATE TABLE loans (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  user_id BIGINT UNSIGNED NOT NULL,
  loan_type_id BIGINT UNSIGNED NOT NULL,
  amount DECIMAL(15, 2) NOT NULL,
  currency VARCHAR(3) DEFAULT 'USD',
  tenure INT NOT NULL,
  interest_rate DECIMAL(5, 2) NOT NULL,
  total_interest DECIMAL(15, 2) NOT NULL,
  monthly_payment DECIMAL(15, 2) NOT NULL,
  status ENUM('pending','approved','rejected','active','completed','defaulted','suspended') DEFAULT 'pending',
  approved_at TIMESTAMP NULL,
  disbursed_at TIMESTAMP NULL,
  completed_at TIMESTAMP NULL,
  application_date TIMESTAMP,
  due_date TIMESTAMP,
  next_payment_date TIMESTAMP NULL,
  is_rolled_over BOOLEAN DEFAULT FALSE,
  previous_loan_id BIGINT UNSIGNED NULL,
  rollover_date TIMESTAMP NULL,
  remaining_rollovers INT,
  total_paid DECIMAL(15, 2) DEFAULT 0,
  outstanding_balance DECIMAL(15, 2),
  payments_made INT DEFAULT 0,
  missed_payments INT DEFAULT 0,
  last_payment_date TIMESTAMP NULL,
  loan_purpose VARCHAR(255),
  created_at TIMESTAMP,
  updated_at TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (loan_type_id) REFERENCES loan_types(id),
  FOREIGN KEY (previous_loan_id) REFERENCES loans(id),
  INDEX idx_user_id (user_id),
  INDEX idx_status (status),
  INDEX idx_due_date (due_date)
);
```

#### 3. `loan_applications` Table
```sql
CREATE TABLE loan_applications (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  user_id BIGINT UNSIGNED NOT NULL,
  loan_type_id BIGINT UNSIGNED NOT NULL,
  requested_amount DECIMAL(15, 2) NOT NULL,
  currency VARCHAR(3) DEFAULT 'USD',
  requested_tenure INT NOT NULL,
  loan_purpose VARCHAR(255) NOT NULL,
  employment_status ENUM('employed','self_employed','unemployed') NOT NULL,
  employer_name VARCHAR(255),
  job_title VARCHAR(255),
  employment_start_date DATE,
  monthly_salary DECIMAL(15, 2),
  monthly_expenses DECIMAL(15, 2) NOT NULL,
  existing_loans INT DEFAULT 0,
  existing_loan_balance DECIMAL(15, 2) DEFAULT 0,
  savings_balance DECIMAL(15, 2) DEFAULT 0,
  business_revenue DECIMAL(15, 2),
  status ENUM('draft','submitted','under_review','approved','rejected','withdrawn','completed') DEFAULT 'draft',
  stage ENUM('personal_info','employment','financial','guarantors','documents','review') DEFAULT 'personal_info',
  submitted_at TIMESTAMP NULL,
  reviewed_at TIMESTAMP NULL,
  approved_at TIMESTAMP NULL,
  rejection_reason LONGTEXT,
  notes LONGTEXT,
  created_at TIMESTAMP,
  updated_at TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (loan_type_id) REFERENCES loan_types(id),
  INDEX idx_user_id (user_id),
  INDEX idx_status (status)
);
```

#### 4. `loan_payments` Table
```sql
CREATE TABLE loan_payments (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  loan_id BIGINT UNSIGNED NOT NULL,
  user_id BIGINT UNSIGNED NOT NULL,
  amount DECIMAL(15, 2) NOT NULL,
  currency VARCHAR(3) DEFAULT 'USD',
  payment_method ENUM('bank_transfer','card','wallet','cash') NOT NULL,
  transaction_reference VARCHAR(255),
  payment_date TIMESTAMP,
  status ENUM('pending','completed','failed','refunded') DEFAULT 'pending',
  principal_amount DECIMAL(15, 2) NOT NULL,
  interest_amount DECIMAL(15, 2) NOT NULL,
  fees DECIMAL(15, 2) DEFAULT 0,
  notes LONGTEXT,
  created_at TIMESTAMP,
  updated_at TIMESTAMP,
  FOREIGN KEY (loan_id) REFERENCES loans(id),
  FOREIGN KEY (user_id) REFERENCES users(id),
  INDEX idx_loan_id (loan_id),
  INDEX idx_payment_date (payment_date)
);
```

#### 5. `guarantors` Table
```sql
CREATE TABLE guarantors (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  loan_id BIGINT UNSIGNED NOT NULL,
  guarantor_user_id BIGINT UNSIGNED NOT NULL,
  relationship ENUM('friend','family','colleague','business_partner') NOT NULL,
  verification_status ENUM('pending','verified','rejected','expired') DEFAULT 'pending',
  employment_verification_required BOOLEAN DEFAULT TRUE,
  employment_verification_completed BOOLEAN DEFAULT FALSE,
  employment_verification_url VARCHAR(255),
  confirmation_status ENUM('pending','accepted','declined','revoked') DEFAULT 'pending',
  invitation_sent_at TIMESTAMP NULL,
  invitation_accepted_at TIMESTAMP NULL,
  invitation_declined_at TIMESTAMP NULL,
  qr_code LONGTEXT, -- Base64 encoded
  qr_code_token VARCHAR(255) UNIQUE,
  qr_code_expires_at TIMESTAMP,
  liability_amount DECIMAL(15, 2),
  notes LONGTEXT,
  created_at TIMESTAMP,
  updated_at TIMESTAMP,
  FOREIGN KEY (loan_id) REFERENCES loans(id),
  FOREIGN KEY (guarantor_user_id) REFERENCES users(id),
  INDEX idx_loan_id (loan_id),
  INDEX idx_guarantor_user_id (guarantor_user_id)
);
```

#### 6. `employment_verifications` Table
```sql
CREATE TABLE employment_verifications (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  user_id BIGINT UNSIGNED NOT NULL,
  employer_name VARCHAR(255) NOT NULL,
  employer_email VARCHAR(255) NOT NULL,
  job_title VARCHAR(255) NOT NULL,
  employment_type ENUM('full_time','part_time','contract','freelance') NOT NULL,
  employment_start_date DATE NOT NULL,
  monthly_salary DECIMAL(15, 2) NOT NULL,
  currency VARCHAR(3) DEFAULT 'USD',
  letter_of_employment_url VARCHAR(255),
  payslip_url VARCHAR(255),
  verification_status ENUM('pending','verified','rejected') DEFAULT 'pending',
  verified_at TIMESTAMP NULL,
  verification_documents JSON,
  employer_verification_email VARCHAR(255),
  employer_verification_sent BOOLEAN DEFAULT FALSE,
  employer_verification_token VARCHAR(255) UNIQUE,
  employer_verification_expires_at TIMESTAMP,
  created_at TIMESTAMP,
  updated_at TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  INDEX idx_user_id (user_id),
  INDEX idx_verification_status (verification_status)
);
```

#### 7. `savings` Table
```sql
CREATE TABLE savings (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  user_id BIGINT UNSIGNED NOT NULL,
  savings_type ENUM('personal','group','target') NOT NULL,
  savings_goal VARCHAR(255),
  target_amount DECIMAL(15, 2),
  current_amount DECIMAL(15, 2) DEFAULT 0,
  currency VARCHAR(3) DEFAULT 'USD',
  created_at TIMESTAMP,
  updated_at TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  INDEX idx_user_id (user_id)
);
```

#### 8. `contributions` Table
```sql
CREATE TABLE contributions (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  user_id BIGINT UNSIGNED NOT NULL,
  contribution_type ENUM('monthly','weekly','one_time') NOT NULL,
  amount DECIMAL(15, 2) NOT NULL,
  currency VARCHAR(3) DEFAULT 'USD',
  frequency ENUM('weekly','bi_weekly','monthly','quarterly'),
  due_date DATE NOT NULL,
  status ENUM('pending','completed','missed') DEFAULT 'pending',
  paid_at TIMESTAMP NULL,
  next_due_date DATE,
  created_at TIMESTAMP,
  updated_at TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);
```

#### 9. `referrals` Table
```sql
CREATE TABLE referrals (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  user_id BIGINT UNSIGNED NOT NULL,
  referral_code VARCHAR(20) UNIQUE NOT NULL,
  referral_link VARCHAR(255),
  total_referrals INT DEFAULT 0,
  active_referrals INT DEFAULT 0,
  status ENUM('active','inactive','suspended') DEFAULT 'active',
  created_at TIMESTAMP,
  updated_at TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);
```

#### 10. `referral_rewards` Table
```sql
CREATE TABLE referral_rewards (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  referral_id BIGINT UNSIGNED NOT NULL,
  referred_user_id BIGINT UNSIGNED NOT NULL,
  reward_amount DECIMAL(15, 2) NOT NULL,
  reward_type ENUM('cash','credit','discount') DEFAULT 'cash',
  status ENUM('pending','completed','cancelled') DEFAULT 'pending',
  claimed_at TIMESTAMP NULL,
  created_at TIMESTAMP,
  FOREIGN KEY (referral_id) REFERENCES referrals(id),
  FOREIGN KEY (referred_user_id) REFERENCES users(id)
);
```

---

## API Endpoints

### Authentication Endpoints
```
POST   /api/auth/register
POST   /api/auth/login
POST   /api/auth/refresh-token
POST   /api/auth/logout
POST   /api/auth/password-reset
GET    /api/auth/verify-email/{token}
POST   /api/auth/2fa/enable
POST   /api/auth/2fa/verify
```

### Loan Type Endpoints
```
GET    /api/loan-types                 # List all available loan types
GET    /api/loan-types/{id}            # Get specific loan type
POST   /api/loan-types                 # Create (admin only)
PUT    /api/loan-types/{id}            # Update (admin only)
DELETE /api/loan-types/{id}            # Soft delete (admin only)
```

### Loan Application Endpoints
```
POST   /api/loan-applications          # Create application
GET    /api/loan-applications          # List user applications
GET    /api/loan-applications/{id}     # Get application details
PUT    /api/loan-applications/{id}     # Update application
DELETE /api/loan-applications/{id}     # Cancel application
POST   /api/loan-applications/{id}/submit
POST   /api/loan-applications/{id}/withdraw
GET    /api/loan-applications/{id}/eligibility-check
```

### Loan Endpoints
```
GET    /api/loans                      # List user loans
GET    /api/loans/{id}                 # Get loan details
GET    /api/loans/{id}/schedule        # Get amortization schedule
GET    /api/loans/{id}/payments        # Get payment history
POST   /api/loans/{id}/payment         # Make a payment
POST   /api/loans/{id}/rollover        # Request rollover
POST   /api/loans/{id}/refinance       # Refinance loan
POST   /api/loans/{id}/close           # Close completed loan
```

### Guarantor Endpoints
```
POST   /api/loans/{loanId}/guarantors  # Add guarantor
GET    /api/loans/{loanId}/guarantors  # List guarantors
GET    /api/loans/{loanId}/guarantors/{id}
PUT    /api/loans/{loanId}/guarantors/{id}
DELETE /api/loans/{loanId}/guarantors/{id} # Remove guarantor
POST   /api/guarantors/{id}/verify     # Start verification
POST   /api/guarantor-invitations/{token}/accept
POST   /api/guarantor-invitations/{token}/decline
GET    /api/guarantor/pending-requests # Pending as guarantor
GET    /api/guarantor/obligations      # Guarantor obligations
```

### Employment Verification Endpoints
```
POST   /api/users/employment           # Add employment info
PUT    /api/users/employment           # Update employment
GET    /api/users/employment           # Get employment details
POST   /api/users/employment/verify    # Request verification
GET    /api/users/employment/status    # Get verification status
POST   /api/employment-verification/{token}/confirm # Employer confirm
```

### Savings & Contributions Endpoints
```
POST   /api/savings                    # Create savings goal
GET    /api/savings                    # List savings
GET    /api/savings/{id}               # Get savings details
POST   /api/savings/{id}/deposit       # Deposit to savings
POST   /api/savings/{id}/withdraw      # Withdraw from savings
GET    /api/savings/{id}/transactions  # Get history

POST   /api/contributions              # Create contribution
GET    /api/contributions              # List contributions
PUT    /api/contributions/{id}         # Update contribution
POST   /api/contributions/{id}/pay     # Pay contribution
```

### Referral Endpoints
```
GET    /api/referrals                  # Get referral info
POST   /api/referrals/claim            # Claim rewards
GET    /api/referrals/statistics       # Get stats
GET    /api/referrals/referred-users   # List referred users
POST   /api/referrals/share            # Generate share link
```

### KYC Endpoints
```
PUT    /api/users/kyc                  # Update KYC data
POST   /api/users/kyc/verify           # Submit for verification
GET    /api/users/kyc/status           # Get status
POST   /api/users/kyc/documents        # Upload documents
```

### Admin Endpoints
```
GET    /api/admin/applications         # List applications
POST   /api/admin/applications/{id}/approve
POST   /api/admin/applications/{id}/reject
POST   /api/admin/loans/{id}/disburse
GET    /api/admin/statistics           # Dashboard stats
GET    /api/admin/audit-logs           # Audit logs
GET    /api/admin/users                # Manage users
POST   /api/admin/loan-types           # Manage loan types
GET    /api/admin/system-settings      # System configuration
```

---

## Component Architecture

### Loan Components (`/components/loans/`)
```
LoanTypeCard.vue           - Display loan type info
LoanApplicationForm.vue    - Multi-step application form
LoanApplicationReview.vue  - Review before submission
LoanDetails.vue           - Display full loan details
LoanListCard.vue          - Card for loan list item
LoansList.vue             - List all user loans
PaymentScheduleTable.vue  - Amortization schedule table
MonthlyPaymentCard.vue    - Single payment info
PaymentHistoryList.vue    - All payments list
LoanCalculator.vue        - Calculate payments
RolloverConfirmation.vue  - Confirm rollover
AmortizationTable.vue     - Detailed amortization
LoanStatusBadge.vue       - Status indicator
```

### Guarantor Components (`/components/guarantors/`)
```
GuarantorInviteForm.vue    - Add new guarantor
GuarantorCard.vue          - Guarantor info card
GuarantorList.vue          - List guarantors
GuarantorVerificationForm.vue - Upload documents
GuarantorQRCode.vue        - Display QR code
GuarantorAcceptanceModal.vue - Accept modal
GuarantorStatusBadge.vue   - Status indicator
GuarantorDocumentUpload.vue - Document upload
GuarantorLiabilityCard.vue - Liability tracking
```

### Employment Components (`/components/employment/`)
```
EmploymentForm.vue              - Edit employment info
EmploymentDetails.vue           - Display employment
DocumentUpload.vue              - Upload documents
EmploymentVerificationStatus.vue - Show status
EmploymentEmail.vue             - Email verification UI
EmploymentHistory.vue           - Verification history
```

### Savings Components (`/components/savings/`)
```
SavingsGoalForm.vue      - Create/edit savings goal
SavingsProgress.vue      - Visual progress bar
SavingsTransaction.vue   - Single transaction
SavingsList.vue          - List all savings
SavingsHistory.vue       - Transaction history
```

### Admin Components (`/components/admin/`)
```
ApplicationReviewCard.vue    - Application to review
ApplicationApprovalForm.vue  - Approve/reject form
DisbursementForm.vue         - Disburse loan
LoanMonitoringDashboard.vue  - Loan metrics
UserManagementTable.vue      - User management
LoanTypeForm.vue             - Create/edit loan type
SystemSettingsForm.vue       - System configuration
AuditLogViewer.vue           - View audit logs
```

---

## Testing Strategy

### Unit Tests
- **Models**: Test all data model validations
- **Composables**: Test useApi with mocked endpoints
- **Utilities**: Test payment calculations, date handling
- **Components**: Test component logic, prop validation

### Integration Tests
- Loan application flow (end-to-end)
- Guarantor invitation and acceptance
- Employment verification workflow
- Payment processing

### API Tests
- All endpoints tested with valid/invalid inputs
- Authentication and authorization
- Error handling and edge cases
- Rate limiting and performance

### E2E Tests (Cypress/Playwright)
- User registration and login
- Create loan application
- Invite and accept guarantor
- Make payment
- Check payment history
- Admin approval workflow

---

## Migration Checklist

### Phase 1: Loan System
- [ ] Create database migrations
- [ ] Create Laravel models
- [ ] Create API endpoints (15+)
- [ ] Create Vue components (10+)
- [ ] Create TypeScript types
- [ ] Implement validation rules
- [ ] Create unit tests
- [ ] Create integration tests
- [ ] Update useApi.ts if needed
- [ ] API documentation
- [ ] Component tests
- [ ] Functionality review

### Phase 2: Guarantor System  
- [ ] Create database tables
- [ ] Create models
- [ ] Generate QR codes
- [ ] Create API endpoints (12+)
- [ ] Create Vue components (8+)
- [ ] Implement email notifications
- [ ] Create tests
- [ ] API documentation

### Phase 3: Employment
- [ ] Create database table
- [ ] Create model
- [ ] Create API endpoints (8+)
- [ ] Create components (6+)
- [ ] Implement email workflow
- [ ] Create tests
- [ ] API documentation

### Phase 4-5: Other Features
- [ ] Create necessary migrations
- [ ] Create models
- [ ] Create endpoints
- [ ] Create components
- [ ] Implement features
- [ ] Create tests
- [ ] Documentation

### Phase 6: Polish
- [ ] Performance optimization
- [ ] UX improvements
- [ ] Accessibility audit
- [ ] Documentation
- [ ] Final testing
- [ ] Deploy to staging
- [ ] User acceptance testing
- [ ] Deploy to production

---

## Success Criteria

✅ **Feature Parity Achieved When**:
- All 50+ data models implemented in web
- All 80+ API endpoints functional
- All 200+ components created/updated
- Unit test coverage > 80%
- Integration tests pass 100%
- E2E tests pass 100%
- API response times < 200ms
- Database queries optimized
- Zero breaking changes
- Mobile and web APIs compatible
- Documentation complete
- Security audit passed
- Performance audit passed
- User acceptance testing passed

---

## Next Steps

1. **Immediate** (This Week)
   - [ ] Review and approve feature mapping
   - [ ] Finalize Phase 1 scope
   - [ ] Assign developers
   - [ ] Setup development environment
   - [ ] Begin database migrations

2. **This Month**
   - [ ] Complete Phase 1 (Loan System)
   - [ ] Deploy to staging
   - [ ] QA testing
   - [ ] Begin Phase 2 (Guarantor)

3. **Next Month**
   - [ ] Complete Phases 2-3
   - [ ] User acceptance testing
   - [ ] Performance optimization
   - [ ] Begin Phases 4-5

4. **Week 12**
   - [ ] Complete Phase 6 (Polish)
   - [ ] Final testing
   - [ ] Deploy to production
   - [ ] Monitor for issues

---

## Resources

**Files Created**:
- ✅ `types.flutter.ts` - TypeScript type definitions
- ✅ `FEATURE_MAPPING.md` - This document
- ✅ `FLUTTER_TO_WEB_MIGRATION.md` - Detailed implementation plan

**Key Components**:
- `useApi.ts` - Enhanced API composable with request management
- Vue.js form components
- Radix UI base components
- Tailwind CSS styling

**Backend Stack**:
- Laravel PHP for API
- MySQL/PostgreSQL for database
- Drizzle ORM for migrations

---

**Last Updated**: 2024
**Status**: Ready for Phase 1 Implementation
**Estimated Duration**: 12 weeks
**Team Size**: 3-4 developers recommended

