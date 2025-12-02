import { useAuthContext } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import { CreditCard, TrendingUp, PiggyBank, ArrowUpRight, ArrowDownLeft, Plus, Eye, EyeOff, Settings, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

function MemberDashboardContent() {
  const { user, logout } = useAuthContext();
  const [showBalance, setShowBalance] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");

  // Mock data
  const accountData = {
    totalBalance: 45250.50,
    savingsBalance: 25000.00,
    loanBalance: 8500.00,
    monthlyContribution: 2500.00,
  };

  const recentTransactions = [
    { id: 1, type: "deposit", description: "Monthly Contribution", amount: 2500, date: "Nov 2, 2024", status: "completed" },
    { id: 2, type: "withdrawal", description: "Loan Disbursement", amount: 5000, date: "Oct 28, 2024", status: "completed" },
    { id: 3, type: "interest", description: "Interest Earned", amount: 125.50, date: "Oct 15, 2024", status: "completed" },
    { id: 4, type: "loan_payment", description: "Loan Repayment", amount: 1200, date: "Oct 10, 2024", status: "completed" },
  ];

  const activeLoan = {
    id: "LOAN-2024-001",
    amount: 10000,
    balance: 8500,
    rate: 12.5,
    nextPayment: 1200,
    dueDate: "Nov 15, 2024",
    status: "active",
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Header */}
      <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
              Member Dashboard
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Welcome back, {user?.name}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
            <Button
              onClick={logout}
              variant="outline"
              size="sm"
              className="text-red-600 dark:text-red-400"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Account Overview Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Balance */}
          <div className="bg-white dark:bg-slate-900 rounded-lg shadow p-6 border border-slate-200 dark:border-slate-800">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                  Total Balance
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <p className="text-3xl font-bold text-slate-900 dark:text-white">
                    {showBalance ? `$${accountData.totalBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}` : "••••••"}
                  </p>
                  <button
                    onClick={() => setShowBalance(!showBalance)}
                    className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded"
                  >
                    {showBalance ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <CreditCard className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </div>

          {/* Savings Balance */}
          <div className="bg-white dark:bg-slate-900 rounded-lg shadow p-6 border border-slate-200 dark:border-slate-800">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                  Savings Balance
                </p>
                <p className="text-3xl font-bold text-slate-900 dark:text-white mt-2">
                  ${accountData.savingsBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </p>
              </div>
              <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
                <PiggyBank className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Earning 8.5% APY
            </p>
          </div>

          {/* Active Loans */}
          <div className="bg-white dark:bg-slate-900 rounded-lg shadow p-6 border border-slate-200 dark:border-slate-800">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                  Loan Balance
                </p>
                <p className="text-3xl font-bold text-slate-900 dark:text-white mt-2">
                  ${accountData.loanBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </p>
              </div>
              <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                <TrendingUp className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              </div>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              1 active loan
            </p>
          </div>

          {/* Monthly Contribution */}
          <div className="bg-white dark:bg-slate-900 rounded-lg shadow p-6 border border-slate-200 dark:border-slate-800">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                  Next Contribution
                </p>
                <p className="text-3xl font-bold text-slate-900 dark:text-white mt-2">
                  ${accountData.monthlyContribution.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </p>
              </div>
              <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                <ArrowUpRight className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Due Nov 30, 2024
            </p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center justify-center gap-2 py-3">
            <Plus className="w-5 h-5" />
            Make Contribution
          </Button>
          <Button variant="outline" className="rounded-lg flex items-center justify-center gap-2 py-3">
            <CreditCard className="w-5 h-5" />
            Apply for Loan
          </Button>
          <Button variant="outline" className="rounded-lg flex items-center justify-center gap-2 py-3">
            <ArrowDownLeft className="w-5 h-5" />
            Withdraw Funds
          </Button>
          <Button variant="outline" className="rounded-lg flex items-center justify-center gap-2 py-3">
            <TrendingUp className="w-5 h-5" />
            View Investments
          </Button>
        </div>

        {/* Tabs */}
        <div className="bg-white dark:bg-slate-900 rounded-lg shadow border border-slate-200 dark:border-slate-800">
          <div className="border-b border-slate-200 dark:border-slate-800">
            <div className="flex">
              {["overview", "transactions", "loans", "contributions"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-4 font-medium text-sm transition-colors ${
                    activeTab === tab
                      ? "text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="p-6">
            {activeTab === "overview" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                    Active Loan
                  </h3>
                  <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-6 border border-slate-200 dark:border-slate-700">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Loan ID</p>
                        <p className="font-semibold text-slate-900 dark:text-white">{activeLoan.id}</p>
                      </div>
                      <div>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Original Amount</p>
                        <p className="font-semibold text-slate-900 dark:text-white">${activeLoan.amount.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Remaining Balance</p>
                        <p className="font-semibold text-slate-900 dark:text-white">${activeLoan.balance.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Interest Rate</p>
                        <p className="font-semibold text-slate-900 dark:text-white">{activeLoan.rate}% APR</p>
                      </div>
                      <div>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Next Payment</p>
                        <p className="font-semibold text-slate-900 dark:text-white">${activeLoan.nextPayment.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Due Date</p>
                        <p className="font-semibold text-slate-900 dark:text-white">{activeLoan.dueDate}</p>
                      </div>
                    </div>
                    <Button className="mt-4 bg-blue-600 hover:bg-blue-700">
                      Make Loan Payment
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "transactions" && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                  Recent Transactions
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-slate-200 dark:border-slate-700">
                        <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900 dark:text-white">
                          Description
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900 dark:text-white">
                          Amount
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900 dark:text-white">
                          Date
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900 dark:text-white">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentTransactions.map((txn) => (
                        <tr
                          key={txn.id}
                          className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50"
                        >
                          <td className="px-4 py-3 text-sm text-slate-900 dark:text-white font-medium">
                            {txn.description}
                          </td>
                          <td className={`px-4 py-3 text-sm font-semibold ${
                            txn.type === "deposit" || txn.type === "interest"
                              ? "text-green-600 dark:text-green-400"
                              : "text-red-600 dark:text-red-400"
                          }`}>
                            {txn.type === "deposit" || txn.type === "interest" ? "+" : "-"}${txn.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                          </td>
                          <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-400">
                            {txn.date}
                          </td>
                          <td className="px-4 py-3 text-sm">
                            <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 rounded-full text-xs font-medium">
                              {txn.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === "loans" && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                  Your Loans
                </h3>
                <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-6 h-96 flex items-center justify-center border border-slate-200 dark:border-slate-700">
                  <p className="text-slate-600 dark:text-slate-400">
                    Detailed loan management interface coming soon
                  </p>
                </div>
              </div>
            )}

            {activeTab === "contributions" && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                  Contribution History
                </h3>
                <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-6 h-96 flex items-center justify-center border border-slate-200 dark:border-slate-700">
                  <p className="text-slate-600 dark:text-slate-400">
                    Contribution tracking interface coming soon
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default function MemberDashboard() {
  return (
    <ProtectedRoute requiredRole="member">
      <MemberDashboardContent />
    </ProtectedRoute>
  );
}
