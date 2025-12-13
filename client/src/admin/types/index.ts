/**
 * Coopvest Africa Admin Dashboard - Core Types & Interfaces
 * Comprehensive type definitions for all admin features
 */

// ============================================================================
// ROLE & ACCESS CONTROL TYPES
// ============================================================================

export enum RoleType {
  SUPER_ADMIN = 'SUPER_ADMIN',
  FINANCE_ADMIN = 'FINANCE_ADMIN',
  OPERATIONS_ADMIN = 'OPERATIONS_ADMIN',
  COMPLIANCE_ADMIN = 'COMPLIANCE_ADMIN',
  MEMBER_SUPPORT_ADMIN = 'MEMBER_SUPPORT_ADMIN',
  INVESTMENT_ADMIN = 'INVESTMENT_ADMIN',
  TECHNOLOGY_ADMIN = 'TECHNOLOGY_ADMIN',
}

export enum PermissionScope {
  FINANCE = 'FINANCE',
  OPERATIONS = 'OPERATIONS',
  COMPLIANCE = 'COMPLIANCE',
  SUPPORT = 'SUPPORT',
  TECHNOLOGY = 'TECHNOLOGY',
  INVESTMENT = 'INVESTMENT',
}

export enum PermissionAction {
  CREATE = 'CREATE',
  READ = 'READ',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
  APPROVE = 'APPROVE',
  REJECT = 'REJECT',
  OVERRIDE = 'OVERRIDE',
  EXPORT = 'EXPORT',
}

export interface Permission {
  id: string;
  scope: PermissionScope;
  action: PermissionAction;
  description: string;
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
}

export interface Role {
  id: string;
  type: RoleType;
  name: string;
  description: string;
  permissions: Permission[];
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
}

export interface AdminUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  role: Role;
  roles?: Role[]; // For Super Admin with multiple roles
  status: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED' | 'PENDING_APPROVAL';
  mfaEnabled: boolean;
  mfaMethod?: 'TOTP' | 'SMS' | 'EMAIL';
  lastLogin?: Date;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string; // Admin ID who created this user
  approvedBy?: string; // Super Admin ID who approved
  suspendedBy?: string;
  suspensionReason?: string;
}

export interface RoleAssignment {
  id: string;
  adminId: string;
  roleId: string;
  assignedAt: Date;
  assignedBy: string; // Super Admin ID
  expiresAt?: Date; // For temporary assignments
  status: 'ACTIVE' | 'EXPIRED' | 'REVOKED';
  revokedAt?: Date;
  revokedBy?: string;
}

export interface AdminApprovalRequest {
  id: string;
  type: 'ADMIN_CREATION' | 'ROLE_CHANGE' | 'PERMISSION_OVERRIDE';
  requestedBy: string;
  requestedAdmin?: AdminUser;
  requestedRole?: Role;
  requestedPermissions?: Permission[];
  reason: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  approvedBy?: string;
  approvalDate?: Date;
  rejectionReason?: string;
  createdAt: Date;
}

// ============================================================================
// MEMBER TYPES
// ============================================================================

export enum MemberStatus {
  PENDING_VERIFICATION = 'PENDING_VERIFICATION',
  VERIFIED = 'VERIFIED',
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  SUSPENDED = 'SUSPENDED',
  FLAGGED = 'FLAGGED',
}

export enum KYCStatus {
  NOT_STARTED = 'NOT_STARTED',
  IN_PROGRESS = 'IN_PROGRESS',
  PENDING_REVIEW = 'PENDING_REVIEW',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  EXPIRED = 'EXPIRED',
}

export interface KYCDocument {
  id: string;
  type: 'ID' | 'PROOF_OF_ADDRESS' | 'INCOME_VERIFICATION' | 'BANK_STATEMENT';
  url: string;
  uploadedAt: Date;
  verifiedAt?: Date;
  verifiedBy?: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  rejectionReason?: string;
}

