<template>
  <div class="min-h-screen flex flex-col">
    <Navigation />

    <div class="flex-1 p-4 sm:p-8 max-w-7xl mx-auto w-full">
      <h1 class="text-4xl font-bold mb-8">Admin Dashboard</h1>

      <div v-if="loading" class="text-center py-12">
        <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <p class="mt-4 text-slate-600">Loading admin dashboard...</p>
      </div>

      <div v-else class="space-y-8">
        <!-- Admin Stats -->
        <div class="grid md:grid-cols-4 gap-4">
          <StatCard title="Total Members" :value="stats.totalMembers" icon="Users" />
          <StatCard title="Total Loans" :value="stats.totalLoans" icon="Briefcase" />
          <StatCard title="Total Contributions" :value="`$${stats.totalContributions.toLocaleString()}`" icon="TrendingUp" />
          <StatCard title="System Health" :value="stats.systemHealth + '%'" icon="CheckCircle" />
        </div>

        <div class="grid md:grid-cols-2 gap-8">
          <!-- Pending Loan Approvals -->
          <div class="bg-white dark:bg-slate-900 rounded-lg p-6 border border-slate-200 dark:border-slate-700">
            <h2 class="text-2xl font-bold mb-4 flex items-center">
              <Briefcase class="w-6 h-6 mr-2 text-blue-600" />
              Pending Loan Approvals
            </h2>
            <div v-if="pendingLoans.length === 0" class="text-center py-8 text-slate-500">
              No pending approvals
            </div>
            <div v-else class="space-y-3">
              <div v-for="(loan, idx) in pendingLoans" :key="idx" class="p-4 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition">
                <div class="flex justify-between items-start mb-2">
                  <div>
                    <p class="font-bold">{{ loan.memberName }}</p>
                    <p class="text-sm text-slate-600 dark:text-slate-400">Amount: ${{ loan.amount.toLocaleString() }}</p>
                  </div>
                  <span class="text-xs bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 px-2 py-1 rounded">
                    {{ loan.daysWaiting }} days
                  </span>
                </div>
                <div class="flex gap-2">
                  <button class="text-xs px-3 py-1 rounded bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 hover:bg-green-200 dark:hover:bg-green-800 transition">
                    Approve
                  </button>
                  <button class="text-xs px-3 py-1 rounded bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 hover:bg-red-200 dark:hover:bg-red-800 transition">
                    Reject
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Recent KYC Verifications -->
          <div class="bg-white dark:bg-slate-900 rounded-lg p-6 border border-slate-200 dark:border-slate-700">
            <h2 class="text-2xl font-bold mb-4 flex items-center">
              <CheckCircle class="w-6 h-6 mr-2 text-blue-600" />
              KYC Verifications Pending
            </h2>
            <div v-if="pendingKYC.length === 0" class="text-center py-8 text-slate-500">
              All KYC verified
            </div>
            <div v-else class="space-y-3">
              <div v-for="(kyc, idx) in pendingKYC" :key="idx" class="p-4 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition">
                <div class="flex justify-between items-start mb-2">
                  <div>
                    <p class="font-bold">{{ kyc.memberName }}</p>
                    <p class="text-sm text-slate-600 dark:text-slate-400">Email: {{ kyc.email }}</p>
                  </div>
                </div>
                <button class="text-xs px-3 py-1 rounded bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 hover:bg-blue-200 dark:hover:bg-blue-800 transition">
                  Review
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Members List -->
        <div class="bg-white dark:bg-slate-900 rounded-lg p-6 border border-slate-200 dark:border-slate-700">
          <h2 class="text-2xl font-bold mb-4 flex items-center">
            <Users class="w-6 h-6 mr-2 text-blue-600" />
            All Members
          </h2>
          <div class="flex gap-2 mb-4">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search members..."
              class="flex-1 px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-lg dark:bg-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
          <div v-if="filteredMembers.length === 0" class="text-center py-8 text-slate-500">
            No members found
          </div>
          <div v-else class="overflow-x-auto">
            <table class="w-full">
              <thead>
                <tr class="border-b border-slate-200 dark:border-slate-700">
                  <th class="text-left py-3 px-4">Name</th>
                  <th class="text-left py-3 px-4">Email</th>
                  <th class="text-left py-3 px-4">Join Date</th>
                  <th class="text-left py-3 px-4">Status</th>
                  <th class="text-left py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(member, idx) in filteredMembers" :key="idx" class="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition">
                  <td class="py-3 px-4 font-medium">{{ member.name }}</td>
                  <td class="py-3 px-4">{{ member.email }}</td>
                  <td class="py-3 px-4 text-sm">{{ formatDate(member.joinDate) }}</td>
                  <td class="py-3 px-4">
                    <span :class="memberStatusClass(member.status)" class="px-3 py-1 rounded-full text-xs font-medium">
                      {{ member.status }}
                    </span>
                  </td>
                  <td class="py-3 px-4">
                    <button class="text-xs px-3 py-1 rounded bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition">
                      View
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Reports Section -->
        <div class="grid md:grid-cols-2 gap-8">
          <div class="bg-white dark:bg-slate-900 rounded-lg p-6 border border-slate-200 dark:border-slate-700">
            <h2 class="text-2xl font-bold mb-4 flex items-center">
              <BarChart3 class="w-6 h-6 mr-2 text-blue-600" />
              Loan Statistics
            </h2>
            <div class="space-y-3">
              <div class="flex justify-between pb-2 border-b border-slate-200 dark:border-slate-700">
                <span class="text-slate-600 dark:text-slate-400">Total Disbursed</span>
                <span class="font-bold">${{ stats.totalDisbursed.toLocaleString() }}</span>
              </div>
              <div class="flex justify-between pb-2 border-b border-slate-200 dark:border-slate-700">
                <span class="text-slate-600 dark:text-slate-400">Active Loans</span>
                <span class="font-bold">{{ stats.activeLoansCount }}</span>
              </div>
              <div class="flex justify-between pb-2 border-b border-slate-200 dark:border-slate-700">
                <span class="text-slate-600 dark:text-slate-400">Default Rate</span>
                <span class="font-bold text-red-600">{{ stats.defaultRate }}%</span>
              </div>
              <div class="flex justify-between">
                <span class="text-slate-600 dark:text-slate-400">Avg Interest</span>
                <span class="font-bold">{{ stats.avgInterestRate }}%</span>
              </div>
            </div>
          </div>

          <div class="bg-white dark:bg-slate-900 rounded-lg p-6 border border-slate-200 dark:border-slate-700">
            <h2 class="text-2xl font-bold mb-4 flex items-center">
              <PieChart class="w-6 h-6 mr-2 text-blue-600" />
              Member Activity
            </h2>
            <div class="space-y-3">
              <div class="flex justify-between pb-2 border-b border-slate-200 dark:border-slate-700">
                <span class="text-slate-600 dark:text-slate-400">Active This Month</span>
                <span class="font-bold">{{ stats.activeThisMonth }}%</span>
              </div>
              <div class="flex justify-between pb-2 border-b border-slate-200 dark:border-slate-700">
                <span class="text-slate-600 dark:text-slate-400">Contributions This Month</span>
                <span class="font-bold">${{ stats.contributionsThisMonth.toLocaleString() }}</span>
              </div>
              <div class="flex justify-between pb-2 border-b border-slate-200 dark:border-slate-700">
                <span class="text-slate-600 dark:text-slate-400">Avg Member Balance</span>
                <span class="font-bold">${{ stats.avgMemberBalance.toLocaleString() }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-slate-600 dark:text-slate-400">Retention Rate</span>
                <span class="font-bold text-green-600">{{ stats.retentionRate }}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <Footer />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useAuthStore } from "@/_core/stores/authStore";
