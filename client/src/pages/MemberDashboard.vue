<template>
  <div class="min-h-screen flex flex-col">
    <Navigation />

    <div class="flex-1 p-4 sm:p-8 max-w-7xl mx-auto w-full">
      <h1 class="text-4xl font-bold mb-8">Dashboard</h1>

      <div v-if="loading" class="text-center py-12">
        <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <p class="mt-4 text-slate-600">Loading your dashboard...</p>
      </div>

      <div v-else class="space-y-8">
        <!-- Stats Grid -->
        <div class="grid md:grid-cols-4 gap-4">
          <StatCard title="Total Balance" :value="`$${stats.totalBalance.toLocaleString()}`" icon="DollarSign" />
          <StatCard title="Active Loans" :value="stats.activeLoans" icon="Briefcase" />
          <StatCard title="Contributions" :value="`$${stats.contributions.toLocaleString()}`" icon="TrendingUp" />
          <StatCard title="KYC Status" :value="authStore.user?.kyc_status || 'Not started'" icon="CheckCircle" />
        </div>

        <!-- Quick Actions -->
        <div class="bg-white dark:bg-slate-900 rounded-lg p-6 border border-slate-200 dark:border-slate-700">
          <h2 class="text-2xl font-bold mb-4">Quick Actions</h2>
          <div class="grid md:grid-cols-3 gap-4">
            <button class="p-4 border border-slate-300 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition">
              <TrendingUp class="w-6 h-6 mb-2 mx-auto text-blue-600" />
              <p class="font-bold">Make Contribution</p>
            </button>
            <button class="p-4 border border-slate-300 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition">
              <Briefcase class="w-6 h-6 mb-2 mx-auto text-blue-600" />
              <p class="font-bold">Apply for Loan</p>
            </button>
            <button class="p-4 border border-slate-300 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition">
              <FileText class="w-6 h-6 mb-2 mx-auto text-blue-600" />
              <p class="font-bold">View Documents</p>
            </button>
          </div>
        </div>

        <!-- Recent Transactions -->
        <div class="bg-white dark:bg-slate-900 rounded-lg p-6 border border-slate-200 dark:border-slate-700">
          <h2 class="text-2xl font-bold mb-4">Recent Transactions</h2>
          <div v-if="transactions.length === 0" class="text-center py-8 text-slate-500">
            No transactions yet
          </div>
          <div v-else class="overflow-x-auto">
            <table class="w-full">
              <thead>
                <tr class="border-b border-slate-200 dark:border-slate-700">
                  <th class="text-left py-3 px-4">Date</th>
                  <th class="text-left py-3 px-4">Type</th>
                  <th class="text-left py-3 px-4">Amount</th>
                  <th class="text-left py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(tx, idx) in transactions" :key="idx" class="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition">
                  <td class="py-3 px-4">{{ formatDate(tx.date) }}</td>
                  <td class="py-3 px-4 font-medium">{{ tx.type }}</td>
                  <td class="py-3 px-4 font-bold">{{ tx.amount > 0 ? '+' : '' }}${{ Math.abs(tx.amount) }}</td>
                  <td class="py-3 px-4">
                    <span :class="statusClass(tx.status)" class="px-3 py-1 rounded-full text-sm font-medium">
                      {{ tx.status }}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Active Loans -->
        <div class="bg-white dark:bg-slate-900 rounded-lg p-6 border border-slate-200 dark:border-slate-700">
          <h2 class="text-2xl font-bold mb-4">Active Loans</h2>
          <div v-if="loans.length === 0" class="text-center py-8 text-slate-500">
            No active loans
          </div>
          <div v-else class="space-y-4">
            <div v-for="(loan, idx) in loans" :key="idx" class="p-4 border border-slate-200 dark:border-slate-700 rounded-lg">
              <div class="flex justify-between items-start mb-3">
                <div>
                  <p class="font-bold">Loan Amount: ${{ loan.amount.toLocaleString() }}</p>
                  <p class="text-sm text-slate-600 dark:text-slate-400">Interest Rate: {{ loan.interestRate }}%</p>
                </div>
                <span :class="loanStatusClass(loan.status)" class="px-3 py-1 rounded-full text-sm font-medium">
                  {{ loan.status }}
                </span>
              </div>
              <div class="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-2">
                <div class="bg-blue-600 h-2 rounded-full transition-all" :style="{ width: loan.repaymentProgress + '%' }"></div>
              </div>
              <p class="text-sm text-slate-600 mt-2">{{ loan.repaymentProgress }}% repaid</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <Footer />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useAuthStore } from "@/_core/stores/authStore";
import { useApi } from "@/composables/useApi";
import Navigation from "@/components/Navigation.vue";
import Footer from "@/components/Footer.vue";
import StatCard from "@/components/StatCard.vue";
import { DollarSign, Briefcase, TrendingUp, CheckCircle, FileText } from "lucide-vue-next";

interface Transaction {
  date: string;
  type: string;
  amount: number;
  status: "completed" | "pending" | "failed";
}

interface Loan {
  id: string;
  amount: number;
  interestRate: number;
  repaymentProgress: number;
  status: "active" | "pending" | "completed";
}

const authStore = useAuthStore();
const api = useApi();

const loading = ref(true);
const stats = ref({
  totalBalance: 2500,
  activeLoans: 1,
  contributions: 5000,
  savingsRate: 8.5,
});

const transactions = ref<Transaction[]>([
  { date: "2025-11-10", type: "Contribution", amount: 500, status: "completed" },
  { date: "2025-11-08", type: "Loan Disbursement", amount: 2000, status: "completed" },
  { date: "2025-11-05", type: "Interest Earned", amount: 25, status: "completed" },
]);

const loans = ref<Loan[]>([
  {
    id: "1",
    amount: 2000,
    interestRate: 12,
    repaymentProgress: 35,
    status: "active",
  },
]);

const formatDate = (dateStr: string) => {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const statusClass = (status: string) => ({
  "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200": status === "completed",
  "bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200": status === "pending",
  "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200": status === "failed",
});

const loanStatusClass = (status: string) => ({
  "bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200": status === "active",
  "bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200": status === "pending",
  "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200": status === "completed",
});

onMounted(async () => {
  // Fetch data from Laravel backend
  const response = await api.get("/member/dashboard");
  if (response.success) {
    const data = response.data as any;
    stats.value = {
      totalBalance: data.total_balance || 2500,
      activeLoans: data.active_loans_count || 1,
      contributions: data.total_contributions || 5000,
      savingsRate: data.savings_rate || 8.5,
    };
    
    // Load transactions if available
    if (data.transactions) {
      transactions.value = data.transactions.map((tx: any) => ({
        date: tx.created_at,
        type: tx.type,
        amount: tx.amount,
        status: tx.status,
      }));
    }

    // Load loans if available
    if (data.loans) {
      loans.value = data.loans.map((loan: any) => ({
        id: loan.id,
        amount: loan.amount,
        interestRate: loan.interest_rate,
        repaymentProgress: loan.repayment_progress || 0,
        status: loan.status,
      }));
    }
  }
  
  loading.value = false;
});
</script>