export interface MemberProfile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  dateOfBirth: Date;
  gender?: 'MALE' | 'FEMALE' | 'OTHER';
  nationality: string;
  idNumber: string;
  idType: 'NATIONAL_ID' | 'PASSPORT' | 'DRIVER_LICENSE';
  address: string;
  city: string;
  state: string;
  postalCode: string;
  employer?: string;
  employmentStatus: 'EMPLOYED' | 'SELF_EMPLOYED' | 'UNEMPLOYED' | 'RETIRED';
  monthlyIncome?: number;
  bankName?: string;
  bankAccountNumber?: string;
  bankAccountType?: 'SAVINGS' | 'CHECKING';
}

export interface Member {
  id: string;
  profile: MemberProfile;
  status: MemberStatus;
  kycStatus: KYCStatus;
  kycDocuments: KYCDocument[];
  joinDate: Date;
  lastActivityDate?: Date;
  totalContributions: number;
  activeLoans: number;
  totalLoansReceived: number;
  defaultedLoans: number;
  walletBalance: number;
  riskScore?: number; // Phase 2
  flags?: MemberFlag[];
  suspendedAt?: Date;
  suspendedBy?: string;
  suspensionReason?: string;
}

export interface MemberFlag {
  id: string;
  memberId: string;
  category: 'COMPLIANCE' | 'RISK' | 'FRAUD' | 'BEHAVIOR' | 'OTHER';
  reason: string;
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  flaggedAt: Date;
  flaggedBy: string;
  resolvedAt?: Date;
  resolvedBy?: string;
  resolutionNotes?: string;
}

// ============================================================================
// CONTRIBUTION & WALLET TYPES
// ============================================================================

export enum TransactionType {
  DEPOSIT = 'DEPOSIT',
  WITHDRAWAL = 'WITHDRAWAL',
  TRANSFER = 'TRANSFER',
  INTEREST = 'INTEREST',
  LOAN_DISBURSEMENT = 'LOAN_DISBURSEMENT',
  LOAN_REPAYMENT = 'LOAN_REPAYMENT',
  FEE = 'FEE',
  ADJUSTMENT = 'ADJUSTMENT',
}

export enum TransactionStatus {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  REVERSED = 'REVERSED',
}

export interface Wallet {
  id: string;
  memberId: string;
  balance: number;
  status: 'ACTIVE' | 'FROZEN' | 'SUSPENDED';
  createdAt: Date;
  updatedAt: Date;
  lastTransactionDate?: Date;
}