import { useApi } from "@/composables/useApi";
import Navigation from "@/components/Navigation.vue";
import Footer from "@/components/Footer.vue";
import StatCard from "@/components/StatCard.vue";
import { Briefcase, CheckCircle, Users, BarChart3, PieChart } from "lucide-vue-next";

interface LoanApproval {
  id: string;
  memberName: string;
  amount: number;
  daysWaiting: number;
}

interface KYCVerification {
  id: string;
  memberName: string;
  email: string;
}

interface Member {
  id: string;
  name: string;
  email: string;
  joinDate: string;
  status: "active" | "inactive" | "suspended";
}

const authStore = useAuthStore();
const api = useApi();

const loading = ref(true);
const searchQuery = ref("");

const stats = ref({
  totalMembers: 245,
  totalLoans: 89,
  totalContributions: 125000,
  systemHealth: 98,
  totalDisbursed: 450000,
  activeLoansCount: 67,
  defaultRate: 2.5,
  avgInterestRate: 12.5,
  activeThisMonth: 78,
  contributionsThisMonth: 28500,
  avgMemberBalance: 510,
  retentionRate: 94,
});

const pendingLoans = ref<LoanApproval[]>([
  { id: "1", memberName: "John Doe", amount: 5000, daysWaiting: 5 },
  { id: "2", memberName: "Jane Smith", amount: 3000, daysWaiting: 3 },
  { id: "3", memberName: "Ahmed Hassan", amount: 7500, daysWaiting: 8 },
]);

