import { useAuthContext } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import { PiggyBank, TrendingUp, Calendar, DollarSign, Plus, ArrowDownLeft, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

function SavingsContent() {
  const { user, logout } = useAuthContext();
  const [activeTab, setActiveTab] = useState("overview");

  const savingsAccounts = [
    {
      id: "SAV-001",
      name: "Emergency Fund",
      balance: 15000,
      rate: 8.5,
      createdDate: "Jan 15, 2023",
      nextInterestDate: "Nov 15, 2024",
      totalInterestEarned: 1250.50,
    },
    {
      id: "SAV-002",
      name: "Education Fund",
      balance: 10000,
      rate: 8.5,
      createdDate: "Mar 20, 2023",
      nextInterestDate: "Nov 20, 2024",
      totalInterestEarned: 675.25,
    },
  ];

  const savingsHistory = [
    { date: "Nov 1, 2024", description: "Monthly Contribution", amount: 2500, type: "deposit", balance: 25000 },
    { date: "Oct 15, 2024", description: "Interest Credit", amount: 175.50, type: "interest", balance: 22500 },
    { date: "Oct 1, 2024", description: "Monthly Contribution", amount: 2500, type: "deposit", balance: 22324.50 },
    { date: "Sep 15, 2024", description: "Interest Credit", amount: 158.75, type: "interest", balance: 19824.50 },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Header */}
      <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
              Savings Management
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Manage your savings accounts and track earnings
            </p>
          </div>
          <Button
            onClick={logout}
            variant="outline"
            size="sm"
            className="text-red-600 dark:text-red-400"
          >
            Logout
          </Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Summary Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {/* Total Savings */}
          <div className="bg-white dark:bg-slate-900 rounded-lg shadow p-6 border border-slate-200 dark:border-slate-800">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                  Total Savings
                </p>
                <p className="text-3xl font-bold text-slate-900 dark:text-white mt-2">
                  $25,000.00
                </p>
              </div>
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <PiggyBank className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Across 2 accounts
            </p>
          </div>

          {/* Interest Earned */}
          <div className="bg-white dark:bg-slate-900 rounded-lg shadow p-6 border border-slate-200 dark:border-slate-800">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                  Interest Earned
                </p>
                <p className="text-3xl font-bold text-green-600 dark:text-green-400 mt-2">
                  $1,925.75
                </p>
              </div>
              <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
                <TrendingUp className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              This year
            </p>
          </div>

          {/* Average Rate */}
          <div className="bg-white dark:bg-slate-900 rounded-lg shadow p-6 border border-slate-200 dark:border-slate-800">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                  Average Rate
                </p>
                <p className="text-3xl font-bold text-slate-900 dark:text-white mt-2">
                  8.5%
                </p>
              </div>
              <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                <DollarSign className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              APY
            </p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center justify-center gap-2 py-3">
            <Plus className="w-5 h-5" />
            Add to Savings
          </Button>
          <Button variant="outline" className="rounded-lg flex items-center justify-center gap-2 py-3">
            <ArrowDownLeft className="w-5 h-5" />
            Withdraw Funds
          </Button>
        </div>

        {/* Tabs */}
        <div className="bg-white dark:bg-slate-900 rounded-lg shadow border border-slate-200 dark:border-slate-800">
          <div className="border-b border-slate-200 dark:border-slate-800">
            <div className="flex">
              {["accounts", "history", "goals"].map((tab) => (
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
            {activeTab === "accounts" && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                  Your Savings Accounts
                </h3>
                {savingsAccounts.map((account) => (
                  <div
                    key={account.id}
                    className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-6 border border-slate-200 dark:border-slate-700"
                  >
                    <div className="grid md:grid-cols-2 gap-6 mb-4">
                      <div>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">
                          Account Name
                        </p>
                        <p className="font-semibold text-slate-900 dark:text-white text-lg">
                          {account.name}
                        </p>
                        <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                          ID: {account.id}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">
                          Current Balance
                        </p>
                        <p className="font-semibold text-slate-900 dark:text-white text-lg">
                          ${account.balance.toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">
                          Interest Rate
                        </p>
                        <p className="font-semibold text-green-600 dark:text-green-400">
                          {account.rate}% APY
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">
                          Total Interest Earned
                        </p>
                        <p className="font-semibold text-slate-900 dark:text-white">
                          ${account.totalInterestEarned.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">
                          Account Created
                        </p>
                        <p className="font-semibold text-slate-900 dark:text-white">
                          {account.createdDate}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">
                          Next Interest Credit
                        </p>
                        <p className="font-semibold text-slate-900 dark:text-white">
                          {account.nextInterestDate}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-3 pt-4 border-t border-slate-200 dark:border-slate-600">
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                        Add Funds
                      </Button>
                      <Button size="sm" variant="outline">
                        Withdraw
                      </Button>
                      <Button size="sm" variant="outline">
                        View Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "history" && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                  Transaction History
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-slate-200 dark:border-slate-700">
                        <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900 dark:text-white">
                          Date
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900 dark:text-white">
                          Description
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900 dark:text-white">
                          Amount
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900 dark:text-white">
                          Balance
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {savingsHistory.map((item, idx) => (
                        <tr
                          key={idx}
                          className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50"
                        >
                          <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-400">
                            {item.date}
                          </td>
                          <td className="px-4 py-3 text-sm text-slate-900 dark:text-white font-medium">
                            {item.description}
                          </td>
                          <td className={`px-4 py-3 text-sm font-semibold ${
                            item.type === "deposit" || item.type === "interest"
                              ? "text-green-600 dark:text-green-400"
                              : "text-red-600 dark:text-red-400"
                          }`}>
                            {item.type === "deposit" || item.type === "interest" ? "+" : "-"}${item.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                          </td>
                          <td className="px-4 py-3 text-sm text-slate-900 dark:text-white font-medium">
                            ${item.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === "goals" && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                  Savings Goals
                </h3>
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 flex gap-3">
                  <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-blue-900 dark:text-blue-100">
                      Set Savings Goals
                    </p>
                    <p className="text-sm text-blue-800 dark:text-blue-200 mt-1">
                      Create and track savings goals to stay motivated. Set targets for specific purposes like education, home, or emergency fund.
                    </p>
                    <Button size="sm" className="mt-3 bg-blue-600 hover:bg-blue-700">
                      Create Goal
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default function Savings() {
  return (
    <ProtectedRoute requiredRole="member">
      <SavingsContent />
    </ProtectedRoute>
  );
}
