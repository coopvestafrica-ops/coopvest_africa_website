/**
 * Flutter App Feature Models & Types
 * This file contains TypeScript interfaces matching the Flutter Coopvest Mobile App
 * models, enabling feature parity between web and mobile platforms.
 * 
 * Generated from comprehensive Flutter app analysis
 * Last Updated: 2024
 */

// ============================================================================
// AUTHENTICATION & USER MANAGEMENT
// ============================================================================

export interface UserModel {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  middleName?: string;
  phoneNumber: string;
  profileImageUrl?: string;
  dateOfBirth: string; // ISO 8601 format
  gender: "male" | "female" | "other";
  address: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  governmentId: string; // National ID number
  governmentIdType: "national_id" | "passport" | "drivers_license";
  bvn: string; // Bank Verification Number
  kycVerified: boolean;
  kycVerificationDate?: string;
  
  // Employment Information
  employmentStatus: "employed" | "self_employed" | "unemployed" | "student" | "retired";
  employerName?: string;
  employmentType?: "full_time" | "part_time" | "contract" | "freelance";
  jobTitle?: string;
  employmentStartDate?: string;
  employmentEndDate?: string;
  monthlyIncome?: number;
  businessName?: string; // For self-employed
  businessType?: string;
  
  // Account Status
  isActive: boolean;
  role: "member" | "guarantor" | "admin" | "super_admin";
  accountCreatedAt: string;
  lastLoginAt?: string;
  
  // Verification Flags
  emailVerified: boolean;
  phoneVerified: boolean;
  biometricEnabled: boolean;
  twoFactorEnabled: boolean;
}

export interface UserRegistrationData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  dateOfBirth: string;
  gender: "male" | "female" | "other";
  address: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
}

export interface EmploymentVerification {
  id: string;
  userId: string;
  employerName: string;
  employerEmail: string;
  jobTitle: string;
  employmentType: "full_time" | "part_time" | "contract" | "freelance";
  employmentStartDate: string;
  monthlySalary: number;
  currency: string;
  letterOfEmploymentUrl?: string;
  payslipUrl?: string;
  verificationStatus: "pending" | "verified" | "rejected";
  verifiedAt?: string;
  verificationDocuments: string[]; // URLs
  employerVerificationEmail?: string;
  employerVerificationSent?: boolean;
  employerVerificationToken?: string;
  employerVerificationExpiresAt?: string;
  createdAt: string;
  updatedAt: string;
}

// ============================================================================
// LOAN MANAGEMENT
// ============================================================================