const pendingKYC = ref<KYCVerification[]>([
  { id: "1", memberName: "Mary Johnson", email: "mary@example.com" },
  { id: "2", memberName: "David Brown", email: "david@example.com" },
]);

const members = ref<Member[]>([
  { id: "1", name: "John Doe", email: "john@example.com", joinDate: "2025-01-15", status: "active" },
  { id: "2", name: "Jane Smith", email: "jane@example.com", joinDate: "2025-02-20", status: "active" },
  { id: "3", name: "Ahmed Hassan", email: "ahmed@example.com", joinDate: "2025-03-10", status: "active" },
  { id: "4", name: "Mary Johnson", email: "mary@example.com", joinDate: "2025-03-05", status: "inactive" },
  { id: "5", name: "David Brown", email: "david@example.com", joinDate: "2025-01-25", status: "active" },
]);

const filteredMembers = computed(() => {
  if (!searchQuery.value) return members.value;
  const query = searchQuery.value.toLowerCase();
  return members.value.filter(
    (m) => m.name.toLowerCase().includes(query) || m.email.toLowerCase().includes(query)
  );
});

const formatDate = (dateStr: string) => {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const memberStatusClass = (status: string) => ({
  "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200": status === "active",
  "bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200": status === "inactive",
  "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200": status === "suspended",
});

onMounted(async () => {
  // Fetch admin dashboard data from Laravel backend
  const response = await api.get("/admin/dashboard");
  if (response.success) {
    const data = response.data as any;
    stats.value = {
      totalMembers: data.total_members || 245,
      totalLoans: data.total_loans || 89,
      totalContributions: data.total_contributions || 125000,
      systemHealth: data.system_health || 98,
      totalDisbursed: data.total_disbursed || 450000,
      activeLoansCount: data.active_loans_count || 67,
      defaultRate: data.default_rate || 2.5,
      avgInterestRate: data.avg_interest_rate || 12.5,
      activeThisMonth: data.active_this_month || 78,
      contributionsThisMonth: data.contributions_this_month || 28500,
      avgMemberBalance: data.avg_member_balance || 510,
      retentionRate: data.retention_rate || 94,
    };

    // Load pending loans if available
    if (data.pending_loans) {
      pendingLoans.value = data.pending_loans;
    }

    // Load pending KYC if available
    if (data.pending_kyc) {
      pendingKYC.value = data.pending_kyc;
    }

    // Load members if available
    if (data.members) {
      members.value = data.members;
    }
  }

  loading.value = false;
});
</script>
