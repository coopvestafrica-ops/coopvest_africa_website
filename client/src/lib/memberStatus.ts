/**
 * Member status detection utilities
 */

export interface MemberInfo {
  joinDate?: Date | string;
  totalContributions?: number;
  contributionHistory?: Array<{ date: string; amount: number }>;
  accountStatus?: 'active' | 'inactive' | 'pending';
}

/**
 * Determines if a member is new (less than 3 months) or old
 * @param joinDate - The date the member joined
 * @returns true if member is new, false if old
 */
export const isNewMember = (joinDate?: Date | string): boolean => {
  if (!joinDate) return true; // Default to new if no date provided

  const join = new Date(joinDate);
  const now = new Date();
  const threeMonthsAgo = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);

  return join > threeMonthsAgo;
};

/**
 * Determines if a member has active contributions
 * @param contributionHistory - Array of contributions
 * @returns true if member has contributions, false otherwise
 */
export const hasActiveContributions = (
  contributionHistory?: Array<{ date: string; amount: number }>
): boolean => {
  if (!contributionHistory || contributionHistory.length === 0) return false;

  // Check if there's a contribution in the last 30 days
  const thirtyDaysAgo = new Date(new Date().getTime() - 30 * 24 * 60 * 60 * 1000);
  return contributionHistory.some((contrib) => new Date(contrib.date) > thirtyDaysAgo);
};

/**
 * Get member status display text
 * @param memberInfo - Member information
 * @returns Status text to display
 */
export const getMemberStatusText = (memberInfo: MemberInfo): string | null => {
  const newMember = isNewMember(memberInfo.joinDate);

  if (newMember) {
    return null; // Return null for new members (display nothing)
  }

  // For old members, return their account status
  if (memberInfo.accountStatus === 'active') {
    return 'Active Member';
  } else if (memberInfo.accountStatus === 'inactive') {
    return 'Inactive Member';
  } else if (memberInfo.accountStatus === 'pending') {
    return 'Pending Verification';
  }

  return 'Member';
};

/**
 * Get member status badge color
 * @param status - Account status
 * @returns CSS class for badge color
 */
export const getMemberStatusColor = (
  status?: 'active' | 'inactive' | 'pending'
): string => {
  switch (status) {
    case 'active':
      return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
    case 'inactive':
      return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
    case 'pending':
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
    default:
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
  }
};