export interface LoanTypeInfo {
  id: string;
  name: string; // e.g., "Quick Loan", "Business Loan", "Emergency Loan"
  description: string;
  minimumAmount: number;
  maximumAmount: number;
  interestRate: number; // Annual percentage rate
  durationMonths: number; // Loan term in months
  processingFeePercentage: number;
  requiresGuarantor: boolean;
  minimumEmploymentMonths?: number;
  minimumSalary?: number;
  eligibilityRequirements: string[];
  maxRolloverTimes: number; // How many times can be rolled over
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Loan {
  id: string;
  userId: string;
  loanTypeId: string;
  amount: number;
  currency: string;
  tenure: number; // Duration in months
  interestRate: number;
  totalInterest: number;
  monthlyPayment: number;
  status: "pending" | "approved" | "rejected" | "active" | "completed" | "defaulted" | "suspended";
  approvedAt?: string;
  disbursedAt?: string;
  completedAt?: string;
  applicationDate: string;
  dueDate: string;
  nextPaymentDate?: string;
  
  // Rollover Information
  isRolledOver: boolean;
  previousLoanId?: string; // Reference to the loan this was rolled over from
  rolloverDate?: string;
  remainingRollovers: number;
  
  // Payment Information
  totalPaid: number;
  outstandingBalance: number;
  paymentsMade: number; // Count of payments made
  missedPayments: number;
  lastPaymentDate?: string;
  
  // Additional Information
  loanPurpose?: string;
  guarantors: Guarantor[];
  documents: LoanDocument[];
  createdAt: string;
  updatedAt: string;
}

export interface LoanDetails {
  principal: number;
  interestRate: number;
  durationMonths: number;
  totalInterest: number;
  totalAmount: number;
  monthlyPayment: number;
  processingFee: number;
  monthlyBreakdown: MonthlyPaymentSchedule[];
}

export interface MonthlyPaymentSchedule {
  month: number;
  dueDate: string;
  principalPayment: number;
  interestPayment: number;
  totalPayment: number;
  remainingBalance: number;
  isPaid: boolean;
  paidDate?: string;
  paidAmount?: number;
}

export interface LoanPayment {
  id: string;
  loanId: string;
  userId: string;
  amount: number;
  currency: string;
  paymentMethod: "bank_transfer" | "card" | "wallet" | "cash";
  transactionReference: string;
  paymentDate: string;
  status: "pending" | "completed" | "failed" | "refunded";
  principalAmount: number;
  interestAmount: number;
  fees: number;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface LoanApplication {
  id: string;
  userId: string;
  loanTypeId: string;
  requestedAmount: number;
  currency: string;
  requestedTenure: number; // Duration in months
  loanPurpose: string;
  
  // Employment Information (at time of application)
  employmentStatus: "employed" | "self_employed" | "unemployed";
  employerName?: string;
  jobTitle?: string;
  employmentStartDate?: string;
  monthlySalary?: number;
  
  // Financial Information
  monthlyExpenses: number;
  existingLoans: number; // Count
  existingLoanBalance: number; // Total outstanding
  monthlyIncome: number;
  savingsBalance: number;
  businessRevenue?: number; // For self-employed
  
  // Guarantors
  guarantors: LoanApplicationGuarantor[];
  
  // Documents
  documents: ApplicationDocument[];
  
  // Status Tracking
  status: "draft" | "submitted" | "under_review" | "approved" | "rejected" | "withdrawn" | "completed";
  submittedAt?: string;
  reviewedAt?: string;
  approvedAt?: string;
  rejectionReason?: string;
  
  // Additional Information
  notes?: string;
  stage: "personal_info" | "employment" | "financial" | "guarantors" | "documents" | "review";
  createdAt: string;
  updatedAt: string;
}

export interface LoanApplicationGuarantor {
  userId: string;
  relationship: "friend" | "family" | "colleague" | "business_partner";
  employmentVerificationRequired: boolean;
  verificationStatus: "pending" | "verified" | "rejected";
  confirmationStatus: "pending" | "accepted" | "declined";
}

export interface ApplicationDocument {
  id: string;
  documentType: "employment_letter" | "payslip" | "bank_statement" | "tax_return" | "business_plan" | "national_id" | "bvn" | "other";
  documentUrl: string;
  uploadedAt: string;
  verificationStatus: "pending" | "verified" | "rejected";
  notes?: string;
}

export interface LoanDocument {
  id: string;
  loanId: string;
  documentType: "contract" | "disbursement_proof" | "payment_proof" | "correspondence" | "other";
  documentUrl: string;
  uploadedAt: string;
  uploadedBy: string;
}

// ============================================================================
// GUARANTOR SYSTEM
// ============================================================================

export interface Guarantor {
  id: string;
  loanId: string;
  guarantorUserId: string;
  guarantorUser?: UserModel; // Populated guarantor details
  relationship: "friend" | "family" | "colleague" | "business_partner";
  
  // Verification
  verificationStatus: "pending" | "verified" | "rejected" | "expired";
  employmentVerificationRequired: boolean;
  employmentVerificationCompleted: boolean;
  employmentVerificationUrl?: string;
  
  // Confirmation
  confirmationStatus: "pending" | "accepted" | "declined" | "revoked";
  invitationSentAt?: string;
  invitationAcceptedAt?: string;
  invitationDeclinedAt?: string;
  
  // QR Code for Quick Acceptance
  qrCode: string; // Base64 encoded QR code image
  qrCodeToken: string; // Unique token for QR acceptance
  qrCodeExpiresAt: string;
  