export interface Transaction {
  id: string;
  walletId: string;
  memberId: string;
  type: TransactionType;
  amount: number;
  status: TransactionStatus;
  description: string;
  reference?: string;
  initiatedBy: string; // Admin or system
  completedAt?: Date;
  failureReason?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Contribution {
  id: string;
  memberId: string;
  amount: number;
  frequency: 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'QUARTERLY' | 'ANNUAL';
  startDate: Date;
  endDate?: Date;
  status: 'ACTIVE' | 'PAUSED' | 'COMPLETED' | 'CANCELLED';
  poolId?: string; // For pooled contributions
  createdAt: Date;
  updatedAt: Date;
}

export interface ContributionPool {
  id: string;
  name: string;
  description: string;
  targetAmount: number;
  currentAmount: number;
  members: string[]; // Member IDs
  startDate: Date;
  endDate?: Date;
  status: 'ACTIVE' | 'CLOSED' | 'COMPLETED';
  createdAt: Date;
  updatedAt: Date;
}

// ============================================================================
// LOAN TYPES
// ============================================================================

export enum LoanStatus {
  DRAFT = 'DRAFT',
  SUBMITTED = 'SUBMITTED',
  UNDER_REVIEW = 'UNDER_REVIEW',
  APPROVED = 'APPROVED',
  CONDITIONAL_APPROVAL = 'CONDITIONAL_APPROVAL',
  REJECTED = 'REJECTED',
  DISBURSED = 'DISBURSED',
  ACTIVE = 'ACTIVE',
  COMPLETED = 'COMPLETED',
  DEFAULTED = 'DEFAULTED',
}

export enum LoanType {
  EMERGENCY = 'EMERGENCY',
  BUSINESS = 'BUSINESS',
  EDUCATION = 'EDUCATION',
  HOUSING = 'HOUSING',
  PERSONAL = 'PERSONAL',
  AGRICULTURAL = 'AGRICULTURAL',
}

export interface LoanApplication {
  id: string;
  memberId: string;
  type: LoanType;
  amount: number;
  purpose: string;
  duration: number; // in months
  interestRate: number;
  status: LoanStatus;
  submittedAt: Date;
  reviewedAt?: Date;
  reviewedBy?: string;
  approvedAt?: Date;
  approvedBy?: string;
  rejectionReason?: string;
  conditions?: string[];
  documents: string[]; // Document URLs
  createdAt: Date;
  updatedAt: Date;
}

export interface Loan {
  id: string;
  applicationId: string;
  memberId: string;
  type: LoanType;
  amount: number;
  interestRate: number;
  duration: number; // in months
  status: LoanStatus;
  disbursedAt: Date;
  disbursedBy: string;
  disbursedAmount: number;
  repaidAmount: number;
  remainingBalance: number;
  dueDate: Date;
  completedAt?: Date;
  defaultedAt?: Date;
  defaultReason?: string;
  repaymentSchedule: RepaymentInstallment[];
  createdAt: Date;
  updatedAt: Date;
}

export interface RepaymentInstallment {
  id: string;
  loanId: string;
  installmentNumber: number;
  dueDate: Date;
  amount: number;
  paidAmount: number;
  status: 'PENDING' | 'PAID' | 'OVERDUE' | 'DEFAULTED';
  paidAt?: Date;
  daysOverdue?: number;
  reminderSentAt?: Date;
}

export interface LoanEligibility {
  memberId: string;
  isEligible: boolean;
  maxLoanAmount: number;
  reasons: string[];
  checks: {
    contributionHistory: boolean;
    minimumBalance: boolean;
    loanToContributionRatio: boolean;
    defaultHistory: boolean;
    kycStatus: boolean;
  };
}

// ============================================================================
// INVESTMENT TYPES
// ============================================================================

export interface InvestmentPool {
  id: string;
  name: string;
  description: string;
  targetAmount: number;
  currentAmount: number;
  status: 'ACTIVE' | 'CLOSED' | 'COMPLETED';
  startDate: Date;
  endDate?: Date;
  expectedReturn: number; // percentage
  actualReturn?: number;
  members: InvestmentAllocation[];
  profitSharingRules: ProfitSharingRule[];
  createdAt: Date;
  updatedAt: Date;
}

export interface InvestmentAllocation {
  id: string;
  poolId: string;
  memberId: string;
  amount: number;
  percentage: number;
  status: 'ACTIVE' | 'WITHDRAWN' | 'COMPLETED';
  allocatedAt: Date;
  withdrawnAt?: Date;
}

export interface ProfitSharingRule {
  id: string;
  poolId: string;
  name: string;
  percentage: number;
  description: string;
  conditions?: string[];
}

// ============================================================================
// COMPLIANCE & GOVERNANCE TYPES
// ============================================================================

export enum AuditActionType {
  ADMIN_LOGIN = 'ADMIN_LOGIN',
  ADMIN_LOGOUT = 'ADMIN_LOGOUT',
  ADMIN_CREATED = 'ADMIN_CREATED',
  ADMIN_UPDATED = 'ADMIN_UPDATED',
  ADMIN_DELETED = 'ADMIN_DELETED',
  ROLE_ASSIGNED = 'ROLE_ASSIGNED',
  ROLE_REVOKED = 'ROLE_REVOKED',
  PERMISSION_GRANTED = 'PERMISSION_GRANTED',
  PERMISSION_REVOKED = 'PERMISSION_REVOKED',
  MEMBER_APPROVED = 'MEMBER_APPROVED',
  MEMBER_SUSPENDED = 'MEMBER_SUSPENDED',
  MEMBER_FLAGGED = 'MEMBER_FLAGGED',
  LOAN_APPROVED = 'LOAN_APPROVED',
  LOAN_REJECTED = 'LOAN_REJECTED',
  LOAN_DISBURSED = 'LOAN_DISBURSED',
  TRANSACTION_PROCESSED = 'TRANSACTION_PROCESSED',
  DOCUMENT_GENERATED = 'DOCUMENT_GENERATED',
  REPORT_EXPORTED = 'REPORT_EXPORTED',
  SYSTEM_SETTING_CHANGED = 'SYSTEM_SETTING_CHANGED',
  MFA_ENABLED = 'MFA_ENABLED',
  MFA_DISABLED = 'MFA_DISABLED',
  DEVICE_REGISTERED = 'DEVICE_REGISTERED',
  SUSPICIOUS_ACTIVITY = 'SUSPICIOUS_ACTIVITY',
}

export interface AuditLog {
  id: string;
  adminId: string;
  adminEmail: string;
  actionType: AuditActionType;
  resourceType: string; // 'MEMBER', 'LOAN', 'ADMIN', etc.
  resourceId: string;
  changes?: Record<string, any>;
  ipAddress: string;
  userAgent: string;
  deviceId?: string;
  status: 'SUCCESS' | 'FAILURE';
  errorMessage?: string;
  timestamp: Date;
}

export interface ComplianceIssue {
  id: string;
  category: 'REGULATORY' | 'INTERNAL' | 'SECURITY' | 'OPERATIONAL';
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  title: string;
  description: string;
  status: 'OPEN' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED';
  reportedAt: Date;
  reportedBy: string;
  resolvedAt?: Date;
  resolvedBy?: string;
  resolutionNotes?: string;
}

export interface EthicsCommitteeCase {
  id: string;
  caseNumber: string;
  title: string;
  description: string;
  relatedMemberId?: string;
  relatedLoanId?: string;
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  status: 'OPEN' | 'UNDER_REVIEW' | 'DECIDED' | 'APPEALED' | 'CLOSED';
  assignedTo: string[]; // Committee member IDs
  createdAt: Date;
  decidedAt?: Date;
  decision?: string;
  appealedAt?: Date;
  appealReason?: string;
}

// ============================================================================
// NOTIFICATION TYPES
// ============================================================================

export enum NotificationType {
  LOAN_APPROVED = 'LOAN_APPROVED',
  LOAN_REJECTED = 'LOAN_REJECTED',
  PAYMENT_DUE = 'PAYMENT_DUE',
  PAYMENT_OVERDUE = 'PAYMENT_OVERDUE',
  MEMBER_FLAGGED = 'MEMBER_FLAGGED',
  COMPLIANCE_ALERT = 'COMPLIANCE_ALERT',
  SYSTEM_ALERT = 'SYSTEM_ALERT',
  ROLE_ASSIGNED = 'ROLE_ASSIGNED',
  ROLE_REVOKED = 'ROLE_REVOKED',
  CONTRIBUTION_RECEIVED = 'CONTRIBUTION_RECEIVED',
  INVESTMENT_UPDATE = 'INVESTMENT_UPDATE',
}

export interface Notification {
  id: string;
  recipientId: string;
  type: NotificationType;
  title: string;
  message: string;
  data?: Record<string, any>;
  read: boolean;
  readAt?: Date;
  channels: ('IN_APP' | 'EMAIL' | 'SMS')[];
  sentAt: Date;
  createdAt: Date;
}

export interface NotificationPreference {
  id: string;
  adminId: string;
  type: NotificationType;
  inApp: boolean;
  email: boolean;
  sms: boolean;
}

// ============================================================================
// DOCUMENT TYPES
// ============================================================================

export enum DocumentType {
  LOAN_AGREEMENT = 'LOAN_AGREEMENT',
  STATEMENT = 'STATEMENT',
  PROOF_OF_SAVINGS = 'PROOF_OF_SAVINGS',
  CONTRIBUTION_CERTIFICATE = 'CONTRIBUTION_CERTIFICATE',
  LOAN_DISBURSEMENT_LETTER = 'LOAN_DISBURSEMENT_LETTER',
  COMPLIANCE_REPORT = 'COMPLIANCE_REPORT',
}

export interface Document {
  id: string;
  type: DocumentType;
  memberId?: string;
  loanId?: string;
  fileName: string;
  fileUrl: string;
  fileSize: number;
  mimeType: string;
  generatedAt: Date;
  generatedBy: string;
  digitalSignature?: string;
  watermark?: string;
  accessLog: DocumentAccess[];
  status: 'DRAFT' | 'PENDING_APPROVAL' | 'APPROVED' | 'REJECTED';
  approvedBy?: string;
  approvalDate?: Date;
  rejectionReason?: string;
}

export interface DocumentAccess {
  id: string;
  documentId: string;
  accessedBy: string;
  accessedAt: Date;
  action: 'VIEW' | 'DOWNLOAD' | 'PRINT';
}

// ============================================================================
// ANALYTICS TYPES
// ============================================================================

export interface DashboardMetrics {
  totalMembers: number;
  activeMembers: number;
  inactiveMembers: number;
  pendingVerification: number;
  totalContributions: number;
  monthlyContributions: number;
  totalLoans: number;
  activeLoans: number;
  defaultedLoans: number;
  loanRepaymentRate: number;
  averageLoanAmount: number;
  systemAlerts: number;
  flaggedAccounts: number;
  complianceIssues: number;
}

export interface MemberGrowthData {
  date: Date;
  newMembers: number;
  cumulativeMembers: number;
}

export interface LoanPerformanceData {
  loanType: LoanType;
  totalLoans: number;
  approvalRate: number;
  defaultRate: number;
  averageAmount: number;
  averageDuration: number;
}

export interface ContributionData {
  date: Date;
  amount: number;
  memberCount: number;
  averagePerMember: number;
}

// ============================================================================
// SECURITY TYPES
// ============================================================================

export interface MFASetup {
  adminId: string;
  method: 'TOTP' | 'SMS' | 'EMAIL';
  secret?: string; // For TOTP
  phoneNumber?: string; // For SMS
  backupCodes: string[];
  verifiedAt?: Date;
  status: 'PENDING' | 'VERIFIED' | 'DISABLED';
}

export interface DeviceInfo {
  id: string;
  adminId: string;
  deviceName: string;
  deviceType: 'DESKTOP' | 'MOBILE' | 'TABLET';
  osName: string;
  osVersion: string;
  browserName: string;
  browserVersion: string;
  ipAddress: string;
  lastUsedAt: Date;
  isTrusted: boolean;
  registeredAt: Date;
}

export interface LoginAttempt {
  id: string;
  adminId: string;
  email: string;
  ipAddress: string;
  deviceId?: string;
  status: 'SUCCESS' | 'FAILED' | 'MFA_REQUIRED';
  failureReason?: string;
  timestamp: Date;
}

export interface SecurityAlert {
  id: string;
  adminId: string;
  type: 'UNUSUAL_LOGIN' | 'MULTIPLE_FAILED_ATTEMPTS' | 'PERMISSION_CHANGE' | 'LARGE_TRANSACTION' | 'SYSTEM_ERROR';
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  message: string;
  details?: Record<string, any>;
  acknowledged: boolean;
  acknowledgedAt?: Date;
  acknowledgedBy?: string;
  createdAt: Date;
}

// ============================================================================
// DASHBOARD STATE TYPES
// ============================================================================

export interface AdminDashboardState {
  currentAdmin: AdminUser | null;
  isAuthenticated: boolean;
  permissions: Permission[];
  metrics: DashboardMetrics | null;
  recentActivity: AuditLog[];
  systemAlerts: SecurityAlert[];
  loading: boolean;
  error: string | null;
}

export interface AdminContextType {
  state: AdminDashboardState;
  dispatch: (action: AdminAction) => void;
}

export type AdminAction =
  | { type: 'SET_CURRENT_ADMIN'; payload: AdminUser }
  | { type: 'SET_AUTHENTICATED'; payload: boolean }
  | { type: 'SET_PERMISSIONS'; payload: Permission[] }
  | { type: 'SET_METRICS'; payload: DashboardMetrics }
  | { type: 'SET_RECENT_ACTIVITY'; payload: AuditLog[] }
  | { type: 'SET_SYSTEM_ALERTS'; payload: SecurityAlert[] }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'LOGOUT' };

// ============================================================================
// API RESPONSE TYPES
// ============================================================================

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  timestamp: Date;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface FilterOptions {
  page?: number;
  pageSize?: number;
  sortBy?: string;
  sortOrder?: 'ASC' | 'DESC';
  search?: string;
  filters?: Record<string, any>;
}