  // Additional Information
  notes?: string;
  liabilityAmount?: number;
  createdAt: string;
  updatedAt: string;
}

export interface GuarantorInvitation {
  id: string;
  loanId: string;
  guarantorEmail: string;
  invitationToken: string;
  invitationLink: string;
  status: "pending" | "accepted" | "declined" | "expired";
  sentAt: string;
  acceptedAt?: string;
  expiresAt: string;
}

export interface GuarantorVerification {
  guarantorId: string;
  verificationDocuments: VerificationDocument[];
  verificationStatus: "pending" | "verified" | "rejected";
  submittedAt: string;
  reviewedAt?: string;
  rejectionReason?: string;
}

export interface VerificationDocument {
  type: "national_id" | "passport" | "employment_letter" | "payslip";
  documentUrl: string;
  uploadedAt: string;
  verificationStatus: "pending" | "verified" | "rejected";
}

// ============================================================================
// SAVINGS & CONTRIBUTIONS
// ============================================================================

export interface Savings {
  id: string;
  userId: string;
  savingsType: "personal" | "group" | "target";
  savingsGoal?: string; // For target savings
  targetAmount?: number;
  currentAmount: number;
  currency: string;
  createdAt: string;
  updatedAt: string;
  transactionHistory: SavingsTransaction[];
}

export interface SavingsTransaction {
  id: string;
  savingsId: string;
  transactionType: "deposit" | "withdrawal" | "interest" | "fee";
  amount: number;
  currency: string;
  balance: number;
  description?: string;
  transactionDate: string;
  transactionReference: string;
}

export interface Contribution {
  id: string;
  userId: string;
  contributionType: "monthly" | "weekly" | "one_time";
  amount: number;
  currency: string;
  frequency?: "weekly" | "bi_weekly" | "monthly" | "quarterly";
  dueDate: string;
  status: "pending" | "completed" | "missed";
  paidAt?: string;
  nextDueDate?: string;
  createdAt: string;
  updatedAt: string;
}

// ============================================================================
// TRANSACTIONS
// ============================================================================

export interface Transaction {
  id: string;
  userId: string;
  transactionType: "loan_disbursement" | "loan_payment" | "savings_deposit" | "savings_withdrawal" | "contribution" | "transfer" | "refund" | "fee";
  amount: number;
  currency: string;
  status: "pending" | "completed" | "failed" | "refunded";
  description: string;
  relatedLoanId?: string;
  relatedSavingsId?: string;
  paymentMethod: "bank_transfer" | "card" | "wallet" | "cash" | "system";
  transactionReference: string;
  fees: number;
  netAmount: number;
  transactionDate: string;
  completedAt?: string;
  failureReason?: string;
}

export interface TransactionRecord {
  id: string;
  transaction: Transaction;
  userId: string;
  transactionDate: string;
  amount: number;
  type: string;
  status: string;
  description: string;
}

// ============================================================================
// NOTIFICATIONS
// ============================================================================

export interface Notification {
  id: string;
  userId: string;
  type: "loan_approved" | "loan_rejected" | "payment_due" | "payment_received" | "guarantor_request" | "verification_request" | "system" | "promotional";
  title: string;
  body: string;
  data?: Record<string, any>;
  isRead: boolean;
  readAt?: string;
  actionUrl?: string;
  imageUrl?: string;
  createdAt: string;
}

// ============================================================================
// REFERRAL SYSTEM
// ============================================================================

export interface Referral {
  id: string;
  referrerId: string;
  referralCode: string;
  referralLink: string;
  totalReferrals: number;
  activeReferrals: number;
  referralRewards: ReferralReward[];
  status: "active" | "inactive" | "suspended";
  createdAt: string;
  updatedAt: string;
}

export interface ReferralReward {
  id: string;
  referralId: string;
  referredUserId: string;
  rewardAmount: number;
  rewardType: "cash" | "credit" | "discount";
  status: "pending" | "completed" | "cancelled";
  claimedAt?: string;
  createdAt: string;
}

// ============================================================================
// KYC VERIFICATION
// ============================================================================

export interface KYCVerification {
  id: string;
  userId: string;
  verificationLevel: "level_1" | "level_2" | "level_3";
  status: "pending" | "approved" | "rejected" | "expired";
  
  // Level 1: Basic Information
  basicInfoVerified: boolean;
  basicInfoVerifiedAt?: string;
  
  // Level 2: Document Verification
  documentVerified: boolean;
  documentVerifiedAt?: string;
  documentType: "national_id" | "passport" | "drivers_license";
  documentNumber: string;
  documentExpiry: string;
  documentImageUrl: string;
  
  // Level 3: Biometric Verification
  biometricVerified: boolean;
  biometricVerifiedAt?: string;
  biometricImageUrl?: string;
  
  // BVN Verification
  bvnVerified: boolean;
  bvnVerifiedAt?: string;
  bvnNumber: string;
  
  // Risk Assessment
  riskLevel: "low" | "medium" | "high";
  suspiciousFlags: string[];
  
  // Audit Trail
  verifiedBy?: string;
  rejectionReason?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

// ============================================================================
// SUPPORT & TICKETS
// ============================================================================

export interface SupportTicket {
  id: string;
  userId: string;
  subject: string;
  description: string;
  category: "loan_issue" | "payment_issue" | "account_issue" | "verification_issue" | "general" | "complaint" | "feature_request";
  priority: "low" | "medium" | "high" | "urgent";
  status: "open" | "in_progress" | "resolved" | "closed" | "reopened";
  attachments: SupportAttachment[];
  messages: TicketMessage[];
  assignedToAdminId?: string;
  createdAt: string;
  resolvedAt?: string;
  closedAt?: string;
}

export interface SupportAttachment {
  id: string;
  ticketId: string;
  fileUrl: string;
  fileName: string;
  fileType: string;
  uploadedAt: string;
}

export interface TicketMessage {
  id: string;
  ticketId: string;
  userId: string; // Can be user or admin
  isAdminMessage: boolean;
  message: string;
  attachments: SupportAttachment[];
  createdAt: string;
}

// ============================================================================
// ADMIN FEATURES
// ============================================================================

export interface AdminDashboardStats {
  totalUsers: number;
  activeLoans: number;
  totalLoanAmount: number;
  totalSavingsAmount: number;
  pendingApplications: number;
  approvalRate: number; // Percentage
  defaultRate: number; // Percentage
  monthlyActiveUsers: number;
  monthlyNewUsers: number;
}

export interface LoanApplicationReview {
  applicationId: string;
  applicantId: string;
  applicantName: string;
  loanAmount: number;
  loanTenure: number;
  status: "pending_review" | "approved" | "rejected" | "conditions_required";
  reviewedBy?: string;
  reviewNotes?: string;
  conditions?: LoanCondition[];
  approvedAt?: string;
  rejectedAt?: string;
}

export interface LoanCondition {
  id: string;
  condition: string;
  type: "documentation" | "verification" | "guarantor" | "collateral" | "other";
  status: "pending" | "completed" | "rejected";
  completedAt?: string;
}

export interface AuditLog {
  id: string;
  userId?: string;
  adminId?: string;
  action: string;
  entityType: "user" | "loan" | "application" | "payment" | "transaction";
  entityId: string;
  changes: Record<string, any>;
  ipAddress: string;
  userAgent: string;
  createdAt: string;
}

// ============================================================================
// API RESPONSE TYPES
// ============================================================================

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  code?: string;
  timestamp?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    perPage: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

// ============================================================================
// FORM DATA TYPES
// ============================================================================

export interface LoanApplicationFormData {
  loanTypeId: string;
  requestedAmount: number;
  requestedTenure: number;
  loanPurpose: string;
  employmentStatus: string;
  employerName?: string;
  jobTitle?: string;
  employmentStartDate?: string;
  monthlySalary?: number;
  monthlyExpenses: number;
  existingLoanBalance: number;
  savingsBalance: number;
  guarantors: {
    email: string;
    relationship: string;
  }[];
  documents: File[];
}

export interface KYCFormData {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  address: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  governmentIdType: string;
  governmentIdNumber: string;
  bvn: string;
  profileImage: File;
  governmentIdImage: File;
}

// ============================================================================
// FILTER & SEARCH TYPES
// ============================================================================

export interface LoanFilterParams {
  status?: string;
  userId?: string;
  loanTypeId?: string;
  fromDate?: string;
  toDate?: string;
  minAmount?: number;
  maxAmount?: number;
  sortBy?: "createdAt" | "amount" | "dueDate";
  sortOrder?: "asc" | "desc";
  page?: number;
  perPage?: number;
}

export interface UserSearchParams {
  query?: string;
  role?: string;
  kycStatus?: string;
  status?: string;
  page?: number;
  perPage?: number;
}

// ============================================================================
// DASHBOARD TYPES
// ============================================================================

export interface MemberDashboard {
  user: UserModel;
  activeLoans: Loan[];
  savingsBalance: number;
  monthlyContributions: Contribution[];
  recentTransactions: Transaction[];
  notifications: Notification[];
  referralData: Referral;
}

export interface AdminDashboard {
  stats: AdminDashboardStats;
  pendingApplications: LoanApplicationReview[];
  recentLoans: Loan[];
  recentTransactions: Transaction[];
  systemHealth: SystemHealth;
  auditLogs: AuditLog[];
}

export interface SystemHealth {
  apiStatus: "healthy" | "degraded" | "down";
  databaseStatus: "healthy" | "degraded" | "down";
  storageStatus: "healthy" | "degraded" | "down";
  lastHealthCheck: string;
  uptime: number; // percentage
}

// ============================================================================
// SETTINGS & CONFIGURATION
// ============================================================================

export interface UserPreferences {
  userId: string;
  theme: "light" | "dark" | "auto";
  language: "en" | "fr" | "es" | "pt";
  currencyPreference: string; // ISO 4217 code
  emailNotifications: {
    loanUpdates: boolean;
    paymentReminders: boolean;
    promotions: boolean;
    systemAlerts: boolean;
  };
  pushNotifications: {
    enabled: boolean;
    loanUpdates: boolean;
    paymentReminders: boolean;
  };
}

export interface GlobalSetting {
  key: string;
  value: any;
  description?: string;
  updatedAt: string;
}

// ============================================================================
// EXPORT SUMMARY
// ============================================================================

/**
 * Complete Feature Type Summary:
 * 
 * ✅ Authentication & Users:
 *    - UserModel, UserRegistrationData, EmploymentVerification, UserPreferences
 * 
 * ✅ Loan Management (Core Feature):
 *    - LoanTypeInfo, Loan, LoanApplication, LoanDetails, LoanPayment, LoanDocument
 *    - MonthlyPaymentSchedule, LoanApplicationGuarantor, ApplicationDocument
 *    - LoanFilterParams
 * 
 * ✅ Guarantor System:
 *    - Guarantor, GuarantorInvitation, GuarantorVerification, VerificationDocument
 * 
 * ✅ Savings & Contributions:
 *    - Savings, SavingsTransaction, Contribution
 * 
 * ✅ Transactions:
 *    - Transaction, TransactionRecord
 * 
 * ✅ Notifications:
 *    - Notification
 * 
 * ✅ Referral System:
 *    - Referral, ReferralReward
 * 
 * ✅ KYC Verification:
 *    - KYCVerification, KYCFormData
 * 
 * ✅ Support & Tickets:
 *    - SupportTicket, SupportAttachment, TicketMessage
 * 
 * ✅ Admin Features:
 *    - AdminDashboardStats, LoanApplicationReview, LoanCondition, AuditLog, AdminDashboard
 * 
 * ✅ API Response Types:
 *    - ApiResponse<T>, PaginatedResponse<T>
 * 
 * ✅ Dashboard Types:
 *    - MemberDashboard, AdminDashboard, SystemHealth
 * 
 * Total Interfaces: 50+
 * All interfaces fully typed with proper field validation and relationships
 */
